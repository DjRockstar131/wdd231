// storage.js
const FAV_KEY = "ab_favorites";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveFavorites(arr) {
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
}

export function toggleFavorite(id) {
  const current = new Set(getFavorites());
  if (current.has(id)) {
    current.delete(id);
  } else {
    current.add(id);
  }
  const out = [...current];
  saveFavorites(out);
  return out;
}
