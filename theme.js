// Site-wide color theming. Loaded in <head> on every page so the saved theme is
// applied to <html> before first paint (no flash). The rotating control only
// exists on the home page; every page just reads the persisted choice.
//
// Themes are palettes of CSS variables defined in style.css under
// [data-theme="<id>"]. This file only knows each theme's id + display name and
// the cycle order. "mono" is the default black-and-white and carries no
// data-theme attribute (style.css :root already holds those values).
(function () {
  const THEMES = [
    { id: 'mono',       name: 'prefer color?' }, // default b&w — resting label
    { id: 'cheesecake', name: 'cheesecake' },    // light — cream + magenta
    { id: 'milkshake',  name: 'milkshake' },     // light — bone + rosé
    { id: 'sage',       name: 'sage' },          // light — pale green
    { id: 'serika',     name: 'serika' },        // dark — charcoal + amber
    { id: 'dracula',    name: 'dracula' },       // dark — indigo + violet
    { id: 'nord',       name: 'nord' },          // dark — slate + frost cyan
    { id: 'moonlight',  name: 'moonlight' },     // dark — navy + blossom pink
  ];
  const STORAGE_KEY = 'site-theme';

  function indexOfId(id) {
    const i = THEMES.findIndex((t) => t.id === id);
    return i === -1 ? 0 : i;
  }

  function read() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function write(id) {
    try { localStorage.setItem(STORAGE_KEY, id); } catch (e) { /* ignore */ }
  }

  // Apply a theme id to <html>. mono => no attribute (falls back to :root).
  function apply(id) {
    const root = document.documentElement;
    if (id && id !== 'mono') root.setAttribute('data-theme', id);
    else root.removeAttribute('data-theme');
  }

  // Label for the home-page control: the default shows the invitation; any
  // active color theme shows its name with a "click for next" arrow.
  function labelFor(i) {
    return i === 0 ? THEMES[0].name : THEMES[i].name + ' \u2192';
  }

  // Run immediately (in <head>, pre-paint): resolve + apply the saved theme.
  let current = indexOfId(read());
  apply(THEMES[current].id);

  // Wire the rotating control once the DOM is ready (home page only).
  function wire() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = labelFor(current);
    btn.setAttribute('aria-label', 'change color theme');
    btn.addEventListener('click', () => {
      current = (current + 1) % THEMES.length;
      apply(THEMES[current].id);
      write(THEMES[current].id);
      btn.textContent = labelFor(current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
