/* Beach Road Inland Resort Hotel – script.js */

// ── Sticky navbar on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Smooth scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-menu .nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

// ── Intersection Observer – fade-in animation ──
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to cards/elements
const animatedEls = document.querySelectorAll(
  '.amenity-card, .room-card, .event-item, .highlight-item, .about-grid, .dining-grid'
);
animatedEls.forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ── Contact form submission ──
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');
const checkinInput  = document.getElementById('checkin');
const checkoutInput = document.getElementById('checkout');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
if (checkinInput)  checkinInput.setAttribute('min', today);
if (checkoutInput) checkoutInput.setAttribute('min', today);

// Ensure check-out is after check-in
if (checkinInput && checkoutInput) {
  checkinInput.addEventListener('change', () => {
    checkoutInput.setAttribute('min', checkinInput.value);
    if (checkoutInput.value && checkoutInput.value < checkinInput.value) {
      checkoutInput.value = '';
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();

    // Basic validation
    if (!fname || !email) {
      alert('Please fill in your name and email address.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate submission (replace with actual backend/API call)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Inquiry';
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1000);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── CSS for fade-in (injected via JS to keep CSS clean) ──
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .55s ease, transform .55s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .nav-link.active {
    color: var(--teal) !important;
  }
  .navbar.scrolled .nav-link.active {
    background: var(--teal-light);
    color: var(--teal-dark) !important;
  }
`;
document.head.appendChild(style);
