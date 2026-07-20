// api/export-conversions.js
//
// Genera un CSV con el formato que pide Google Ads para importar conversiones
// offline por clic (GCLID). Solo incluye reservas de `ad_source_snapshot` con
// attribution_confidence = 'exact' y gclid presente — el resto (unknown, o
// atribuidas solo por UTM sin gclid) no se puede importar por este método.
//
// Uso: GET /api/export-conversions?secret=TU_SYNC_SECRET
// Descarga un archivo .csv listo para subir a mano en Google Ads > Objetivos
// > Conversiones > Subidas.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CONVERSION_NAME = 'Reserva confirmada';
const AR_UTC_OFFSET = '-0300'; // Argentina no tiene horario de verano actualmente

function formatConversionTime(isoDate) {
  const date = new Date(isoDate);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  // Usamos el mediodía como hora de conversión, ya que solo tenemos la fecha
  // (no la hora exacta) de creación de la reserva en Wubook. Esto reduce el
  // riesgo de que la hora quede antes del clic original.
  return `${yyyy}-${mm}-${dd} 12:00:00 ${AR_UTC_OFFSET}`;
}

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.query;
  if (!secret || secret !== process.env.SYNC_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const { data: rows, error } = await supabase
      .from('ad_source_snapshot')
      .select('wubook_id_human, gclid, value, currency, confirmed_at')
      .eq('attribution_confidence', 'exact')
      .not('gclid', 'is', null);

    if (error) throw error;

    const header = ['Google Click ID', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency'];
    const lines = [header.join(',')];

    for (const row of rows) {
      if (!row.confirmed_at) continue; // sin fecha no podemos armar Conversion Time
      lines.push(
        [
          csvEscape(row.gclid),
          csvEscape(CONVERSION_NAME),
          csvEscape(formatConversionTime(row.confirmed_at)),
          csvEscape(row.value ?? ''),
          csvEscape(row.currency || 'ARS'),
        ].join(',')
      );
    }

    const csvContent = lines.join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="conversiones_google_ads.csv"');
    return res.status(200).send(csvContent);
  } catch (err) {
    console.error('Error generando export:', err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
