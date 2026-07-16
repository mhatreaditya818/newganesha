/* Core invitation experience */
function initializeWebsite() {
  populateInvitationContent();
  initializeLoader();
  initializeNavigation();
  initializeRevealAnimations();
  initializeTimeline();
  initializeGallery();
  initializeCountdown();
  initializeParticles();
  initializeMandala();
  initializeRSVP();
  initializeCursor();
  initializeProgressBar();
}

/* Apply editable values from config.js */
function populateInvitationContent() {
  document.title = `Ganesh Chaturthi | ${invitationConfig.familyName}`;
  document.getElementById('eventDateText').textContent = invitationConfig.displayDate;
  document.getElementById('venueAddress').textContent = `${invitationConfig.venueName}, ${invitationConfig.venueAddress}`;
  document.getElementById('venueMap').src = invitationConfig.mapEmbedUrl;
  document.getElementById('directionsLink').href = invitationConfig.mapDirectionsUrl;
  document.getElementById('celebrationVideo').src = invitationConfig.videoUrl;
}

function initializeLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('is-hidden'), 700);
  });
}

/* Navigation and responsive menu */
function initializeNavigation() {
  const header = document.getElementById('siteHeader');
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Scroll-triggered visual reveals */
function initializeRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

function initializeTimeline() {
  const container = document.getElementById('timeline');
  invitationConfig.timeline.forEach(item => {
    const article = document.createElement('article');
    article.className = 'timeline-item reveal';
    article.innerHTML = `<time>${item.time}</time><h3>${item.title}</h3><p>${item.detail}</p>`;
    container.appendChild(article);
  });
  initializeRevealAnimations();
}

function initializeGallery() {
  const gallery = document.getElementById('gallery');
  invitationConfig.galleryImages.forEach(image => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item reveal';
    figure.innerHTML = `<img loading="lazy" src="${image.src}" alt="${image.alt}">`;
    gallery.appendChild(figure);
  });
  initializeRevealAnimations();
}

/* Live celebration countdown */
function initializeCountdown() {
  const elements = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  const update = () => {
    const total = Math.max(0, new Date(invitationConfig.eventDate) - new Date());
    const values = [Math.floor(total / 86400000), Math.floor(total / 3600000) % 24, Math.floor(total / 60000) % 60, Math.floor(total / 1000) % 60];
    elements.forEach((element, index) => {
      element.textContent = String(values[index]).padStart(2, '0');
    });
  };
  update();
  setInterval(update, 1000);
}

/* Background canvas particles */
function initializeParticles() {
  const canvas = document.getElementById('particles');
  const context = canvas.getContext('2d');
  let particles = [];
  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    particles = Array.from({ length: Math.min(55, innerWidth / 22) }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3, speed: Math.random() * 0.25 + 0.05
    }));
  };
  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#d4af37';
    context.globalAlpha = 0.35;
    particles.forEach(particle => {
      particle.y -= particle.speed;
      if (particle.y < -5) { particle.y = canvas.height + 5; particle.x = Math.random() * canvas.width; }
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    });
    requestAnimationFrame(draw);
  };
  resize();
  draw();
  window.addEventListener('resize', resize, { passive: true });
}

/* Pointer-reactive sacred geometry */
function initializeMandala() {
  const mandala = document.getElementById('mandala');
  mandala.addEventListener('pointermove', event => {
    const bounds = mandala.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    mandala.querySelectorAll('.mandala-ring').forEach((ring, index) => {
      ring.style.transform = `rotate(${x * (index + 1) * 24}deg) translate3d(${x * 8}px, ${y * 8}px, 0)`;
    });
  });
  mandala.addEventListener('pointerleave', () => {
    mandala.querySelectorAll('.mandala-ring').forEach(ring => { ring.style.transform = ''; });
  });
}

/* Client-side RSVP acknowledgement */
function initializeRSVP() {
  const form = document.getElementById('rsvpForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('formStatus').textContent = 'Thank you. Your blessings have been received with love.';
    form.reset();
  });
}

function initializeCursor() {
  if (!matchMedia('(pointer: fine)').matches) return;
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  window.addEventListener('pointermove', event => {
    dot.style.left = ring.style.left = `${event.clientX}px`;
    dot.style.top = ring.style.top = `${event.clientY}px`;
  }, { passive: true });
}

function initializeProgressBar() {
  const bar = document.querySelector('.scroll-progress span');
  window.addEventListener('scroll', () => {
    const travel = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${(scrollY / travel) * 100}%`;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initializeWebsite);
