/** Match the section crossing the header, including scroll-driven color changes. */
export function navSurface(header: HTMLElement) {
	let frame = 0;
	let sections: HTMLElement[] = [];
	function refresh() {
		sections = Array.from(document.querySelectorAll('main > section:not(.bands), main .band, main > .page, footer#contact'));
		schedule();
	}
	function paint() {
		frame = 0;
		const sampleY = Math.min(header.offsetHeight, 84) / 2;
		const section = sections.find(el => {
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
	refresh();
	addEventListener('scroll', schedule, { passive: true });
	addEventListener('resize', schedule);
	const observer = new MutationObserver(refresh);
	const main = document.querySelector('main');
	if (main) observer.observe(main, { childList: true, subtree: true });
	// Recompute after font/image loading and navigation change the section positions.
	addEventListener('load', schedule, true);
	return { destroy() { cancelAnimationFrame(frame); observer.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); removeEventListener('load', schedule, true); } };
}
