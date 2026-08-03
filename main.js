/* ============================================================
   Caister Festival — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. NAV SCROLL SHADOW — deepen nav shadow on scroll
  ---------------------------------------------------------- */
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
  const pathname = window.location.pathname.replace(/\/$/, '') || '';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '';
    if (href === pathname || (href === '' && pathname === '')) {
      link.classList.add('active');
    }
  });

});