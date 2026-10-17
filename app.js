// The PDF link downloads the verified export. Ctrl+P uses print.css.
window.addEventListener('beforeprint', () => {
  document.querySelectorAll('video').forEach(video => video.pause());
  document.querySelector('#image-dialog')?.close();
});

const dialog = document.querySelector('#image-dialog');
let lastImageLink;
document.querySelectorAll('[data-lightbox]').forEach(link => {
  link.addEventListener('click', event => {
    if (!dialog?.showModal) return;
    event.preventDefault();
    lastImageLink = link;
    const original = link.querySelector('img');
    const image = dialog.querySelector('img');
    image.src = link.href;
    image.alt = original.alt;
    dialog.querySelector('.dialog-caption').textContent = original.alt;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog?.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastImageLink?.focus({ preventScroll: true });
});
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
  });
});
const navLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('.project-section, #profile')];
let navFramePending = false;
const updateNav = () => {
  navFramePending = false;
  const marker = document.querySelector('.site-header').getBoundingClientRect().bottom + 80;
  const current = sections.find(section => {
    const rect = section.getBoundingClientRect();
    return rect.top <= marker && rect.bottom > marker;
  });
  navLinks.forEach(link => {
    const active = current && link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', Boolean(active));
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};
const scheduleNav = () => {
  if (navFramePending) return;
  navFramePending = true;
  requestAnimationFrame(updateNav);
};
window.addEventListener('scroll', scheduleNav, { passive: true });
window.addEventListener('resize', scheduleNav);
window.addEventListener('load', scheduleNav);
updateNav();
