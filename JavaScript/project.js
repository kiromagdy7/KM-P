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

  // 4. MOTION SYSTEM FOR PROJECT PAGES
  var projectHeader = document.querySelector('.project-detail-header');
  if (projectHeader && !projectHeader.querySelector('.project-ambient-glow')) {
    var glow = document.createElement('div');
    glow.className = 'project-ambient-glow';
    glow.setAttribute('aria-hidden', 'true');
    glow.innerHTML = '<div class="glow-orb glow-orb-1"></div><div class="glow-orb glow-orb-2"></div>';
    projectHeader.insertBefore(glow, projectHeader.firstChild);
  }

  var revealHeaderSelectors = [
    { sel: '.project-breadcrumb', delay: 'project-reveal-delay-1' },
    { sel: '.project-meta-strip', delay: 'project-reveal-delay-1' },
    { sel: '.project-detail-left h1', delay: 'project-reveal-delay-2' },
    { sel: '.project-desc-text', delay: 'project-reveal-delay-3' },
    { sel: '.project-tech-strip', delay: 'project-reveal-delay-4' },
    { sel: '.project-actions', delay: 'project-reveal-delay-3' },
    { sel: '.ss-meta-grid', delay: 'project-reveal-delay-4' }
  ];

  revealHeaderSelectors.forEach(function (item) {
    var el = document.querySelector(item.sel);
    if (el) {
      el.classList.add('project-reveal', item.delay);
    }
  });

  function triggerProjectLoaded() {
    document.body.classList.add('project-loaded');
  }

  var loader = document.getElementById('pageLoader');
  if (!loader || loader.classList.contains('hidden')) {
    triggerProjectLoaded();
  } else {
    window.addEventListener('load', function () {
      setTimeout(triggerProjectLoaded, 80);
    });
    setTimeout(triggerProjectLoaded, 1200);
  }

  var sectionHeaders = document.querySelectorAll('.highlights-header, .ss-header, .more-header');
  sectionHeaders.forEach(function (h) {
    h.classList.add('scroll-reveal');
  });

  var highlightCards = document.querySelectorAll('.highlight-card');
  highlightCards.forEach(function (c, i) {
    c.classList.add('interactive-card', 'scroll-reveal');
    c.style.setProperty('--reveal-delay', (i % 3) + 1);
  });

  var matrixCards = document.querySelectorAll('.matrix-card');
  matrixCards.forEach(function (m, i) {
    m.classList.add('interactive-card', 'scroll-reveal');
    m.style.setProperty('--reveal-delay', (i % 4) + 1);
  });

  var ssFrames = document.querySelectorAll('.ss-item');
  ssFrames.forEach(function (s, i) {
    s.classList.add('scroll-reveal');
    s.style.setProperty('--reveal-delay', (i % 2) + 1);
    var frame = s.querySelector('.ss-window-frame');
    if (frame) frame.classList.add('interactive-card');
  });

  var moreCards = document.querySelectorAll('.more-card');
  moreCards.forEach(function (mc, i) {
    mc.classList.add('interactive-card', 'scroll-reveal');
    mc.style.setProperty('--reveal-delay', (i % 3) + 1);
  });

  var scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window && scrollRevealElements.length > 0) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    scrollRevealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    scrollRevealElements.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  var isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var interactiveCards = document.querySelectorAll('.interactive-card');

  if (isFinePointer && interactiveCards.length > 0) {
    var maxTilt = 4.0;

    interactiveCards.forEach(function (card) {
      var rafId = null;
      var targetTiltX = 0;
      var targetTiltY = 0;
      var targetMouseX = 50;
      var targetMouseY = 50;

      function updateCardTransform() {
        card.style.setProperty('--tilt-x', targetTiltX.toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', targetTiltY.toFixed(2) + 'deg');
        card.style.setProperty('--mouse-x', targetMouseX.toFixed(1) + '%');
        card.style.setProperty('--mouse-y', targetMouseY.toFixed(1) + '%');
        rafId = null;
      }

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var pctX = (x / rect.width);
        var pctY = (y / rect.height);

        targetMouseX = pctX * 100;
        targetMouseY = pctY * 100;

        targetTiltY = (pctX - 0.5) * (maxTilt * 2);
        targetTiltX = (0.5 - pctY) * (maxTilt * 2);

        if (!rafId) {
          rafId = requestAnimationFrame(updateCardTransform);
        }
      });

      card.addEventListener('mouseleave', function () {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
      });
    });
  }

  var magneticTargets = document.querySelectorAll('.action-btn.primary, .action-btn.secondary, .action-btn.share-btn');
  if (isFinePointer && magneticTargets.length > 0) {
    magneticTargets.forEach(function (btn) {
      var btnRaf = null;

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
        var dy = (e.clientY - (rect.top + rect.height / 2)) * 0.15;

        dx = Math.max(-6, Math.min(6, dx));
        dy = Math.max(-6, Math.min(6, dy));

        if (!btnRaf) {
          btnRaf = requestAnimationFrame(function () {
            btn.style.transform = 'translate3d(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px, 0)';
            btnRaf = null;
          });
        }
      });

      btn.addEventListener('mouseleave', function () {
        if (btnRaf) cancelAnimationFrame(btnRaf);
        btn.style.transform = '';
      });
    });
  }
})();