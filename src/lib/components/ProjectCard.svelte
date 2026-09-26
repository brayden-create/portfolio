<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project, index }: { project: Project; index: number } = $props();
</script>

<article class="card {project.tone}" class:featured={project.featured} id={project.slug}>
	<header>
		<span class="num">{String(index + 1).padStart(2, '0')}</span>
		<span class="eyebrow">{project.kicker}</span>
	</header>
	<h3 class="display">{project.title}</h3>
	<p class="summary">{project.summary}</p>

	<details>
		<summary>What made it hard</summary>
		<p>{project.hard}</p>
	</details>

	<ul class="stack" aria-label="Stack">
		{#each project.stack as s}<li>{s}</li>{/each}
	</ul>

	<footer>
		{#if project.link}
			<a href={project.link.href} target="_blank" rel="noopener">{project.link.label} ↗</a>
		{/if}
		{#if project.note}<small>{project.note}</small>{/if}
	</footer>
</article>

<style>
	.card {
		--bg: var(--white);
		--fg: var(--ink);
		--chip: rgba(39, 28, 19, 0.08);
		background: var(--bg);
		color: var(--fg);
		border-radius: var(--radius);
		padding: 28px 28px 24px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		min-width: 0;
	}
	.featured {
		grid-column: span 2;
	}
	.green {
		--bg: var(--green);
		--fg: var(--white);
		--chip: rgba(255, 255, 255, 0.16);
	}
	.teal {
		--bg: var(--teal);
		--fg: var(--ink);
	}
	.coral {
		--bg: var(--coral);
		--fg: var(--white);
		--chip: rgba(255, 255, 255, 0.2);
	}
	.ink {
		--bg: var(--ink);
		--fg: var(--paper);
		--chip: rgba(255, 255, 255, 0.12);
	}
	.violet {
		--bg: var(--violet);
		--fg: var(--white);
		--chip: rgba(255, 255, 255, 0.18);
	}
	.tan {
		--bg: var(--tan);
		--fg: var(--white);
		--chip: rgba(255, 255, 255, 0.18);
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
	}
	.num {
		font: 500 14px var(--mono);
		opacity: 0.75;
	}
	h3 {
		font-size: clamp(30px, 4vw, 46px);
	}
	.summary {
		margin: 0;
		max-width: 62ch;
	}
	details {
		border-top: 1.5px solid currentColor;
		border-color: color-mix(in srgb, currentColor 30%, transparent);
		padding-top: 12px;
	}
	summary {
		cursor: pointer;
		font-weight: 700;
		list-style: none;
		display: flex;
		justify-content: space-between;
		min-height: 28px;
		align-items: center;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary::after {
		content: '+';
		font: 900 24px/1 var(--display);
		transition: rotate 0.2s ease;
	}
	details[open] summary::after {
		rotate: 45deg;
	}
	details p {
		margin: 10px 0 0;
		max-width: 66ch;
	}
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		list-style: none;
		padding: 0;
		margin: 4px 0 0;
	}
	.stack li {
		background: var(--chip);
		font: 500 12.5px/1 var(--mono);
		padding: 7px 10px;
		border-radius: 999px;
	}
	footer {
		margin-top: auto;
		display: flex;
		flex-wrap: wrap;
		gap: 6px 16px;
		align-items: baseline;
	}
	footer a {
		font-weight: 700;
		text-underline-offset: 4px;
		padding-block: 4px;
	}
	small {
		opacity: 0.8;
		font-size: 13.5px;
	}
	@media (max-width: 860px) {
		.featured {
			grid-column: auto;
		}
		.card {
			padding: 22px 20px 20px;
		}
	}
</style>
