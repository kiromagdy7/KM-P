(function () {
  var zoomIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';

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

      wrap.addEventListener('click', function (e) {
        if (e && e.target && (e.target.closest('.img-fallback-retry') || wrap.classList.contains('has-error'))) return;
        var visibleImgs = document.querySelectorAll('.ss-item:not(.is-hidden) img');
        var idx = 0;
        var imgs = [];
        visibleImgs.forEach(function (i, index) {
          imgs.push({ src: i.getAttribute('src'), alt: i.getAttribute('alt') || '' });
          if (i === img) idx = index;
        });
        if (typeof window.openLightbox === 'function') {
          window.openLightbox(imgs, idx);
        }
      });
    });
  }

  // 1. Gallery Filtering & Search
  var galleryToolbar = document.querySelector('.gallery-toolbar');
  if (galleryToolbar) {
    var filterBtns = document.querySelectorAll('.gallery-filter-btn');
    var searchInput = document.querySelector('.gallery-search-input');
    var statusCount = document.querySelector('.gallery-count-text');
    var allSsItems = document.querySelectorAll('.ss-item');
    var activeCategory = 'all';
    var searchQuery = '';

    var allFilterBtn = document.querySelector('.gallery-filter-btn[data-filter="all"]');
    if (allFilterBtn) {
      allFilterBtn.textContent = 'All (' + allSsItems.length + ')';
    }

    function filterGallery() {
      var visibleCount = 0;
      allSsItems.forEach(function (item) {
        var itemCat = (item.getAttribute('data-category') || '').toLowerCase();
        var titleEl = item.querySelector('.ss-window-title') || item.querySelector('.ss-label');
        var itemTitle = (titleEl ? titleEl.textContent : '').toLowerCase();
        var imgEl = item.querySelector('img');
        var imgAlt = (imgEl && imgEl.alt ? imgEl.alt : '').toLowerCase();

        var matchCat = (activeCategory === 'all' || itemCat === activeCategory);
        var matchSearch = (!searchQuery || itemTitle.indexOf(searchQuery) !== -1 || imgAlt.indexOf(searchQuery) !== -1);

        if (matchCat && matchSearch) {
          item.classList.remove('is-hidden');
          visibleCount++;
        } else {
          item.classList.add('is-hidden');
        }
      });

      if (statusCount) {
        statusCount.textContent = 'Showing ' + visibleCount + ' of ' + allSsItems.length + ' screens';
      }
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        activeCategory = (btn.getAttribute('data-filter') || 'all').toLowerCase();
        filterGallery();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        filterGallery();
      });
    }
  }

  // 2. Copy Project Link & Toast
  function showToast(msg) {
    var toast = document.getElementById('projectToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'projectToast';
      toast.className = 'project-toast';
      toast.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span id="toastMsg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('#toastMsg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2800);
  }

  var shareBtns = document.querySelectorAll('.share-btn');
  shareBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showToast('Project link copied to clipboard!');
        }).catch(function () {
          fallbackCopy(url);
        });
      } else {
        fallbackCopy(url);
      }
    });
  });

  function fallbackCopy(text) {
    var temp = document.createElement('input');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      showToast('Project link copied to clipboard!');
    } catch (err) {
      showToast('Link: ' + text);
    }
    document.body.removeChild(temp);
  }

  // 3. Project Subnav: Drag-to-scroll, Wheel Scroll & Scrollspy
  var subnavContainer = document.querySelector('.project-subnav-links');
  var subnavLinks = document.querySelectorAll('.project-subnav-link');

  function scrollSubnavIntoView(linkEl) {
    if (!subnavContainer || !linkEl) return;
    var containerWidth = subnavContainer.clientWidth;
    var linkLeft = linkEl.offsetLeft;
    var linkWidth = linkEl.offsetWidth;
    var targetScroll = linkLeft - (containerWidth / 2) + (linkWidth / 2);
    subnavContainer.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    });
  }

  if (subnavContainer) {
    var isSubnavDown = false;
    var subnavStartX = 0;
    var subnavScrollLeft = 0;
    var subnavHasMoved = false;

    subnavContainer.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      isSubnavDown = true;
      subnavHasMoved = false;
      subnavContainer.classList.add('is-dragging');
      subnavStartX = e.pageX - subnavContainer.offsetLeft;
      subnavScrollLeft = subnavContainer.scrollLeft;
    });

    window.addEventListener('mousemove', function (e) {
      if (!isSubnavDown) return;
      var x = e.pageX - subnavContainer.offsetLeft;
      var walk = x - subnavStartX;
      if (Math.abs(walk) > 4) {
        subnavHasMoved = true;
      }
      subnavContainer.scrollLeft = subnavScrollLeft - walk;
    });

    window.addEventListener('mouseup', function () {
      if (!isSubnavDown) return;
      isSubnavDown = false;
      subnavContainer.classList.remove('is-dragging');
    });

    subnavContainer.addEventListener('click', function (e) {
      if (subnavHasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    subnavContainer.addEventListener('wheel', function (e) {
      if (e.deltaY !== 0 && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        if (subnavContainer.scrollWidth > subnavContainer.clientWidth) {
          e.preventDefault();
          subnavContainer.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });
  }

  if (subnavLinks.length > 0) {
    var subnavSections = [];
    subnavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var sec = document.querySelector(href);
        if (sec) subnavSections.push({ link: link, el: sec });
      }

      link.addEventListener('click', function () {
        scrollSubnavIntoView(link);
      });
    });

    if (subnavSections.length > 0) {
      var currentActiveSubnavLink = null;
      window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 140;
        for (var i = subnavSections.length - 1; i >= 0; i--) {
          var item = subnavSections[i];
          if (scrollPos >= item.el.offsetTop) {
            if (currentActiveSubnavLink !== item.link) {
              subnavLinks.forEach(function (l) { l.classList.remove('active'); });
              item.link.classList.add('active');
              currentActiveSubnavLink = item.link;
              scrollSubnavIntoView(item.link);
            }
            break;
          }
        }
      }, { passive: true });
    }
  }
})();