// exercises.js
import { getFilters, getExercises } from './api.js';
import { updatePaginationData } from './pagination.js';

const cardsContainer = document.querySelector('.filters__list.js-list');
const searchWrapper = document.querySelector('.search__form');
const exercisesTitleEl = document.querySelector('.exersices__title');

let currentPage = 1;
let currentFilter = 'Muscles';
let currentKeyword = '';
let selectedCategory = null;
let mode = 'categories';

// ===== UI =====
function showSearch() {
  if (searchWrapper) searchWrapper.style.display = 'block';
}

function hideSearch() {
  if (searchWrapper) searchWrapper.style.display = 'none';
  const input = document.querySelector('.search__input');
  if (input) input.value = '';
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
    const data = await getFilters(currentFilter);
    const results = data.results || [];

    if (!results.length) {
      cardsContainer.innerHTML = '';
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

    updatePaginationData(1, data.totalPages || 1);
  } catch (e) {
    console.error(e);
    cardsContainer.innerHTML = '';
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
      limit: 10,
    };

    const filterParam = getParamName();
    params[filterParam] = selectedCategory;

    if (currentKeyword && currentKeyword.length >= 2) {
      params.keyword = currentKeyword;
    }

    const data = await getExercises(params);
    const results = data.results || [];

    if (!results.length) {
      cardsContainer.innerHTML = '';
      updatePaginationData(1, 1);
      return;
    }

    cardsContainer.innerHTML = results
      .map(ex => createExerciseCardMarkup(ex))
      .join('');

    updatePaginationData(currentPage, data.totalPages || 1);
  } catch (e) {
    console.error(e);
    cardsContainer.innerHTML = '';
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
            <svg class="card__rating-star" width="18" height="18">
              <use href="./img/sprite.svg#icon-star-rating"></use>
            </svg>
          </span>
          <button class="card__btn" data-id="${ex._id}">
            Start
            <svg class="card__btn-arrow" width="16" height="16">
              <use href="./img/sprite.svg#icon-arrow"></use>
            </svg>
          </button>
        </div>

        <div class="card__wrap-title">
          <div class="card__title-svg">
            <svg width="20" height="20">
              <use href="./img/sprite.svg#icon-food-24-filled"></use>
            </svg>
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

  const card = e.target.closest('.filters__item');
  if (!card || !card.dataset.category) return;

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
  if (!selectedCategory) return;

  currentKeyword = keyword.trim().toLowerCase();
  currentPage = 1;
  mode = 'exercises';
  renderExercises();
}

export function updatePage(page) {
  currentPage = page;
  renderExercises();
}
