// api/whatsapp-click.js
//
// Endpoint serverless (Vercel) que se llama cuando el usuario hace clic en
// cualquier botón de WhatsApp del sitio. Genera un código corto (ref_code)
// asociado al visitor_id de la sesión, lo guarda en Supabase, lo devuelve
// para que el frontend lo incluya en el mensaje prellenado de WhatsApp,
// y además envía el evento "Contact" a Meta vía CAPI (server-side) para
// complementar al pixel del browser.
//
// Ese código es lo que después el operador va a poder buscar (en la
// herramienta de reconciliación, Etapa 4) para saber de qué campaña vino
// una reserva que se cargó a mano.

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Genera un código corto, legible, sin caracteres ambiguos (sin 0/O, 1/I/L)
// para que un cliente lo pueda leer y escribir bien si hiciera falta.
function generateRefCode(length = 5) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Envía el evento "Contact" a Meta CAPI. No bloquea ni hace fallar el
// endpoint si Meta falla — el ref_code/whatsapp_click es lo crítico,
// el envío a Meta es "best effort".
//
// event_id: mismo id que el frontend debe pasarle al pixel del browser
// (fbq('track', 'Contact', {}, {eventID: event_id})) para que Meta
// deduplique el evento de servidor con el del navegador.
async function sendMetaContactEvent({ event_id, fbc, fbp, client_ip, user_agent, event_source_url }) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('META_PIXEL_ID o META_ACCESS_TOKEN no configurados, se omite envío a Meta CAPI');
    return;
  }

  const userData = {
    client_ip_address: client_ip,
    client_user_agent: user_agent,
  };
  if (fbc) userData.fbc = fbc;
  if (fbp) userData.fbp = fbp;

  const payload = {
    data: [
      {
        event_name: 'Contact',
        event_time: Math.floor(Date.now() / 1000),
        event_id, // clave para deduplicar con el pixel del browser
        action_source: 'website',
        event_source_url,
        user_data: userData,
      },
    ],
  };

  try {
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
    }
  } catch (err) {
    console.error('Error de red enviando evento Contact a Meta CAPI:', err);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { visitor_id, fbc, fbp, event_id, event_source_url } = req.body || {};

    if (!visitor_id) {
      return res.status(400).json({ error: 'visitor_id es requerido' });
    }

    // Reintentamos hasta 5 veces por si hay una colisión de código (muy
    // improbable con 5 caracteres de un alfabeto de 32, pero el campo es
    // unique en la base y preferimos manejarlo en vez de que falle la carga).
    let refCode;
    let inserted = false;
    let lastError;

    for (let attempt = 0; attempt < 5 && !inserted; attempt++) {
      refCode = generateRefCode();
      const { error } = await supabase.from('whatsapp_clicks').insert({
        ref_code: refCode,
        visitor_id,
      });

      if (!error) {
        inserted = true;
      } else if (error.code === '23505') {
        // Colisión de unique constraint: reintentamos con otro código
        lastError = error;
        continue;
      } else {
        lastError = error;
        break;
      }
    }

    if (!inserted) {
      console.error('Error generando ref_code:', lastError);
      return res.status(500).json({ error: 'Error interno' });
    }

    // Envío a Meta CAPI, sin esperar (no debe demorar la respuesta al
    // usuario, que está por abrir WhatsApp). Usamos el mismo event_id
    // que va a usar el pixel del browser para deduplicar en Meta.
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'];

    sendMetaContactEvent({
      event_id: event_id || refCode, // fallback: usar el ref_code como event_id si el frontend no manda uno
      fbc,
      fbp,
      client_ip: clientIp,
      user_agent: userAgent,
      event_source_url,
    }).catch((err) => console.error('sendMetaContactEvent falló:', err));

    return res.status(201).json({ ref_code: refCode });
  } catch (err) {
    console.error('Error inesperado en /api/whatsapp-click:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}