/**
 * Inscripción al taller semanal gratuito.
 *
 * Hay DOS puertas al mismo workflow de n8n (`Taller - Inscripción Pública`):
 *
 * - `TALLER_WEBHOOK_URL` — la que usa este sitio. La persona no sale de la página:
 *   manda los datos, espera la respuesta y ve el resultado ahí mismo.
 * - `n8n.gvvops.com/form/taller` — el formulario servido por n8n. Desde el 24/09 ya no
 *   es el link que se reparte (se veía poco profesional): el link compartible es la
 *   página `#taller-gratis` de este sitio. El formulario sigue vivo para no romper los
 *   links viejos ya pegados en comentarios, mensajes y el PDF.
 *
 * Las dos terminan en la misma lógica: reusa la ficha si el correo ya existe, engancha
 * a la sesión de la semana, manda la confirmación con el enlace del Meet y avisa por
 * Telegram. Si el taller cambia de día u hora, se cambia en n8n, no acá.
 */
export const TALLER_WEBHOOK_URL = 'https://n8n.gvvops.com/webhook/taller-sitio';

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
    'Taller práctico de 45 minutos con Mireille Hoffmann, todos los miércoles.',
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
 * Enlace para agregar el taller a Google Calendar, como evento de TODOS los miércoles.
 * Arranca en la sesión a la que la persona se acaba de anotar y se repite cada semana,
 * así queda agendada aunque no vuelva a abrir un correo (pedido de Gunnar, 24/09).
 *
 * La repetición es `FREQ=WEEKLY` a secas, sin `BYDAY=WE`: las fechas van en UTC y las
 * 19:00 del miércoles en El Salvador son la 01:00 del jueves en UTC, así que "los
 * miércoles" podría interpretarse del lado equivocado. Semanal a secas repite el mismo
 * instante cada 7 días, que es exactamente el taller. `ctz` fija el huso del evento.
 *
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
    ctz: 'America/El_Salvador',
    recur: 'RRULE:FREQ=WEEKLY',
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

/**
 * Calendario fijo del taller para Apple Calendar, Outlook y cualquier teléfono:
 * `public/taller.ics`, un evento de todos los miércoles a las 19:00 hora de El Salvador.
 * Es un archivo estático y no uno armado en el navegador, para que los correos de
 * confirmación puedan enlazar el MISMO archivo: una sola fuente de verdad. Si el taller
 * cambia de hora o de link del Meet, se cambia ahí (y en los correos de n8n).
 */
export const TALLER_ICS_URL = '/taller.ics';
