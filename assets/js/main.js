/* TRAPEZ RESTAURANT — MAIN JAVASCRIPT */

/* ---------------------------------------------------------- */
/*  STATE                                                       */
/* ---------------------------------------------------------- */
let currentLang = localStorage.getItem('trapez-lang') || 'de';
let lightboxImages = [];
let lightboxIndex = 0;
let menuJsonData = null;
let reviewsData = null;

/* ---------------------------------------------------------- */
/*  DOM READY                                                   */
/* ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlideshow();
  initNavbar();
  initLanguage();
  initMenuRender();
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

  // Hamburger
  const ham = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-menu');
  if (ham && menu) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      ham && ham.classList.remove('open');
      menu && menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

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
function initLanguage() {
  applyLanguage(currentLang);

  const toggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');

  // Toggle dropdown open/close
  toggle?.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = langMenu.classList.contains('open');
    langMenu.classList.toggle('open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close dropdown on outside click
  document.addEventListener('click', e => {
    const dropdown = document.querySelector('.lang-dropdown');
    if (!dropdown?.contains(e.target)) {
      langMenu?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle language selection
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', e => {
      e.stopPropagation();
      currentLang = opt.dataset.lang;
      localStorage.setItem('trapez-lang', currentLang);
      applyLanguage(currentLang);
      langMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function applyLanguage(lang) {
  if (typeof translations === 'undefined') return;

  const t = translations[lang];
  if (!t) return;

  // Update lang attribute
  document.documentElement.lang = lang;

  // Update lang toggle button text and active option
  const langLabel = document.getElementById('current-lang-label');
  if (langLabel) langLabel.textContent = lang.toUpperCase();
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });

  // Nav links
  setTextById('nav-home', t.nav.home);
  setTextById('nav-angebot', t.nav.angebot);
  setTextById('nav-reservieren', t.nav.reservieren);
  setTextById('nav-ambiente', t.nav.ambiente);
  setTextById('nav-ueber-uns', t.nav.ueberUns);
  setTextById('nav-kontakt', t.nav.kontakt);

  // Hero
  setTextById('hero-label', t.hero.tagline);
  setTextById('hero-subtitle', t.hero.subtitle);
  setTextById('hero-cta1', t.hero.cta1);
  setTextById('hero-cta2', t.hero.cta2);

  // Angebot
  setTextById('angebot-title', t.angebot.title);
  setTextById('angebot-label', t.angebot.title);

  // Reservieren
  setTextById('reservieren-title', t.reservieren.title);
  setTextById('reservieren-subtitle', t.reservieren.subtitle);
  setTextById('label-vorname', (t.reservieren.vorname || 'Vorname') + ' *');
  setTextById('label-nachname', (t.reservieren.nachname || 'Nachname') + ' *');
  setTextById('label-email', t.reservieren.email);
  setTextById('label-phone', t.reservieren.phone);
  setTextById('label-guests', t.reservieren.guests);
  setTextById('label-date', t.reservieren.date);
  setTextById('label-time', t.reservieren.time);
  setTextById('label-message', t.reservieren.message);
  setPlaceholderById('input-message', t.reservieren.messagePlaceholder || '');
  setTextById('btn-reserve', t.reservieren.button);
  setTextById('form-note', t.reservieren.note);

  // Ambiente
  setTextById('ambiente-title', t.ambiente.title);
  setTextById('ambiente-subtitle', t.ambiente.subtitle);

  // Über Uns
  setTextById('ueber-uns-title', t.ueberUns.title);
  setTextById('ueber-uns-subtitle', t.ueberUns.subtitle);
  setTextById('about-text-1', t.ueberUns.text1);
  setTextById('about-text-2', t.ueberUns.text2);
  setTextById('about-text-3', t.ueberUns.text3);
  setTextById('owner-caption', t.ueberUns.ownerCaption);

  // Kontakt
  setTextById('kontakt-title', t.kontakt.title);
  setTextById('kontakt-subtitle', t.kontakt.subtitle);
  setTextById('kontakt-hours-label', t.kontakt.hours);
  const hoursEl = document.getElementById('kontakt-hours-detail');
  if (hoursEl) {
    hoursEl.innerHTML = t.kontakt.hoursDetail.map(h => `<span>${h}</span>`).join('');
  }
  setTextById('reviews-title', t.kontakt.reviewsTitle);
  renderReviews(currentLang);

  if (t.pdf) {
    setTextById('pdf-label', t.pdf.label);
    setTextById('pdf-speisekarte-title', t.pdf.speisekarte);
    setTextById('pdf-speisekarte-desc', t.pdf.speisekarteDesc);
    setTextById('pdf-getraenke-title', t.pdf.getraenke);
    setTextById('pdf-getraenke-desc', t.pdf.getraenkeDesc);
  }

  // Footer
  setTextById('footer-tagline', t.footer.tagline);
  setTextById('footer-copy', t.footer.copyright);
  setTextById('footer-legal', t.footer.legal);

  renderMenuTypography(lang);
}

function setTextById(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.textContent = text;
}

function setPlaceholderById(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined) el.placeholder = text;
}

/* ---------------------------------------------------------- */
/*  MENU RENDERING (typography, from data/menu.json)          */
/* ---------------------------------------------------------- */
function initMenuRender() {
  fetch('data/menu.json')
    .then(r => r.json())
    .then(data => {
      menuJsonData = data;
      renderMenuTypography(currentLang);
    });
}

function renderMenuTypography(lang) {
  const el = document.getElementById('menu-typography');
  if (!el || !menuJsonData) return;

  const sfx = `_${lang}`;
  el.innerHTML = menuJsonData.kategorien.map(kat => {
    const catName = kat[`name${sfx}`] || kat.name_de;
    if (!kat.gerichte || !kat.gerichte.length) return '';
    return `
      <div class="menu-kat">
        <div class="menu-kat-header">
          <h3 class="menu-kat-title">${escHtml(catName)}</h3>
        </div>
        <div class="menu-kat-gerichte">
          ${kat.gerichte.map(g => {
            const desc = g[`beschreibung${sfx}`] || g.beschreibung_de || '';
            const badges = (g.empfehlung ? '⭐' : '') +
              (g.vegan ? ' 🌱' : (g.vegetarisch ? ' 🌿' : ''));
            return `
              <div class="menu-gericht">
                <div class="menu-gericht-top">
                  <span class="menu-gericht-name">${escHtml(g.name)}</span>
                  <span class="menu-gericht-dots" aria-hidden="true"></span>
                  <span class="menu-gericht-preis">CHF ${escHtml(g.preis)}${badges.trim() ? `<span class="menu-badge">${badges.trim()}</span>` : ''}</span>
                </div>
                ${desc ? `<p class="menu-gericht-desc">${escHtml(desc)}</p>` : ''}
              </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');

  observeReveal();
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
    .filter(r => r.sichtbar !== false)
    .slice(0, 5);

  el.innerHTML = visible.map(r => `
    <div class="review-card reveal">
      <div class="review-stars">${'★'.repeat(r.sterne)}${'☆'.repeat(5 - r.sterne)}</div>
      <p class="review-text">${escHtml(r.text)}</p>
      <div class="review-footer">
        <span class="review-name">${escHtml(r.name)}</span>
        <span class="review-date">${escHtml(r.datum)}</span>
      </div>
    </div>
  `).join('');

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

/* ---------------------------------------------------------- */
/*  COUNTER ANIMATION (stats)                                  */
/* ---------------------------------------------------------- */
function animateCounter(el, target, suffix) {
  const duration = 1600;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal ? (eased * target).toFixed(1) : Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Trigger counter animation when stats become visible
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const val = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, val, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);
});
