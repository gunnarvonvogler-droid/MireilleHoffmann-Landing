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
  fetch(FUNNEL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, token: FUNNEL_WEBHOOK_TOKEN }),
  }).catch(() => {
    // Sin conexión al CRM — el lead ya tiene el fallback de WhatsApp visible en la UI.
  });
}
