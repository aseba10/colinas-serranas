// src/lib/attribution.js
//
// Captura los parámetros de campaña (gclid, gbraid, wbraid, fbclid, UTMs) apenas
// el usuario entra al sitio, los guarda en sessionStorage para poder usarlos
// al armar el link hacia Wubook, y además los envía al backend propio
// (/api/track) asociados a un visitor_id persistente (cookie de 90 días),
// para tener un registro propio de la sesión más allá de GA4.

const STORAGE_KEY = 'attribution_params';
const VISITOR_COOKIE_NAME = 'cs_visitor_id';
const VISITOR_COOKIE_DAYS = 90;

const TRACKED_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

// ---------------------------------------------------------------------------
// Utilidades de cookies (first-party, no depende de ninguna librería)
// ---------------------------------------------------------------------------

function setCookie(name, value, days) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback simple para navegadores viejos sin crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Devuelve el visitor_id persistente de este navegador, creándolo si no existe.
 * Se guarda en cookie de primera parte con vencimiento de 90 días.
 */
export function getOrCreateVisitorId() {
  let visitorId = getCookie(VISITOR_COOKIE_NAME);
  if (!visitorId) {
    visitorId = generateUUID();
  }
  // Renovamos el vencimiento en cada visita (exista o no), para que los 90
  // días sean "desde la última vez que vino", no "desde la primera vez".
  setCookie(VISITOR_COOKIE_NAME, visitorId, VISITOR_COOKIE_DAYS);
  return visitorId;
}

/**
 * Intenta leer el client_id de GA4 directamente de la cookie _ga que
 * escribe GA4 (formato: GA1.1.XXXXXXXXXX.YYYYYYYYYY). No depende de que
 * window.gtag esté disponible ni de timing de carga de GTM.
 */
function getGaClientId() {
  const raw = getCookie('_ga');
  if (!raw) return null;
  const parts = raw.split('.');
  if (parts.length < 4) return null;
  return `${parts[2]}.${parts[3]}`;
}

// ---------------------------------------------------------------------------
// Captura y persistencia de parámetros de campaña (sessionStorage)
// ---------------------------------------------------------------------------

export function captureAttributionParams() {
  const params = new URLSearchParams(window.location.search);
  const found = {};

  TRACKED_PARAMS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      found[key] = value;
    }
  });

  if (Object.keys(found).length === 0) {
    return;
  }

  try {
    const existing = getAttributionParams();
    const merged = { ...existing, ...found, captured_at: new Date().toISOString() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (err) {
    console.warn('No se pudo guardar la atribución de campaña:', err);
  }
}

export function getAttributionParams() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

export function appendAttributionParams(baseUrl) {
  const stored = getAttributionParams();
  const trackedOnly = { ...stored };
  delete trackedOnly.captured_at;

  if (Object.keys(trackedOnly).length === 0) {
    return baseUrl;
  }

  const url = new URL(baseUrl);
  Object.entries(trackedOnly).forEach(([key, value]) => {
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

// ---------------------------------------------------------------------------
// Código de referencia de WhatsApp (una sola vez por sesión, no por cada
// montaje de un botón — se cachea en sessionStorage para sobrevivir la
// navegación entre páginas del sitio)
// ---------------------------------------------------------------------------

const WHATSAPP_REFCODE_KEY = 'whatsapp_ref_code';

// Si dos botones se montan casi al mismo tiempo (ej: el flotante y el fijo,
// juntos en la misma página), ambos pueden revisar sessionStorage antes de
// que el primero termine de guardar su resultado — por eso no alcanza con
// cachear en sessionStorage solamente. Esta promesa compartida asegura que,
// mientras haya un pedido en curso, cualquier llamada que llegue mientras
// tanto espere ese mismo resultado en vez de disparar un pedido propio.
let inFlightRequest = null;

/**
 * Obtiene (o crea) el ref_code de WhatsApp para esta sesión.
 *
 * meta (opcional): datos para que el backend envíe el evento "Contact" a
 * Meta CAPI del lado servidor, deduplicado con el pixel del browser.
 *   - event_id: mismo id que se usa en fbq('track', 'Contact', {}, {eventID})
 *   - fbc / fbp: cookies _fbc / _fbp del navegador
 *   - event_source_url: window.location.href
 *
 * Nota: como la promesa está compartida entre botones (inFlightRequest),
 * si dos botones se clickean casi a la vez el meta del segundo llamado se
 * ignora silenciosamente (se sirve el resultado del primero, ya en vuelo).
 * En la práctica un usuario clickea un solo botón por vez, así que no es
 * un problema real — pero vale saberlo.
 */
export async function getOrCreateWhatsAppRefCode(meta = {}) {
  try {
    const cached = sessionStorage.getItem(WHATSAPP_REFCODE_KEY);
    if (cached) return cached;
  } catch (err) {
    // seguimos igual, en el peor caso pedimos uno nuevo
  }

  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    const visitorId = getOrCreateVisitorId();

    try {
      const response = await fetch('/api/whatsapp-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id: visitorId,
          event_id: meta.event_id || null,
          fbc: meta.fbc || null,
          fbp: meta.fbp || null,
          event_source_url: meta.event_source_url || null,
        }),
      });
      const data = await response.json();

      if (data && data.ref_code) {
        try {
          sessionStorage.setItem(WHATSAPP_REFCODE_KEY, data.ref_code);
        } catch (err) {
          // si sessionStorage falla, el código igual se devuelve para este
          // uso, simplemente no va a poder cachearse para la próxima vez
        }
        return data.ref_code;
      }
    } catch (err) {
      console.warn('No se pudo generar el ref_code de WhatsApp:', err);
    }

    return null;
  })();

  const result = await inFlightRequest;
  inFlightRequest = null;
  return result;
}

// ---------------------------------------------------------------------------
// Envío al backend propio (/api/track)
// ---------------------------------------------------------------------------

function sendTrackingPing(visitorId) {
  const stored = getAttributionParams();

  const payload = {
    visitor_id: visitorId,
    ga_client_id: getGaClientId(),
    gclid: stored.gclid || null,
    gbraid: stored.gbraid || null,
    wbraid: stored.wbraid || null,
    fbclid: stored.fbclid || null,
    utm_source: stored.utm_source || null,
    utm_medium: stored.utm_medium || null,
    utm_campaign: stored.utm_campaign || null,
    utm_content: stored.utm_content || null,
    utm_term: stored.utm_term || null,
    landing_page: window.location.pathname,
    referrer: document.referrer || null,
  };

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((err) => {
    // No bloqueamos ni molestamos al usuario si esto falla — es tracking
    // en segundo plano, no una funcionalidad crítica del sitio.
    console.warn('No se pudo enviar el tracking de sesión:', err);
  });
}

/**
 * Punto de entrada único: captura los parámetros de campaña, obtiene/crea el
 * visitor_id, y envía el ping al backend. Se llama una vez al cargar la app
 * (en main.jsx). Además, reintenta una vez más a los 1.5s por si la cookie
 * _ga de GA4 todavía no se había escrito en el primer intento.
 */
export function initAttribution() {
  captureAttributionParams();
  const visitorId = getOrCreateVisitorId();
  sendTrackingPing(visitorId);

  setTimeout(() => {
    sendTrackingPing(visitorId);
  }, 1500);

  return visitorId;
}