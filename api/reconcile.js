// api/reconcile.js
//
// Recorre todas las reservas en `bookings` y trata de reconstruir su origen
// publicitario cruzando:
//   1. manual_notes  -> ref_code que anotó el operador para esa reserva
//   2. whatsapp_clicks -> visitor_id asociado a ese ref_code
//   3. sessions      -> gclid/UTMs/ga_client_id de ese visitor_id
//
// El resultado se guarda en `ad_source_snapshot`, la fuente única de verdad
// para reportes e import de conversiones. Se dispara a mano (GET + secreto),
// igual que sync-bookings; se puede correr las veces que haga falta, siempre
// sobreescribe con el estado más actual.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.query;
  if (!secret || secret !== process.env.SYNC_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*');

    if (bookingsError) throw bookingsError;

    let exact = 0;
    let unknown = 0;
    let errors = 0;

    for (const booking of bookings) {
      const snapshot = {
        wubook_id_human: booking.wubook_id_human,
        value: booking.value,
        currency: booking.currency,
        confirmed_at: booking.confirmed_at,
        wubook_channel: booking.channel,
        attribution_confidence: 'unknown',
        matched_via: null,
        ref_code: null,
        visitor_id: null,
        gclid: null,
        gbraid: null,
        wbraid: null,
        fbclid: null,
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_content: null,
        utm_term: null,
        ga_client_id: null,
        updated_at: new Date().toISOString(),
      };

      // Paso 1: nota manual más reciente para esta reserva
      const { data: notes } = await supabase
        .from('manual_notes')
        .select('ref_code, phone_hint')
        .eq('wubook_id_human', booking.wubook_id_human)
        .order('created_at', { ascending: false })
        .limit(1);

      const note = notes && notes[0];

      if (note?.ref_code) {
        snapshot.ref_code = note.ref_code;

        // Paso 2: buscar el visitor_id asociado a ese ref_code
        const { data: clicks } = await supabase
          .from('whatsapp_clicks')
          .select('visitor_id')
          .eq('ref_code', note.ref_code)
          .limit(1);

        const click = clicks && clicks[0];

        if (click?.visitor_id) {
          snapshot.visitor_id = click.visitor_id;

          // Paso 3: buscar la sesión (primer contacto) de ese visitor_id
          const { data: sessions } = await supabase
            .from('sessions')
            .select('*')
            .eq('visitor_id', click.visitor_id)
            .order('created_at', { ascending: true })
            .limit(1);

          const session = sessions && sessions[0];

          if (session) {
            snapshot.gclid = session.gclid;
            snapshot.gbraid = session.gbraid;
            snapshot.wbraid = session.wbraid;
            snapshot.fbclid = session.fbclid;
            snapshot.utm_source = session.utm_source;
            snapshot.utm_medium = session.utm_medium;
            snapshot.utm_campaign = session.utm_campaign;
            snapshot.utm_content = session.utm_content;
            snapshot.utm_term = session.utm_term;
            snapshot.ga_client_id = session.ga_client_id;
            snapshot.attribution_confidence = 'exact';
            snapshot.matched_via = 'ref_code';
          }
        }
      }

      if (snapshot.attribution_confidence === 'exact') {
        exact++;
      } else {
        unknown++;
      }

      const { error: upsertError } = await supabase
        .from('ad_source_snapshot')
        .upsert(snapshot, { onConflict: 'wubook_id_human' });

      if (upsertError) {
        console.error('Error guardando snapshot de', booking.wubook_id_human, upsertError);
        errors++;
      }
    }

    return res.status(200).json({
      status: 'ok',
      total_reservas: bookings.length,
      exact,
      unknown,
      errores: errors,
    });
  } catch (err) {
    console.error('Error en reconcile:', err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
