(function () {
  'use strict';

  var links = document.querySelectorAll('.navbar .nav-item.dropdown > .nav-link.dropdown-toggle');
  if (!links.length) {
    return;
  }

  function isDesktop() {
    return window.matchMedia('(min-width: 992px)').matches;
  }

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (!isDesktop()) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      window.location = link.href;
    }, true);
  });
})();
