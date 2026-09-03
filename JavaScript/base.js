(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const hamburger = document.getElementById("hamburger");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const mobileDropdown = document.getElementById("mobileDropdown");

  if (localStorage.getItem("theme") === "dark") { html.classList.add("dark"); }

  document.querySelectorAll(".year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  const moonSvg = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  const sunSvg = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

  function updateIcon() {
    if (themeIcon) { themeIcon.innerHTML = html.classList.contains("dark") ? sunSvg : moonSvg; }
  }
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      html.classList.toggle("dark");
      localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
      updateIcon();
    });
  }
  updateIcon();

  if (hamburger && mobileDropdown) {
    const hamSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    const closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    hamburger.addEventListener("click", function () {
      mobileDropdown.classList.toggle("open");
      if (hamburgerIcon) { hamburgerIcon.innerHTML = mobileDropdown.classList.contains("open") ? closeSvg : hamSvg; }
    });

    document.querySelectorAll('.mobile-dropdown a').forEach(function (link) {
      link.addEventListener("click", function () {
        mobileDropdown.classList.remove("open");
        if (hamburgerIcon) { hamburgerIcon.innerHTML = hamSvg; }
      });
    });
  }

  window.addEventListener('load', function () {
    var loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function () { loader.remove(); }, 500);
    }
  });

  // Smart Image Tracker & Auto-Retry System
  var MAX_AUTO_RETRIES = 4;
  var brokenImageSvg = '<svg class="img-fallback-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
  var retryIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>';

  function isElementInView(el) {
    if (!el) return false;
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var vw = window.innerWidth || document.documentElement.clientWidth;
    return rect.bottom >= -150 && rect.top <= vh + 150 && rect.right >= 0 && rect.left <= vw;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function getOriginalSrc(img) {
    if (!img.dataset.origSrc) {
      img.dataset.origSrc = img.getAttribute('src') || '';
    }
    return img.dataset.origSrc;
  }

  function renderFallbackUI(img) {
    if (!img || img.dataset.hasFallback === 'true') return;
    img.dataset.hasFallback = 'true';
    img.classList.remove('img-loading-attempt');
    img.classList.add('img-has-error');

    var pWrap = img.closest('.ss-img-wrap') || img.closest('.photo-container');
    if (pWrap) {
      pWrap.classList.remove('loading');
      pWrap.classList.add('has-error');
    }

    var title = (img.getAttribute('alt') || '').trim();
    if (!title) {
      var itemWrap = img.closest('.ss-item') || img.closest('.cert-card') || img.parentElement;
      var titleEl = itemWrap ? (itemWrap.querySelector('.ss-window-title') || itemWrap.querySelector('.ss-label') || itemWrap.querySelector('.cert-title')) : null;
      if (titleEl) title = titleEl.textContent.trim();
    }
    if (!title) {
      var clean = (img.dataset.origSrc || '').split('?')[0].split('/').pop();
      try { title = decodeURIComponent(clean).replace(/\.[^/.]+$/, ''); } catch(e) { title = clean; }
    }
    if (!title) title = 'Image Preview';

    var fallback = document.createElement('div');
    fallback.className = 'img-fallback';
    fallback.setAttribute('role', 'alert');
    fallback.setAttribute('aria-label', 'Failed to load: ' + title);

    if ((img.getAttribute('width') && parseInt(img.getAttribute('width')) < 80) ||
        img.closest('.provider-logo') || img.closest('.lightbox-thumb-item')) {
      fallback.classList.add('compact');
    }

    fallback.innerHTML =
      '<div class="img-fallback-icon-wrap">' + brokenImageSvg + '</div>' +
      '<div class="img-fallback-text-group">' +
        '<span class="img-fallback-title">' + escapeHtml(title) + '</span>' +
        '<span class="img-fallback-msg">Unable to load preview</span>' +
      '</div>' +
      '<button type="button" class="img-fallback-retry" title="Retry loading image">' +
        retryIconSvg +
        '<span>Retry</span>' +
      '</button>';

    var retryBtn = fallback.querySelector('.img-fallback-retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (retryBtn.classList.contains('is-retrying')) return;

        retryBtn.classList.add('is-retrying');
        var label = retryBtn.querySelector('span');
        if (label) label.textContent = 'Loading...';

        img.dataset.autoRetries = '0';
        img.dataset.failedFinal = 'false';
        img.classList.add('img-loading-attempt');

        executeReload(img, function onManualSuccess() {
          img.dataset.hasFallback = 'false';
          fallback.remove();
        }, function onManualFail() {
          retryBtn.classList.remove('is-retrying');
          if (label) label.textContent = 'Try again';
        });
      });
    }

    if (pWrap) {
      pWrap.appendChild(fallback);
    } else if (img.parentNode) {
      img.parentNode.insertBefore(fallback, img);
    }
  }

  function executeReload(img, onSuccess, onFail) {
    var orig = getOriginalSrc(img);
    if (!orig) return;

    var clean = orig.replace(/([?&])_r=[^&]+(&|$)/, '$1').replace(/[?&]$/, '');
    var sep = clean.indexOf('?') !== -1 ? '&' : '?';
    var testSrc = clean + sep + '_r=' + Date.now();

    var tester = new Image();
    tester.onload = function () {
      img.src = testSrc;
      img.classList.remove('img-has-error');
      img.classList.remove('img-loading-attempt');
      img.dataset.autoRetries = '0';
      img.dataset.failedFinal = 'false';

      var pWrap = img.closest('.ss-img-wrap') || img.closest('.photo-container');
      if (pWrap) {
        pWrap.classList.remove('loading');
        pWrap.classList.remove('has-error');
      }
      if (typeof onSuccess === 'function') onSuccess();
    };
    tester.onerror = function () {
      if (typeof onFail === 'function') {
        onFail();
      } else {
        handleImageFailure(img);
      }
    };
    tester.src = testSrc;
  }

  function scheduleNextRetry(img) {
    var retries = parseInt(img.dataset.autoRetries || '0', 10);
    if (retries >= MAX_AUTO_RETRIES) {
      img.dataset.failedFinal = 'true';
      renderFallbackUI(img);
      return;
    }

    img.dataset.autoRetries = String(retries + 1);
    img.classList.add('img-loading-attempt');

    var delay = Math.min(1000 + retries * 800, 3200);

    setTimeout(function () {
      if (img.dataset.failedFinal === 'true') return;
      var targetEl = img.closest('.ss-item') || img.closest('.photo-container') || img;
      if (isElementInView(targetEl)) {
        executeReload(img);
      } else if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
          if (entries[0] && entries[0].isIntersecting) {
            obs.disconnect();
            if (img.dataset.failedFinal !== 'true') {
              executeReload(img);
            }
          }
        }, { rootMargin: '100px' });
        obs.observe(targetEl);
      } else {
        executeReload(img);
      }
    }, delay);
  }

  function handleImageFailure(img) {
    if (!img || img.dataset.failedFinal === 'true') return;
    getOriginalSrc(img);
    scheduleNextRetry(img);
  }

  function handleImageSuccess(img) {
    if (!img) return;
    img.classList.remove('img-has-error');
    img.classList.remove('img-loading-attempt');
    img.dataset.autoRetries = '0';
    img.dataset.failedFinal = 'false';
  }

  window.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') {
      handleImageFailure(e.target);
    }
  }, true);

  window.addEventListener('load', function (e) {
    if (e.target && e.target.tagName === 'IMG') {
      handleImageSuccess(e.target);
    }
  }, true);

  window.handleImageError = handleImageFailure;
})();