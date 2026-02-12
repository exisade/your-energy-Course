const openBtn = document.querySelector('[data-menu-open-btn]');
const closeBtn = document.querySelector('[data-menu-close-btn]');
const backdrop = document.querySelector('[data-menu-backdrop]');
const menuContainer = document.querySelector('.js-menu-container');
const menuLinks = document.querySelectorAll('.mobile-menu__nav-link');

function openMenu() {
  if (!backdrop || !menuContainer || !openBtn) return;

  backdrop.classList.remove('is-hidden');
  menuContainer.classList.add('is-open');
  document.body.classList.add('no-scroll');
  openBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (!backdrop || !menuContainer || !openBtn) return;

  menuContainer.classList.remove('is-open');
  backdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  openBtn.setAttribute('aria-expanded', 'false');
}

export function initMobileMenu() {
  if (!openBtn || !closeBtn || !backdrop || !menuContainer) return;

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !backdrop.classList.contains('is-hidden')) {
      closeMenu();
    }
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
