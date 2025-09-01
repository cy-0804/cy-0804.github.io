// === Mobile menu (existing code) ===
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  const isExpanded = nav.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isExpanded);
  hamburger.querySelector('i').className = isExpanded ? 'fa fa-times' : 'fa fa-bars';
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.querySelector('i').className = 'fa fa-bars';
  });
});
