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
