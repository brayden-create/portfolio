<script lang="ts">
	const roles = [
		{
			title: 'Founder & Engineer',
			org: 'PL Pages (Precision Landing Pages, LLC)',
			when: '2025 to present',
			blurb: 'A web, SEO and business-systems studio for local service companies. I’m the only builder, and the clients are on retainer.',
			points: [
				'<b>Chat CMS for non-technical owners.</b> I built a plain-English editing tool (Cloudflare Worker, Anthropic tool loop, WordPress REST) so a business owner can draft and update pages on bravelizard.com without opening WP admin. It runs server-side validation on every write, only moves deletes to trash after confirmation, keeps a full activity log and sits behind SSO. I ported it to a second client.',
				'<b>Marketing sites as component systems.</b> I built a 7-page counter-drone site from shared partials, with JSON-LD generated from the same data as the markup. All interaction is CSS-only (<code>:has()</code>, <code>&lt;details&gt;</code>) because the CMS strips scripts, and it was checked at 360 to 1440px against WCAG AA.',
				'<b>Migrations and SEO.</b> I rebuilt kalamasilvas.com on Cloudflare Pages, moved the domain off Wix with 301s and set up Search Console. I also rebuilt plpages.com and several client WordPress sites.',
				'<b>SEO pipeline.</b> Five Workers stages (collect, analyze, plan, verify, publish) pull DataForSEO, PageSpeed/Core Web Vitals and Search Console data, with Airtable as the source of truth and a human approval gate before anything publishes.',
				'<b>plp-outbound</b> (Workers + D1) has signed webhooks with HMAC replay protection, dispatch gating, a concurrency cap and a 40-test Vitest suite.',
				'<b>Frameworks.</b> Ops Tasks is a Next.js 14 + React PWA with an edge API route on Cloudflare Pages, and my portfolio site is SvelteKit.',
				'Other shipped work: a shared SMS and call inbox (D1, Twilio, web push), an agent console with a durable D1 job queue, an OAuth-gated MCP secrets vault, and analytics and pixel wiring (GA4, GSC, Meta).'
			]
		},
		{
			title: 'Maintenance Technician / Mold Change',
			org: 'Injection-molding manufacturer, Southern Utah',
			when: '9 years, current',
			blurb: '',
			points: [
				'I do mold changes, troubleshooting and preventive maintenance on production molding and automation equipment, on a live floor where downtime costs money by the minute.',
				'It taught me root-cause thinking, verifying fixes under real load, and writing down what I learned so the same problem doesn’t happen twice.'
			]
		}
	];

	const skills = [
		['Languages', 'TypeScript, JavaScript, HTML, CSS, Python, SQL'],
		['Frameworks', 'SvelteKit, Next.js, React'],
		['Frontend', 'Semantic HTML, modern CSS (grid, :has(), container-aware layout), accessibility, responsive QA, Core Web Vitals'],
		['Platform', 'Cloudflare Workers, Pages, Functions, D1, KV; WordPress REST (Elementor, Yoast, Rank Math); Airtable'],
		['Tooling', 'Vitest, Wrangler, Git, Claude Code, Figma'],
		['Integrations', 'Anthropic API, Twilio, Deepgram, GA4, Search Console, Meta Graph, DataForSEO'],
		['Learning', 'Sanity (content modeling, GROQ, Portable Text)']
	];
</script>

<svelte:head>
	<title>Resume · Brayden Gregersen</title>
	<meta name="description" content="Resume for Brayden Gregersen, frontend and full-stack TypeScript engineer." />
</svelte:head>

<div class="page">
	<div class="wrap top">
		<div>
			<h1 class="display">Brayden <br />Gregersen</h1>
			<p class="role">Frontend / full-stack TypeScript engineer: marketing sites, CMS tooling, performance</p>
			<p class="contact">
				St. George, Utah (remote) · <a class="nw" href="tel:+14356508594">435-650-8594</a> ·
				<a href="mailto:brayden@plpages.com">brayden@plpages.com</a>
			</p>
		</div>
		<div class="actions">
			<img src="/brayden.jpg" alt="Brayden Gregersen" width="677" height="900" />
			<button onclick={() => window.print()}>Print / save PDF</button>
		</div>
	</div>

	<div class="wrap body">
		<section>
			<h2 class="eyebrow">Summary</h2>
			<p>
				I build and run production marketing sites end to end, from design and content modeling through
				deployment and the tools owners use to update them. Most of my work runs on Cloudflare in strict
				TypeScript, with WordPress where clients already have it. I use Claude Code every day and review
				everything it writes before it ships.
			</p>
		</section>

		<section>
			<h2 class="eyebrow">Experience</h2>
			{#each roles as r}
				<div class="job">
					<div class="job-head">
						<h3>{r.title}, <span>{r.org}</span></h3>
						<span class="when">{r.when}</span>
					</div>
					{#if r.blurb}<p class="blurb">{r.blurb}</p>{/if}
					<ul>
						{#each r.points as pt}<li>{@html pt}</li>{/each}
					</ul>
				</div>
			{/each}
		</section>

		<section>
			<h2 class="eyebrow">Skills</h2>
			<dl>
				{#each skills as [k, v]}<dt>{k}</dt><dd>{v}</dd>{/each}
			</dl>
		</section>
	</div>
</div>

<style>
	.page {
		background: var(--white);
		padding: 40px 0 90px;
	}
	.top {
		display: flex;
		justify-content: space-between;
		gap: 32px;
		align-items: flex-end;
		border-bottom: 3px solid var(--ink);
		padding-bottom: 28px;
	}
	h1 {
		font-size: clamp(52px, 9vw, 110px);
		color: var(--green);
	}
	.role {
		font-size: 19px;
		font-weight: 600;
		margin: 18px 0 4px;
	}
	.nw {
		white-space: nowrap;
	}
	.contact {
		margin: 0;
		color: #4a3f36;
	}
	.actions {
		display: grid;
		gap: 12px;
		justify-items: end;
	}
	.actions img {
		width: 150px;
		aspect-ratio: 3 / 4;
		height: auto;
		object-fit: cover;
		border-radius: 14px;
	}
	button {
		font: 600 15px var(--body);
		background: var(--violet);
		color: var(--white);
		border: 0;
		padding: 12px 18px;
		min-height: 44px;
		cursor: pointer;
	}
	.body {
		display: grid;
		gap: 36px;
		padding-top: 32px;
	}
	.eyebrow {
		color: var(--green);
		margin: 0 0 12px;
	}
	section > p {
		max-width: 75ch;
		margin: 0;
	}
	.job + .job {
		margin-top: 26px;
	}
	.job-head {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		align-items: baseline;
		flex-wrap: wrap;
	}
	h3 {
		font-size: 19px;
		margin: 0;
	}
	h3 span {
		font-weight: 500;
	}
	.when {
		font: 500 14px var(--mono);
		color: var(--tan);
	}
	.blurb {
		font-style: italic;
		margin: 4px 0 0;
		color: #4a3f36;
	}
	ul {
		margin: 10px 0 0;
		padding-left: 20px;
		display: grid;
		gap: 7px;
		max-width: 90ch;
	}
	dl {
		display: grid;
		grid-template-columns: 130px 1fr;
		gap: 8px 16px;
		margin: 0;
	}
	dt {
		font-weight: 700;
	}
	dd {
		margin: 0;
	}
	@media (max-width: 640px) {
		.top {
			flex-direction: column-reverse;
			align-items: flex-start;
		}
		.actions {
			justify-items: start;
			grid-auto-flow: column;
			align-items: end;
		}
		.actions img {
			width: 96px;
		}
		dl {
			grid-template-columns: 1fr;
			gap: 2px;
		}
		dd {
			margin-bottom: 10px;
		}
	}

	@media print {
		:global(header),
		:global(.skip),
		button,
		.actions img {
			display: none !important;
		}
		:global(body) {
			font-size: 9.6pt;
			line-height: 1.38;
			background: #fff;
		}
		.page {
			padding: 0;
		}
		.top {
			padding-bottom: 10px;
			border-bottom-width: 2px;
		}
		h1 {
			font-size: 30pt;
		}
		h1 :global(br) {
			display: none;
		}
		.role {
			font-size: 11pt;
			margin-top: 6px;
		}
		.body {
			gap: 12px;
			padding-top: 12px;
		}
		.eyebrow {
			margin-bottom: 4px;
		}
		.job + .job {
			margin-top: 10px;
		}
		h3 {
			font-size: 10.5pt;
		}
		ul {
			gap: 2px;
			margin-top: 4px;
		}
		dl {
			gap: 1px 12px;
			grid-template-columns: 90px 1fr;
		}
		:global(.wrap) {
			width: 100%;
		}
	}
	@page {
		size: letter;
		margin: 0.45in 0.5in;
	}
</style>
