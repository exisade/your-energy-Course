// exercises.js
import { getFilters, getExercises } from './api.js';
import { updatePaginationData } from './pagination.js';
import spriteUrl from '../img/sprite.svg';
import workoutIconUrl from '../img/svg/workout.svg';
import starIconUrl from '../img/svg/star.svg';

const cardsContainer = document.querySelector('.filters__list.js-list');
const searchWrapper = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const exercisesTitleEl = document.querySelector('.exersices__title');

const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
const MOBILE_PAGE_LIMIT = 9;
const DEFAULT_PAGE_LIMIT = 12;

let currentPage = 1;
let currentFilter = 'Muscles';
let currentKeyword = '';
let selectedCategory = null;
let mode = 'categories';
let isMobileViewport = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
let resizeTimerId = null;

// ===== UI =====
function showSearch() {
  if (!searchWrapper) return;

  searchWrapper.classList.remove('hidden');
  searchWrapper.setAttribute('aria-hidden', 'false');
  if (searchInput) searchInput.disabled = false;
  if (searchButton) searchButton.disabled = false;
}

function hideSearch() {
  if (!searchWrapper) return;

  searchWrapper.classList.add('hidden');
  searchWrapper.setAttribute('aria-hidden', 'true');
  if (searchInput) {
    searchInput.value = '';
    searchInput.disabled = true;
  }
  if (searchButton) searchButton.disabled = true;
  currentKeyword = '';
}

function updateExercisesTitle() {
  if (!exercisesTitleEl) return;

  if (mode === 'exercises' && selectedCategory) {
    exercisesTitleEl.innerHTML = `
      <button type="button" class="exercises-title__base exercises-title__base--link">
        Exercises
      </button>
      <span class="exercises-title__slash">/</span>
      <span class="exercises-title__current">${selectedCategory}</span>
    `;
    return;
  }

  exercisesTitleEl.textContent = 'Exercises';
}

function getPageLimit() {
  return isMobileViewport ? MOBILE_PAGE_LIMIT : DEFAULT_PAGE_LIMIT;
}

function renderStateMessage(message) {
  if (!cardsContainer) return;

  cardsContainer.innerHTML = `
    <li class="filters__state">${message}</li>
  `;
}

// ===== MAIN =====
export async function renderExercises() {
  if (!cardsContainer) return;

  updateExercisesTitle();

  if (mode === 'categories') {
    await renderCategories();
  } else {
    await renderExercisesList();
  }
}

// ===== CATEGORIES =====
async function renderCategories() {
  hideSearch();
  updateExercisesTitle();
  if (cardsContainer) {
    cardsContainer.classList.remove('filters__list--exercises');
  }

  try {
    const data = await getFilters({
      filter: currentFilter,
      page: currentPage,
      limit: getPageLimit(),
    });
    const results = data.results || [];

    if (!results.length) {
      renderStateMessage('No categories found for this filter.');
      updatePaginationData(1, 1);
      return;
    }

    cardsContainer.innerHTML = results
      .map(
        cat => `
        <li class="filters__item" data-category="${cat.name}">
          <img class="filters__img-first" src="${cat.imgURL}" alt="${cat.name}" />
          <div class="filters__wrapper-first">
            <h3 class="filters__title-first">${cat.name}</h3>
            <p class="filters__text-first">${cat.filter}</p>
          </div>
        </li>
      `
      )
      .join('');

    updatePaginationData(currentPage, data.totalPages || 1);
  } catch (e) {
    console.error(e);
    renderStateMessage('Unable to load categories. Please try again.');
  }
}

// ===== EXERCISES =====
async function renderExercisesList() {
  if (!selectedCategory) return;

  showSearch();
  updateExercisesTitle();
  if (cardsContainer) {
    cardsContainer.classList.add('filters__list--exercises');
  }

  try {
    const params = {
      page: currentPage,
      limit: getPageLimit(),
    };

    const filterParam = getParamName();
    params[filterParam] = selectedCategory;

    if (currentKeyword && currentKeyword.length >= 2) {
      params.keyword = currentKeyword;
    }

    const data = await getExercises(params);
    const results = data.results || [];

    if (!results.length) {
      renderStateMessage('No exercises found for this request.');
      updatePaginationData(1, 1);
      return;
    }

    cardsContainer.innerHTML = results
      .map(ex => createExerciseCardMarkup(ex))
      .join('');

    updatePaginationData(currentPage, data.totalPages || 1);
  } catch (e) {
    console.error(e);
    renderStateMessage('Unable to load exercises. Please try again.');
  }
}

function createExerciseCardMarkup(ex) {
  const rating = (ex.rating || 0).toFixed(2);
  const burned = ex.burnedCalories ?? '--';
  const time = ex.time ?? '--';
  const bodyPart = ex.bodyPart || '';
  const target = ex.target || '';

  return `
    <li class="filters__item-card exercise-card-item" data-id="${ex._id}">
      <div class="card__wrap">
        <div class="card__block-btn">
          <span class="card__badge">WORKOUT</span>
          <span class="card__rating">
            ${rating}
            <img class="card__rating-star" src="${starIconUrl}" alt="" aria-hidden="true" />
          </span>
          <button class="card__btn" type="button" data-id="${ex._id}">
            Start
            <svg class="card__btn-arrow" width="16" height="16">
              <use href="${spriteUrl}#icon-arrow"></use>
            </svg>
          </button>
        </div>

        <div class="card__wrap-title">
          <div class="card__title-svg">
            <img src="${workoutIconUrl}" alt="" aria-hidden="true" />
          </div>
          <h3 class="card__title">${ex.name}</h3>
        </div>

              <div class="card__block-info">
                <p class="card__text-info">
                  <span>Burned calories:</span>${burned} / ${time} min
                </p>
                ${
                  bodyPart
                    ? `<p class="card__text-info"><span>Body part:</span>${bodyPart}</p>`
                    : ''
                }
                ${
                  target
                    ? `<p class="card__text-info"><span>Target:</span>${target}</p>`
                    : ''
                }
              </div>
      </div>
    </li>
  `;
}

// ===== HELPERS =====
function getParamName() {
  if (currentFilter === 'Muscles') return 'muscles';
  if (currentFilter === 'Body parts') return 'bodypart';
  if (currentFilter === 'Equipment') return 'equipment';
  return 'muscles';
}

// ===== EVENTS =====
document.addEventListener('click', e => {
  if (e.target.classList.contains('exercises-title__base--link')) {
    selectedCategory = null;
    currentKeyword = '';
    currentPage = 1;
    mode = 'categories';
    renderExercises();
    return;
  }

  const card = e.target.closest('.filters__item[data-category]');
  if (!card || !card.dataset.category || mode !== 'categories') return;

  selectedCategory = card.dataset.category;
  currentPage = 1;
  currentKeyword = '';
  mode = 'exercises';
  renderExercises();
});

// ===== EXPORTS =====
export function updateFilter(filter) {
  currentFilter = filter;
  selectedCategory = null;
  currentKeyword = '';
  currentPage = 1;
  mode = 'categories';
  renderExercises();
}

export function updateKeyword(keyword) {
  if (!selectedCategory || mode !== 'exercises') return;

  const normalizedKeyword = keyword.trim().toLowerCase();
  if (normalizedKeyword === currentKeyword) return;

  currentKeyword = normalizedKeyword;
  currentPage = 1;
  mode = 'exercises';
  renderExercises();
}

export function updatePage(page) {
  if (!Number.isFinite(page) || page < 1) return;

  currentPage = page;
  renderExercises();
}

function handleViewportResize() {
  const nextIsMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  if (nextIsMobile === isMobileViewport) return;

  isMobileViewport = nextIsMobile;
  currentPage = 1;
  renderExercises();
}

if (cardsContainer) {
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimerId);
    resizeTimerId = window.setTimeout(handleViewportResize, 150);
  });
}
