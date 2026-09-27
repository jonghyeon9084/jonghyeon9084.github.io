document.querySelector('#print').addEventListener('click', () => window.print());
const navLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('.project-section, #profile')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = entry.target.id === 'ai-two' ? 'ai-one' : entry.target.id;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
