/** Open, hold, then close the door as its section passes through the viewport. */
export function doorScroll(node: HTMLElement) {
 const preference = matchMedia('(prefers-reduced-motion: reduce)');
 let frame = 0;
 const clamp = (n: number) => Math.max(0, Math.min(1, n));
 const ease = (n: number) => { const t = clamp(n); return t*t*(3-2*t); };
 function paint() {
  frame = 0;
  const rect = (node.querySelector('.door-scene') ?? node).getBoundingClientRect();
  const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
  const still = preference.matches || document.documentElement.classList.contains('motion-paused');
  const open = still ? .82 : ease((progress - .12) / .28) * (1 - ease((progress - .66) / .25));
  node.style.setProperty('--door-open', open.toFixed(4));
 }
 function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
 const observer = new MutationObserver(schedule); observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 const resize = new ResizeObserver(schedule); resize.observe(node);
 preference.addEventListener('change',schedule); addEventListener('scroll',schedule,{passive:true}); addEventListener('resize',schedule); paint();
 return {destroy(){cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();preference.removeEventListener('change',schedule);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);}};
}
