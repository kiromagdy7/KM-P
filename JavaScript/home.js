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
})();