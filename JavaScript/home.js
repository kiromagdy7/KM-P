(function () {
  var navLinks = document.querySelectorAll("[data-section]");
  var sections = document.querySelectorAll("section[id]");
  var contactForm = document.getElementById("contactForm");
  var submitBtn = document.getElementById("submitBtn");

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

  var heroImg = document.querySelector('.photo-container img');
  if (heroImg) {
    var heroWrap = heroImg.closest('.photo-container');
    heroWrap.classList.add('loading');
    function heroRemoveLoading() { heroWrap.classList.remove('loading'); }
    if (heroImg.complete && heroImg.naturalWidth > 0) { heroRemoveLoading(); }
    else { heroImg.addEventListener('load', heroRemoveLoading); heroImg.addEventListener('error', heroRemoveLoading); }
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
        if (typeof window.openLightbox === 'function') {
          window.openLightbox(certImgs, index);
        }
      });
    });
  }

  // MOTION SYSTEM 
  // 1. Hero Entrance Choreography
  function triggerHeroLoaded() {
    document.body.classList.add('hero-loaded');
  }
  var loader = document.getElementById('pageLoader');
  if (!loader || loader.classList.contains('hidden')) {
    triggerHeroLoaded();
  } else {
    window.addEventListener('load', function () {
      setTimeout(triggerHeroLoaded, 120);
    });
    setTimeout(triggerHeroLoaded, 1400);
  }

  // 2. Scroll-Driven Reveal System
  var revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealElements.forEach(function (el) {
        el.classList.add('in-view');
      });
    }
  }

  // 3. Live Animated Stats Counter
  var statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    var counterRan = false;
    function runStatsCounter() {
      if (counterRan) return;
      counterRan = true;

      var numbers = statsSection.querySelectorAll('.stat-number[data-target]');
      numbers.forEach(function (numEl) {
        var target = parseInt(numEl.getAttribute('data-target'), 10);
        var suffix = numEl.getAttribute('data-suffix') || '';
        if (isNaN(target)) return;

        var duration = 1600;
        var startTime = null;

        function easeOutCubic(t) {
          return 1 - Math.pow(1 - t, 3);
        }

        function countStep(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsed = timestamp - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var current = Math.round(easeOutCubic(progress) * target);

          numEl.innerHTML = current + '<span class="suffix">' + suffix + '</span>';

          if (progress < 1) {
            requestAnimationFrame(countStep);
          }
        }

        requestAnimationFrame(countStep);
      });
    }

    if ('IntersectionObserver' in window) {
      var statsObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runStatsCounter();
            obs.disconnect();
          }
        });
      }, { threshold: 0.25 });
      statsObserver.observe(statsSection);
    } else {
      runStatsCounter();
    }
  }

  // 4. Interactive Cards
  var isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var interactiveCards = document.querySelectorAll('.interactive-card');

  if (isFinePointer && interactiveCards.length > 0) {
    interactiveCards.forEach(function (card) {
      var rect = null;
      var rafId = null;

      function updateRect() {
        rect = card.getBoundingClientRect();
      }

      card.addEventListener('mouseenter', updateRect, { passive: true });

      card.addEventListener('mousemove', function (e) {
        if (!rect) rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(function () {
          card.style.setProperty('--mouse-x', x + 'px');
          card.style.setProperty('--mouse-y', y + 'px');

          var centerX = rect.width / 2;
          var centerY = rect.height / 2;
          var rotX = -((y - centerY) / centerY) * 4.5;
          var rotY = ((x - centerX) / centerX) * 4.5;

          card.style.setProperty('--tilt-x', rotX.toFixed(2) + 'deg');
          card.style.setProperty('--tilt-y', rotY.toFixed(2) + 'deg');
        });
      }, { passive: true });

      card.addEventListener('mouseleave', function () {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        rect = null;
      }, { passive: true });
    });
  }

  // 5. Magnetic Micro-Interactions
  var magneticElements = document.querySelectorAll('.social-link, .btn-fill');
  if (isFinePointer && magneticElements.length > 0) {
    magneticElements.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - (rect.left + rect.width / 2);
        var y = e.clientY - (rect.top + rect.height / 2);
        var pullX = x * 0.16;
        var pullY = y * 0.16;
        el.style.transform = 'translate(' + pullX.toFixed(1) + 'px, ' + pullY.toFixed(1) + 'px)';
      }, { passive: true });

      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      }, { passive: true });
    });
  }
})();