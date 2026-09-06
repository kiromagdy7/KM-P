(function () {
  'use strict';

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
  });

  function initWorkPage() {
    window.scrollTo(0, 0);

    var revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
      if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(
          function (entries, obs) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );

        revealElements.forEach(function (el) {
          revealObserver.observe(el);
        });
      } else {
        revealElements.forEach(function (el) {
          el.classList.add('in-view');
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorkPage);
  } else {
    initWorkPage();
  }
})();
