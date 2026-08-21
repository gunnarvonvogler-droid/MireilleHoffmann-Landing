/**
 * Verificación del taller de un solo clic en las thank-you pages.
 *
 *   npm run dev            (en otra terminal)
 *   npm run verificar:taller
 *
 * Por qué existe como script y no como una prueba manual: este sitio ya se rompió dos
 * veces en silencio — el router de hash comiéndose el tráfico de anuncios (01/08) y
 * `sendBeacon` tragándose 877 visitas sin un solo lead (02-04/08). En los dos casos no
 * hubo error en consola ni 404: la página simplemente hacía otra cosa. Lo único que lo
 * detecta es una comprobación que corre sola antes de publicar.
 *
 * Las llamadas al webhook del taller se interceptan, así que esto NO crea fichas en el
 * CRM, no manda correos y no dispara avisos de Telegram.
 *
 * Los 8 casos cubren lo que rompe inscripciones reales: el camino feliz, el link directo
 * sin datos, el teléfono compartido (opt-in viejo), corregir los datos, la navegación
 * privada donde `localStorage` lanza, que la franja de la home no cambie, la cadena
 * completa desde el opt-in, y qué se ve si el servidor falla.
 */

import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:3000';
const RESP = {
  ok: true, estado: 'listo', email: 'rosy@correo.com',
  fecha: 'miércoles 26 de agosto',
  inicio: '2026-08-27T01:00:00.000Z',
  meet: 'https://meet.google.com/wjt-cguv-niu',
};

const res = [];
const check = (n, ok, extra = '') => { res.push(!!ok); console.log(`${ok ? '✅' : '❌'}  ${n}${extra ? '  — ' + extra : ''}`); };

const nav = await chromium.launch();

async function abrir({ nombre, email, cuando } = {}) {
  const ctx = await nav.newContext();
  const page = await ctx.newPage();
  let llamadas = 0;
  await page.route('**/webhook/taller-sitio', async (route) => {
    llamadas++;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(RESP) });
  });
  await page.route('**/webhook/funnel-leads', (r) => r.fulfill({ status: 200, body: '{}' }));
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  if (nombre) {
    await page.evaluate((d) => {
      localStorage.setItem('lastOptInName', d.nombre);
      localStorage.setItem('lastOptInEmail', d.email);
      localStorage.setItem('lastOptInAt', d.cuando);
    }, { nombre, email, cuando });
  }
  return { page, ctx, llamadas: () => llamadas };
}

const campoNombreTaller = (p) => p.locator('#taller-nombre');

// ── CASO 1 · opt-in recién hecho → un solo clic ──────────────────────────────
{
  const { page, ctx, llamadas } = await abrir({ nombre: 'Rosy Sanchez', email: 'rosy@correo.com', cuando: new Date().toISOString() });
  await page.goto(BASE + '/#gracias-cantantes', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  check('1 · saluda por su nombre', (await page.locator('h1').innerText()).includes('Rosy Sanchez'));
  check('1 · NO le pide nombre ni correo otra vez', (await campoNombreTaller(page).count()) === 0);
  const aviso = (await page.locator('text=Te anotamos como').innerText()).trim();
  check('1 · deja ver a quién anota', aviso.includes('Rosy Sanchez') && aviso.includes('rosy@correo.com'), aviso.slice(0, 55));

  await page.getByRole('button', { name: /Reservar mi lugar en el taller/i }).click();
  await page.waitForSelector('text=¡Listo, tenés tu lugar!', { timeout: 8000 });
  check('1 · un solo clic la inscribe', llamadas() === 1, llamadas() + ' llamada(s)');
  check('1 · le dice la fecha', (await page.locator('text=miércoles 26 de agosto').count()) > 0);

  const gcal = page.getByRole('link', { name: /Agregarlo a mi calendario/i });
  check('1 · ofrece agendar', (await gcal.count()) === 1);
  const href = await gcal.getAttribute('href');
  check('1 · el enlace lleva la fecha y los 45 min', href.includes('20260827T010000Z%2F20260827T014500Z'));
  check('1 · abre en pestaña nueva', (await gcal.getAttribute('target')) === '_blank');

  const boton = page.getByRole('button', { name: /Apple Calendar u Outlook/i });
  check('1 · ofrece Apple/Outlook', (await boton.count()) === 1);
  const dl = page.waitForEvent('download', { timeout: 8000 });
  await boton.click();
  const f = await dl;
  check('1 · el archivo de calendario se descarga', f.suggestedFilename() === 'taller-mireille-hoffmann.ics', f.suggestedFilename());
  await ctx.close();
}

// ── CASO 2 · link directo, sin haber llenado nada ────────────────────────────
{
  const { page, ctx } = await abrir();
  await page.goto(BASE + '/#gracias-cantantes', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  check('2 · LINK DIRECTO: saluda sin nombre', (await page.locator('h1').innerText()).trim() === 'Gracias 🎶');
  check('2 · LINK DIRECTO: sí pide nombre y correo', (await campoNombreTaller(page).count()) === 1);
  check('2 · LINK DIRECTO: no ofrece anotar a nadie', (await page.locator('text=Te anotamos como').count()) === 0);
  await ctx.close();
}

// ── CASO 3 · opt-in viejo (teléfono compartido) ──────────────────────────────
{
  const { page, ctx } = await abrir({ nombre: 'Otra Persona', email: 'otra@correo.com', cuando: new Date(Date.now() - 40 * 3600e3).toISOString() });
  await page.goto(BASE + '/#gracias-oradores', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  check('3 · opt-in de hace 40 h: vuelve al formulario', (await campoNombreTaller(page).count()) === 1);
  check('3 · no anota a la persona equivocada', (await page.locator('text=Te anotamos como').count()) === 0);
  await ctx.close();
}

// ── CASO 4 · "No soy yo" ─────────────────────────────────────────────────────
{
  const { page, ctx, llamadas } = await abrir({ nombre: 'Rosy Sanchez', email: 'rosy@correo.com', cuando: new Date().toISOString() });
  await page.goto(BASE + '/#gracias-oradores', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /^No soy yo$/ }).click();
  await page.waitForTimeout(400);
  check('4 · "No soy yo" abre el formulario', (await campoNombreTaller(page).count()) === 1);
  check('4 · con los datos cargados para corregirlos', (await page.locator('#taller-email').inputValue()) === 'rosy@correo.com');
  check('4 · no se envió nada al pulsarlo', llamadas() === 0);
  await ctx.close();
}

// ── CASO 5 · navegación privada: localStorage lanza ──────────────────────────
{
  const ctx = await nav.newContext();
  await ctx.addInitScript(() => {
    try {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() { throw new DOMException('The operation is insecure.', 'SecurityError'); },
      });
    } catch { /* si no se puede, el caso no aplica */ }
  });
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  const rompe = await page.evaluate === undefined;
  await page.goto(BASE + '/#gracias-cantantes', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  let lanza = false;
  try { await page.evaluate(() => { void window.localStorage; }); } catch { lanza = true; }
  check('5 · el simulacro de navegación privada está activo', lanza);
  check('5 · PRIVADO: la página no se rompe', (await page.locator('h1').count()) === 1 && errores.length === 0, errores[0] || 'cero errores en consola');
  check('5 · PRIVADO: muestra el formulario', (await campoNombreTaller(page).count()) === 1);
  await ctx.close();
}

// ── CASO 6 · la franja de la home no cambia ──────────────────────────────────
{
  const { page, ctx } = await abrir({ nombre: 'Rosy Sanchez', email: 'rosy@correo.com', cuando: new Date().toISOString() });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  check('6 · la home conserva su formulario', (await campoNombreTaller(page).count()) === 1);
  check('6 · la home no ofrece el clic único', (await page.locator('text=Te anotamos como').count()) === 0);
  await ctx.close();
}

// ── CASO 7 · cadena completa: opt-in → thank-you → un clic ───────────────────
{
  const { page, ctx } = await abrir();
  await page.goto(BASE + '/#guia-cantantes', { waitUntil: 'networkidle' });
  await page.getByPlaceholder('Tu nombre').fill('Jimmy Vega');
  await page.getByPlaceholder('tu@correo.com').fill('jimmy@correo.com');
  await page.getByRole('button', { name: /Quiero mi guía gratis/i }).click();
  await page.waitForTimeout(1500);
  const g = await page.evaluate(() => ({ n: localStorage.getItem('lastOptInName'), e: localStorage.getItem('lastOptInEmail'), t: localStorage.getItem('lastOptInAt') }));
  check('7 · el opt-in guarda nombre, correo y hora', g.n === 'Jimmy Vega' && g.e === 'jimmy@correo.com' && !!g.t, JSON.stringify(g));
  check('7 · aterriza en la página de gracias', (await page.locator('h1').innerText()).includes('Jimmy Vega'));
  check('7 · y el taller ya es de un solo clic', (await page.locator('text=Te anotamos como').count()) === 1);
  check('7 · sin volver a pedir datos', (await campoNombreTaller(page).count()) === 0);
  await ctx.close();
}

// ── CASO 8 · el webhook falla ────────────────────────────────────────────────
{
  const ctx = await nav.newContext();
  const page = await ctx.newPage();
  await page.route('**/webhook/taller-sitio', (r) => r.abort('failed'));
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('lastOptInName', 'Rosy Sanchez');
    localStorage.setItem('lastOptInEmail', 'rosy@correo.com');
    localStorage.setItem('lastOptInAt', new Date().toISOString());
  });
  await page.goto(BASE + '/#gracias-cantantes', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Reservar mi lugar en el taller/i }).click();
  await page.waitForTimeout(1500);
  check('8 · SI FALLA: avisa y da el WhatsApp de respaldo', (await page.locator('text=No pudimos guardar tu lugar').count()) === 1);
  check('8 · SI FALLA: el botón vuelve a estar disponible', await page.getByRole('button', { name: /Reservar mi lugar en el taller/i }).isEnabled());
  await ctx.close();
}

await nav.close();
console.log('\n' + res.filter(Boolean).length + '/' + res.length + ' comprobaciones correctas');
process.exit(res.every(Boolean) ? 0 : 1);
