import { updateKeyword } from './exercises.js';

const searchInput = document.querySelector('.search');
const searchForm = document.querySelector('.search__form');
const searchButton = document.querySelector('.search__button');

function debounce(fn, delay = 300) {
  let timerId;

  return (...args) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => fn(...args), delay);
  };
}

export function initSearch() {
  if (!searchInput) return;

  const runSearch = rawValue => {
    const value = rawValue.trim().toLowerCase();

    if (!value || value.length < 2) {
      updateKeyword('');
      return;
    }

    updateKeyword(value);
  };

  if (searchForm) {
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      runSearch(searchInput.value);
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      runSearch(searchInput.value);
    });
  }

  const handler = debounce(event => {
    runSearch(event.target.value);
  });

  searchInput.addEventListener('input', handler);
}
