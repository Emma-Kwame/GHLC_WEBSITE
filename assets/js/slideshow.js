export function setupSlideshow() {
  const slides = document.querySelectorAll('.slides');
  const dots = document.querySelectorAll('.dot');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const container = document.querySelector('.slideshow-container');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      if (dots[i]) {
        dots[i].classList.toggle('active', isActive);
        dots[i].setAttribute('aria-current', isActive ? 'true' : 'false');
      }
    });
    current = index;
  }

  function nextSlide() {
    if (slides.length === 0) return;
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    if (slides.length === 0) return;
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    if (prefersReducedMotion.matches || document.hidden) return;
    stopAuto();
    timer = setInterval(nextSlide, 4000);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  if (next) {
    next.addEventListener('click', () => {
      nextSlide();
      stopAuto();
      startAuto();
    });
  }

  if (prev) {
    prev.addEventListener('click', () => {
      prevSlide();
      stopAuto();
      startAuto();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();
      showSlide(i);
      startAuto();
    });
  });

  if (slides.length > 0) {
    showSlide(0);
    startAuto();
  }

  if (container) {
    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);
    container.addEventListener('focusin', stopAuto);
    container.addEventListener('focusout', (event) => {
      if (!container.contains(event.relatedTarget)) startAuto();
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAuto();
    } else {
      startAuto();
    }
  });

  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
      stopAuto();
    } else {
      startAuto();
    }
  });
}
