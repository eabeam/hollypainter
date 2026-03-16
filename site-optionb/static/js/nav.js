// Hamburger menu toggle for mobile navigation
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks) return;

  // Toggle menu open/close
  toggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
      navLinks.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('nav-open') &&
      !navLinks.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      navLinks.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when a nav link is clicked (same-page navigation)
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
