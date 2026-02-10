import { getFilters } from './api.js';

const filtersContainer = document.querySelector('.exersices__list');
let activeFilter = 'Muscles';
let onFilterChangeCallback = null;

export function initFilters(callback) {
  if (!filtersContainer) return;

  onFilterChangeCallback = callback;

  filtersContainer.addEventListener('click', e => {
    const btn = e.target.closest('.btnFilters');
    if (!btn) return;

    filtersContainer
      .querySelectorAll('.btnFilters')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    activeFilter = btn.textContent.trim();

    if (onFilterChangeCallback) {
      onFilterChangeCallback(activeFilter);
    }
  });
}

export function getActiveFilter() {
  return activeFilter;
}