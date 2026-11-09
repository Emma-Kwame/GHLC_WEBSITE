export function setupHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');

  if (hamburger && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        hamburger.focus();
      }
    });
  }
}
