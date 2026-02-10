// Centralized favorites storage helpers
// Key in localStorage
const STORAGE_KEY = 'favorites';

function safeParse(json) {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getFavorites() {
  const raw = localStorage.getItem(STORAGE_KEY) || '[]';
  return safeParse(raw).filter(item => item && item._id);
}

function saveFavorites(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  // Notify all listeners that favorites have changed
  window.dispatchEvent(
    new CustomEvent('favorites:changed', {
      detail: { favorites: list },
    })
  );
}

export function isInFavorites(id) {
  if (!id) return false;
  return getFavorites().some(item => item._id === id);
}

export function addFavorite(exercise) {
  if (!exercise || !exercise._id) return getFavorites();

  const current = getFavorites();
  const exists = current.some(item => item._id === exercise._id);
  if (exists) return current;

  const next = [...current, exercise];
  saveFavorites(next);
  return next;
}

export function removeFavorite(id) {
  if (!id) return getFavorites();

  const current = getFavorites();
  const next = current.filter(item => item._id !== id);
  saveFavorites(next);
  return next;
}

export function toggleFavorite(exercise) {
  if (!exercise || !exercise._id) return { favorites: getFavorites(), isFavorite: false };

  const current = getFavorites();
  const exists = current.some(item => item._id === exercise._id);

  const next = exists
    ? current.filter(item => item._id !== exercise._id)
    : [...current, exercise];

  saveFavorites(next);

  return {
    favorites: next,
    isFavorite: !exists,
  };
}

