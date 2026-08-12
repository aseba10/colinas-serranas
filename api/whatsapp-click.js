// api/whatsapp-click.js
//
// Endpoint serverless (Vercel) que se llama cuando el usuario hace clic en
// cualquier botón de WhatsApp del sitio. Genera un código corto (ref_code)
// asociado al visitor_id de la sesión, lo guarda en Supabase, y lo devuelve
// para que el frontend lo incluya en el mensaje prellenado de WhatsApp.
//
// Se cachea del lado del frontend (sessionStorage) y por eso solo se llama
// una vez por sesión — el envío a Meta CAPI del evento "Contact" NO va acá,
// vive en /api/whatsapp-contact-event.js, que sí se llama en cada clic real.
//
// Ese código es lo que después el operador va a poder buscar (en la
// herramienta de reconciliación, Etapa 4) para saber de qué campaña vino
// una reserva que se cargó a mano.

import { createClient } from '@supabase/supabase-js';

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { visitor_id } = req.body || {};

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

    return res.status(201).json({ ref_code: refCode });
  } catch (err) {
    console.error('Error inesperado en /api/whatsapp-click:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
