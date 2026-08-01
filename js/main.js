/**
 * Portfolio — Main JavaScript
 * Features: mobile nav, dark/light theme, active nav links, contact form validation
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     DOM References
     -------------------------------------------------------------------------- */

  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const themeToggle = document.getElementById('theme-toggle');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const cursorGlow = document.getElementById('cursor-glow');
  const backToTop = document.getElementById('back-to-top');
  const heroTyping = document.getElementById('hero-typing');
  const navIndicator = document.getElementById('nav-indicator');
  const navBackdrop = document.getElementById('nav-backdrop');

  /* --------------------------------------------------------------------------
     Nav Pill Indicator (desktop)
     -------------------------------------------------------------------------- */

  function updateNavIndicator() {
    if (!navIndicator || window.innerWidth < 768) return;

    const activeLink = document.querySelector('.nav__link.is-active');
    if (!activeLink) {
      navIndicator.style.opacity = '0';
      return;
    }

    const menuRect = navMenu.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    navIndicator.style.opacity = '1';
    navIndicator.style.width = linkRect.width + 'px';
    navIndicator.style.transform =
      'translate(' + (linkRect.left - menuRect.left) + 'px, ' +
      (linkRect.top - menuRect.top) + 'px)';
  }

  window.addEventListener('resize', updateNavIndicator);
  window.addEventListener('load', updateNavIndicator);

  /* --------------------------------------------------------------------------
     Scroll Progress & Back to Top
     -------------------------------------------------------------------------- */

  function handleScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = progress + '%';
    }

    if (backToTop) {
      backToTop.hidden = scrollTop < 400;
    }
  }

  window.addEventListener('scroll', handleScrollUI, { passive: true });
  handleScrollUI();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     Cursor Glow (desktop)
     -------------------------------------------------------------------------- */

  if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  /* --------------------------------------------------------------------------
     Hero Typing Effect
     -------------------------------------------------------------------------- */

  if (heroTyping) {
    const roles = [
      'Front-End Developer',
      'Full-Stack Builder',
      'UI Engineer',
      'Next.js Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
      const current = roles[roleIndex];

      if (!isDeleting) {
        heroTyping.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeRole, 2000);
          return;
        }
      } else {
        heroTyping.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(typeRole, isDeleting ? 40 : 80);
    }

    typeRole();
  }

  /* --------------------------------------------------------------------------
     Stats Counter Animation
     -------------------------------------------------------------------------- */

  const statValues = document.querySelectorAll('.hero__stat-value[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  if (statValues.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statValues.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     Header Scroll Effect
     -------------------------------------------------------------------------- */

  function handleHeaderScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     Scroll Reveal
     -------------------------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    '.hero__content, .hero__visual, .about__grid, .skills__category, .project-card, .contact__grid'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el, index) {
      el.style.transitionDelay = index % 4 * 0.08 + 's';
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* --------------------------------------------------------------------------
     Mobile Navigation
     -------------------------------------------------------------------------- */

  function openNav() {
    navMenu.classList.add('is-open');
    if (navBackdrop) {
      navBackdrop.classList.add('is-visible');
      navBackdrop.setAttribute('aria-hidden', 'false');
    }
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navMenu.classList.remove('is-open');
    if (navBackdrop) {
      navBackdrop.classList.remove('is-visible');
      navBackdrop.setAttribute('aria-hidden', 'true');
    }
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeNav);
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
      setTimeout(updateNavIndicator, 50);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeNav();
    }
  });

  /* --------------------------------------------------------------------------
     Dark / Light Theme Toggle
     -------------------------------------------------------------------------- */

  const THEME_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* --------------------------------------------------------------------------
     Active Navigation Link on Scroll
     -------------------------------------------------------------------------- */

  function setActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('is-active');
          }
        });
      }
    });

    updateNavIndicator();
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();

  /* --------------------------------------------------------------------------
     Contact Form Validation
     -------------------------------------------------------------------------- */

  const validators = {
    name: function (value) {
      if (!value.trim()) return 'Name is required.';
      if (value.trim().length < 2) return 'Name must be at least 2 characters.';
      return '';
    },
    email: function (value) {
      if (!value.trim()) return 'Email is required.';
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(value.trim())) return 'Please enter a valid email address.';
      return '';
    },
    subject: function (value) {
      if (!value.trim()) return 'Subject is required.';
      if (value.trim().length < 3) return 'Subject must be at least 3 characters.';
      return '';
    },
    message: function (value) {
      if (!value.trim()) return 'Message is required.';
      if (value.trim().length < 10) return 'Message must be at least 10 characters.';
      return '';
    }
  };

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    input.classList.toggle('is-invalid', Boolean(message));
    errorEl.textContent = message;
  }

  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const error = validators[fieldId](input.value);
    showError(fieldId, error);
    return !error;
  }

  function validateForm() {
    let isValid = true;
    Object.keys(validators).forEach(function (fieldId) {
      if (!validateField(fieldId)) isValid = false;
    });
    return isValid;
  }

  Object.keys(validators).forEach(function (fieldId) {
    const input = document.getElementById(fieldId);
    input.addEventListener('blur', function () {
      validateField(fieldId);
    });
    input.addEventListener('input', function () {
      if (input.classList.contains('is-invalid')) {
        validateField(fieldId);
      }
    });
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formSuccess.hidden = true;

    if (!validateForm()) return;

    const submitBtn = contactForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(function () {
      formSuccess.hidden = false;
      contactForm.reset();
      Object.keys(validators).forEach(function (fieldId) {
        showError(fieldId, '');
      });
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
  });

})();
