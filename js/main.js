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
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
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
