/**
 * Lo que el sitio recuerda de la persona que acaba de dejar sus datos en el opt-in.
 *
 * Existe para un solo caso: la thank-you page. Ahí la persona ACABA de escribir su
 * nombre y su correo, así que volver a pedírselos para anotarse al taller es fricción
 * gratis (pedido de Gunnar, 13/08). Con estos datos, esa inscripción es un clic.
 *
 * Tres guardias, y las tres importan:
 *
 * 1. `localStorage` puede lanzar excepción — navegación privada de Safari, cookies
 *    bloqueadas, el navegador embebido de alguna app. Todo va envuelto en try/catch:
 *    si no se puede leer, se devuelve null y la página muestra el formulario de siempre.
 * 2. Los datos se validan al leerlos, no solo al escribirlos. Un correo corrupto en el
 *    almacenamiento no puede convertirse en una inscripción rota.
 * 3. **Ventana de frescura.** Solo vale si el opt-in ocurrió hace menos de 24 h. Sin
 *    esto, quien entra a `#gracias-cantantes` por un link directo en un teléfono
 *    prestado — o meses después — se anotaría al taller con el nombre de otra persona
 *    sin enterarse. Pasado ese plazo se muestra el formulario, que es lo correcto.
 */

const CLAVE_NOMBRE = 'lastOptInName';
const CLAVE_EMAIL = 'lastOptInEmail';
const CLAVE_FECHA = 'lastOptInAt';

/** 24 h. La thank-you page se ve segundos después del opt-in; el margen es para lectores lentos, no para otro día. */
const VENTANA_MS = 24 * 60 * 60 * 1000;

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface OptInRecordado {
  nombre: string;
  email: string;
}

function leer(clave: string): string | null {
  try {
    return localStorage.getItem(clave);
  } catch {
    return null;
  }
}

/** Guarda quién acaba de hacer opt-in. Nunca lanza: si el almacenamiento falla, el funnel sigue igual. */
export function recordarOptIn(nombre: string, email: string): void {
  try {
    localStorage.setItem(CLAVE_NOMBRE, nombre);
    localStorage.setItem(CLAVE_EMAIL, email);
    localStorage.setItem(CLAVE_FECHA, new Date().toISOString());
  } catch {
    /* Sin almacenamiento la thank-you page saluda sin nombre y pide los datos del taller. Nada se rompe. */
  }
}

/** El nombre para el saludo. Sin ventana de frescura: saludar con un nombre viejo es inofensivo. */
export function nombreRecordado(): string {
  return leer(CLAVE_NOMBRE) || '';
}

/**
 * Los datos completos para la inscripción de un clic, o `null` si no son de fiar.
 * `null` significa "mostrale el formulario", nunca "algo falló".
 */
export function optInReciente(): OptInRecordado | null {
  const nombre = (leer(CLAVE_NOMBRE) || '').trim();
  const email = (leer(CLAVE_EMAIL) || '').trim();
  const cuando = leer(CLAVE_FECHA);

  if (!nombre || !EMAIL_OK.test(email) || !cuando) return null;

  const ts = Date.parse(cuando);
  // `Number.isNaN` cubre una marca de tiempo corrupta; la resta cubre tanto un opt-in
  // viejo como un reloj del dispositivo adelantado (diferencia negativa grande).
  if (Number.isNaN(ts) || Math.abs(Date.now() - ts) > VENTANA_MS) return null;

  return { nombre, email };
}
