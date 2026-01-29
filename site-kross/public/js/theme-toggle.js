(function () {
  'use strict';

  var storageKey = 'theme';
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (err) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (err) {
      // Ignore storage failures.
    }
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored) {
      return stored;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function updateToggle(theme) {
    if (!toggle) {
      return;
    }
    var nextLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
    toggle.textContent = nextLabel;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.setAttribute('aria-pressed', theme === 'dark');
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    updateToggle(theme);
  }

  var initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      setStoredTheme(next);
    });
  }
})();
