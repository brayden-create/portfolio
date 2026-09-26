<!-- Full-bleed stacked verbs, one colored band each, echoing the "WIGGLE / PLAY / GROOVE" run on nexplayground.com. -->
<script lang="ts">
	const words = [
		{ w: 'Scope', bg: 'var(--green)', note: 'Find the real ask behind the request' },
		{ w: 'Build', bg: 'var(--teal-deep)', note: 'Components, content model, then pages' },
		{ w: 'Ship', bg: 'var(--violet)', note: 'Deploy, then smoke-test production' },
		{ w: 'Measure', bg: 'var(--coral)', note: 'LCP, INP, CLS, and what editors feel' },
		{ w: 'Fix', bg: 'var(--tan)', note: 'Root cause first, then a check so it stays fixed' }
	];
</script>

<section class="bands" aria-label="How a project moves">
	{#each words as b, i}
		<div class="band" style="background:{b.bg}">
			<div class="row">
				<h2 class="display">{b.w}</h2>
				<p><span>{String(i + 1).padStart(2, '0')}</span>{b.note}</p>
			</div>
		</div>
	{/each}
</section>

<style>
	.band {
		color: var(--white);
		overflow: hidden;
	}
	.row {
		width: var(--wrap);
		margin-inline: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding-block: 10px;
	}
	h2 {
		font-size: clamp(64px, 13vw, 170px);
		line-height: 0.95;
	}
	p {
		margin: 0;
		max-width: 260px;
		font-weight: 600;
		text-align: right;
	}
	p span {
		display: block;
		font: 500 13px var(--mono);
		opacity: 0.8;
		margin-bottom: 4px;
	}
	@media (max-width: 640px) {
		.row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0;
			padding-block: 18px;
		}
		p {
			text-align: left;
		}
	}
</style>
