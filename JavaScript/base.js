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
})();
