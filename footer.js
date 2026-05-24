// site-wide footer, injected on every page so it stays a single source of truth
// (the nav is hand-copied per page; the footer is not). loaded with a root-
// relative src so the same tag works from any directory depth.
(function () {
  const mount = () => {
    if (document.querySelector('.site-footer')) return;
    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="site-footer-inner">
        <span class="footer-name">© ${year} grace juan</span>
        <nav class="footer-links" aria-label="footer">
          <a href="mailto:grayswan795@gmail.com">email</a>
          <a href="https://github.com/grace-wj" target="_blank" rel="noopener">github</a>
          <a href="https://www.linkedin.com/in/grace-juan/" target="_blank" rel="noopener">linkedin</a>
          <a href="/resume.pdf" target="_blank" rel="noopener">résumé</a>
          <a href="https://github.com/grace-wj/grace-wj.github.io" target="_blank" rel="noopener">source</a>
        </nav>
      </div>`;
    document.body.appendChild(footer);
  };
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
