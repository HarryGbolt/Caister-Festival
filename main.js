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
     2. PHONE MENU — "Menu" button opens/closes the link list
  ---------------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);   // tells screen readers if it's open
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    // Close it with the Escape key or by tapping anywhere outside the menu
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', e => { if (!nav.contains(e.target)) setOpen(false); });
  }

  /* ----------------------------------------------------------
     3. ACTIVE NAV LINK — highlight current page
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