/* TRAPEZ RESTAURANT — i18n (Mehrsprachigkeit) */
(function () {
  var _t = {};
  var _lang = 'de';

  try { _lang = localStorage.getItem('trapez-lang') || 'de'; } catch (e) {}

  function getKey(obj, path) {
    return path.split('.').reduce(function (acc, k) {
      return acc != null ? acc[k] : undefined;
    }, obj);
  }

  function applyAll(lang) {
    var t = _t[lang] || _t['de'];
    if (!t) return;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = getKey(t, el.dataset.i18n);
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = getKey(t, el.dataset.i18nHtml);
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = getKey(t, el.dataset.i18nPlaceholder);
      if (val !== undefined) el.placeholder = val;
    });

    var label = document.getElementById('current-lang-label');
    if (label) label.textContent = lang.toUpperCase();

    document.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  window.switchLanguage = function (lang) {
    _lang = lang;
    try { localStorage.setItem('trapez-lang', lang); } catch (e) {}
    applyAll(lang);
  };

  window.getCurrentLang = function () { return _lang; };

  window.getTranslation = function (lang, path) {
    var t = _t[lang] || _t['de'];
    return t ? getKey(t, path) : undefined;
  };

  fetch('data/translations.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      _t = data;
      applyAll(_lang);
    });
})();
