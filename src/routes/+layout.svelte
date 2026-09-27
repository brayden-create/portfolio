<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { page } from '$app/state';
	let { children } = $props();
	let paused = $state(false);
</script>

<svelte:head>
	<link rel="canonical" href={`https://bedtimebuilds.com${page.url.pathname}`} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&family=Rubik:wght@800;900&display=swap"
	/>
	<link
		rel="icon"
		href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23007e2e'/%3E%3Ctext x='16' y='23' font-family='Arial Black' font-size='18' text-anchor='middle' fill='%23ededed'%3EB%3C/text%3E%3C/svg%3E"
	/>
</svelte:head>

<a class="skip" href="#main">Skip to content</a>
<Nav />
<button class="motion-toggle" aria-pressed={paused} onclick={() => { paused = !paused; document.documentElement.classList.toggle('motion-paused', paused); }}>{paused ? 'Play motion' : 'Pause motion'}</button>
<main id="main">
	{@render children()}
</main>
<Footer />

<style>
	.motion-toggle { position: fixed; bottom: 12px; right: 12px; z-index: 50; border: 1px solid currentColor; border-radius: 999px; background: var(--paper); color: var(--ink); padding: 10px 16px; min-height: 44px; font: 600 12px var(--body); cursor: pointer; }
	@media print { .motion-toggle { display: none; } }
	@media (prefers-reduced-motion: reduce) { .motion-toggle { display: none; } }
	.skip {
		position: absolute;
		left: -999px;
		top: 8px;
		z-index: 100;
		background: var(--violet);
		color: #fff;
		padding: 10px 14px;
		border-radius: 8px;
	}
	.skip:focus {
		left: 8px;
	}
</style>
