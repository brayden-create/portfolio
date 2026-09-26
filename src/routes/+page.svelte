<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Cube from '$lib/components/Cube.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import WordBands from '$lib/components/WordBands.svelte';
	import { projects } from '$lib/data/projects';

	const principles = [
		{
			t: 'Guardrails before magic',
			d: 'Anything a non-engineer can trigger gets server-side validation, reversible deletes and an activity log. The model or the editor is never the security boundary.'
		},
		{
			t: 'Measure, don’t guess',
			d: 'Core Web Vitals, live DOM measurements at real breakpoints, and Search Console data decide what gets fixed next.'
		},
		{
			t: 'Checks that block the build',
			d: 'If a mistake can happen twice, a check goes into the build that fails it. Validators, copy linting and tests all block the deploy.'
		},
		{
			t: 'I can explain every line',
			d: 'I build with Claude Code every day. I read and question what it writes, and I push back when it’s wrong.'
		}
	];
</script>

<svelte:head>
	<title>Brayden Gregersen · Frontend Engineer</title>
	<meta
		name="description"
		content="Brayden Gregersen builds fast marketing sites, CMS tools for non-technical teams, and the Cloudflare infrastructure behind them."
	/>
</svelte:head>

<section class="hero">
	<div class="wrap">
		<h1 class="display">What happened to the small-business website?</h1>
		<p class="lede">Slow pages, stale content, and owners locked out of their own site. I’ve been fixing that.</p>
		<Button href="#work" label="See the work" />
	</div>
	<div class="hero-art" aria-hidden="true">
		<div class="win w1"><i></i><i></i><i></i><b style="width:70%"></b><b style="width:45%"></b></div>
		<div class="win w2"><span>LCP ✓ fast</span><span>CLS ✓ stable</span><span>INP ✓ snappy</span></div>
		<div class="win w3"><em>“Change the hours to 9 to 5 on Saturday.”</em><strong>✓ Draft updated, logged</strong></div>
	</div>
	<svg class="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0 60 L1440 0 V90 H0Z" fill="var(--teal)" />
	</svg>
</section>

<section class="meet">
	<div class="wrap meet-grid">
		<div>
			<h2 class="display">Meet<br />Brayden</h2>
			<p>
				I build and run production marketing sites end to end, from content modeling and components
				through deployment, performance and the tools people use to update them. Most of it runs on
				Cloudflare in strict TypeScript.
			</p>
			<p>
				For nine years I’ve worked as a maintenance technician on an injection-molding floor, where
				downtime costs money by the minute. I bring the same habits to software: find the root cause,
				check the fix under real load, and add a check so it stays fixed.
			</p>
		</div>
		<Cube size={200} />
	</div>
</section>

<section class="one">
	<div class="wrap">
		<h2 class="display">One little<br />portfolio.</h2>
		<p>Real projects for real businesses, most of them live today. Open any card to see what made it hard.</p>
	</div>
</section>

<section id="work" class="work">
	<div class="wrap cards">
		{#each projects as p, i (p.slug)}
			<ProjectCard project={p} index={i} />
		{/each}
	</div>
</section>

<WordBands />

<section id="how" class="how">
	<div class="wrap">
		<h2 class="display">Quality is built right in</h2>
		<ol>
			{#each principles as p, i}
				<li>
					<h3 class="display">{i + 1}. {p.t}</h3>
					<p>{p.d}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="family">
	<div class="wrap fam-grid">
		<img src="/family.jpg" alt="Brayden with his partner and two young sons" width="960" height="960" loading="lazy" />
		<div>
			<span class="eyebrow">Why this matters to me</span>
			<h2 class="display">Built by a dad of two.</h2>
			<p>
				Screens usually pull my boys onto the couch. I’d love to spend my days on a product that gets
				them off it, and on the website that makes families want to try it.
			</p>
			<Button href="/resume/" label="Read the resume" tone="green" />
		</div>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		position: relative;
		background: linear-gradient(180deg, #efe6da 0%, #e7d9c8 100%);
		margin-top: -84px;
		padding: 150px 0 150px;
		overflow: hidden;
		text-align: center;
	}
	.hero h1 {
		font-size: clamp(44px, 8vw, 104px);
		max-width: 12ch;
		margin-inline: auto;
	}
	.lede {
		font-size: clamp(18px, 2vw, 21px);
		max-width: 34ch;
		margin: 22px auto 34px;
	}
	.hero-art {
		position: relative;
		height: 260px;
		max-width: 900px;
		margin: 56px auto 0;
	}
	.win {
		position: absolute;
		background: var(--white);
		border-radius: 14px;
		box-shadow: 0 24px 50px -24px rgba(39, 28, 19, 0.45);
		padding: 16px;
		text-align: left;
	}
	.w1 {
		left: 4%;
		top: 20px;
		width: 290px;
		height: 190px;
		rotate: -4deg;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: 10px;
	}
	.w1 i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--coral);
	}
	.w1 i:nth-child(2) {
		background: #e6e07a;
	}
	.w1 i:nth-child(3) {
		background: var(--teal);
	}
	.w1 b {
		display: block;
		height: 14px;
		border-radius: 7px;
		background: var(--paper);
		flex-basis: 100%;
		margin-top: 10px;
	}
	.w2 {
		left: 50%;
		translate: -50% 0;
		top: 70px;
		display: grid;
		gap: 8px;
		background: var(--ink);
		color: var(--mint);
		font: 500 17px var(--mono);
		padding: 20px 26px;
		z-index: 2;
	}
	.w3 {
		right: 3%;
		top: 10px;
		width: 280px;
		rotate: 3deg;
		display: grid;
		gap: 12px;
		font-size: 15px;
	}
	.w3 em {
		background: var(--paper);
		padding: 10px 12px;
		border-radius: 12px 12px 12px 2px;
	}
	.w3 strong {
		color: var(--green);
	}
	.wave {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 90px;
	}

	/* Meet */
	.meet {
		background: var(--teal);
		padding: 60px 0 100px;
	}
	.meet-grid {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 40px;
		align-items: center;
	}
	.meet h2 {
		color: var(--white);
		font-size: clamp(56px, 8vw, 110px);
		margin-bottom: 24px;
	}
	.meet p {
		max-width: 56ch;
		font-size: 18px;
	}

	/* One little */
	.one {
		padding: 120px 0 40px;
		text-align: center;
	}
	.one h2 {
		color: var(--green);
		font-size: clamp(64px, 13vw, 180px);
	}
	.one p {
		max-width: 44ch;
		margin: 26px auto 0;
		font-size: 19px;
	}

	/* Work */
	.work {
		padding: 50px 0 120px;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
	}

	/* How */
	.how {
		background: var(--white);
		padding: 110px 0;
	}
	.how h2 {
		font-size: clamp(48px, 7vw, 90px);
		max-width: 12ch;
	}
	.how ol {
		list-style: none;
		padding: 0;
		margin: 56px 0 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 40px 56px;
	}
	.how h3 {
		font-size: 22px;
		line-height: 1.1;
		margin-bottom: 10px;
	}
	.how p {
		margin: 0;
		max-width: 48ch;
	}

	/* Family */
	.family {
		background: var(--mint);
		padding: 100px 0;
	}
	.fam-grid {
		display: grid;
		grid-template-columns: 0.9fr 1.1fr;
		gap: 56px;
		align-items: center;
	}
	.fam-grid img {
		border-radius: var(--radius);
		aspect-ratio: 1;
		object-fit: cover;
		width: 100%;
		height: auto;
	}
	.family .eyebrow {
		color: var(--green);
	}
	.family h2 {
		font-size: clamp(44px, 6vw, 80px);
		margin: 14px 0 20px;
	}
	.family p {
		font-size: 19px;
		max-width: 44ch;
		margin: 0 0 30px;
	}

	@media (max-width: 860px) {
		.meet-grid,
		.fam-grid,
		.cards,
		.how ol {
			grid-template-columns: minmax(0, 1fr);
		}
		.hero {
			margin-top: -68px;
			padding: 120px 0 120px;
		}
		.hero-art {
			height: 230px;
		}
		.w1 {
			left: 0;
			width: 200px;
		}
		.w3 {
			right: 6px;
			width: 200px;
			top: 110px;
		}
		.w2 {
			top: 20px;
		}
	}
</style>
