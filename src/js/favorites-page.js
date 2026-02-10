import { getFavorites } from './favorites.js';

const listEl = document.querySelector('.favorites__list.js-list');

if (listEl) {
  // Инициализация рендера при загрузке страницы
  renderFavoritesList(getFavorites());

  // Актуализация при изменении избранного из модалки / других частей приложения
  window.addEventListener('favorites:changed', event => {
    const favorites = event.detail?.favorites || [];
    renderFavoritesList(favorites);
  });
}

function renderFavoritesList(favorites) {
  if (!listEl) return;

  if (!favorites.length) {
    listEl.innerHTML = `
      <li class="favorites__empty">
        It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
      </li>
    `;
    return;
  }

  listEl.innerHTML = favorites
    .map(
      ex => {
        const rating = (ex.rating || 0).toFixed(1);
        const burned = ex.burnedCalories ?? '--';
        const time = ex.time ?? '--';
        const bodyPart = ex.bodyPart || '';
        const target = ex.target || '';

        return `
          <li class="fav-filters__item-card exercise-card-item" data-id="${ex._id}">
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
                  <span>Burned calories:</span>
                  ${burned} / ${time} min
                </p>
                ${
                  bodyPart
                    ? `<p class="card__text-info"><span>Body part:</span> ${bodyPart}</p>`
                    : ''
                }
                ${
                  target
                    ? `<p class="card__text-info"><span>Target:</span> ${target}</p>`
                    : ''
                }
              </div>
            </div>
          </li>
        `;
      }
    )
    .join('');
}

