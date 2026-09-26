<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
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
<main id="main">
	{@render children()}
</main>
<Footer />

<style>
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
