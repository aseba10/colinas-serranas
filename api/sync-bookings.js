// api/sync-bookings.js
//
// Trae las reservas de Wubook (Zak API) creadas en los últimos N días y las
// guarda (o actualiza) en la tabla `bookings` de Supabase. Se dispara a mano
// por ahora (GET con la clave secreta); más adelante se puede automatizar
// con un cron job.
//
// Uso: GET /api/sync-bookings?days=30&secret=TU_SYNC_SECRET

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const WUBOOK_API_URL = 'https://kapi.wubook.net/kp/reservations/fetch_reservations';

function formatDateForWubook(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function fetchReservationsPage(fromDate, toDate, offset, limit) {
  const filters = JSON.stringify({
    created: { from: fromDate, to: toDate },
    pager: { limit, offset },
  });

  const body = new URLSearchParams();
  body.set('filters', filters);

  const response = await fetch(WUBOOK_API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': process.env.WUBOOK_API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(`Error de Wubook API: ${JSON.stringify(json.error)}`);
  }

  return json.data?.bookings || json.data || [];
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret, days } = req.query;

  if (!secret || secret !== process.env.SYNC_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const daysBack = parseInt(days, 10) || 30;

  try {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysBack);

    const fromStr = formatDateForWubook(fromDate);
    const toStr = formatDateForWubook(toDate);

    const limit = 100;
    let offset = 0;
    let allBookings = [];
    let page;

    do {
      page = await fetchReservationsPage(fromStr, toStr, offset, limit);
      allBookings = allBookings.concat(page);
      offset += limit;
    } while (page.length === limit);

    let saved = 0;
    let errors = 0;

    for (const booking of allBookings) {
      const row = {
        wubook_id_human: booking.id_human,
        channel: booking.origin?.channel || null,
        status: booking.status || null,
        value: booking.price?.total ?? null,
        currency: booking.currency || null,
        confirmed_at: booking.created || null,
      };

      const { error } = await supabase
        .from('bookings')
        .upsert(row, { onConflict: 'wubook_id_human' });

      if (error) {
        console.error('Error guardando booking', booking.id_human, error);
        errors++;
      } else {
        saved++;
      }
    }

    return res.status(200).json({
      status: 'ok',
      total_encontradas: allBookings.length,
      guardadas: saved,
      errores: errors,
      rango: { desde: fromStr, hasta: toStr },
    });
  } catch (err) {
    console.error('Error en sync-bookings:', err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}
