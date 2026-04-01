/* =============================================================
   QCS MAIN JAVASCRIPT
   Quality Cable Systems — qualitycablesystems.com
============================================================= */

(function () {
  'use strict';

  /* ---- NAV: sticky scroll effect -------------------------
     Adds .scrolled class to .nav when past 80px.
     On interior pages, .nav already has .solid — no change needed.
  --------------------------------------------------------- */
  const nav = document.getElementById('main-nav');
  if (nav && !nav.classList.contains('solid')) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ---- NAV: mobile hamburger toggle ---------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      mobileNav.setAttribute('aria-hidden', !open);
      // Animate bars
      const bars = hamburger.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity  = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity  = '';
        bars[2].style.transform = '';
      }
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- FAQ: accordion ------------------------------------ */
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer  = btn.nextElementSibling;
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      faqQuestions.forEach(q => {
        q.classList.remove('open');
        q.setAttribute('aria-expanded', 'false');
        const a = q.nextElementSibling;
        a.classList.remove('open');
        a.hidden = true;
      });
      // Open this one if it was closed
      if (!isOpen) {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
        answer.hidden = false;
      }
    });
  });

  /* ---- FORM: validation + Formspree submission ----------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {

    // !! REPLACE THIS VALUE with your Formspree endpoint ID !!
    // Example: if your endpoint is https://formspree.io/f/abcd1234
    // set FORMSPREE_ID = 'abcd1234'
    const FORMSPREE_ID = 'mqegbqqp';
    const FORMSPREE_URL = 'https://formspree.io/f/' + FORMSPREE_ID;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // --- Client-side validation ---
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        const errorEl = field.nextElementSibling;
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          if (errorEl && errorEl.classList.contains('form-error')) {
            errorEl.textContent = 'This field is required.';
          }
          valid = false;
        } else {
          field.style.borderColor = '';
          if (errorEl && errorEl.classList.contains('form-error')) {
            errorEl.textContent = '';
          }
        }
      });
      if (!valid) return;

      // --- Submission state ---
      const btn = contactForm.querySelector('[type="submit"]');
      const statusEl = document.getElementById('form-status');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // --- Send to Formspree ---
      try {
        const response = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });

        if (response.ok) {
          // Success
          btn.textContent = 'Message sent!';
          btn.style.background = '#2A7D4F';
          contactForm.reset();
          if (statusEl) {
            statusEl.style.color = '#2A7D4F';
            statusEl.textContent = 'Your message has been received. We\'ll be in touch within 24 hours.';
          }
        } else {
          // Formspree returned an error (e.g. form not found, rate limit)
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Submission failed');
        }
      } catch (err) {
        // Network error or thrown error above
        btn.textContent = originalText;
        btn.disabled = false;
        if (statusEl) {
          statusEl.style.color = '#c0392b';
          statusEl.textContent = 'Something went wrong. Please email us directly at info@qualitycablesystems.com or call (816) 231-9699.';
        }
      }
    });
  }

  /* ---- SMOOTH ANCHOR SCROLL (accounts for fixed nav) ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- ACTIVE NAV LINK (highlights current page) --------- */
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('active');
    }
  });

})();
