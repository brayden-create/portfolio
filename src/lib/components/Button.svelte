<script lang="ts">
	let {
		href,
		label,
		tone = 'violet',
		external = false
	}: { href: string; label: string; tone?: 'violet' | 'green' | 'ink'; external?: boolean } = $props();
</script>

<a
	class="btn {tone}"
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
>
	<span class="arrow" aria-hidden="true">
		<svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 8h9V3l9 9-9 9v-5H3z" fill="currentColor" /></svg>
	</span>
	<span class="label">{label}</span>
</a>

<style>
	.btn {
		display: inline-flex;
		align-items: stretch;
		text-decoration: none;
		background: var(--white);
		color: var(--violet);
		font: 500 19px/1 var(--body);
		min-height: 54px;
		transition: transform 0.15s ease;
	}
	.arrow svg { transition: transform 300ms cubic-bezier(.2,.8,.2,1); }
	.btn:hover .arrow svg, .btn:focus-visible .arrow svg { transform: translateX(5px); }
	.btn:active { scale: .97; }
	.btn:hover {
		transform: translateY(-2px);
	}
	.arrow {
		display: grid;
		place-items: center;
		width: 54px;
		background: var(--violet);
		color: var(--white);
	}
	.label {
		display: flex;
		align-items: center;
		padding: 0 22px;
	}
	.green {
		color: var(--green);
	}
	.green .arrow {
		background: var(--green);
	}
	.ink {
		color: var(--ink);
	}
	.ink .arrow {
		background: var(--ink);
	}
</style>
