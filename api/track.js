// api/track.js
//
// Endpoint serverless (Vercel) que recibe los datos de atribución capturados
// en el sitio (gclid, fbclid, UTMs, etc.) y los guarda en la tabla `sessions`
// de Supabase, asociados a un visitor_id.
//
// Si ya existe una sesión con ese visitor_id, se actualiza (upsert) en vez de
// crear una fila nueva — así mantenemos el "primer contacto" pero actualizamos
// last_seen_at.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Solo aceptamos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      visitor_id,
      ga_client_id,
      gclid,
      gbraid,
      wbraid,
      fbclid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      landing_page,
      referrer,
    } = req.body || {};

    if (!visitor_id) {
      return res.status(400).json({ error: 'visitor_id es requerido' });
    }

    // Buscamos si ya existe una sesión previa con este visitor_id
    const { data: existing, error: fetchError } = await supabase
      .from('sessions')
      .select('id, gclid, gbraid, wbraid, fbclid, utm_source, utm_medium, utm_campaign, utm_content, utm_term, landing_page, referrer')
      .eq('visitor_id', visitor_id)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error('Error buscando sesión existente:', fetchError);
      return res.status(500).json({ error: 'Error interno' });
    }

    if (existing) {
      // Ya existe: solo actualizamos last_seen_at y el ga_client_id (puede
      // haber cambiado si se perdió la cookie de GA), pero conservamos el
      // "primer contacto" de campaña (gclid, UTMs, etc.) tal cual estaba.
      const { error: updateError } = await supabase
        .from('sessions')
        .update({
          ga_client_id: ga_client_id || undefined,
          last_seen_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Error actualizando sesión:', updateError);
        return res.status(500).json({ error: 'Error interno' });
      }

      return res.status(200).json({ status: 'updated', visitor_id });
    }

    // No existe: creamos la fila nueva con todos los datos de atribución
    const { error: insertError } = await supabase.from('sessions').insert({
      visitor_id,
      ga_client_id: ga_client_id || null,
      gclid: gclid || null,
      gbraid: gbraid || null,
      wbraid: wbraid || null,
      fbclid: fbclid || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      utm_term: utm_term || null,
      landing_page: landing_page || null,
      referrer: referrer || null,
    });

    if (insertError) {
      console.error('Error insertando sesión:', insertError);
      return res.status(500).json({ error: 'Error interno' });
    }

    return res.status(201).json({ status: 'created', visitor_id });
  } catch (err) {
    console.error('Error inesperado en /api/track:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}
