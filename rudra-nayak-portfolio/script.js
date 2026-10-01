const qs = (s, p=document) => p.querySelector(s);
const qsa = (s, p=document) => [...p.querySelectorAll(s)];

document.documentElement.classList.add('js');

// Reveal-on-scroll entrance motion
const revealItems = qsa('[data-reveal]');
revealItems.forEach(el => {
  el.classList.add('reveal-ready');
  if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`;
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
revealItems.forEach(el => observer.observe(el));

// Magnetic buttons
qsa('.magnetic').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * 0.15;
    const y = (e.clientY - r.top - r.height/2) * 0.15;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('pointerleave', () => el.style.transform = '');
});

// Subtle hero portrait tilt
const card = qs('.tilt-card');
if (card && window.matchMedia('(pointer:fine)').matches) {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateZ(2px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
}

// Custom cursor
if (window.matchMedia('(pointer:fine)').matches) {
  const dot = qs('.cursor-dot');
  const ring = qs('.cursor-ring');
  window.addEventListener('pointermove', e => {
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    ring.animate([{left: ring.style.left, top: ring.style.top},{left:e.clientX+'px',top:e.clientY+'px'}], {duration:110,fill:'forwards',easing:'ease-out'});
  });
  qsa('a,button,.tilt-card,.project-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

// Mobile menu
const menuBtn = qs('.menu-toggle');
const menu = qs('.mobile-menu');
menuBtn?.addEventListener('click', () => {
  const open = !menu.classList.contains('open');
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
});
qsa('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open'); menu.setAttribute('aria-hidden','true'); menuBtn.setAttribute('aria-expanded','false');
}));

// Small parallax drift for decorative chips
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  qsa('.chip-a').forEach(el => el.style.transform = `translateY(${y * 0.035}px)`);
  qsa('.chip-b').forEach(el => el.style.transform = `translateY(${y * -0.025}px)`);
}, {passive:true});
