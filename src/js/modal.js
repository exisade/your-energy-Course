import { getExerciseById, rateExercise } from './api.js';
import { isInFavorites, toggleFavorite } from './favorites.js';

let modalContainer = null;
let currentExercise = null;
let toastContainer = null;

function getFavoriteIconEntity(isFavorite) {
  return isFavorite ? '&#9829;' : '&#9825;';
}

export function initModal() {
  modalContainer = document.createElement('div');
  modalContainer.className = 'modal-overlay';
  modalContainer.style.display = 'none';
  document.body.appendChild(modalContainer);

  document.addEventListener('click', async event => {
    const startBtn = event.target.closest('.card__btn[data-id]');
    if (startBtn) {
      await openExerciseModal(startBtn.dataset.id);
      return;
    }

    const exerciseCard = event.target.closest('.exercise-card-item[data-id]');
    if (exerciseCard) {
      await openExerciseModal(exerciseCard.dataset.id);
    }
  });

  modalContainer.addEventListener('click', event => {
    if (event.target === modalContainer || event.target.closest('.modal__close')) {
      closeModal();
      return;
    }

    if (event.target.closest('.modal__give-rating')) {
      openRatingModal();
      return;
    }

    const favoriteBtn = event.target.closest('.modal__add-favorite');
    if (favoriteBtn && currentExercise) {
      const { isFavorite } = toggleFavorite(currentExercise);
      favoriteBtn.dataset.action = isFavorite ? 'remove' : 'add';
      favoriteBtn.innerHTML = `
        ${isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        <span class="modal__fav-icon" aria-hidden="true">${getFavoriteIconEntity(isFavorite)}</span>
      `;
    }
  });

  modalContainer.addEventListener('submit', async event => {
    if (!event.target.classList.contains('rating-form')) return;
    event.preventDefault();
    await handleRatingSubmit(event.target);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalContainer.style.display === 'flex') {
      closeModal();
    }
  });

  toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
}

async function openExerciseModal(id) {
  if (!id) return;

  try {
    const exercise = await getExerciseById(id);
    currentExercise = exercise;
    const isFavorite = isInFavorites(exercise?._id);
    const ratingValue = Number(exercise?.rating || 0).toFixed(1);

    modalContainer.innerHTML = `
      <div class="modal">
        <button type="button" class="modal__close" aria-label="Close modal">&times;</button>
        
        <div class="modal__content">
          <div class="modal__image">
            ${
              exercise.gifUrl
                ? `<img src="${exercise.gifUrl}" alt="${exercise.name}" loading="lazy" />`
                : ''
            }
          </div>
          
          <div class="modal__info">
            <h2 class="modal__title">${exercise.name}</h2>
            
            <div class="modal__rating-display">
              <span class="modal__rating-value">${ratingValue}</span>
              <div class="modal__stars" role="img" aria-label="Rating ${ratingValue} out of 5">
                ${renderStars(exercise.rating)}
              </div>
            </div>

            <div class="modal__divider"></div>

            <div class="modal__facts-grid">
              <div class="modal__fact">
                <span class="modal__fact-label">Target</span>
                <span class="modal__fact-value">${exercise.target || 'N/A'}</span>
              </div>
              <div class="modal__fact">
                <span class="modal__fact-label">Body Part</span>
                <span class="modal__fact-value">${exercise.bodyPart || 'N/A'}</span>
              </div>
              <div class="modal__fact">
                <span class="modal__fact-label">Equipment</span>
                <span class="modal__fact-value">${exercise.equipment || 'N/A'}</span>
              </div>
              <div class="modal__fact">
                <span class="modal__fact-label">Popular</span>
                <span class="modal__fact-value">${exercise.popularity || 'N/A'}</span>
              </div>
            </div>

            <div class="modal__fact modal__fact--burned">
              <span class="modal__fact-label">Burned calories</span>
              <span class="modal__fact-value">${exercise.burnedCalories || 'N/A'}/${exercise.time || 'N/A'} min</span>
            </div>

            <div class="modal__divider"></div>
            
            <p class="modal__description">${exercise.description || ''}</p>
            
            <div class="modal__actions">
              <button type="button" class="modal__add-favorite" data-action="${isFavorite ? 'remove' : 'add'}">
                ${isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                <span class="modal__fav-icon" aria-hidden="true">${getFavoriteIconEntity(isFavorite)}</span>
              </button>
              <button type="button" class="modal__give-rating">Give a rating</button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } catch {
    showToast('Could not load exercise details');
  }
}

function openRatingModal() {
  if (!currentExercise) return;

  modalContainer.innerHTML = `
    <div class="modal modal--rating">
      <button type="button" class="modal__close" aria-label="Close modal">&times;</button>
      
      <h3 class="modal__rating-title">Rating</h3>
      
      <form class="rating-form" data-id="${currentExercise._id}">
        <div class="rating-stars">
          <span class="rating-value">0.0</span>
          <div class="rating-stars-input">
            <input type="radio" name="rate" value="1" id="star1" required>
            <label for="star1">&#9734;</label>
            <input type="radio" name="rate" value="2" id="star2">
            <label for="star2">&#9734;</label>
            <input type="radio" name="rate" value="3" id="star3">
            <label for="star3">&#9734;</label>
            <input type="radio" name="rate" value="4" id="star4">
            <label for="star4">&#9734;</label>
            <input type="radio" name="rate" value="5" id="star5">
            <label for="star5">&#9734;</label>
          </div>
        </div>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          class="rating-email"
          required
        />
        
        <textarea
          name="review"
          placeholder="Your comment"
          class="rating-comment"
          rows="4"
        ></textarea>
        
        <button type="submit" class="rating-submit">Send</button>
      </form>
    </div>
  `;

  const ratingInputs = modalContainer.querySelectorAll('input[name="rate"]');
  const ratingValue = modalContainer.querySelector('.rating-value');

  ratingInputs.forEach(input => {
    input.addEventListener('change', event => {
      ratingValue.textContent = `${event.target.value}.0`;
    });
  });
}

function renderStars(rating) {
  const value = Number(rating) || 0;
  const boundedValue = Math.min(Math.max(value, 0), 5);
  const fullStars = Math.floor(boundedValue);
  const fraction = boundedValue - fullStars;
  const hasHalfStar = fraction >= 0.25 && fraction < 0.75;
  const roundedStars = fraction >= 0.75 ? fullStars + 1 : fullStars;

  let starsMarkup = '';

  for (let index = 0; index < 5; index += 1) {
    if (index < roundedStars && (!hasHalfStar || index < fullStars)) {
      starsMarkup += `
        <span class="modal__star modal__star--full" aria-hidden="true">
          <svg width="18" height="18">
            <use href="./img/sprite.svg#icon-star-rating"></use>
          </svg>
        </span>
      `;
      continue;
    }

    if (index === fullStars && hasHalfStar) {
      starsMarkup += `
        <span class="modal__star modal__star--half" aria-hidden="true">
          <svg class="modal__star-base" width="18" height="18">
            <use href="./img/sprite.svg#icon-star-rating"></use>
          </svg>
          <svg class="modal__star-fill" width="18" height="18">
            <use href="./img/sprite.svg#icon-star-rating"></use>
          </svg>
        </span>
      `;
      continue;
    }

    starsMarkup += `
      <span class="modal__star modal__star--empty" aria-hidden="true">
        <svg width="18" height="18">
          <use href="./img/sprite.svg#icon-star-rating"></use>
        </svg>
      </span>
    `;
  }

  return starsMarkup;
}

async function handleRatingSubmit(form) {
  const formData = new FormData(form);
  const exerciseId = form.dataset.id;

  try {
    await rateExercise(exerciseId, {
      rate: Number(formData.get('rate')),
      email: formData.get('email'),
      review: formData.get('review') || '',
    });

    showToast('Thank you for your rating!');
    closeModal();
  } catch {
    showToast('Failed to submit rating. Please try again.');
  }
}

function closeModal() {
  if (!modalContainer) return;
  modalContainer.style.display = 'none';
  document.body.style.overflow = '';
  currentExercise = null;
}

function showToast(message) {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  window.setTimeout(() => {
    toast.classList.remove('toast--visible');
    window.setTimeout(() => toast.remove(), 250);
  }, 2200);
}
