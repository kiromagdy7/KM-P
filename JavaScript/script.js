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

  var heroImg = document.querySelector('.photo-container img');
  if (heroImg) {
    var heroWrap = heroImg.closest('.photo-container');
    heroWrap.classList.add('loading');
    function heroRemoveLoading() { heroWrap.classList.remove('loading'); }
    if (heroImg.complete && heroImg.naturalWidth > 0) { heroRemoveLoading(); }
    else { heroImg.addEventListener('load', heroRemoveLoading); heroImg.addEventListener('error', heroRemoveLoading); }
  }

  function openLightbox(images, index) {
    var existing = document.querySelector('.lightbox-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    var topBar = document.createElement('div');
    topBar.className = 'lightbox-top-bar';

    var counter = document.createElement('div');
    counter.className = 'lightbox-counter';
    counter.innerHTML = '<span class="current">' + (index + 1) + '</span> / ' + images.length;

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    topBar.appendChild(counter);
    topBar.appendChild(closeBtn);

    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-nav prev';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = arrowLeftSvg;

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-nav next';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = arrowRightSvg;

    var imgWrap = document.createElement('div');
    imgWrap.className = 'lightbox-img-wrap';

    var spinner = document.createElement('div');
    spinner.className = 'lightbox-spinner';

    var imgEl = document.createElement('img');
    imgEl.draggable = false;
    imgEl.classList.add('loading');

    imgWrap.appendChild(spinner);
    imgWrap.appendChild(imgEl);

    var bottomBar = document.createElement('div');
    bottomBar.className = 'lightbox-bottom-bar';

    var zoomOutBtn = document.createElement('button');
    zoomOutBtn.className = 'lightbox-btn';
    zoomOutBtn.textContent = '\u2212';
    zoomOutBtn.setAttribute('aria-label', 'Zoom out');

    var zoomResetBtn = document.createElement('button');
    zoomResetBtn.className = 'lightbox-btn zoom-reset';
    zoomResetBtn.innerHTML = '\u21BA <span style="font-size:11px;opacity:0.6">Reset</span>';

    var zoomInBtn = document.createElement('button');
    zoomInBtn.className = 'lightbox-btn';
    zoomInBtn.textContent = '+';
    zoomInBtn.setAttribute('aria-label', 'Zoom in');

    var zoomDivider = document.createElement('span');
    zoomDivider.className = 'lightbox-zoom-divider';

    var zoomLabel = document.createElement('span');
    zoomLabel.className = 'lightbox-zoom-label';
    zoomLabel.textContent = '100%';

    bottomBar.appendChild(zoomOutBtn);
    bottomBar.appendChild(zoomResetBtn);
    bottomBar.appendChild(zoomInBtn);
    bottomBar.appendChild(zoomDivider);
    bottomBar.appendChild(zoomLabel);

    var dotsWrap = document.createElement('div');
    dotsWrap.className = 'lightbox-dots';
    var dots = [];
    if (images.length > 1) {
      for (var d = 0; d < images.length; d++) {
        var dot = document.createElement('button');
        dot.className = 'lightbox-dot' + (d === index ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to image ' + (d + 1));
        (function (idx) {
          dot.addEventListener('click', function (e) {
            e.stopPropagation();
            goTo(idx);
          });
        })(d);
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    overlay.appendChild(topBar);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    overlay.appendChild(imgWrap);
    overlay.appendChild(bottomBar);
    overlay.appendChild(dotsWrap);
    document.body.appendChild(overlay);

    var currentIndex = index;
    var scale = 1;
    var translateX = 0;
    var translateY = 0;
    var isDragging = false;
    var startX, startY;
    var minScale = 0.5;
    var maxScale = 10;
    var isTransitioning = false;
    var hideTimer = null;
    var controlsVisible = true;

    function showControls() {
      controlsVisible = true;
      bottomBar.classList.remove('hidden');
      dotsWrap.classList.remove('hidden');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!isDragging && scale <= 1) {
          controlsVisible = false;
          bottomBar.classList.add('hidden');
          dotsWrap.classList.add('hidden');
        }
      }, 3000);
    }

    function showControlsOnce() {
      controlsVisible = true;
      bottomBar.classList.remove('hidden');
      dotsWrap.classList.remove('hidden');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (scale <= 1) {
          controlsVisible = false;
          bottomBar.classList.add('hidden');
          dotsWrap.classList.add('hidden');
        }
      }, 3000);
    }

    function goTo(idx) {
      if (isTransitioning || idx === currentIndex) return;
      isTransitioning = true;
      currentIndex = idx;
      loadImage(idx);
    }

    function loadImage(idx) {
      var imgData = images[idx];
      scale = 1;
      translateX = 0;
      translateY = 0;
      zoomLabel.textContent = '100%';
      imgEl.style.transform = '';
      imgEl.classList.add('loading');
      imgEl.style.cursor = 'grab';

      counter.innerHTML = '<span class="current">' + (idx + 1) + '</span> / ' + images.length;

      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
      });

      imgEl.style.opacity = '0';

      var tempImg = new Image();
      tempImg.onload = function () {
        imgEl.src = src;
        imgEl.alt = imgData.alt;
        imgEl.style.opacity = '1';
        imgEl.classList.remove('loading');
        applyTransform();
        isTransitioning = false;
      };
      tempImg.onerror = function () {
        imgEl.src = src;
        imgEl.alt = imgData.alt;
        imgEl.style.opacity = '1';
        imgEl.classList.remove('loading');
        applyTransform();
        isTransitioning = false;
      };
      var src = imgData.src;
      tempImg.src = src;
      imgEl.src = src;
      imgEl.alt = imgData.alt;
    }

    function clampTranslate() {
      var rect = imgEl.getBoundingClientRect();
      var parentRect = imgWrap.getBoundingClientRect();
      var maxX = Math.max(0, (rect.width * scale - parentRect.width) / 2);
      var maxY = Math.max(0, (rect.height * scale - parentRect.height) / 2);
      translateX = Math.max(-maxX, Math.min(maxX, translateX));
      translateY = Math.max(-maxY, Math.min(maxY, translateY));
    }

    function applyTransform() {
      if (scale > 1) clampTranslate();
      imgEl.style.transform = 'translate(' + translateX + 'px,' + translateY + 'px) scale(' + scale + ')';
      zoomLabel.textContent = Math.round(scale * 100) + '%';
    }

    function zoomAtPoint(newScale, cx, cy) {
      var rect = imgEl.getBoundingClientRect();
      var ox = cx - rect.left;
      var oy = cy - rect.top;
      var ratio = newScale / scale;
      translateX = (cx - rect.left - ox * ratio) + (rect.width - rect.width * ratio) / 2;
      translateY = (cy - rect.top - oy * ratio) + (rect.height - rect.height * ratio) / 2;
      scale = newScale;
      applyTransform();
    }

    function zoomDelta(delta, cx, cy) {
      var newScale = scale * (1 + delta);
      newScale = Math.max(minScale, Math.min(maxScale, newScale));
      if (newScale !== scale) {
        zoomAtPoint(newScale, cx || window.innerWidth / 2, cy || window.innerHeight / 2);
        showControlsOnce();
      }
    }

    function toggleZoom(cx, cy) {
      if (scale > 1.1) {
        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();
        showControlsOnce();
      } else {
        zoomAtPoint(2.5, cx, cy);
        showControlsOnce();
      }
    }

    loadImage(currentIndex);

    requestAnimationFrame(function () {
      overlay.classList.add('open');
      showControls();
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    closeBtn.addEventListener('click', closeLightbox);

    function closeLightbox() {
      overlay.classList.remove('open');
      setTimeout(function () { overlay.remove(); }, 400);
    }

    if (images.length > 1) {
      prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        goTo((currentIndex - 1 + images.length) % images.length);
      });
      nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        goTo((currentIndex + 1) % images.length);
      });
    } else {
      prevBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
    }

    zoomInBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      zoomDelta(0.25);
    });

    zoomOutBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      zoomDelta(-0.25);
    });

    zoomResetBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      scale = 1;
      translateX = 0;
      translateY = 0;
      applyTransform();
      showControlsOnce();
    });

    imgWrap.addEventListener('wheel', function (e) {
      e.preventDefault();
      var delta = e.deltaY > 0 ? -0.12 : 0.12;
      zoomDelta(delta, e.clientX, e.clientY);
    }, { passive: false });

    overlay.addEventListener('mousemove', function () {
      showControls();
    });

    imgEl.addEventListener('dblclick', function (e) {
      e.preventDefault();
      toggleZoom(e.clientX, e.clientY);
    });

    var clickStartX, clickStartY, clickTime;
    imgEl.addEventListener('mousedown', function (e) {
      clickStartX = e.clientX;
      clickStartY = e.clientY;
      clickTime = Date.now();
      if (scale <= 1) return;
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      imgEl.classList.add('dragging');
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      applyTransform();
    });

    document.addEventListener('mouseup', function (e) {
      if (isDragging) {
        isDragging = false;
        imgEl.classList.remove('dragging');
        var dist = Math.abs(e.clientX - clickStartX) + Math.abs(e.clientY - clickStartY);
        if (dist < 10 && Date.now() - clickTime < 200 && scale <= 1) {
          toggleZoom(e.clientX, e.clientY);
        }
      }
    });

    var lastTouchDist = 0;
    var touchStartX, touchStartY, touchStartTime;
    var swipeStartX;

    imgEl.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      swipeStartX = e.touches[0].clientX;

      if (e.touches.length === 1 && scale > 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
        imgEl.classList.add('dragging');
      }
      if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        lastTouchDist = Math.sqrt(dx * dx + dy * dy);
      }
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        if (isDragging) {
          translateX = e.touches[0].clientX - startX;
          translateY = e.touches[0].clientY - startY;
          applyTransform();
        }
      }
      if (e.touches.length === 2) {
        e.preventDefault();
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (lastTouchDist > 0) {
          var pinchDelta = (dist - lastTouchDist) / lastTouchDist;
          var midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
          var midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
          zoomDelta(pinchDelta, midX, midY);
        }
        lastTouchDist = dist;
      }
    }, { passive: false });

    document.addEventListener('touchend', function (e) {
      if (isDragging) {
        isDragging = false;
        imgEl.classList.remove('dragging');
      }
      lastTouchDist = 0;

      var dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      var dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      var dt = Date.now() - touchStartTime;

      if (dx < 10 && dy < 10 && dt < 200) {
        if (scale <= 1) {
          toggleZoom(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
      }

      if (images.length > 1 && scale <= 1 && dx > 60 && dy < 40) {
        if (e.changedTouches[0].clientX - swipeStartX < -30) {
          goTo((currentIndex + 1) % images.length);
        } else if (e.changedTouches[0].clientX - swipeStartX > 30) {
          goTo((currentIndex - 1 + images.length) % images.length);
        }
      }
    }, { passive: true });

    document.addEventListener('keydown', function onKey(e) {
      if (!overlay.parentNode) {
        document.removeEventListener('keydown', onKey);
        return;
      }
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        e.preventDefault();
        goTo((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        e.preventDefault();
        goTo((currentIndex + 1) % images.length);
      }
      if (e.key === '=' || e.key === '+') { e.preventDefault(); zoomDelta(0.25); }
      if (e.key === '-') { e.preventDefault(); zoomDelta(-0.25); }
      if (e.key === '0') { e.preventDefault(); scale = 1; translateX = 0; translateY = 0; applyTransform(); showControlsOnce(); }
    });
  }
})();
