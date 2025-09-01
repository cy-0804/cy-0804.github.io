// Smooth scroll navigation with active link updates
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }

    // Update active link
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    });
});





