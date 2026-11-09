document.addEventListener('DOMContentLoaded', () => {
  // ===== Hamburger Menu (Fixed) =====
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('active');
    });
    // Close nav when a link is clicked (for mobile UX)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
    // Optional: close nav if clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  }


  // ===== Slideshow =====
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slides");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");
  const slideshowText = document.querySelector(".slideshow-text");
  let slideTimer;

  function showSlides(n) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (dots[i]) dots[i].classList.remove("active");
    });

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides[slideIndex].classList.add("active");
    if (dots[slideIndex]) dots[slideIndex].classList.add("active");
    if (slideshowText) {
      slideshowText.hidden = slides[slideIndex].dataset.hideText === "true";
    }
  }

  function autoSlides() {
    slideIndex++;
    showSlides(slideIndex);
    slideTimer = setTimeout(autoSlides, 4000);
  }

  if (slides.length > 0) {
    showSlides(slideIndex);
    slideTimer = setTimeout(autoSlides, 4000);

    if (prev) {
      prev.addEventListener("click", () => {
        clearTimeout(slideTimer);
        slideIndex--;
        showSlides(slideIndex);
        slideTimer = setTimeout(autoSlides, 4000);
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        clearTimeout(slideTimer);
        slideIndex++;
        showSlides(slideIndex);
        slideTimer = setTimeout(autoSlides, 4000);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearTimeout(slideTimer);
        slideIndex = i;
        showSlides(slideIndex);
        slideTimer = setTimeout(autoSlides, 4000);
      });
    });
  }

  // ===== Donate Modal =====
  // Support multiple Donate buttons (header/footer/elsewhere)
  const openDonateButtons = [
    ...document.querySelectorAll('#openModal, #openModalFooter')
  ];
  const donateModal = document.getElementById('donateModal');
  const closeDonate = donateModal ? donateModal.querySelector('.modal-close') : null;

  if (donateModal && openDonateButtons.length) {
    const openModal = (e) => {
      if (e) e.preventDefault();
      donateModal.classList.add('show');
      donateModal.setAttribute('aria-hidden', 'false');
    };

    const closeModal = () => {
      donateModal.classList.remove('show');
      donateModal.setAttribute('aria-hidden', 'true');
    };

    openDonateButtons.forEach(btn => btn.addEventListener('click', openModal));
    if (closeDonate) closeDonate.addEventListener('click', closeModal);

    // Click outside image closes
    donateModal.addEventListener('click', (e) => {
      if (e.target === donateModal) closeModal();
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ===== Image Modal (Announcements + Services) =====
  const imgModal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const imgClose = imgModal ? imgModal.querySelector(".close") : null;

  const clickableImgs = document.querySelectorAll(
    ".announcement-card img, .service-card img"
  );

  clickableImgs.forEach(img => {
    img.addEventListener("click", () => {
      if (imgModal) {
        imgModal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = img.alt || "Service Image";
      }
    });
  });

  if (imgClose) {
    imgClose.addEventListener("click", () => {
      imgModal.style.display = "none";
    });
  }

  if (imgModal) {
    imgModal.addEventListener("click", (e) => {
      if (e.target === imgModal) {
        imgModal.style.display = "none";
      }
    });
  }
});
