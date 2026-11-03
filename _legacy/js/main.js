/* ============================================
   IMS GROUP - COMPLETE JAVASCRIPT
============================================ */

// ---- LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

// ---- NAVBAR ----
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
});

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

// Set active nav link
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// ---- REVEAL ON SCROLL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- ANIMATED COUNTER ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = true;
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ---- FAQ ----
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Open clicked if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ---- PAYMENT METHOD SELECTION ----
document.querySelectorAll('.pm-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pm-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// ---- PURCHASE PLAN SELECTION ----
const planOptions = document.querySelectorAll('.plan-opt');
const productSelect = document.getElementById('productSelect');
const osSummary = document.getElementById('osSummary');

const plans = {
  starter: { name: 'Starter (3 Users)', price: 40000, monthly: '40,000 RWF/month' },
  standard: { name: 'Standard (4 Users)', price: 50000, monthly: '50,000 RWF/month' },
  unlimited: { name: 'Unlimited Users', price: 70000, monthly: '70,000 RWF/month' }
};

function updateOrderSummary() {
  if (!osSummary) return;
  const selected = document.querySelector('.plan-opt.selected');
  const planKey = selected ? selected.dataset.plan : null;
  const plan = plans[planKey];

  if (plan) {
    const total = plan.price + 50000;
    osSummary.innerHTML = `
      <div class="os-row"><span class="os-label">Plan</span><span class="os-value">${plan.name}</span></div>
      <div class="os-row"><span class="os-label">Subscription</span><span class="os-value">${plan.monthly}</span></div>
      <div class="os-row"><span class="os-label">Installation Fee</span><span class="os-value">50,000 RWF</span></div>
      <div class="os-row"><span class="os-label">Setup</span><span class="os-value" style="color:var(--accent-2)">FREE</span></div>
      <div class="os-total"><span class="os-total-lbl">First Month Total</span><span class="os-total-val">${total.toLocaleString()} RWF</span></div>
    `;
  } else {
    osSummary.innerHTML = `
      <div class="os-row"><span class="os-label">Plan</span><span class="os-value" style="color:rgba(255,255,255,0.35)">Not selected</span></div>
      <div class="os-row"><span class="os-label">Installation Fee</span><span class="os-value">50,000 RWF</span></div>
      <div class="os-total"><span class="os-total-lbl">Total</span><span class="os-total-val" style="color:rgba(255,255,255,0.4)">—</span></div>
    `;
  }
}

planOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    planOptions.forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    updateOrderSummary();
  });
});
updateOrderSummary();

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = '#10B981';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ---- PURCHASE FORM ----
const purchaseForm = document.getElementById('purchaseForm');
if (purchaseForm) {
  purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = purchaseForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Order Submitted! We\'ll contact you within 24hrs';
    btn.style.background = '#10B981';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  });
}

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- CHART BAR ANIMATION ----
const chartBars = document.querySelectorAll('.m-bar, .phv-bar');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'growBar 0.8s ease-out forwards';
      entry.target.style.transformOrigin = 'bottom';
    }
  });
}, { threshold: 0.5 });

chartBars.forEach(bar => barObserver.observe(bar));

// Add keyframe
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes growBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }`;
document.head.appendChild(styleSheet);
