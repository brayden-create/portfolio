<script lang="ts">
	const roles = [
		{
			title: 'Founder & Engineer',
			org: 'PL Pages (Precision Landing Pages, LLC)',
			when: '2024 to present',
			blurb: 'I build and maintain websites and business tools for local companies, working directly with the owners.',
			points: [
				'<b>Chat CMS.</b> Built a plain-English WordPress editor for bravelizard.com using a Cloudflare Worker and Anthropic tool loop. Server-side validation, confirmed trash-only deletes, an activity log and SSO protect updates. Ported it to a second client.',
				'<b>Frontend components.</b> Built a 7-page counter-drone site with shared partials and JSON-LD generated from the page data. Navigation and interactions use CSS because the CMS strips scripts. Checked responsive layouts at 360 to 1440px and color contrast.',
				'<b>Site migrations.</b> Rebuilt kalamasilvas.com on Cloudflare Pages, migrated from Wix with redirects, and set up Search Console. Built and maintain additional client WordPress sites.',
				'<b>SEO tooling.</b> Built a Workers pipeline using DataForSEO, PageSpeed and Search Console data. Findings and proposed changes go into Airtable, with human approval before publishing.',
				'<b>Reliability.</b> Built plp-outbound with HMAC replay protection, calling windows, attempt limits, concurrency controls and a 40-test Vitest suite.',
				'<b>Frameworks.</b> Shipped Ops Tasks, a Next.js 14 + React PWA with an edge API route, and this SvelteKit portfolio on Cloudflare Pages.',
				'<b>Other shipped work.</b> Shared SMS/call inbox (D1, Twilio, web push), agent job queue, OAuth-gated MCP vault, and GA4, Search Console and Meta integrations.'
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

	<div class="wrap">
		<a class="see-more" href="https://bedtimebuilds.com">
			<span class="moon" aria-hidden="true">☾</span>
			<span><strong>See the work in action at bedtimebuilds.com.</strong> Live demos, animated walkthroughs of each project, and the Nex posting matched line by line. All of it built after bedtime.</span>
		</a>
	</div>
	<div class="wrap body">
		<section>
			<h2 class="eyebrow">Summary</h2>
			<p>
				I build production marketing sites and the systems behind them, from frontend components and CMS tooling to deployment, analytics and integrations. Through PL Pages, I work directly with business owners and own projects from build through ongoing production support. My background includes nine years troubleshooting production equipment and software development coursework focused on Java. I'm looking to bring that ownership and problem-solving experience to a full-time frontend engineering team.
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

		<section class="education">
			<h2 class="eyebrow">Education</h2>
			<p><strong>Software Development (Java), Southwest Applied Technology College</strong><br />2023 to 2024 · Coursework</p>
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
	.see-more {
		display: flex;
		gap: 12px;
		align-items: center;
		margin-top: 22px;
		padding: 14px 18px;
		background: #c4e1ce;
		border-left: 5px solid #007e2e;
		border-radius: 8px;
		color: #271c13;
		text-decoration: none;
		font-size: 15px;
		line-height: 1.45;
	}
	.see-more strong {
		color: #007e2e;
	}
	.see-more .moon {
		font-size: 22px;
		color: #5b2eff;
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
		.see-more {
			margin-top: 10px;
			padding: 7px 12px;
			font-size: 9.4pt;
			print-color-adjust: exact;
			-webkit-print-color-adjust: exact;
		}
		:global(header),
		:global(.skip),
		button,
		.actions img {
			display: none !important;
		}
		:global(body) {
			font-size: 9.3pt;
			line-height: 1.28;
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
			font-size: 26pt;
		}
		h1 :global(br) {
			display: none;
		}
		.role {
			font-size: 11pt;
			margin-top: 6px;
		}
		section > p {
			max-width: none;
		}
		.body {
			gap: 10px;
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
		margin: 0.38in 0.5in;
	}
</style>
