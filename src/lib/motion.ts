/** Progressive enhancement: content stays visible without JS or with reduced motion. */
export function motion(node: HTMLElement) {
	const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let observer: IntersectionObserver | undefined;
	let frame = 0;
	let active = false;
	function update() {
		frame = 0;
		const box = node.getBoundingClientRect();
		const progress = Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight + box.height)));
		node.style.setProperty('--travel', String(progress));
	}
	function scroll() { if (active && !frame) frame = requestAnimationFrame(update); }
	function setup() {
		observer?.disconnect();
		node.classList.remove('motion-ready', 'in-view');
		node.style.removeProperty('--travel');
		active = false;
		if (preference.matches) return;
		observer = new IntersectionObserver(entries => {
			for (const entry of entries) {
				active = entry.isIntersecting;
				if (active) { node.classList.add('in-view'); scroll(); }
			}
		}, { threshold: 0.08 });
		node.classList.add('motion-ready');
		observer.observe(node);
	}
	setup();
	preference.addEventListener('change', setup);
	window.addEventListener('scroll', scroll, { passive: true });
	window.addEventListener('resize', scroll);
	return { destroy() { observer?.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener('change', setup); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', scroll); } };
}
