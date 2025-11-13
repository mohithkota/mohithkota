document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('year').textContent = new Date().getFullYear();
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  menuToggle?.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open');
  });
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
          nav.classList.remove('open');
          menuToggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
  const sections = document.querySelectorAll('.section, .projects, .hero-content');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  sections.forEach(s => io.observe(s));
});
function handleContact(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.textContent = 'Sending…';
  setTimeout(() => {
    status.textContent = 'Thanks — your message has been sent (demo).';
    e.target.reset();
  }, 800);
}
