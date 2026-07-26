// api/send-meta-conversions.js
//
// Envía eventos "Purchase" a Meta Conversions API para las reservas
// confirmadas que tengan teléfono. Meta hace su propio matching del lado de
// ellos usando el teléfono hasheado (señal fuerte, ya que viene directo de
// la conversación de WhatsApp) y, si lo tenemos, el fbclid capturado vía
// nuestra reconciliación por ref_code.
//
// Uso: GET /api/send-meta-conversions?secret=TU_SYNC_SECRET

import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const META_DATASET_ID = '25972841082385250';
const META_API_VERSION = 'v21.0';

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

// Meta espera el teléfono en formato E.164 (con código de país), sin '+',
// espacios, guiones ni ceros a la izquierda, antes de hashear.
//
// Wubook guarda los teléfonos con formatos inconsistentes: a veces con "+54"
// adelante, a veces sin nada (solo el número local). Esta función intenta
// normalizar los casos más comunes de Argentina:
//   - 10 dígitos sin código de país (ej "1133333333")           -> se asume
//     celular y se le agrega "549" adelante (formato E.164 celular AR).
//   - Ya empieza con "54" y tiene 12 dígitos (falta el "9" del celular)
//     -> se le inserta el "9" después del "54" (mejor esfuerzo: asumimos
//     celular, que es lo más probable en reservas hechas por WhatsApp).
//   - Ya viene completo (13 dígitos empezando con "549") -> se deja igual.
// No es 100% infalible (no hay forma de saber con certeza si un número es
// fijo o celular solo mirando los dígitos), pero cubre la gran mayoría de
// los casos reales que vimos en los datos.
function normalizePhone(raw) {
  if (!raw) return null;
  const digitsOnly = raw.replace(/\D/g, '');
  if (!digitsOnly) return null;

  if (digitsOnly.length === 10) {
    return `549${digitsOnly}`;
  }

  if (digitsOnly.startsWith('54') && digitsOnly.length === 12) {
    return `549${digitsOnly.slice(2)}`;
  }

  return digitsOnly;
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
    // Traemos las reservas con teléfono
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('wubook_id_human, phone, email, value, currency, confirmed_at, status')
      .not('phone', 'is', null)
      .in('status', ['Confirmed', 'Option']);

    if (bookingsError) throw bookingsError;

    // Traemos fbclid conocido (si nuestra reconciliación lo encontró) para
    // sumarlo como señal extra cuando esté disponible
    const { data: snapshots } = await supabase
      .from('ad_source_snapshot')
      .select('wubook_id_human, fbclid');

    const fbclidByBooking = {};
    (snapshots || []).forEach((s) => {
      if (s.fbclid) fbclidByBooking[s.wubook_id_human] = s.fbclid;
    });

    let sent = 0;
    let skipped = 0;
    let tooOld = 0;
    let errors = 0;

    for (const booking of bookings) {
      const normalizedPhone = normalizePhone(booking.phone);
      if (!normalizedPhone) {
        skipped++;
        continue;
      }

      const eventTime = booking.confirmed_at
        ? Math.floor(new Date(booking.confirmed_at).getTime() / 1000)
        : Math.floor(Date.now() / 1000);

      const userData = {
        ph: [sha256(normalizedPhone)],
      };

      if (booking.email) {
        userData.em = [sha256(booking.email.trim().toLowerCase())];
      }

      const fbclid = fbclidByBooking[booking.wubook_id_human];
      if (fbclid) {
        // Meta espera el fbc en un formato específico, no el fbclid crudo.
        // Formato: fb.1.<timestamp>.<fbclid>
        userData.fbc = `fb.1.${eventTime}.${fbclid}`;
      }

      const eventPayload = {
        data: [
          {
            event_name: 'Purchase',
            event_time: eventTime,
            event_id: booking.wubook_id_human, // para deduplicar si se corre 2 veces
            action_source: 'system_generated',
            user_data: userData,
            custom_data: {
              value: booking.value,
              currency: (booking.currency || 'ARS').toUpperCase(),
              order_id: booking.wubook_id_human,
            },
          },
        ],
      };

      try {
        const response = await fetch(
          `https://graph.facebook.com/${META_API_VERSION}/${META_DATASET_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventPayload),
          }
        );

        const json = await response.json();

        if (!response.ok || json.error) {
          if (json.error?.error_subcode === 2804003) {
            // "Event Timestamp Too Old" — Meta exige que el evento se mande
            // dentro de los 7 días de haber ocurrido. No es un error nuestro,
            // es una limitación real de la API: hay que correr este envío
            // seguido para no perder esa ventana.
            tooOld++;
          } else {
            console.error('Error de Meta para', booking.wubook_id_human, json.error || json);
            errors++;
          }
        } else {
          console.log(
            `[send-meta-conversions] ${booking.wubook_id_human} respuesta de Meta:`,
            JSON.stringify(json)
          );
          sent++;
        }
      } catch (err) {
        console.error('Error de red enviando a Meta:', booking.wubook_id_human, err);
        errors++;
      }
    }

    return res.status(200).json({
      status: 'ok',
      total_con_telefono: bookings.length,
      enviados: sent,
      omitidos_sin_telefono: skipped,
      omitidos_por_antiguedad: tooOld,
      errores: errors,
    });
  } catch (err) {
    console.error('Error en send-meta-conversions:', err);
    return res.status(500).json({ error: err.message || 'Error interno' });
  }
}