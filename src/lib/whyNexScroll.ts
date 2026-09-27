/** A native-scroll title that settles into its original place in the section. */
export function whyNexScroll(node: HTMLElement) {
 const title = node.querySelector<HTMLElement>('.why-title')!;
 const pane = node.querySelector<HTMLElement>('.why-sticky')!;
 const grid = node.querySelector<HTMLElement>('.why-grid')!;
 const preference = matchMedia('(prefers-reduced-motion: reduce)');
 let frame = 0;
 let x = 0, y = 0, scale = 1, travel = 1;
 let enabled = false;
 const clamp = (n: number) => Math.max(0, Math.min(1, n));
 function paint() {
  frame = 0;
  if (!enabled) return;
  const top = innerWidth <= 860 ? 72 : 84;
  const progress = clamp((top - node.getBoundingClientRect().top) / travel);
  const t = clamp((progress - .08) / .74);
  const eased = t * t * (3 - 2 * t);
  const remaining = 1 - eased;
  title.style.transform = `translate(${x * remaining}px, ${y * remaining}px) scale(${1 + (scale - 1) * remaining})`;
  node.style.setProperty('--why-reveal', String(clamp((progress - .64) / .24)));
 }
 function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
 function measure() {
  enabled = !preference.matches && !document.documentElement.classList.contains('motion-paused');
  node.classList.toggle('why-scroll-ready', enabled);
  title.style.removeProperty('transform');
  if (!enabled) { node.style.removeProperty('--why-height'); node.style.removeProperty('--why-travel'); node.style.removeProperty('--why-reveal'); return; }
  const top = innerWidth <= 860 ? 72 : 84;
  const height = Math.max(innerHeight - top, grid.scrollHeight + 112);
  travel = Math.max(400, innerHeight * .85);
  node.style.setProperty('--why-height', `${height}px`);
  node.style.setProperty('--why-travel', `${travel}px`);
  const box = title.getBoundingClientRect();
  const panel = pane.getBoundingClientRect();
  scale = Math.max(1, Math.min((panel.width - 32) / box.width, height * .48 / box.height));
  x = (panel.width - box.width * scale) / 2 - (box.left - panel.left);
  y = (height - box.height * scale) / 2 - (box.top - panel.top);
  paint();
 }
 const pause = new MutationObserver(measure);
 pause.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
 preference.addEventListener('change', measure);
 addEventListener('scroll', schedule, { passive: true });
 addEventListener('resize', measure);
 let disposed = false;
 document.fonts.ready.then(() => { if (!disposed) measure(); });
 measure();
 return { destroy() { disposed = true; pause.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener('change', measure); removeEventListener('scroll', schedule); removeEventListener('resize', measure); } };
}
