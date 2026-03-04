/* ============================================================
   Caister Festival — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. MOBILE NAV — hamburger toggle
  ---------------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('open');
      toggle.classList.toggle('open', !isOpen);
      drawer.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close when a nav link is tapped
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on tap outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !drawer.contains(e.target)) {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ----------------------------------------------------------
     2. SCROLL REVEAL — fade-in elements as they enter viewport
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(
    '.panel, .acard, .stcard, .icard, .rcard, .tier-card, .contact-box, .vols-panel, .vol-cta, .ltable'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ----------------------------------------------------------
     3. STAGGER CARD ANIMATIONS — cards animate in sequence
  ---------------------------------------------------------- */
  document.querySelectorAll('.card-grid, .stalls-grid, .info-grid, .roles-grid').forEach(grid => {
    grid.querySelectorAll('.acard, .stcard, .icard, .rcard').forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
    });
  });

  /* ----------------------------------------------------------
     4. NAV SCROLL SHADOW — deepen nav shadow on scroll
  ---------------------------------------------------------- */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(58,127,191,0.35)'
        : '0 4px 20px rgba(58,127,191,0.25)';
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     5. ACTIVE NAV LINK — highlight current page
  ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});