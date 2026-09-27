import { tick } from 'svelte';

/** Match the section crossing the header, including scroll-driven color changes. */
export function navSurface(header: HTMLElement) {
	let frame = 0;
	let destroyed = false;
	let sections: HTMLElement[] = [];
	function refresh() {
		sections = Array.from(document.querySelectorAll('main > section:not(.bands), main .band, main > .page, footer#contact'));
		schedule();
	}
	function paint() {
		frame = 0;
		// Expanding the mobile menu shifts the page; retain the section's color.
		if (header.classList.contains('open')) return;
		// Include the small scroll-margin gap left by section anchor links.
		const bar = header.querySelector<HTMLElement>('.bar');
		const sampleY = (bar ?? header).getBoundingClientRect().bottom + 32;
		const section = [...sections].reverse().find(el => {
			const box = el.getBoundingClientRect();
			return box.top <= sampleY && box.bottom > sampleY;
		});
		let surface = '#ededed';
		if (section?.classList.contains('hero')) surface = '#efe6da';
		else if (section) {
			let element: HTMLElement | null = section;
			while (element) {
				const background = getComputedStyle(element).backgroundColor;
				if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') { surface = background; break; }
				element = element.parentElement;
			}
		}
		const values = surface.match(/[\d.]+/g)?.map(Number);
		let rgb: number[];
		if (surface.startsWith('#')) rgb = [1, 3, 5].map(i => parseInt(surface.slice(i, i + 2), 16) / 255);
		else if (surface.startsWith('color(srgb')) rgb = (values ?? [1, 1, 1]).slice(0, 3);
		else rgb = (values ?? [255, 255, 255]).slice(0, 3).map(v => v / 255);
		const linear = rgb.map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
		const luminance = .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
		const inkLuminance = .013;
		const inkContrast = (luminance + .05) / (inkLuminance + .05);
		const whiteContrast = 1.05 / (luminance + .05);
		header.style.setProperty('--nav-surface', surface);
		header.style.setProperty('--nav-ink', inkContrast >= whiteContrast ? '#271c13' : '#ffffff');
	}
	function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
	addEventListener('scroll', schedule, { passive: true });
	addEventListener('resize', schedule);
	const observer = new MutationObserver(refresh);
	// The action can run before its sibling main has mounted during navigation.
	void tick().then(() => {
		if (destroyed) return;
		refresh();
		observer.observe(document.body, { childList: true, subtree: true });
		observer.observe(header, { attributes: true, attributeFilter: ['class'] });
	});
	// Recompute after font/image loading and navigation change the section positions.
	addEventListener('load', refresh, true);
	addEventListener('pageshow', refresh);
	addEventListener('hashchange', refresh);
	return { destroy() { destroyed = true; cancelAnimationFrame(frame); observer.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); removeEventListener('load', refresh, true); removeEventListener('pageshow', refresh); removeEventListener('hashchange', refresh); } };
}
