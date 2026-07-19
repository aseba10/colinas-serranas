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

// Wubook devuelve fechas en formato "dd/mm/yyyy" o "dd/mm/yyyy hh:mm:ss".
// Postgres, sin esta conversión, puede interpretarlas como mm/dd/yyyy y
// fallar (o peor, guardar la fecha equivocada silenciosamente). Convertimos
// siempre a ISO 8601 antes de mandarlas a Supabase.
function parseWubookDate(value) {
  if (!value) return null;

  const match = value.match(
    /^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?$/
  );

  if (!match) {
    // No matchea el formato esperado — devolvemos null en vez de arriesgar
    // un valor mal interpretado.
    console.warn('Fecha de Wubook con formato inesperado:', value);
    return null;
  }

  const [, dd, mm, yyyy, hh = '00', min = '00', ss = '00'] = match;
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}Z`;
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

  return json.data?.reservations || [];
}

async function fetchCustomer(customerId) {
  const body = new URLSearchParams();
  body.set('id', customerId);

  const response = await fetch('https://kapi.wubook.net/kp/customers/fetch_one', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.WUBOOK_API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(`Error de Wubook API (customer): ${JSON.stringify(json.error)}`);
  }

  return json.data;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret, days, debug } = req.query;

  if (!secret || secret !== process.env.SYNC_SECRET) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // Modo diagnóstico 2: trae el objeto crudo de un cliente, para confirmar
  // los nombres de campo reales (phone, email, etc.) antes de guardarlos.
  if (debug === '2') {
    const daysBack2 = parseInt(days, 10) || 30;
    const toDate2 = new Date();
    const fromDate2 = new Date();
    fromDate2.setDate(fromDate2.getDate() - daysBack2);
    const page2 = await fetchReservationsPage(
      formatDateForWubook(fromDate2),
      formatDateForWubook(toDate2),
      0,
      1
    );
    if (!page2[0]) {
      return res.status(200).json({ status: 'debug2', mensaje: 'No hay reservas para probar' });
    }
    const customer = await fetchCustomer(page2[0].booker);
    return res.status(200).json({ status: 'debug2', booking: page2[0].id_human, cliente_crudo: customer });
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

    // Modo diagnóstico: devuelve los datos crudos tal cual los manda Wubook,
    // sin procesar ni guardar nada, para poder ver los nombres de campo reales.
    if (debug === '1') {
      return res.status(200).json({
        status: 'debug',
        total_encontradas: allBookings.length,
        primera_reserva_cruda: allBookings[0] || null,
      });
    }


    let saved = 0;
    let errors = 0;

    for (const booking of allBookings) {
      const row = {
        wubook_id_human: booking.id_human,
        channel: booking.origin?.channel || null,
        status: booking.status || null,
        value: booking.price?.total ?? null,
        currency: booking.currency || null,
        confirmed_at: parseWubookDate(booking.created),
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