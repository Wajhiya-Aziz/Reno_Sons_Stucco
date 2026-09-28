/**
 * RENO SONS STUCCO - GSAP & SCROLLTRIGGER ANIMATIONS
 * Architectural motion graphics, line reveals, text reveals, scroll triggers, parallax.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Animations gracefully disabled.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  initHeroAnimations();
  initScrollReveals();
  initParallaxEffects();
  initTimelineProgress();
});

/* --------------------------------------------------------------------------
   1. HERO CINEMATIC REVEAL TIMELINE
   -------------------------------------------------------------------------- */
function initHeroAnimations() {
  const heroSection = document.querySelector('.hero-carousel-section, .subpage-hero');
  if (!heroSection) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

  // Eyebrow Tag Reveal
  tl.fromTo('.hero-eyebrow, .section-tag', 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 0.8 }, 
    0.1
  );

  // Hero Subpage Title Reveal
  if (document.querySelector('.subpage-hero-title')) {
    tl.fromTo('.subpage-hero-title', 
      { opacity: 0, y: 45 }, 
      { opacity: 1, y: 0, duration: 1.1 }, 
      0.3
    );
  }

  // Description & CTA Reveal
  tl.fromTo('.subpage-hero p, .hero-cta-wrap', 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }, 
    0.5
  );
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEALS FOR EDITORIAL SECTIONS
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  // Fade Up Elements
  const fadeUpEls = document.querySelectorAll('.gsap-reveal-up');
  fadeUpEls.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Slide Left Elements
  const slideLeftEls = document.querySelectorAll('.gsap-reveal-left');
  slideLeftEls.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Slide Right Elements
  const slideRightEls = document.querySelectorAll('.gsap-reveal-right');
  slideRightEls.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Scale In Elements
  const scaleEls = document.querySelectorAll('.gsap-scale-in');
  scaleEls.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.93 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Stagger Containers
  const staggerContainers = document.querySelectorAll('.gsap-stagger-parent');
  staggerContainers.forEach((container) => {
    const children = container.querySelectorAll('.gsap-stagger-item');
    if (!children.length) return;

    gsap.fromTo(children,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* --------------------------------------------------------------------------
   3. PARALLAX EFFECT FOR ARCHITECTURAL IMAGES
   -------------------------------------------------------------------------- */
function initParallaxEffects() {
  const parallaxImgs = document.querySelectorAll('.gsap-parallax');
  parallaxImgs.forEach((img) => {
    gsap.to(img, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. PROCESS TIMELINE PROGRESS
   -------------------------------------------------------------------------- */
function initTimelineProgress() {
  const processSection = document.querySelector('.process-timeline-bar');
  if (!processSection) return;

  const steps = processSection.querySelectorAll('.process-step-item');
  gsap.fromTo(steps,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: processSection,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    }
  );
}
