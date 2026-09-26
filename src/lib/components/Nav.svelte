<script lang="ts">
	import { navSurface } from '$lib/navSurface';
	import { page } from '$app/state';

	let open = $state(false);

	const left = [
		{ href: '/#work', label: 'See the work' },
		{ href: '/#how', label: 'How I ship' }
	];
	const right = [
		{ href: '/resume/', label: 'Resume' },
		{ href: '/#contact', label: 'Contact' }
	];
</script>

<header use:navSurface class:open>
	<nav class="bar" aria-label="Main">
		<ul class="side">
			{#each left as l}<li><a href={l.href}>{l.label}</a></li>{/each}
		</ul>
		<a class="mark" href="/" aria-label="Brayden Gregersen, home">
			<span>BRAYDEN</span><span class="dot" aria-hidden="true"></span>
		</a>
		<ul class="side right">
			{#each right as l}
				<li><a href={l.href} aria-current={page.url.pathname === l.href ? 'page' : undefined}>{l.label}</a></li>
			{/each}
		</ul>
		<button class="menu" aria-expanded={open} aria-controls="mobile-nav" onclick={() => (open = !open)}>
			{open ? 'Close' : 'Menu'}
		</button>
	</nav>
	<ul id="mobile-nav" class="mobile" hidden={!open}>
		{#each [...left, ...right] as l}
			<li><a href={l.href} onclick={() => (open = false)}>{l.label}</a></li>
		{/each}
	</ul>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--nav-surface, #efe6da);
		color: var(--nav-ink, var(--ink));
		transition: background-color 180ms ease, color 180ms ease;
	}
	header.open {
		background: var(--nav-surface, var(--paper));
	}
	.bar {
		width: var(--wrap);
		margin-inline: auto;
		height: 84px;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}
	.side {
		display: flex;
		gap: 32px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.right {
		justify-content: flex-end;
	}
	.side a,
	.mobile a {
		font-weight: 600;
		text-decoration: none;
		font-size: 16px;
		padding-block: 8px;
	}
	.side a:hover,
	.side a[aria-current='page'] {
		text-decoration: underline;
		text-underline-offset: 6px;
		text-decoration-thickness: 2px;
	}
	.mark {
		font: 900 30px/1 var(--display);
		letter-spacing: -0.02em;
		text-decoration: none;
		display: inline-flex;
		align-items: flex-end;
		gap: 3px;
	}
	.dot {
		width: 9px;
		height: 9px;
		background: var(--coral);
		margin-bottom: 3px;
	}
	.menu {
		display: none;
		justify-self: end;
		font: 600 15px var(--body);
		background: var(--nav-ink, var(--ink));
		color: var(--nav-surface, var(--white));
		border: 0;
		border-radius: 999px;
		padding: 10px 18px;
		min-height: 44px;
		cursor: pointer;
	}
	.mobile {
		list-style: none;
		margin: 0;
		padding: 8px 16px 20px;
	}
	.mobile a {
		display: block;
		font-size: 22px;
		padding: 10px 0;
	}
	@media (max-width: 760px) {
		.bar {
			grid-template-columns: 1fr auto;
			height: 68px;
		}
		.side {
			display: none;
		}
		.mark {
			justify-self: start;
			font-size: 26px;
		}
		.menu {
			display: block;
		}
	}
	@media (min-width: 761px) {
		.mobile {
			display: none;
		}
	}
</style>
