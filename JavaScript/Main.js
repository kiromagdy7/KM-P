// Fallback bundle for backwards compatibility
(function () {
  function loadScript(src) {
    var s = document.createElement('script');
    s.src = src;
    s.async = false;
    document.head.appendChild(s);
  }
  loadScript('/JavaScript/base.js');
  loadScript('/JavaScript/lightbox.js');
  loadScript('/JavaScript/home.js');
  loadScript('/JavaScript/project.js');
})();
