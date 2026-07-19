// api/manual-note.js
//
// Guarda la nota que carga el operador al registrar una reserva manual en
// Wubook: el ID de la reserva (ej. "DV-0005") junto con el ref_code que trajo
// el cliente en el mensaje de WhatsApp (si lo trajo) y/o el teléfono.
//
// Protegido con una clave simple (OPERATOR_PANEL_SECRET) — no es un login
// completo, es solo para evitar que cualquiera que encuentre la URL escriba
// datos ahí.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { secret, wubook_id_human, ref_code, phone_hint, note } = req.body || {};

    if (!secret || secret !== process.env.OPERATOR_PANEL_SECRET) {
      return res.status(401).json({ error: 'Clave incorrecta' });
    }

    if (!wubook_id_human) {
      return res.status(400).json({ error: 'El código de reserva es obligatorio' });
    }

    const { error } = await supabase.from('manual_notes').insert({
      wubook_id_human: wubook_id_human.trim().toUpperCase(),
      ref_code: ref_code ? ref_code.trim().toUpperCase() : null,
      phone_hint: phone_hint ? phone_hint.trim() : null,
      note: note ? note.trim() : null,
    });

    if (error) {
      console.error('Error guardando nota manual:', error);
      return res.status(500).json({ error: 'Error interno' });
    }

    return res.status(201).json({ status: 'ok' });
  } catch (err) {
    console.error('Error inesperado en /api/manual-note:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
