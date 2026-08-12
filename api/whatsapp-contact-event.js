// api/whatsapp-contact-event.js
//
// Endpoint liviano, dedicado exclusivamente a enviar el evento "Contact" a
// Meta CAPI. A diferencia de /api/whatsapp-click (que genera un ref_code
// nuevo solo una vez por sesión, cacheado en sessionStorage), este endpoint
// se llama en CADA clic real del usuario en un botón de WhatsApp — no hace
// falta ref_code nuevo para eso, solo avisarle a Meta que hubo un contacto.
//
// No toca Supabase ni whatsapp_clicks: es puramente el puente hacia Meta.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('META_PIXEL_ID o META_ACCESS_TOKEN no configurados, se omite envío a Meta CAPI');
    return res.status(200).json({ sent: false });
  }

  try {
    const { event_id, fbc, fbp, event_source_url } = req.body || {};

    if (!event_id) {
      return res.status(400).json({ error: 'event_id es requerido' });
    }

    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const userData = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
    };
    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;

    const payload = {
      data: [
        {
          event_name: 'Contact',
          event_time: Math.floor(Date.now() / 1000),
          event_id, // mismo id que usa el pixel del browser, para deduplicar
          action_source: 'website',
          event_source_url,
          user_data: userData,
        },
      ],
    };

    const resp = await fetch(
      `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const result = await resp.json();

    if (!resp.ok) {
      console.error('Error enviando evento Contact a Meta CAPI:', result);
      return res.status(200).json({ sent: false });
    }

    return res.status(200).json({ sent: true });
  } catch (err) {
    console.error('Error inesperado en /api/whatsapp-contact-event:', err);
    // Nunca devolvemos error 500 acá: es tracking en segundo plano, no debe
    // afectar la experiencia del usuario ni generar reintentos del frontend.
    return res.status(200).json({ sent: false });
  }
}
