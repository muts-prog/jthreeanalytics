// ---------- Init everything on load (header/footer are inline — no fetch needed) ----------
function initLayout() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const page = document.body.dataset.page || 'home';
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.dataset.nav === page) a.classList.add('active');
  });

  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const headerEl = document.getElementById('siteHeaderEl');
  if (headerEl) {
    const onScroll = () => headerEl.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  initInteractions();
  initServiceRequestForm();
  initNewsletterForm();
  initBackToTop();
  initParallaxHero();
  initServiceCardToggles();
}

// ---------- Reveal + stat counters ----------
function initInteractions() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  const statNums = document.querySelectorAll('.stat-num[data-target]');
  function animateCount(el) {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => statIo.observe(el));
  } else {
    statNums.forEach(animateCount);
  }
}

// ---------- Service card "Learn More" accordion (expands in place, no navigation) ----------
function initServiceCardToggles() {
  document.querySelectorAll('.service-card-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(targetId);
      if (!panel) return;
      const isOpen = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      btn.querySelector('.btn-toggle-label').textContent = isOpen ? 'Show Less' : 'Learn More';
    });
  });
}

// ---------- Service request form (Web3Forms) ----------
function initServiceRequestForm() {
  const form = document.getElementById('serviceRequestForm');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');
  if (requestedService) {
    const select = document.getElementById('reqService');
    if (select) {
      const match = Array.from(select.options).find(o => o.value === requestedService);
      if (match) select.value = requestedService;
    }
  }

  const statusEl = document.getElementById('reqFormStatus');
  const submitBtn = document.getElementById('reqSubmitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const accessKey = form.querySelector('input[name="access_key"]').value;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      statusEl.textContent = 'Form isn\'t connected yet — add a Web3Forms access key (see README).';
      statusEl.className = 'form-status error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: formData });
      const result = await res.json();
      if (res.ok && result.success) {
        statusEl.textContent = 'Thanks — your request has been sent. We\'ll be in touch soon.';
        statusEl.className = 'form-status success';
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong sending that. Please email info@jthreeanalytics.com instead.';
      statusEl.className = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send request';
    }
  });
}

// ---------- Newsletter form (Web3Forms) ----------
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  const statusEl = document.getElementById('newsletterStatus');
  const btn = document.getElementById('newsletterBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const accessKey = form.querySelector('input[name="access_key"]').value;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      statusEl.textContent = 'Newsletter isn\'t connected yet.';
      statusEl.className = 'newsletter-status error';
      return;
    }
    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = '...';
    statusEl.textContent = '';
    statusEl.className = 'newsletter-status';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: formData });
      const result = await res.json();
      if (res.ok && result.success) {
        statusEl.textContent = 'Subscribed — thank you!';
        statusEl.className = 'newsletter-status success';
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please try again.';
      statusEl.className = 'newsletter-status error';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}

// ---------- Back to top ----------
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------- Subtle parallax on hero background ----------
function initParallaxHero() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      bg.style.transform = `translateY(${y * 0.25}px)`;
      ticking = false;
    });
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initLayout);
