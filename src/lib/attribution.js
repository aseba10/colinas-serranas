// src/lib/attribution.js
//
// Captura los parámetros de campaña (gclid, gbraid, wbraid, fbclid, UTMs) apenas
// el usuario entra al sitio, y los guarda en sessionStorage para poder usarlos
// más tarde (por ejemplo, al armar el link hacia el motor de reservas de Wubook),
// aunque el usuario ya haya navegado a otra página interna sin esos parámetros
// en la URL.

const STORAGE_KEY = 'attribution_params';

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

/**
 * Lee los parámetros de campaña de la URL actual y los guarda en sessionStorage.
 * Se debe llamar una sola vez, apenas carga la app (en main.jsx).
 *
 * Si la URL actual no trae ningún parámetro de campaña, no se pisa lo que ya
 * había guardado — así se conserva el "primer contacto" de la sesión aunque
 * el usuario navegue después a páginas sin esos parámetros.
 */
export function captureAttributionParams() {
  const params = new URLSearchParams(window.location.search);
  const found = {};

  TRACKED_PARAMS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      found[key] = value;
    }
  });

  // Si esta carga de página no trae ningún parámetro de campaña, no tocamos
  // lo que ya estaba guardado.
  if (Object.keys(found).length === 0) {
    return;
  }

  try {
    const existing = getAttributionParams();
    const merged = { ...existing, ...found, captured_at: new Date().toISOString() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (err) {
    // sessionStorage puede fallar en modo privado/incógnito en algunos navegadores.
    // No es crítico: simplemente no persistimos la atribución en ese caso.
    console.warn('No se pudo guardar la atribución de campaña:', err);
  }
}

/**
 * Devuelve los parámetros de campaña guardados en esta sesión, o un objeto
 * vacío si no hay ninguno.
 */
export function getAttributionParams() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

/**
 * Toma una URL base (por ejemplo, el link al motor de reservas de Wubook) y le
 * agrega como query params los valores de atribución guardados en la sesión,
 * sin pisar los parámetros que ya tenga la URL base.
 */
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
