/* TRAPEZ RESTAURANT — MAIN JAVASCRIPT */

/* ---------------------------------------------------------- */
/*  STATE                                                       */
/* ---------------------------------------------------------- */
let currentLang = localStorage.getItem('trapez-lang') || 'de';
let lightboxImages = [];
let lightboxIndex = 0;
let reviewsData = null;

/* ---------------------------------------------------------- */
/*  DOM READY                                                   */
/* ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlideshow();
  initNavbar();
  initLanguage();
  initReviews();
  initReservationForm();
  initGallery();
  initScrollReveal();
});

/* ---------------------------------------------------------- */
/*  HERO SLIDESHOW (Ken Burns)                                 */
/* ---------------------------------------------------------- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  const INTERVAL = 6000;
  let current = 0;
  let timer = null;

  function advance() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  function start() {
    if (!timer) timer = setInterval(advance, INTERVAL);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  start();

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });
}

/* ---------------------------------------------------------- */
/*  NAVBAR                                                     */
/* ---------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll effect
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    highlightActiveSection();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger / mobile menu open-close
  const ham = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-menu');

  function openMenu() {
    ham && ham.classList.add('open');
    menu && menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    ham && ham.classList.remove('open');
    menu && menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (ham && menu) {
    ham.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  // Close mobile menu on link click (Angebot toggle handled separately below)
  document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Angebot dropdown — desktop: hover (CSS) + click-through to #angebot.
  // Mobile: tap toggles the submenu open/closed instead of navigating.
  const angebotDropdown = document.querySelector('.nav-dropdown');
  const angebotToggle = angebotDropdown?.querySelector('.nav-dropdown-toggle');
  const isMobileNav = () => window.matchMedia('(max-width: 900px)').matches;

  if (angebotDropdown && angebotToggle) {
    angebotToggle.addEventListener('click', e => {
      if (!isMobileNav()) return; // desktop: hover opens it, click navigates as usual
      e.preventDefault();
      e.stopImmediatePropagation(); // prevent the smooth-scroll handler below from also firing
      const isOpen = angebotDropdown.classList.toggle('open');
      angebotToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', e => {
      if (!angebotDropdown.contains(e.target)) {
        angebotDropdown.classList.remove('open');
        angebotToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Submenu link click: scroll to section (generic handler below) + close everything.
    // On desktop the menu is shown via :hover/:focus-within, so removing 'open' alone
    // wouldn't close it while the mouse is still over the dropdown — force-closed
    // overrides that until the mouse actually leaves the dropdown area.
    angebotDropdown.querySelectorAll('.nav-dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        angebotDropdown.classList.remove('open');
        angebotToggle.setAttribute('aria-expanded', 'false');
        angebotDropdown.classList.add('force-closed');
        link.blur();
        closeMenu();
      });
    });

    angebotDropdown.addEventListener('mouseleave', () => {
      angebotDropdown.classList.remove('force-closed');
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* Highlight active nav link based on scroll position */
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

/* ---------------------------------------------------------- */
/*  LANGUAGE SWITCHING                                         */
/* ---------------------------------------------------------- */
document.addEventListener('langchange', e => {
  currentLang = e.detail.lang;
  renderReviews(currentLang);
});

function initLanguage() {
  const toggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');

  toggle?.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = langMenu.classList.contains('open');
    langMenu.classList.toggle('open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', e => {
    const dropdown = document.querySelector('.lang-dropdown');
    if (!dropdown?.contains(e.target)) {
      langMenu?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      if (window.switchLanguage) window.switchLanguage(opt.dataset.lang);
      langMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');

      // Close mobile nav menu too (same logic as .nav-link click handler)
      const ham = document.getElementById('nav-hamburger');
      const menu = document.getElementById('nav-menu');
      ham && ham.classList.remove('open');
      menu && menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------------------------------------------------------- */
/*  REVIEWS (from data/reviews.json)                          */
/* ---------------------------------------------------------- */
function initReviews() {
  fetch('data/reviews.json')
    .then(r => r.json())
    .then(data => {
      reviewsData = data;
      renderReviews(currentLang);
    });
}

function renderReviews(lang) {
  const el = document.getElementById('reviews-container');
  if (!el || !reviewsData) return;

  const visible = reviewsData.bewertungen
    .filter(r => r.sichtbar !== false);

  el.innerHTML = visible.map(r => {
    const text  = r[`text_${lang}`]  || r.text_de  || '';
    const datum = r[`datum_${lang}`] || r.datum_de || '';
    return `
    <div class="review-card reveal">
      <div class="review-stars">${'★'.repeat(r.sterne)}${'☆'.repeat(5 - r.sterne)}</div>
      <p class="review-text">${escHtml(text)}</p>
      <div class="review-footer">
        <span class="review-name">${escHtml(r.name)}</span>
        <span class="review-date">${escHtml(datum)}</span>
      </div>
    </div>`;
  }).join('');

  observeReveal();
}

function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ---------------------------------------------------------- */
/*  GALLERY LIGHTBOX                                           */
/* ---------------------------------------------------------- */
function initGallery() {
  lightboxImages = [];
  document.querySelectorAll('.amb-item').forEach((item, i) => {
    const src = item.querySelector('img')?.getAttribute('src');
    if (src) lightboxImages.push(src);
    item.addEventListener('click', () => openLightbox(i));
  });

  // Lightbox controls
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lb-prev')?.addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lb-next')?.addEventListener('click', () => navigateLightbox(1));

  lb.addEventListener('click', e => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  if (!lightboxImages.length) return;
  lightboxIndex = index;
  updateLightboxImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const img = document.getElementById('lb-image');
  const counter = document.getElementById('lb-counter');
  if (img) {
    img.style.opacity = '0';
    img.src = lightboxImages[lightboxIndex];
    img.onload = () => { img.style.opacity = '1'; };
  }
  if (counter) {
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }
}

/* ---------------------------------------------------------- */
/*  RESERVATION FORM VALIDATION                               */
/* ---------------------------------------------------------- */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  // Set min date to today
  const dateInput = document.getElementById('input-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  form.addEventListener('submit', e => {
    let valid = true;

    const required = [
      { id: 'input-vorname',  errId: 'error-vorname',  msg: 'Bitte Vorname eingeben.' },
      { id: 'input-nachname', errId: 'error-nachname', msg: 'Bitte Nachname eingeben.' },
      { id: 'input-email',    errId: 'error-email',    msg: 'Bitte gültige E-Mail eingeben.' },
      { id: 'input-date',     errId: 'error-date',     msg: 'Bitte Datum wählen.' },
      { id: 'input-time',     errId: 'error-time',     msg: 'Bitte Uhrzeit wählen.' },
      { id: 'input-guests',   errId: 'error-guests',   msg: 'Bitte Personenanzahl wählen.' },
    ];

    required.forEach(({ id, errId, msg }) => {
      const el = document.getElementById(id);
      const err = document.getElementById(errId);
      if (!el) return;
      const empty = !el.value.trim();
      const emailErr = id === 'input-email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
      if (empty || emailErr) {
        if (err) { err.textContent = emailErr ? 'Ungültige E-Mail-Adresse.' : msg; err.style.display = 'block'; }
        el.classList.add('input-error');
        valid = false;
      } else {
        if (err) { err.textContent = ''; err.style.display = 'none'; }
        el.classList.remove('input-error');
      }
    });

    // Datenschutz checkbox
    const dsz = document.getElementById('input-datenschutz');
    const dszErr = document.getElementById('error-datenschutz');
    if (dsz && !dsz.checked) {
      if (dszErr) { dszErr.textContent = 'Bitte Datenschutzerklärung akzeptieren.'; dszErr.style.display = 'block'; }
      valid = false;
    } else if (dszErr) {
      dszErr.textContent = ''; dszErr.style.display = 'none';
    }

    if (!valid) e.preventDefault();
  });

  // Clear errors on input
  form.querySelectorAll('.form-input, .form-select').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('input-error');
      const errId = el.id.replace('input-', 'error-');
      const err = document.getElementById(errId);
      if (err) { err.textContent = ''; err.style.display = 'none'; }
    });
  });
}

/* ---------------------------------------------------------- */
/*  SCROLL REVEAL ANIMATIONS                                   */
/* ---------------------------------------------------------- */
function initScrollReveal() {
  observeReveal();
}

function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}


