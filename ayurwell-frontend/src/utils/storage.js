// Simple wrapper around localStorage for persistent demo data.
const PREFIX = 'ayurwell_';

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore quota / serialization errors in the demo
  }
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key);
}
