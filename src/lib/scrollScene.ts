/** A bounded scroll timeline. Native scrolling, no wheel interception. */
export function scrollScene(node: HTMLElement) {
	const reduce = matchMedia('(prefers-reduced-motion: reduce)');
	let frame = 0;
	let visible = false;
	const clamp = (value: number) => Math.max(0, Math.min(1, value));
	function paint() {
		frame = 0;
		if (reduce.matches) return;
		const rect = node.getBoundingClientRect();
		const progress = clamp(-rect.top / Math.max(1, rect.height - innerHeight));
		const passage = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
		node.style.setProperty('--scene', progress.toFixed(4));
		node.style.setProperty('--passage', passage.toFixed(4));
	}
	function tick() { if (visible && !frame) frame = requestAnimationFrame(paint); }
	function preference() {
		node.classList.toggle('scroll-enabled', !reduce.matches);
		if (reduce.matches) { node.style.removeProperty('--scene'); node.style.removeProperty('--passage'); }
		else tick();
	}
	const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; tick(); });
	observer.observe(node);
	preference();
	reduce.addEventListener('change', preference);
	addEventListener('scroll', tick, { passive: true });
	addEventListener('resize', tick);
	return { destroy() { observer.disconnect(); cancelAnimationFrame(frame); reduce.removeEventListener('change', preference); removeEventListener('scroll', tick); removeEventListener('resize', tick); } };
}
