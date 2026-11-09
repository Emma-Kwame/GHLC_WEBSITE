
import { setupHamburger } from './hamburger.js';
import { setupSlideshow } from './slideshow.js';
import { setupGallery } from './gallery.js';
import { setupContactForm } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
  setupHamburger();
  setupSlideshow();
  setupGallery();
  setupContactForm();

  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reveal-ready');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach((element) => {
      element.classList.add('is-visible');
    });
  }
});
