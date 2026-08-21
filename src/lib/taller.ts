/**
 * Inscripción al taller semanal gratuito.
 *
 * Hay DOS puertas al mismo workflow de n8n (`Taller - Inscripción Pública`):
 *
 * - `TALLER_WEBHOOK_URL` — la que usa este sitio. La persona no sale de la página:
 *   manda los datos, espera la respuesta y ve el resultado ahí mismo.
 * - `TALLER_FORM_URL` — el formulario servido por n8n. Sigue vivo porque es el link
 *   compartible que se pega en comentarios, mensajes privados y correos.
 *
 * Las dos terminan en la misma lógica: reusa la ficha si el correo ya existe, engancha
 * a la sesión de la semana, manda la confirmación con el enlace del Meet y avisa por
 * Telegram. Si el taller cambia de día u hora, se cambia en n8n, no acá.
 */
export const TALLER_WEBHOOK_URL = 'https://n8n.gvvops.com/webhook/taller-sitio';
export const TALLER_FORM_URL = 'https://n8n.gvvops.com/form/taller';

/** Duración real del taller, en minutos. Vive acá porque solo la usa el botón de agendar. */
export const TALLER_DURACION_MIN = 45;

export const TALLER_TITULO = 'Taller de técnica vocal con Mireille Hoffmann';

/**
 * Lo que devuelve el webhook. `inicio` y `meet` los agrega n8n desde el 2026-08-20 —
 * son opcionales a propósito: si el workflow se revirtiera, el sitio sigue funcionando
 * y simplemente no ofrece el botón de agendar.
 */
export interface TallerRespuesta {
  ok?: boolean;
  estado?: string;
  /** Fecha legible en español, ej. "miércoles 26 de agosto". La escribe n8n. */
  fecha?: string;
  email?: string;
  /** Instante de inicio en UTC, formato ISO. */
  inicio?: string;
  /** Enlace del Google Meet de la sesión. */
  meet?: string;
}

/** `2026-08-27T01:00:00.000Z` → `20260827T010000Z`, que es el formato que piden Google Calendar y el .ics. */
function aFormatoCalendario(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function fin(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return aFormatoCalendario(new Date(d.getTime() + TALLER_DURACION_MIN * 60_000).toISOString());
}

function descripcion(meet: string): string {
  return [
    'Taller práctico de 45 minutos con Mireille Hoffmann.',
    '',
    'Vas a cantar vos: son ejercicios en vivo, no una charla para escuchar.',
    'Al final hay tiempo para tus preguntas.',
    '',
    'Para aprovecharlo: un lugar donde puedas hacer ruido sin incomodar a nadie,',
    'agua a mano, y si podés, audífonos.',
    '',
    'Entrar al taller: ' + meet,
  ].join('\n');
}

/**
 * Enlace para agregar el taller a Google Calendar.
 * Devuelve `null` si n8n no mandó la fecha — el botón simplemente no se dibuja.
 */
export function googleCalendarUrl(inicio?: string, meet?: string): string | null {
  if (!inicio || !meet) return null;
  const desde = aFormatoCalendario(inicio);
  const hasta = fin(inicio);
  if (!desde || !hasta) return null;

  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: TALLER_TITULO,
    dates: `${desde}/${hasta}`,
    details: descripcion(meet),
    location: meet,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

/** Escapa según RFC 5545: la coma, el punto y coma y la contrabarra son separadores. */
function escaparIcs(v: string): string {
  return v.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Contenido de un archivo `.ics`, para Apple Calendar y Outlook.
 * Las líneas van separadas por CRLF porque el estándar lo exige y algunos clientes
 * (Outlook entre ellos) rechazan el archivo si solo tiene saltos de línea normales.
 */
export function icsTaller(inicio?: string, meet?: string): string | null {
  if (!inicio || !meet) return null;
  const desde = aFormatoCalendario(inicio);
  const hasta = fin(inicio);
  const ahora = aFormatoCalendario(new Date().toISOString());
  if (!desde || !hasta || !ahora) return null;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mireille Hoffmann//Taller Vocal//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:taller-${desde}@mireille-hoffmann.vercel.app`,
    `DTSTAMP:${ahora}`,
    `DTSTART:${desde}`,
    `DTEND:${hasta}`,
    `SUMMARY:${escaparIcs(TALLER_TITULO)}`,
    `DESCRIPTION:${escaparIcs(descripcion(meet))}`,
    `LOCATION:${escaparIcs(meet)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:El taller empieza en 30 minutos',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
