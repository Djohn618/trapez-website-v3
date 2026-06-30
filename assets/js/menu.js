/* TRAPEZ RESTAURANT — MENU RENDERING
 * Reads data/menu.json (sektionen structure) and renders
 * the 4 stacked menu sections: speisekarte, getraenke, aktuell, tagesmenu.
 * Re-renders on langchange events from i18n.js.
 */

(function () {
  'use strict';

  /* ── Tagesmenü placeholder — 4 languages ──────────────────── */
  var TAGESMENU_EMPTY = {
    de: 'Das heutige Tagesmenü erfragen Sie bitte bei unserem Personal.',
    en: 'Please ask our staff for today\'s daily menu.',
    it: 'Per il menù del giorno di oggi, si prega di chiedere al nostro personale.',
    fr: 'Veuillez demander le menu du jour à notre personnel.'
  };

  /* ── SVG icons — inline stroke, no emoji ──────────────────── */
  var ICON = {
    vegetarisch: '<svg class="menu-icon" viewBox="0 0 16 16" width="13" height="13" aria-label="Vegetarisch" role="img" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13C4.5 13 2 10.3 2 7c0-2.8 2-5 4.5-5"/><path d="M8 13c3.5 0 6-2.7 6-6 0-2.8-2-5-4.5-5"/><line x1="8" y1="2" x2="8" y2="13"/></svg>',
    vegan:       '<svg class="menu-icon" viewBox="0 0 16 16" width="13" height="13" aria-label="Vegan" role="img" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13C4.5 13 2 10.3 2 7"/><path d="M8 13c3.5 0 6-2.7 6-6"/><path d="M8 3v10"/><path d="M8 3C5.5 1.5 3 2.5 2 5"/><path d="M8 3c2.5-1.5 5-.5 6 2"/></svg>',
    empfehlung:  '<svg class="menu-icon menu-icon--gold" viewBox="0 0 16 16" width="13" height="13" aria-label="Empfehlung des Hauses" role="img" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="8,1.5 9.8,5.6 14.2,6 11,9 11.9,13.3 8,11 4.1,13.3 5,9 1.8,6 6.2,5.6"/></svg>'
  };

  /* ── HTML escape ───────────────────────────────────────────── */
  function esc(v) {
    return v ? String(v)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;') : '';
  }

  /* ── Render price cell ─────────────────────────────────────── */
  function renderPreis(g) {
    /* varianten: "1dl 6.20 · 2dl 12.40 ..." */
    if (g.varianten && g.varianten.length) {
      var parts = g.varianten.map(function (v) {
        return '<span class="menu-variante"><span class="menu-menge">' + esc(v.menge) + '</span> <strong>' + esc(v.preis) + '</strong></span>';
      });
      return '<span class="menu-varianten">' + parts.join('<span class="menu-variante-sep" aria-hidden="true">·</span>') + '</span>';
    }
    /* fixed price, optionally with menge and alkohol */
    var out = '';
    if (g.menge)   out += '<span class="menu-menge">' + esc(g.menge) + ' — </span>';
    out += 'CHF ' + esc(g.preis);
    if (g.alkohol) out += ' <span class="menu-alkohol">' + esc(g.alkohol) + '</span>';
    return out;
  }

  /* ── Render diet/recommendation icons ─────────────────────── */
  function renderIcons(g) {
    var out = '';
    if (g.vegan)          out += ICON.vegan;
    else if (g.vegetarisch) out += ICON.vegetarisch;
    if (g.empfehlung)     out += ICON.empfehlung;
    return out ? '<span class="menu-icons">' + out + '</span>' : '';
  }

  /* ── Render a single Kategorie block ──────────────────────── */
  function renderKategorie(kat, lang) {
    if (!kat.gerichte || !kat.gerichte.length) return '';
    var sfx    = '_' + lang;
    var title  = kat['name' + sfx] || kat.name_de || '';
    var hinweis = kat['hinweis' + sfx] || kat.hinweis_de || '';

    var gerichte = kat.gerichte.map(function (g) {
      var desc       = g['beschreibung' + sfx] || g.beschreibung_de || '';
      var hasVariant = g.varianten && g.varianten.length;
      return (
        '<div class="menu-gericht' + (hasVariant ? ' menu-gericht--varianten' : '') + '">' +
          '<div class="menu-gericht-top">' +
            '<span class="menu-gericht-name">' + esc(g.name) + renderIcons(g) + '</span>' +
            (hasVariant ? '' : '<span class="menu-gericht-dots" aria-hidden="true"></span>') +
            '<span class="menu-gericht-preis">' + renderPreis(g) + '</span>' +
          '</div>' +
          (desc ? '<p class="menu-gericht-desc">' + esc(desc) + '</p>' : '') +
        '</div>'
      );
    }).join('');

    return (
      '<div class="menu-kat">' +
        '<div class="menu-kat-header"><h4 class="menu-kat-title">' + esc(title) + '</h4></div>' +
        '<div class="menu-kat-gerichte">' + gerichte + '</div>' +
        (hinweis ? '<p class="menu-hinweis">' + esc(hinweis) + '</p>' : '') +
      '</div>'
    );
  }

  /* ── Render one sektion into its container ─────────────────── */
  function renderSektion(sek, containerId, lang) {
    var el = document.getElementById(containerId);
    if (!el) return;
    if (!sek || !sek.kategorien || !sek.kategorien.length) {
      el.innerHTML = '<p class="menu-section-empty">' + esc(TAGESMENU_EMPTY[lang] || TAGESMENU_EMPTY.de) + '</p>';
      return;
    }
    el.innerHTML = sek.kategorien.map(function (k) { return renderKategorie(k, lang); }).join('');
  }

  /* ── Update nav card labels + section titles from JSON ─────── */
  function updateLabels(sektionen, lang) {
    var sfx = '_' + lang;
    sektionen.forEach(function (sek) {
      document.querySelectorAll('[data-menu-sektion="' + sek.id + '"]').forEach(function (el) {
        el.textContent = sek['name' + sfx] || sek.name_de;
      });
    });
  }

  /* ── Main render ───────────────────────────────────────────── */
  function renderAll(data, lang) {
    var map = {};
    (data.sektionen || []).forEach(function (s) { map[s.id] = s; });

    renderSektion(map['speisekarte'], 'ms-speisekarte', lang);
    renderSektion(map['getraenke'],   'ms-getraenke',   lang);
    renderSektion(map['aktuell'],     'ms-aktuell',     lang);
    renderSektion(map['tagesmenu'],   'ms-tagesmenue',  lang);

    updateLabels(data.sektionen, lang);

    if (typeof window.observeReveal === 'function') window.observeReveal();
  }

  /* ── Init: fetch + render + re-render on langchange ─────────── */
  function init() {
    var lang;
    try { lang = localStorage.getItem('trapez-lang') || 'de'; } catch (e) { lang = 'de'; }

    var menuData = null;

    fetch('data/menu.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        menuData = data;
        renderAll(menuData, lang);
      })
      .catch(function (err) { console.error('[menu.js] menu.json failed:', err); });

    document.addEventListener('langchange', function (e) {
      lang = e.detail.lang;
      if (menuData) renderAll(menuData, lang);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
