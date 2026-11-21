/* ============================================================
   Caister Festival — main.js
   Small script loaded on every page. Runs once the page has loaded.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. NAV SCROLL SHADOW — deepen nav shadow on scroll
  ---------------------------------------------------------- */
  // requestAnimationFrame + "ticking" means we only update once per frame,
  // so scrolling stays smooth on slower phones.
  const nav = document.querySelector('nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     2. ACTIVE NAV LINK — highlight current page
  ---------------------------------------------------------- */
  // Compare each menu link with the current URL (ignoring trailing slashes)
  // and give the matching one the "active" class.
  const pathname = window.location.pathname.replace(/\/$/, '') || '';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '';
    if (href === pathname || (href === '' && pathname === '')) {
      link.classList.add('active');
    }
  });

});