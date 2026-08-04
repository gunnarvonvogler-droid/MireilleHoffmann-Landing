const FUNNEL_WEBHOOK_URL = 'https://n8n.gvvops.com/webhook/funnel-leads';
const FUNNEL_WEBHOOK_TOKEN = 'ddd95d2573e72ae920aee504747a22b4';

export interface FunnelLeadPayload {
  form_type: 'optin' | 'apply' | 'contact';
  source: string;
  nombre: string;
  telefono?: string;
  email?: string;
  detalle?: string;
}

/** Envía el lead al CRM (NocoDB vía n8n). No bloquea la UI: si falla, el visitante sigue viendo el flujo normal, con WhatsApp como respaldo. */
export function sendLeadToFunnel(payload: FunnelLeadPayload): void {
  const body = JSON.stringify({ ...payload, token: FUNNEL_WEBHOOK_TOKEN });

  const porBeacon = () => {
    navigator.sendBeacon?.(FUNNEL_WEBHOOK_URL, new Blob([body], { type: 'application/json' }));
  };

  // `keepalive: true` hace que la petición sobreviva al cambio de hash que ocurre justo
  // después de esta llamada (setScreen navega a la thank-you page en el mismo tick) —
  // ese era el motivo original de haber pasado a sendBeacon el 2026-08-02.
  //
  // sendBeacon NO sirve como método primario y por eso volvió a ser solo respaldo:
  // verificado el 2026-08-04 contra el webhook real desde la página de producción, con el
  // mismo payload y en el mismo tick, `fetch` con keepalive llega y sendBeacon no llega
  // nunca — y encima devuelve `true`, así que un `if (!queued)` jamás dispara el respaldo.
  // Entre el 2026-08-02 y el 2026-08-04 eso dejó al funnel sin un solo lead con 877 visitas.
  try {
    fetch(FUNNEL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(porBeacon);
  } catch {
    porBeacon();
  }
}
