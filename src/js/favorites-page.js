import { getFavorites, removeFavorite } from './favorites.js';

const listEl = document.querySelector('.favorites__list.js-list');
const paginationEl = document.querySelector('.js-favorites-pagination');
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
const MOBILE_PAGE_LIMIT = 8;
const DEFAULT_PAGE_LIMIT = 10;

let currentPage = 1;
let favoritesList = [];
let isMobileViewport = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
let resizeTimerId = null;

if (listEl) {
  favoritesList = getFavorites();
  renderFavoritesList(favoritesList);

  window.addEventListener('favorites:changed', event => {
    const favorites = event.detail?.favorites || [];
    favoritesList = Array.isArray(favorites) ? favorites : [];
    const totalPages = getTotalPages(favoritesList.length);
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    renderFavoritesList(favorites);
  });

  listEl.addEventListener('click', event => {
    const deleteBtn = event.target.closest('.fav-card__delete');
    if (!deleteBtn) return;

    event.preventDefault();
    event.stopPropagation();

    const card = deleteBtn.closest('.exercise-card-item[data-id]');
    const exerciseId = card?.dataset?.id;
    if (!exerciseId) return;

    removeFavorite(exerciseId);
  });

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimerId);
    resizeTimerId = window.setTimeout(() => {
      const nextIsMobile = window.matchMedia(MOBILE_MEDIA_QUERY).matches;
      if (nextIsMobile === isMobileViewport) return;

      isMobileViewport = nextIsMobile;
      const totalPages = getTotalPages(favoritesList.length);
      if (currentPage > totalPages) {
        currentPage = totalPages;
      }
      renderFavoritesList(favoritesList);
    }, 150);
  });
}

if (paginationEl) {
  paginationEl.addEventListener('click', event => {
    const button = event.target.closest('button[data-direction]');
    if (!button) return;

    const totalPages = getTotalPages(favoritesList.length);
    const direction = button.dataset.direction;

    if (direction === 'prev' && currentPage > 1) {
      currentPage -= 1;
      renderFavoritesList(favoritesList);
      return;
    }

    if (direction === 'next' && currentPage < totalPages) {
      currentPage += 1;
      renderFavoritesList(favoritesList);
    }
  });
}

function renderFavoritesList(favorites) {
  if (!listEl) return;

  const normalizedFavorites = Array.isArray(favorites) ? favorites : [];
  favoritesList = normalizedFavorites;

  if (!normalizedFavorites.length) {
    currentPage = 1;
    listEl.innerHTML = `
      <li class="favorites__empty">
        It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
      </li>
    `;
    renderFavoritesPagination(0);
    return;
  }

  const totalPages = getTotalPages(normalizedFavorites.length);
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const pageStart = (currentPage - 1) * getPageLimit();
  const pageItems = normalizedFavorites.slice(pageStart, pageStart + getPageLimit());

  listEl.innerHTML = pageItems
    .map(ex => {
      const burned = ex.burnedCalories ?? '--';
      const time = ex.time ?? '--';
      const bodyPart = ex.bodyPart || '';
      const target = ex.target || '';

      return `
        <li class="fav-filters__item-card exercise-card-item" data-id="${ex._id}">
          <div class="card__wrap">
            <div class="card__block-btn">
              <div class="fav-card__meta">
                <span class="card__badge">WORKOUT</span>
                <button class="fav-card__delete" type="button" aria-label="Remove from favorites" title="Remove from favorites">
                  <img class="fav-card__delete-icon" src="./img/svg/trash-icon.svg" alt="" aria-hidden="true" />
                </button>
              </div>

              <button class="card__btn" type="button" data-id="${ex._id}">
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
              ${bodyPart ? `<p class="card__text-info"><span>Body part:</span>${bodyPart}</p>` : ''}
              ${target ? `<p class="card__text-info"><span>Target:</span>${target}</p>` : ''}
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  renderFavoritesPagination(normalizedFavorites.length);
}

function getPageLimit() {
  return isMobileViewport ? MOBILE_PAGE_LIMIT : DEFAULT_PAGE_LIMIT;
}

function getTotalPages(totalItems) {
  if (!totalItems) return 1;
  return Math.max(1, Math.ceil(totalItems / getPageLimit()));
}

function renderFavoritesPagination(totalItems) {
  if (!paginationEl) return;

  const totalPages = getTotalPages(totalItems);

  if (totalItems <= getPageLimit()) {
    paginationEl.innerHTML = '';
    paginationEl.classList.add('hidden');
    return;
  }

  paginationEl.classList.remove('hidden');
  paginationEl.innerHTML = `
    <button type="button" data-direction="prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous favorites page">&lt;</button>
    <span>${currentPage} / ${totalPages}</span>
    <button type="button" data-direction="next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next favorites page">&gt;</button>
  `;
}
