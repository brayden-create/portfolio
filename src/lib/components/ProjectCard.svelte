<script lang="ts">
	import { motion } from '$lib/motion';
	import SceneStage from '$lib/scenes/SceneStage.svelte';
	import type { Project } from '$lib/data/projects';
	let { project, index }: { project: Project; index: number } = $props();

	// Buttons on the scene frame: the demo first (it's interactive), then the real site.
	const links = $derived(
		[
			project.demo && { href: project.demo.href, label: project.demo.label, external: false },
			project.link && { href: project.link.href, label: project.link.label, external: true }
		].filter(Boolean) as { href: string; label: string; external: boolean }[]
	);
</script>

<article class="project" id={project.slug}>
	<header class="head">
		<span class="project-number">{String(index + 1).padStart(2, '0')}</span>
		<div class="title-block">
			<span class="eyebrow">{project.kicker}</span>
			<h3 class="display">{project.title}</h3>
			<details class="more">
				<summary><span>Learn more</span><i aria-hidden="true">▾</i></summary>
				<div class="information">
					<div>
						<p class="description">{project.summary}</p>
						<h4>What made it possible</h4>
						<p>{project.hard}</p>
					</div>
					<div>
						<h4>Built with</h4>
						<ul class="stack">{#each project.stack as item}<li>{item}</li>{/each}</ul>
						{#if project.note}<p class="note">{project.note}</p>{/if}
					</div>
				</div>
			</details>
		</div>
	</header>
	<div class="demo-reveal" use:motion>
		<SceneStage slug={project.slug} title={project.title} {links} note={links.length ? '' : project.note ?? ''} />
	</div>
</article>

<style>
	.project {
		min-width: 0;
		scroll-margin-top: 100px;
	}
	.head {
		display: flex;
		gap: 24px;
		padding: 22px 0 25px;
		border-top: 1px solid #271c1340;
	}
	.project-number {
		font: 500 13px var(--mono);
		padding-top: 4px;
		color: var(--green);
	}
	.title-block {
		flex: 1;
		min-width: 0;
	}
	.eyebrow {
		display: block;
		margin-bottom: 12px;
		font-size: 10px;
		color: var(--green);
	}
	h3 {
		font-size: clamp(27px, 4vw, 48px);
		line-height: 1.02;
		text-wrap: initial;
	}
	summary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 14px;
		min-height: 44px;
		padding: 0 16px;
		border: 1.5px solid var(--green);
		border-radius: 999px;
		color: var(--green);
		font: 700 14px var(--body);
		cursor: pointer;
		list-style: none;
		transition: background 0.2s, color 0.2s;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary:hover,
	.more[open] summary {
		background: var(--green);
		color: #fff;
	}
	summary i {
		font-style: normal;
		transition: rotate 0.3s;
	}
	.more[open] summary i {
		rotate: 180deg;
	}
	summary:focus-visible {
		outline: 3px solid var(--violet);
		outline-offset: 4px;
	}
	.information {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		gap: 50px;
		padding: 22px 0 6px;
		animation: open 0.35s ease both;
	}
	.information p {
		font-size: 14px;
		line-height: 1.8;
		margin: 0 0 22px;
	}
	.information .description {
		font-size: 17px;
	}
	h4 {
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--green);
		margin: 0 0 12px;
	}
	.stack {
		display: flex;
		gap: 7px;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0 0 25px;
	}
	.stack li {
		background: var(--mint);
		font: 500 11px var(--mono);
		padding: 7px 10px;
		border-radius: 30px;
	}
	.note {
		font-size: 12px !important;
	}
	@keyframes open {
		from { opacity: 0; transform: translateY(-6px); }
		to { opacity: 1; transform: none; }
	}
	@media (max-width: 700px) {
		.head {
			gap: 12px;
		}
		.project-number {
			font-size: 10px;
		}
		.eyebrow {
			font-size: 9px;
			margin-bottom: 9px;
		}
		h3 {
			font-size: 26px;
		}
		.information {
			grid-template-columns: 1fr;
			gap: 18px;
		}
		.information .description {
			font-size: 16px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.information {
			animation: none;
		}
	}
</style>
