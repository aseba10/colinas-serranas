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
