(function () {
  'use strict';

  var scope = document.querySelector('[data-bibliography]');
  if (!scope) {
    return;
  }

  var list = scope.querySelector('[data-bibliography-list]');
  if (!list) {
    return;
  }

  var items = Array.prototype.slice.call(list.querySelectorAll('[data-bibliography-item]'));
  var searchInput = scope.querySelector('[data-bibliography-search]');
  var sortSelect = scope.querySelector('[data-bibliography-sort]');

  function normalize(value) {
    return (value || '').toLowerCase();
  }

  function getYear(item) {
    var year = parseInt(item.dataset.year || '0', 10);
    return Number.isNaN(year) ? 0 : year;
  }

  function compareText(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  function applySort() {
    if (!sortSelect) {
      return;
    }

    var mode = sortSelect.value;
    var sorted = items.slice().sort(function (a, b) {
      var titleA = a.dataset.title || '';
      var titleB = b.dataset.title || '';
      var publisherA = a.dataset.publisher || '';
      var publisherB = b.dataset.publisher || '';
      var yearA = getYear(a);
      var yearB = getYear(b);

      if (mode === 'title-asc') {
        return compareText(titleA, titleB);
      }
      if (mode === 'title-desc') {
        return compareText(titleB, titleA);
      }
      if (mode === 'publisher-asc') {
        return compareText(publisherA, publisherB) || compareText(titleA, titleB);
      }
      if (mode === 'publisher-desc') {
        return compareText(publisherB, publisherA) || compareText(titleA, titleB);
      }
      if (mode === 'year-asc') {
        return yearA - yearB || compareText(titleA, titleB);
      }
      return yearB - yearA || compareText(titleA, titleB);
    });

    sorted.forEach(function (item) {
      list.appendChild(item);
    });
  }

  function applyFilter() {
    var term = normalize(searchInput ? searchInput.value : '');
    items.forEach(function (item) {
      var hay = item.dataset.search || '';
      var show = !term || hay.indexOf(term) !== -1;
      item.style.display = show ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', applySort);
  }

  applySort();
  applyFilter();
})();
