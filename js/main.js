/**
 * RENO SONS STUCCO - MAIN JAVASCRIPT
 * Sticky Navbar, Clean Mobile Accordions, Infinite Carousel with Touch, Draggable Sliders, Portfolio Filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initHeroCarousel();
  initCustomCursor();
  initBeforeAfterSliders();
  initPortfolioFilters();
  initBackToTop();
  initCurrentYear();
  initFormHandler();
});

/* --------------------------------------------------------------------------
   1. NAVBAR STICKY EFFECT & ACTIVE PAGE DETECTION
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar-reno-black');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active Page Detection
  const rawPath = window.location.pathname.split('/').pop();
  const currentPath = rawPath && rawPath !== '' ? rawPath : 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-reno');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE MENU ACCORDION DROPDOWNS
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const mobileToggles = document.querySelectorAll('.mobile-dropdown-toggle');

  mobileToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.nav-item');
      const targetMenu = parent ? parent.querySelector('.dropdown-menu-mobile') : null;

      if (targetMenu) {
        const isShown = targetMenu.classList.contains('show');

        // Close other mobile menus
        document.querySelectorAll('.dropdown-menu-mobile').forEach(menu => {
          if (menu !== targetMenu) {
            menu.classList.remove('show');
          }
        });
        document.querySelectorAll('.mobile-dropdown-toggle .dropdown-arrow-icon').forEach(icon => {
          if (!toggle.contains(icon)) {
            icon.style.transform = 'rotate(0deg)';
          }
        });

        if (!isShown) {
          targetMenu.classList.add('show');
          const icon = toggle.querySelector('.dropdown-arrow-icon');
          if (icon) {
            icon.style.transform = 'rotate(180deg)';
            icon.style.transition = 'transform 0.25s ease';
          }
        } else {
          targetMenu.classList.remove('show');
          const icon = toggle.querySelector('.dropdown-arrow-icon');
          if (icon) {
            icon.style.transform = 'rotate(0deg)';
          }
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. HERO CAROUSEL (INFINITE 5 SLIDES, CLEAN REVEAL, TOUCH SWIPE)
   -------------------------------------------------------------------------- */
function initHeroCarousel() {
  const carouselSection = document.querySelector('.hero-carousel-section');
  if (!carouselSection) return;

  const slides = carouselSection.querySelectorAll('.hero-slide');
  const prevBtn = carouselSection.querySelector('#heroPrevBtn');
  const nextBtn = carouselSection.querySelector('#heroNextBtn');

  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 5500;
  let timerId = null;

  const updateSlide = (nextIndex) => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (nextIndex + totalSlides) % totalSlides;
    const currentSlide = slides[currentIndex];
    currentSlide.classList.add('active');

    // GSAP Reveal Animation on Slide Change
    if (typeof gsap !== 'undefined') {
      const bgImg = currentSlide.querySelector('.hero-slide-bg');
      const eyebrow = currentSlide.querySelector('.hero-eyebrow');
      const title = currentSlide.querySelector('.hero-title-carousel');
      const desc = currentSlide.querySelector('.hero-desc-carousel');
      const cta = currentSlide.querySelector('.hero-cta-wrap');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (bgImg) gsap.fromTo(bgImg, { scale: 1.08 }, { scale: 1.0, duration: 4.5, ease: 'power1.out' });
      if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1);
      if (title) tl.fromTo(title, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.75 }, 0.2);
      if (desc) tl.fromTo(desc, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.38);
      if (cta) tl.fromTo(cta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.52);
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    timerId = setInterval(() => {
      updateSlide(currentIndex + 1);
    }, slideDuration);
  };

  const stopAutoPlay = () => {
    if (timerId) clearInterval(timerId);
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlide(currentIndex - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlide(currentIndex + 1);
      startAutoPlay();
    });
  }

  carouselSection.addEventListener('mouseenter', stopAutoPlay);
  carouselSection.addEventListener('mouseleave', startAutoPlay);

  // Touch Swipe on Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carouselSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carouselSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      updateSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > 50) {
      updateSlide(currentIndex - 1);
    }
    startAutoPlay();
  }, { passive: true });

  updateSlide(0);
  startAutoPlay();
}

/* --------------------------------------------------------------------------
   4. CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  if (!cursor || !cursorDot) return;

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }, { passive: true });

  const animateCursor = () => {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  const hoverables = document.querySelectorAll('a, button, .service-stacked-item, .finish-tile, .portfolio-card-arch, .filter-btn');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

/* --------------------------------------------------------------------------
   5. BEFORE / AFTER DRAGGABLE SLIDER
   -------------------------------------------------------------------------- */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.before-after-container');

  sliders.forEach(slider => {
    const beforeImg = slider.querySelector('.before-after-img-before');
    const beforeInnerImg = beforeImg ? beforeImg.querySelector('img') : null;
    const handle = slider.querySelector('.slider-handle');

    if (!beforeImg || !handle) return;

    const updateImageDimensions = () => {
      const sliderWidth = slider.offsetWidth;
      if (beforeInnerImg) {
        beforeInnerImg.style.width = `${sliderWidth}px`;
      }
    };

    updateImageDimensions();
    window.addEventListener('resize', updateImageDimensions, { passive: true });

    let isDragging = false;

    const moveSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let x = clientX - rect.left;

      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percentage = (x / rect.width) * 100;
      beforeImg.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    const startDrag = () => {
      isDragging = true;
    };

    const stopDrag = () => {
      isDragging = false;
    };

    const onDrag = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      moveSlider(clientX);
    };

    handle.addEventListener('mousedown', startDrag);
    slider.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', onDrag);

    handle.addEventListener('touchstart', startDrag, { passive: true });
    slider.addEventListener('touchstart', startDrag, { passive: true });
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('touchmove', onDrag, { passive: true });
  });
}

/* --------------------------------------------------------------------------
   6. PORTFOLIO FILTERS
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-bar .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item-wrap');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category') || '';
        const categoryList = category.split(' ');

        if (filterValue === 'all' || categoryList.includes(filterValue)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transition = 'opacity 0.4s ease';
          }, 40);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('#backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.style.opacity = '1';
    } else {
      backToTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.scrollY <= 400) backToTopBtn.style.display = 'none';
      }, 300);
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   8. DYNAMIC YEAR & FORM HANDLER
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);
}

function initFormHandler() {
  const forms = document.querySelectorAll('.reno-contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> SUBMITTING...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> REQUEST SENT SUCCESSFULLY!';
          submitBtn.classList.remove('btn-reno-primary');
          submitBtn.classList.add('btn-success');
          form.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-reno-primary');
          }, 4000);
        }, 1200);
      }
    });
  });
}
