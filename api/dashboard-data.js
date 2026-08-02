// api/dashboard-data.js
//
// Agrega los datos de `ad_source_snapshot` para mostrar en el dashboard
// interno: totales, desglose por nivel de confianza de atribución, desglose
// por origen de campaña (UTM), y el listado de reservas individuales.
//
// Uso: GET /api/dashboard-data?secret=TU_OPERATOR_PANEL_SECRET

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
  if (!secret || secret !== process.env.OPERATOR_PANEL_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const { data: rows, error } = await supabase
      .from('ad_source_snapshot')
      .select('*')
      .order('confirmed_at', { ascending: false });

    if (error) throw error;

    // Reservas recientes (últimos 60 días) sin ninguna nota cargada en el
    // panel — candidatas a revisar. No distingue motor vs. manual (Wubook no
    // lo informa de forma confiable), así que puede incluir reservas del
    // motor que no necesitan nota; el operador debe usar su criterio.
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const { data: recentBookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('wubook_id_human, phone, value, currency, confirmed_at, status')
      .neq('status', 'Cancelled')
      .gte('confirmed_at', sixtyDaysAgo.toISOString())
      .order('confirmed_at', { ascending: false });

    if (bookingsError) throw bookingsError;

    const { data: notes, error: notesError } = await supabase
      .from('manual_notes')
      .select('wubook_id_human');

    if (notesError) throw notesError;

    const notedIds = new Set((notes || []).map((n) => n.wubook_id_human));

    const pendientes_revision = (recentBookings || [])
      .filter((b) => !notedIds.has(b.wubook_id_human))
      .map((b) => ({
        wubook_id_human: b.wubook_id_human,
        phone: b.phone,
        value: b.value,
        currency: b.currency,
        confirmed_at: b.confirmed_at,
        status: b.status,
      }));

    const total_reservas = rows.length;
    const total_valor = rows.reduce((sum, r) => sum + (Number(r.value) || 0), 0);
    const currency = rows.find((r) => r.currency)?.currency || 'ARS';

    const exact = rows.filter((r) => r.attribution_confidence === 'exact').length;
    const unknown = rows.filter((r) => r.attribution_confidence === 'unknown').length;
    const pct_unknown = total_reservas > 0 ? Math.round((unknown / total_reservas) * 100) : 0;

    // Desglose por utm_source (solo entre las que sí tienen atribución exacta)
    const porUtmSourceMap = {};
    rows.forEach((r) => {
      if (r.attribution_confidence !== 'exact') return;
      const key = r.utm_source || '(sin utm_source)';
      if (!porUtmSourceMap[key]) porUtmSourceMap[key] = { utm_source: key, count: 0, valor: 0 };
      porUtmSourceMap[key].count++;
      porUtmSourceMap[key].valor += Number(r.value) || 0;
    });
    const por_utm_source = Object.values(porUtmSourceMap).sort((a, b) => b.count - a.count);

    const reservas = rows.map((r) => ({
      wubook_id_human: r.wubook_id_human,
      value: r.value,
      currency: r.currency,
      confirmed_at: r.confirmed_at,
      attribution_confidence: r.attribution_confidence,
      matched_via: r.matched_via,
      utm_source: r.utm_source,
      utm_campaign: r.utm_campaign,
      tiene_gclid: !!r.gclid,
    }));

    return res.status(200).json({
      total_reservas,
      total_valor,
      currency,
      exact,
      unknown,
      pct_unknown,
      por_utm_source,
      reservas,
      pendientes_revision,
    });
  } catch (err) {
    console.error('Error en dashboard-data:', err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
