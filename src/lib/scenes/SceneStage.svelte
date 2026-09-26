<!--
  Nex-branded frame around a product scene. The frame (panel color, headline,
  numbered steps, controls) follows nexplayground.com. The scene inside is a
  faithful, animated recreation of the real product's UI.
-->
<script lang="ts" module>
	let fontsLoaded = false;
	// Product fonts are only needed once the work section is near, so they load lazily
	// and never compete with the hero for LCP.
	function loadProductFonts() {
		if (fontsLoaded || typeof document === 'undefined') return;
		fontsLoaded = true;
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href =
			'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;600&family=Cardo&family=Cormorant+Garamond:wght@500&family=Jost:wght@400;500&family=Rajdhani:wght@500;600;700&display=swap';
		document.head.appendChild(link);
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { scenes } from './registry';

	let {
		slug,
		title,
		links = [],
		note = ''
	}: {
		slug: string;
		title: string;
		links?: { href: string; label: string; external: boolean }[];
		note?: string;
	} = $props();
	const scene = $derived(scenes[slug]);

	let step = $state(0);
	let playing = $state(true);
	let visible = $state(false);
	let reduced = $state(false);
	let el = $state<HTMLElement>();

	const last = $derived(scene ? scene.steps.length - 1 : 0);

	function go(i: number) {
		step = i;
		playing = false;
	}
	function toggle() {
		if (reduced) return;
		if (!playing && step === last) step = 0;
		playing = !playing;
	}
	function replay() {
		step = 0;
		playing = !reduced;
	}

	onMount(() => {
		const mq = matchMedia('(prefers-reduced-motion: reduce)');
		const sync = () => {
			reduced = mq.matches;
			if (reduced) playing = false;
		};
		sync();
		mq.addEventListener('change', sync);

		const near = new IntersectionObserver(
			(e) => {
				if (e[0].isIntersecting) loadProductFonts();
			},
			{ rootMargin: '600px' }
		);
		near.observe(el!);
		const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting), { threshold: 0.15 });
		io.observe(el!);

		let hold = 0;
		const timer = setInterval(() => {
			const paused = document.documentElement.classList.contains('motion-paused');
			if (!visible || !playing || reduced || paused || document.hidden) return;
			if (step < last) step += 1;
			else if (++hold >= 2) {
				hold = 0;
				step = 0; // loop, with a beat of rest on the final state
			}
		}, 3200);

		return () => {
			clearInterval(timer);
			io.disconnect();
			near.disconnect();
			mq.removeEventListener('change', sync);
		};
	});
</script>

{#if scene}
	<section bind:this={el} class="stage tone-{scene.tone}" class:frozen={!visible} aria-label="{title}, how it works">
		<header class="top">
			<h4 class="display">{scene.headline}</h4>
			<ol class="steps">
				{#each scene.steps as label, i}
					<li>
						<button class:on={step === i} class:past={step > i} aria-current={step === i ? 'step' : undefined} onclick={() => go(i)}>
							<span class="n">{i + 1}.</span>{label}
						</button>
					</li>
				{/each}
			</ol>
		</header>

		<div class="screen">
			<scene.component {step} />
		</div>

		<footer class="bottom">
			<p aria-live="polite">{scene.notes[step]}</p>
			{#if links.length}
				<div class="visit">
					{#each links as l, i}
						<a class:primary={i === 0} href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noopener' : undefined}>
							{l.label}<span aria-hidden="true">{l.external ? ' ↗' : ' →'}</span>
						</a>
					{/each}
				</div>
			{:else if note}
				<span class="private">{note}</span>
			{/if}
			<div class="controls">
				{#if !reduced}<button onclick={toggle}>{playing ? 'Ⅱ Pause' : '▶ Play'}</button>{/if}
				<button onclick={() => go((step + 1) % scene.steps.length)}>Next →</button>
				<button onclick={replay}>↻ Replay</button>
			</div>
		</footer>
	</section>
{/if}

<style>
	.stage {
		--panel: var(--green);
		--on: var(--white);
		--chip: rgba(255, 255, 255, 0.16);
		background: var(--panel);
		color: var(--on);
		border-radius: 28px;
		padding: clamp(22px, 4vw, 48px);
		display: grid;
		gap: clamp(20px, 3vw, 34px);
		overflow: hidden;
	}
	.tone-green { --panel: #007e2e; }
	.tone-teal { --panel: #5cc9b8; --on: #271c13; --chip: rgba(39, 28, 19, 0.1); }
	.tone-coral { --panel: #ff4733; }
	.tone-ink { --panel: #271c13; --on: #ededed; }
	.tone-tan { --panel: #87715e; }
	.tone-mist { --panel: #bbbcc4; --on: #271c13; --chip: rgba(39, 28, 19, 0.1); }
	.tone-mint { --panel: #c4e1ce; --on: #271c13; --chip: rgba(39, 28, 19, 0.1); }
	.tone-paper { --panel: #ffffff; --on: #271c13; --chip: rgba(39, 28, 19, 0.08); }

	.top {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 24px;
		flex-wrap: wrap;
	}
	h4 {
		font-size: clamp(34px, 5.6vw, 74px);
		max-width: 11ch;
	}
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.steps button {
		font: 700 14px var(--body);
		color: inherit;
		background: var(--chip);
		border: 0;
		border-radius: 999px;
		padding: 10px 16px;
		min-height: 44px;
		cursor: pointer;
		display: inline-flex;
		gap: 6px;
		align-items: center;
		transition: background 0.25s, color 0.25s;
	}
	.steps .n {
		font: 500 12px var(--mono);
		opacity: 0.8;
	}
	.steps button.on {
		background: var(--on);
		color: var(--panel);
	}
	.steps button.past {
		opacity: 0.75;
	}
	.screen {
		min-width: 0;
		border-radius: 18px;
		box-shadow: 0 34px 60px -30px rgba(0, 0, 0, 0.55);
		overflow: hidden;
		isolation: isolate;
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
	}
	.bottom p {
		margin: 0;
		font-size: 17px;
		font-weight: 500;
		max-width: 60ch;
		min-height: 2.8em;
	}
	.controls {
		display: flex;
		gap: 6px;
		margin-left: auto;
	}
	.visit {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-left: auto;
	}
	.visit a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 18px;
		border-radius: 999px;
		font: 700 14px var(--body);
		text-decoration: none;
		color: inherit;
		border: 1.5px solid currentColor;
		transition: transform 0.15s;
	}
	.visit a.primary {
		background: var(--on);
		color: var(--panel);
		border-color: var(--on);
	}
	.visit a:hover {
		transform: translateY(-2px);
	}
	.private {
		margin-left: auto;
		font: 500 12px var(--mono);
		opacity: 0.8;
		max-width: 34ch;
	}
	.controls button {
		font: 600 13px var(--body);
		color: inherit;
		background: transparent;
		border: 1.5px solid currentColor;
		border-radius: 999px;
		padding: 8px 14px;
		min-height: 44px;
		cursor: pointer;
	}
	.controls button:hover {
		background: var(--chip);
	}
	.frozen :global(*) {
		animation-play-state: paused !important;
	}
	:global(.motion-paused) .stage :global(*) {
		animation: none !important;
	}
	@media (prefers-reduced-motion: reduce) {
		.stage :global(*) {
			animation: none !important;
			transition: none !important;
		}
	}
	@media (max-width: 700px) {
		.stage {
			border-radius: 20px;
		}
		.steps {
			width: 100%;
		}
		.steps button {
			padding: 8px 12px;
			font-size: 13px;
		}
		.bottom p {
			font-size: 15px;
		}
	}
</style>
