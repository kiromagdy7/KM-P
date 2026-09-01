(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const hamburger = document.getElementById("hamburger");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const mobileDropdown = document.getElementById("mobileDropdown");
  const navLinks = document.querySelectorAll("[data-section]");
  const sections = document.querySelectorAll("section[id]");
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

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

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    });
  });

  document.querySelectorAll('.btn-fill[href^="#"], .btn-outline[href^="#"]').forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (target) { target.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  if (sections.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove("active");
            var section = link.getAttribute("data-section");
            if (section && entry.target.id === section) { link.classList.add("active"); }
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (section) { observer.observe(section); });
  }

  var modal = document.getElementById("successModal");
  var modalClose = document.getElementById("modalCloseBtn");

  if (contactForm && submitBtn) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var orig = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending...";

      var data = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      })
      .then(function (res) { return res.json(); })
      .then(function () {
        contactForm.reset();
        submitBtn.innerHTML = orig;
        submitBtn.disabled = false;
        if (modal) { modal.classList.add("open"); }
      })
      .catch(function () {
        submitBtn.innerHTML = "Failed \u2717";
        setTimeout(function () {
          submitBtn.innerHTML = orig;
          submitBtn.disabled = false;
        }, 3000);
      });
    });
  }

  if (modalClose && modal) {
    modalClose.addEventListener("click", function () {
      modal.classList.remove("open");
    });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) { modal.classList.remove("open"); }
    });
  }

  var copyEmailBtn = document.getElementById("copyEmailBtn");
  var copyTimeout = null;

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", function () {
      var email = "contact@kiromagdy.com";
      var icon = document.getElementById("copyIcon");
      var toast = document.getElementById("copyToast");

      function showFeedback(ok) {
        if (toast) { toast.textContent = ok ? "Copied!" : "Failed to copy"; toast.className = "copy-toast show" + (ok ? "" : " error"); }
        if (ok && icon) { icon.textContent = "check"; copyEmailBtn.classList.add("copied"); }
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(function () {
          if (toast) toast.className = "copy-toast";
          if (icon) icon.textContent = "content_copy";
          copyEmailBtn.classList.remove("copied");
        }, 2500);
      }

      function fallback() {
        var el = Object.assign(document.createElement("textarea"), { value: email, style: "position:fixed;left:-9999px" });
        document.body.appendChild(el); el.select();
        showFeedback(document.execCommand("copy"));
        document.body.removeChild(el);
      }

      (navigator.clipboard && window.isSecureContext)
        ? navigator.clipboard.writeText(email).then(function () { showFeedback(true); }).catch(fallback)
        : fallback();
    });
  }

  window.addEventListener('load', function () {
    var loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(function () { loader.remove(); }, 500);
    }
  });

  var zoomIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
  var arrowLeftSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
  var arrowRightSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>';

  var ssItems = document.querySelectorAll('.ss-item');
  if (ssItems.length > 0) {
    ssItems.forEach(function (item) {
      var img = item.querySelector('img');
      if (!img) return;

      var wrap = document.createElement('div');
      wrap.className = 'ss-img-wrap';

      var zoomIcon = document.createElement('div');
      zoomIcon.className = 'zoom-icon';
      zoomIcon.innerHTML = zoomIconSvg;

      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      wrap.appendChild(zoomIcon);

      wrap.classList.add('loading');
      function ssRemoveLoading() { wrap.classList.remove('loading'); }
      if (img.complete && img.naturalWidth > 0) { ssRemoveLoading(); }
      else { img.addEventListener('load', ssRemoveLoading); img.addEventListener('error', ssRemoveLoading); }

      wrap.addEventListener('click', function () {
        var allImgs = document.querySelectorAll('.ss-item img');
        var idx = 0;
        var imgs = [];
        allImgs.forEach(function (i, index) {
          imgs.push({ src: i.getAttribute('src'), alt: i.getAttribute('alt') || '' });
          if (i === img) idx = index;
        });
        openLightbox(imgs, idx);
      });
    });
  }

  var certCards = document.querySelectorAll('.cert-card');
  if (certCards.length > 0) {
    var certImgs = [];
    certCards.forEach(function (card) {
      var src = card.getAttribute('data-cert-src');
      var title = card.querySelector('.cert-title');
      if (src) {
        certImgs.push({
          src: src,
          alt: title ? title.textContent.trim() : ''
        });
      }
    });

    certCards.forEach(function (card, index) {
      card.addEventListener('click', function (e) {
        openLightbox(certImgs, index);
      });
    });
  }

  var heroImg = document.querySelector('.photo-container img');
  if (heroImg) {
    var heroWrap = heroImg.closest('.photo-container');
    heroWrap.classList.add('loading');
    function heroRemoveLoading() { heroWrap.classList.remove('loading'); }
    if (heroImg.complete && heroImg.naturalWidth > 0) { heroRemoveLoading(); }
    else { heroImg.addEventListener('load', heroRemoveLoading); heroImg.addEventListener('error', heroRemoveLoading); }
  }

  function openLightbox(images, index) {
    if (!images || images.length === 0) return;

    var existing = document.querySelector('.lightbox-overlay');
    if (existing) {
      if (typeof existing._cleanup === 'function') existing._cleanup();
      existing.remove();
    }

    document.body.classList.add('lightbox-open');

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    var stage = document.createElement('div');
    stage.className = 'lightbox-stage';

    var imgWrap = document.createElement('div');
    imgWrap.className = 'lightbox-img-wrap';

    var spinner = document.createElement('div');
    spinner.className = 'lightbox-spinner';

    var imgEl = document.createElement('img');
    imgEl.draggable = false;
    imgEl.alt = '';
    imgEl.className = 'loading';

    imgWrap.appendChild(spinner);
    imgWrap.appendChild(imgEl);
    stage.appendChild(imgWrap);

    var topBar = document.createElement('div');
    topBar.className = 'lightbox-top-bar';

    var topLeft = document.createElement('div');
    topLeft.className = 'lightbox-top-left';

    var counter = document.createElement('div');
    counter.className = 'lightbox-counter';

    var titleEl = document.createElement('div');
    titleEl.className = 'lightbox-title';

    topLeft.appendChild(counter);
    topLeft.appendChild(titleEl);

    var topRight = document.createElement('div');
    topRight.className = 'lightbox-top-right';

    var fsBtn = document.createElement('button');
    fsBtn.className = 'lightbox-icon-btn';
    fsBtn.setAttribute('aria-label', 'Toggle fullscreen');
    fsBtn.setAttribute('title', 'Fullscreen (F)');
    var fsExpandSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
    var fsCompressSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>';
    fsBtn.innerHTML = fsExpandSvg;

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-icon-btn';
    closeBtn.setAttribute('aria-label', 'Close viewer');
    closeBtn.setAttribute('title', 'Close (Esc)');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    topRight.appendChild(fsBtn);
    topRight.appendChild(closeBtn);

    topBar.appendChild(topLeft);
    topBar.appendChild(topRight);

    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav prev';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.setAttribute('title', 'Previous (Left Arrow)');
    prevBtn.innerHTML = arrowLeftSvg;

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav next';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.setAttribute('title', 'Next (Right Arrow)');
    nextBtn.innerHTML = arrowRightSvg;

    var bottomBar = document.createElement('div');
    bottomBar.className = 'lightbox-bottom-bar';

    var toolbar = document.createElement('div');
    toolbar.className = 'lightbox-toolbar';

    var zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'lightbox-tool-btn';
    zoomOutBtn.setAttribute('aria-label', 'Zoom out');
    zoomOutBtn.setAttribute('title', 'Zoom out (-)');
    zoomOutBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';

    var zoomDisplay = document.createElement('span');
    zoomDisplay.className = 'lightbox-zoom-display';
    zoomDisplay.textContent = '100%';

    var zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'lightbox-tool-btn';
    zoomInBtn.setAttribute('aria-label', 'Zoom in');
    zoomInBtn.setAttribute('title', 'Zoom in (+)');
    zoomInBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

    var divider = document.createElement('span');
    divider.className = 'lightbox-tool-divider';

    var resetBtn = document.createElement('button');
    resetBtn.className = 'lightbox-tool-btn reset-btn';
    resetBtn.setAttribute('aria-label', 'Reset zoom');
    resetBtn.setAttribute('title', 'Reset to fit (0)');
    resetBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg><span>1:1</span>';

    toolbar.appendChild(zoomOutBtn);
    toolbar.appendChild(zoomDisplay);
    toolbar.appendChild(zoomInBtn);
    toolbar.appendChild(divider);
    toolbar.appendChild(resetBtn);

    var strip = document.createElement('div');
    strip.className = 'lightbox-strip';
    var stripItems = [];
    var isThumbMode = images.length > 15;

    if (images.length > 1) {
      images.forEach(function (item, i) {
        var el;
        if (isThumbMode) {
          el = document.createElement('button');
          el.className = 'lightbox-thumb-item' + (i === index ? ' active' : '');
          el.setAttribute('aria-label', 'View ' + (item.alt || 'image ' + (i + 1)));
          var thumbImg = document.createElement('img');
          thumbImg.src = item.src;
          thumbImg.alt = item.alt || '';
          thumbImg.loading = 'lazy';
          el.appendChild(thumbImg);
        } else {
          el = document.createElement('button');
          el.className = 'lightbox-dot-item' + (i === index ? ' active' : '');
          el.setAttribute('aria-label', 'View ' + (item.alt || 'image ' + (i + 1)));
        }

        el.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(i);
        });

        strip.appendChild(el);
        stripItems.push(el);
      });
    }

    bottomBar.appendChild(toolbar);
    if (images.length > 1) {
      bottomBar.appendChild(strip);
    }

    overlay.appendChild(stage);
    overlay.appendChild(topBar);
    if (images.length > 1) {
      overlay.appendChild(prevBtn);
      overlay.appendChild(nextBtn);
    }
    overlay.appendChild(bottomBar);
    document.body.appendChild(overlay);

    var currentIndex = index;
    var scale = 1;
    var translateX = 0;
    var translateY = 0;
    var isDragging = false;
    var dragStartX = 0;
    var dragStartY = 0;
    var initialTranslateX = 0;
    var initialTranslateY = 0;
    var minScale = 0.5;
    var maxScale = 8;
    var currentLoadId = 0;

    function getBaseImageDimensions() {
      var w = imgEl.naturalWidth || 800;
      var h = imgEl.naturalHeight || 600;
      var maxW = window.innerWidth - 32;
      var maxH = window.innerHeight - 128;
      if (maxW <= 0) maxW = 300;
      if (maxH <= 0) maxH = 300;
      var ratio = Math.min(maxW / w, maxH / h, 1);
      return {
        width: w * ratio,
        height: h * ratio
      };
    }

    function clampTranslate() {
      if (scale <= 1) {
        translateX = 0;
        translateY = 0;
        return;
      }
      var dims = getBaseImageDimensions();
      var scaledW = dims.width * scale;
      var scaledH = dims.height * scale;
      var vw = window.innerWidth;
      var vh = window.innerHeight;

      var maxPanX = scaledW > vw ? (scaledW - vw) / 2 + 30 : 0;
      var maxPanY = scaledH > vh ? (scaledH - vh) / 2 + 30 : 0;

      translateX = Math.max(-maxPanX, Math.min(maxPanX, translateX));
      translateY = Math.max(-maxPanY, Math.min(maxPanY, translateY));
    }

    function applyTransform(animate) {
      if (scale > 1) {
        clampTranslate();
        stage.classList.add('is-zoomed');
      } else {
        translateX = 0;
        translateY = 0;
        stage.classList.remove('is-zoomed');
      }

      if (animate) {
        imgWrap.style.transition = 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)';
      } else {
        imgWrap.style.transition = 'none';
      }

      imgWrap.style.transform = 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ')';
      zoomDisplay.textContent = Math.round(scale * 100) + '%';
    }

    function zoomToPoint(newScale, focalX, focalY, animate) {
      newScale = Math.max(minScale, Math.min(maxScale, newScale));
      if (Math.abs(newScale - scale) < 0.001) return;

      var cx = focalX !== undefined ? focalX : window.innerWidth / 2;
      var cy = focalY !== undefined ? focalY : window.innerHeight / 2;

      var dx = cx - window.innerWidth / 2;
      var dy = cy - window.innerHeight / 2;

      var ratio = newScale / scale;
      translateX = dx - (dx - translateX) * ratio;
      translateY = dy - (dy - translateY) * ratio;
      scale = newScale;

      applyTransform(animate);
    }

    function zoomDelta(delta, focalX, focalY) {
      var nextScale = scale * (1 + delta);
      zoomToPoint(nextScale, focalX, focalY, true);
    }

    function resetZoom(animate) {
      scale = 1;
      translateX = 0;
      translateY = 0;
      applyTransform(animate !== false);
    }

    function updateHeaderAndStrip() {
      counter.innerHTML = '<span class="current">' + (currentIndex + 1) + '</span> / ' + images.length;
      var currentItem = images[currentIndex];
      titleEl.textContent = currentItem.alt || '';
      titleEl.title = currentItem.alt || '';

      stripItems.forEach(function (item, i) {
        if (i === currentIndex) {
          item.classList.add('active');
          if (typeof item.scrollIntoView === 'function') {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        } else {
          item.classList.remove('active');
        }
      });
    }

    function preloadSurroundings(idx) {
      if (images.length <= 1) return;
      var next = (idx + 1) % images.length;
      var prev = (idx - 1 + images.length) % images.length;
      var imgNext = new Image();
      imgNext.src = images[next].src;
      var imgPrev = new Image();
      imgPrev.src = images[prev].src;
    }

    function loadImage(idx) {
      var item = images[idx];
      resetZoom(false);
      updateHeaderAndStrip();

      currentLoadId++;
      var loadId = currentLoadId;

      imgEl.src = item.src;
      imgEl.alt = item.alt || '';

      if (imgEl.complete && imgEl.naturalWidth > 0) {
        imgWrap.classList.remove('is-loading');
        imgEl.classList.remove('loading');
        spinner.style.display = 'none';
      } else {
        imgWrap.classList.add('is-loading');
        imgEl.classList.add('loading');
        spinner.style.display = 'flex';

        imgEl.onload = function () {
          if (loadId !== currentLoadId) return;
          imgWrap.classList.remove('is-loading');
          imgEl.classList.remove('loading');
          spinner.style.display = 'none';
          preloadSurroundings(idx);
        };
        imgEl.onerror = function () {
          if (loadId !== currentLoadId) return;
          imgWrap.classList.remove('is-loading');
          imgEl.classList.remove('loading');
          spinner.style.display = 'none';
        };
      }

      preloadSurroundings(idx);
    }

    function goTo(idx) {
      if (idx < 0) idx = images.length - 1;
      if (idx >= images.length) idx = 0;
      if (idx === currentIndex) return;

      currentIndex = idx;
      loadImage(currentIndex);
    }

    var clickStartX = 0, clickStartY = 0, clickStartTime = 0;

    stage.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      clickStartTime = Date.now();

      if (scale > 1) {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        initialTranslateX = translateX;
        initialTranslateY = translateY;
        stage.classList.add('is-dragging');
        imgWrap.style.transition = 'none';
      }
    });

    function onMouseMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      var dx = e.clientX - dragStartX;
      var dy = e.clientY - dragStartY;
      translateX = initialTranslateX + dx;
      translateY = initialTranslateY + dy;
      applyTransform(false);
    }

    function onMouseUp(e) {
      if (isDragging) {
        isDragging = false;
        stage.classList.remove('is-dragging');
        applyTransform(true);
      } else {
        var dist = Math.hypot(e.clientX - clickStartX, e.clientY - clickStartY);
        var duration = Date.now() - clickStartTime;
        if (dist < 6 && duration < 260) {
          if (e.target === stage || e.target === imgWrap) {
            if (scale > 1.05) {
              resetZoom(true);
            }
          }
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    stage.addEventListener('dblclick', function (e) {
      e.preventDefault();
      if (scale > 1.05) {
        resetZoom(true);
      } else {
        zoomToPoint(2.5, e.clientX, e.clientY, true);
      }
    });

    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      var delta = e.deltaY < 0 ? 0.22 : -0.22;
      zoomDelta(delta, e.clientX, e.clientY);
    }, { passive: false });

    var touchStartX = 0, touchStartY = 0, touchStartTime = 0;
    var lastPinchDist = 0;
    var lastTapTime = 0;

    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();

        if (scale > 1) {
          isDragging = true;
          dragStartX = touchStartX;
          dragStartY = touchStartY;
          initialTranslateX = translateX;
          initialTranslateY = translateY;
          imgWrap.style.transition = 'none';
        }
      } else if (e.touches.length === 2) {
        isDragging = false;
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        lastPinchDist = Math.hypot(dx, dy);
      }
    }, { passive: true });

    stage.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1 && isDragging && scale > 1) {
        e.preventDefault();
        var dx = e.touches[0].clientX - dragStartX;
        var dy = e.touches[0].clientY - dragStartY;
        translateX = initialTranslateX + dx;
        translateY = initialTranslateY + dy;
        applyTransform(false);
      } else if (e.touches.length === 2) {
        e.preventDefault();
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        var dist = Math.hypot(dx, dy);
        if (lastPinchDist > 0) {
          var pinchRatio = (dist - lastPinchDist) / lastPinchDist;
          var midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          var midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          zoomDelta(pinchRatio * 1.5, midX, midY);
        }
        lastPinchDist = dist;
      }
    }, { passive: false });

    stage.addEventListener('touchend', function (e) {
      if (isDragging) {
        isDragging = false;
        applyTransform(true);
      }
      lastPinchDist = 0;

      if (e.changedTouches.length === 1) {
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        var diffX = endX - touchStartX;
        var diffY = endY - touchStartY;
        var time = Date.now() - touchStartTime;

        // Double-tap to zoom
        if (Math.hypot(diffX, diffY) < 12 && time < 250) {
          var now = Date.now();
          if (now - lastTapTime < 300) {
            if (scale > 1.05) {
              resetZoom(true);
            } else {
              zoomToPoint(2.5, endX, endY, true);
            }
            lastTapTime = 0;
            return;
          }
          lastTapTime = now;
        }

        if (scale <= 1.05 && images.length > 1 && Math.abs(diffX) > 48 && Math.abs(diffY) < 40 && time < 350) {
          if (diffX < 0) {
            goTo((currentIndex + 1) % images.length);
          } else {
            goTo((currentIndex - 1 + images.length) % images.length);
          }
        }
      }
    }, { passive: true });

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      goTo(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      goTo(currentIndex + 1);
    });

    zoomInBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      zoomDelta(0.3);
    });

    zoomOutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      zoomDelta(-0.3);
    });

    resetBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      resetZoom(true);
    });

    function isFullscreenActive() {
      return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    }

    function toggleFullscreen() {
      try {
        if (!isFullscreenActive()) {
          var el = document.documentElement;
          if (el.requestFullscreen) {
            el.requestFullscreen();
          } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      } catch (err) {}
    }

    fsBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleFullscreen();
    });

    function onFullscreenChange() {
      var active = isFullscreenActive();
      fsBtn.innerHTML = active ? fsCompressSvg : fsExpandSvg;
      requestAnimationFrame(function () {
        if (scale > 1) applyTransform(false);
      });
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('mozfullscreenchange', onFullscreenChange);

    function closeLightbox() {
      overlay.classList.remove('open');
      document.body.classList.remove('lightbox-open');
      if (isFullscreenActive() && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      }
      cleanup();
      setTimeout(function () {
        if (overlay.parentNode) overlay.remove();
      }, 250);
    }

    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeLightbox();
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });

    function onKeyDown(e) {
      if (!overlay.parentNode) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        e.preventDefault();
        goTo(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        e.preventDefault();
        goTo(currentIndex + 1);
      } else if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        zoomDelta(0.25);
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomDelta(-0.25);
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom(true);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    var resizeRaf = 0;
    function onWindowResize() {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(function () {
        if (scale > 1) {
          applyTransform(false);
        }
      });
    }
    window.addEventListener('resize', onWindowResize);

    function cleanup() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('mozfullscreenchange', onFullscreenChange);
      window.removeEventListener('resize', onWindowResize);
    }
    overlay._cleanup = cleanup;

    loadImage(currentIndex);
    requestAnimationFrame(function () {
      overlay.classList.add('open');
    });
  }
})();
