export function setupGallery() {
  const filterButtons = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('[data-gallery-category]');
  const lightbox = document.querySelector('[data-lightbox-dialog]');
  const lightboxImage = lightbox?.querySelector('[data-lightbox-image]');
  const lightboxCaption = lightbox?.querySelector('[data-lightbox-caption]');
  const closeButton = lightbox?.querySelector('[data-lightbox-close]');
  let lastTrigger;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.galleryFilter;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

      galleryItems.forEach((item) => {
        item.hidden = filter !== 'all' && item.dataset.galleryCategory !== filter;
      });
    });
  });

  if (!lightbox || !lightboxImage) return;

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  };

  document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const image = trigger.matches('img') ? trigger : trigger.querySelector('img');
      if (!image) return;

      lastTrigger = trigger;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      if (lightboxCaption) {
        lightboxCaption.textContent = trigger.dataset.caption || image.alt;
      }
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}
