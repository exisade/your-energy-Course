import { updatePage } from './exercises.js';

const paginationContainer = document.querySelector('.exercises__pagination');
let currentPage = 1;
let totalPages = 1;

export function initPagination() {
  if (!paginationContainer) return;

  paginationContainer.addEventListener('click', e => {
    const button = e.target.closest('button[data-direction]');
    if (!button) return;

    const direction = button.dataset.direction;
    if (direction === 'prev' && currentPage > 1) {
      currentPage -= 1;
      updatePage(currentPage);
      renderPagination();
      return;
    }

    if (direction === 'next' && currentPage < totalPages) {
      currentPage += 1;
      updatePage(currentPage);
      renderPagination();
    }
  });
}

export function updatePaginationData(page, total) {
  currentPage = Number.isFinite(page) ? page : 1;
  totalPages = Number.isFinite(total) && total > 0 ? total : 1;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  renderPagination();
}

function renderPagination() {
  if (!paginationContainer) return;

  paginationContainer.innerHTML = `
    <button type="button" data-direction="prev" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous page">&lt;</button>
    <span>${currentPage} / ${totalPages}</span>
    <button type="button" data-direction="next" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next page">&gt;</button>
  `;
}
