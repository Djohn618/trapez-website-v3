/**
 * TRAPEZ RESTAURANT — MAIN JAVASCRIPT
 * Handles: loading screen, navigation, language switching,
 *          menu tabs, gallery lightbox, scroll animations
 */

/* ---------------------------------------------------------- */
/*  STATE                                                       */
/* ---------------------------------------------------------- */
let currentLang = localStorage.getItem('trapez-lang') || 'de';
let lightboxImages = [];
let lightboxIndex = 0;

/* ---------------------------------------------------------- */
/*  DOM READY                                                   */
/* ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLoading();
  initNavbar();
  initLanguage();
  initTabs();
  initMenuRender();
  initGallery();
  initScrollReveal();
  initFormspree();
  initHeroCtaLinks();
});

/* ---------------------------------------------------------- */
/*  LOADING SCREEN                                             */
/* ---------------------------------------------------------- */
function initLoading() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  document.body.classList.add('loading-active');

  // Hide after animation (1.8 s)
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.classList.remove('loading-active');
  }, 1800);
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
  if (t.hero.cta3) setTextById('hero-cta3', t.hero.cta3);

  // Angebot
  setTextById('angebot-title', t.angebot.title);
  setTextById('angebot-label', t.angebot.title);
  setTextById('tab-speisekarte-label', t.angebot.tabs.speisekarte);
  setTextById('tab-getraenkkarte-label', t.angebot.tabs.getraenkkarte);
  setTextById('tab-aktuell-label', t.angebot.tabs.aktuell);
  setTextById('tab-tagesmenue-label', t.angebot.tabs.tagesmenue);

  // Reservieren
  setTextById('reservieren-title', t.reservieren.title);
  setTextById('reservieren-subtitle', t.reservieren.subtitle);
  setPlaceholderById('input-fullname', t.reservieren.fullname);
  setTextById('label-fullname', t.reservieren.fullname);
  setPlaceholderById('input-phone', t.reservieren.phone);
  setTextById('label-phone', t.reservieren.phone);
  setPlaceholderById('input-email', t.reservieren.email);
  setTextById('label-email', t.reservieren.email);
  setTextById('label-guests', t.reservieren.guests);
  setTextById('label-date', t.reservieren.date);
  setTextById('label-time', t.reservieren.time);
  setTextById('label-message', t.reservieren.message);
  setPlaceholderById('input-message', t.reservieren.message);
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
  setTextById('stat-rating-value', t.kontakt.stats.rating.value);
  setTextById('stat-rating-label', t.kontakt.stats.rating.label);
  setTextById('stat-customers-value', t.kontakt.stats.customers.value);
  setTextById('stat-customers-label', t.kontakt.stats.customers.label);
  setTextById('stat-reviews-value', t.kontakt.stats.reviews.value);
  setTextById('stat-reviews-label', t.kontakt.stats.reviews.label);
  setTextById('stat-years-value', t.kontakt.stats.years.value);
  setTextById('stat-years-label', t.kontakt.stats.years.label);
  setTextById('reviews-title', t.kontakt.reviewsTitle);
  renderReviews(t.kontakt.reviews);

  // PDF Downloads
  if (t.pdf) {
    setTextById('pdf-label', t.pdf.label);
    setTextById('pdf-speisekarte-title', t.pdf.speisekarte);
    setTextById('pdf-speisekarte-desc', t.pdf.speisekarteDesc);
    setTextById('pdf-speisekarte-btn', t.pdf.download);
    setTextById('pdf-getraenke-title', t.pdf.getraenke);
    setTextById('pdf-getraenke-desc', t.pdf.getraenkeDesc);
    setTextById('pdf-getraenke-btn', t.pdf.download);
  }

  // Footer
  setTextById('footer-tagline', t.footer.tagline);
  setTextById('footer-copy', t.footer.copyright);
  setTextById('footer-legal', t.footer.legal);

  // Re-render menu for new language
  renderMenu(lang);
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
/*  MENU TABS                                                  */
/* ---------------------------------------------------------- */
function initTabs() {
  // Default active tab = aktuell
  switchTab('aktuell');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });
}

/* ---------------------------------------------------------- */
/*  MENU RENDERING                                             */
/* ---------------------------------------------------------- */
function initMenuRender() {
  renderMenu(currentLang);
}

function renderMenu(lang) {
  if (typeof menuData === 'undefined') return;
  const d = menuData[lang] || menuData['de'];

  // Speisekarte – split layout with clickable image panel
  renderSpeisekarte('speisekarte-content', d.speisekarte);
  // Getränkkarte – card redesign layout
  renderGetraenkkarte('getraenkkarte-content', d.getraenkkarte);
  // Aktuell
  renderAktuell('aktuell-content', d.aktuell);
  // Tagesmenü
  renderTagesmenue('tagesmenue-content', d.tagesmenue);
}

/**
 * Speisekarte: card layout (same visual design as Getränkkarte).
 * Each category is a card with image on the left and items on the right.
 * Clicking any item updates that card's image to the item's photo with a fade transition.
 */
function renderSpeisekarte(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el || !data) return;

  el.innerHTML = `<div class="menu-categories">
    ${data.categories.map(cat => `
      <div class="menu-category-redesign" data-catid="${escHtml(cat.id)}">
        ${cat.image ? `
        <div class="menu-cat-image speisekarte-cat-image">
          <img src="${escHtml(cat.image)}" alt="${escHtml(cat.title)}" loading="lazy" />
        </div>` : ''}
        <div class="menu-cat-content">
          <h3 class="menu-category-title">${escHtml(cat.title)}</h3>
          <div class="menu-items-grid">
            ${cat.items.map(item => `
              <div class="menu-item speisekarte-item" data-img="${escHtml(item.image || cat.image || '')}" data-title="${escHtml(item.name)}" data-catid="${escHtml(cat.id)}" role="button" tabindex="0">
                <div class="menu-item-info">
                  <div class="menu-item-name">${escHtml(item.name)}</div>
                  ${item.desc ? `<div class="menu-item-desc">${escHtml(item.desc)}</div>` : ''}
                </div>
                <div class="menu-item-price">${escHtml(item.price)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;

  // Attach click handlers: clicking a dish updates that category card's image
  el.querySelectorAll('.speisekarte-item').forEach(item => {
    const handler = () => {
      if (!item.dataset.img) return;
      const catCard = item.closest('.menu-category-redesign');
      const img = catCard?.querySelector('.speisekarte-cat-image img');
      if (!img) return;

      // Mark item as active within its category
      catCard.querySelectorAll('.speisekarte-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Skip transition if image is already the same
      if (img.getAttribute('src') === item.dataset.img) return;

      // Fade out, swap, fade in
      img.style.transition = 'opacity 0.18s ease';
      img.style.opacity = '0';
      const newSrc = item.dataset.img;
      const newAlt = item.dataset.title;
      setTimeout(() => {
        img.src = newSrc;
        img.alt = newAlt;
        img.style.opacity = '1';
      }, 180);
    };
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });
}

function renderGetraenkkarte(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el || !data) return;

  el.innerHTML = `<div class="menu-categories">
    ${data.categories.map(cat => `
      <div class="menu-category-redesign" data-catid="${escHtml(cat.id)}">
        ${cat.image ? `
        <div class="menu-cat-image getraenkkarte-cat-image">
          <img src="${escHtml(cat.image)}" alt="${escHtml(cat.title)}" loading="lazy" />
        </div>` : ''}
        <div class="menu-cat-content">
          <h3 class="menu-category-title">${escHtml(cat.title)}</h3>
          <div class="menu-items-grid">
            ${cat.items.map(item => `
              <div class="menu-item getraenkkarte-item" data-img="${escHtml(item.image || cat.image || '')}" data-title="${escHtml(item.name)}" data-catid="${escHtml(cat.id)}" role="button" tabindex="0">
                <div class="menu-item-info">
                  <div class="menu-item-name">${escHtml(item.name)}</div>
                  ${item.desc ? `<div class="menu-item-desc">${escHtml(item.desc)}</div>` : ''}
                </div>
                <div class="menu-item-price">${escHtml(item.price)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;

  // Attach click handlers: clicking a drink updates that category card's image
  el.querySelectorAll('.getraenkkarte-item').forEach(item => {
    const handler = () => {
      if (!item.dataset.img) return;
      const catCard = item.closest('.menu-category-redesign');
      const img = catCard?.querySelector('.getraenkkarte-cat-image img');
      if (!img) return;

      // Mark item as active within its category
      catCard.querySelectorAll('.getraenkkarte-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Skip transition if image is already the same
      if (img.getAttribute('src') === item.dataset.img) return;

      // Fade out, swap, fade in
      img.style.transition = 'opacity 0.18s ease';
      img.style.opacity = '0';
      const newSrc = item.dataset.img;
      const newAlt = item.dataset.title;
      setTimeout(() => {
        img.src = newSrc;
        img.alt = newAlt;
        img.style.opacity = '1';
      }, 180);
    };
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });
}

function renderAktuell(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el || !data) return;

  el.innerHTML = `
    <div class="aktuell-grid">
      ${data.items.map(item => `
        <div class="aktuell-card reveal">
          <div class="aktuell-card-body">
            ${item.tag ? `<span class="aktuell-tag">${escHtml(item.tag)}</span>` : ''}
            <h3 class="aktuell-name">${escHtml(item.name)}</h3>
            <p class="aktuell-desc">${escHtml(item.desc)}</p>
            <div class="aktuell-price">${escHtml(item.price)}</div>
          </div>
        </div>
      `).join('')}
    </div>`;

  // Re-observe new elements
  observeReveal();
}

function renderTagesmenue(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el || !data) return;

  el.innerHTML = `
    <div class="tagesmenue-intro">
      <p>${escHtml(data.subtitle)}</p>
    </div>
    <div class="tagesmenue-note">${escHtml(data.note)}</div>
    <div class="tagesmenue-grid">
      ${data.menus.map(m => `
        <div class="tagesmenue-card reveal">
          <div class="tagesmenue-header">
            <div class="tagesmenue-label">${escHtml(m.label)}</div>
            <div class="tagesmenue-price">${escHtml(m.price)}</div>
          </div>
          <ul class="tagesmenue-items">
            ${m.items.map(i => `<li>${escHtml(i)}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>`;

  observeReveal();
}

function renderReviews(reviews) {
  const el = document.getElementById('reviews-container');
  if (!el || !reviews) return;

  el.innerHTML = reviews.map(r => `
    <div class="review-card reveal">
      <span class="review-quote">"</span>
      <p class="review-text">${escHtml(r.text)}</p>
      <div class="review-footer">
        <span class="review-name">${escHtml(r.name)}</span>
        <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
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
/*  FORMSPREE INTEGRATION                                      */
/* ---------------------------------------------------------- */
function initFormspree() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('#btn-reserve');
    const originalText = btn.textContent;

    // Show loading state
    btn.textContent = '...';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        window.location.href = 'thank-you.html';
      } else {
        const json = await response.json();
        const msg = (json.errors || []).map(e => e.message).join(', ') || 'Error. Please try again.';
        alert(msg);
        btn.textContent = originalText;
        btn.disabled = false;
      }
    } catch {
      alert('Network error. Please try again.');
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

/* ---------------------------------------------------------- */
/*  HERO CTA LINKS — TAB SHORTCUTS                            */
/* ---------------------------------------------------------- */
function initHeroCtaLinks() {
  // CTA2 ("Speisekarte") → navigate to angebot and switch to speisekarte tab
  const cta2 = document.getElementById('hero-cta2');
  if (cta2) {
    cta2.addEventListener('click', () => {
      setTimeout(() => switchTab('speisekarte'), 400);
    });
  }

  // CTA3 ("Tagesmenü") → navigate to angebot and switch to tagesmenü tab
  const cta3 = document.getElementById('hero-cta3');
  if (cta3) {
    cta3.addEventListener('click', () => {
      setTimeout(() => switchTab('tagesmenue'), 400);
    });
  }
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
