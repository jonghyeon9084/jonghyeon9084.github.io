(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const printMedia = matchMedia('print');
  const animations = new Set();
  const revealed = new WeakSet();
  const header = document.querySelector('.site-header');
  const progress = document.createElement('span');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  header.append(progress);
  let observer;
  let frame;
  let printing = false;

  const canAnimate = () => Boolean(Element.prototype.animate) && !reducedMotion.matches && !printMedia.matches && !printing;
  const reveal = (element, delay = 0, media = false) => {
    if (revealed.has(element) || !canAnimate()) return;
    revealed.add(element);
    const animation = element.animate([
      { opacity: 0, transform: `translateY(${media ? 18 : 14}px)${media ? ' scale(.992)' : ''}` },
      { opacity: 1, transform: 'none' }
    ], { duration: media ? 1600 : 1400, delay, easing: 'cubic-bezier(.22,.45,.3,1)', fill: 'backwards' });
    animations.add(animation);
    const clear = () => animations.delete(animation);
    animation.onfinish = clear;
    animation.oncancel = clear;
  };

  const candidates = [...document.querySelectorAll([
    '#profile > .eyebrow', '.contact-heading', '.profile-grid > *', '.skills > *',
    '.work-intro', '.project-index', '.project-heading', '.project-page > .lead',
    '.project-meta', '.two-col > *', '.full-bleed', '.video-figure',
    '.media-story', '.media-gallery > figure', '.project-page > .insight',
    '.project-page > .gallery-figure'
  ].join(','))];
  // Animate whole blocks once, without stacking parent and child effects.
  const candidateSet = new Set(candidates);
  const targets = candidates.filter(element => {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      if (candidateSet.has(parent)) return false;
    }
    return true;
  });

  const stop = () => {
    observer?.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
  };
  const start = () => {
    stop();
    if (!canAnimate() || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        observer.unobserve(element);
        // Anchor navigation and keyboard focus should expose content immediately.
        if (element.matches(':focus-within') || entry.boundingClientRect.top < header.offsetHeight) {
          revealed.add(element);
          return;
        }
        const group = element.parentElement;
        const stagger = group.matches('.two-col, .skills, .media-gallery, .profile-grid')
          ? Math.min([...group.children].indexOf(element), 2) * 160 : 0;
        reveal(element, 80 + stagger, element.matches('figure, .media-story'));
      });
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
    targets.forEach(element => { if (!revealed.has(element)) observer.observe(element); });
  };

  const updateScroll = () => {
    frame = null;
    const length = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${length > 0 ? Math.max(0, Math.min(1, scrollY / length)) : 0})`;
    header.classList.toggle('is-scrolled', scrollY > 24);
  };
  const scheduleScroll = () => { if (frame == null) frame = requestAnimationFrame(updateScroll); };
  addEventListener('scroll', scheduleScroll, { passive: true });
  addEventListener('resize', scheduleScroll);
  addEventListener('load', scheduleScroll);
  // Image loading can change the total scroll distance.
  if ('ResizeObserver' in window) new ResizeObserver(scheduleScroll).observe(document.querySelector('main'));
  document.addEventListener('focusin', event => {
    animations.forEach(animation => {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    });
  });
  reducedMotion.addEventListener('change', start);
  printMedia.addEventListener('change', start);
  addEventListener('beforeprint', () => { printing = true; stop(); });
  addEventListener('afterprint', () => { printing = false; start(); });

  updateScroll();
  start();
  if (scrollY < 40 && !location.hash && canAnimate()) {
    document.querySelectorAll('.intro-copy > *, .portrait-panel').forEach((element, index) => {
      if (element.getBoundingClientRect().top < innerHeight) reveal(element, 100 + index * 180);
    });
  }
})();
