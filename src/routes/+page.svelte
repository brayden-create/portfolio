<script lang="ts">
	import '$lib/scroll-scenes.css';
	import { scrollScene } from '$lib/scrollScene';
	import { whyNexScroll } from '$lib/whyNexScroll';
	import { motion } from '$lib/motion';
	import Button from '$lib/components/Button.svelte';
	import Cube from '$lib/components/Cube.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import WordBands from '$lib/components/WordBands.svelte';
	import { projects } from '$lib/data/projects';

	const fit = [
		{ status: "yes", ask: "Built and maintained a production marketing site real teams depend on", proof: "I build and maintain client sites for local businesses, including bravelizard.com and kalamasilvas.com.", href: "#kalama", cta: "Kalama Silvas" },
		{ status: "yes", ask: "Set up or evolved a CMS for a non-technical team", proof: "I built a plain-English CMS a range owner uses instead of WordPress admin, then redeployed the same pattern for a second client in about half the time.", href: "/demos/chat-cms/", cta: "Try the CMS" },
		{ status: "yes", ask: "Writes tests and cares about edge cases", proof: "I wrote a 40-test Vitest suite for a call-dispatch service, added production validation to every CMS write, and use build checks that fail on unsafe copy.", href: "#outbound", cta: "See the tests" },
		{ status: "part", ask: "Diagnosed and fixed real performance bottlenecks", proof: "My SEO pipeline collects Core Web Vitals, and this site lazy-loads product fonts. A documented before-and-after client performance fix is next.", href: "", cta: "" },
		{ status: "yes", ask: "Takes work end to end, from scoping to production smoke testing", proof: "I am usually the only engineer on my projects, so I take the work from the owner’s ask to a verified deploy.", href: "#work", cta: "The work" },
		{ status: "yes", ask: "Works closely with marketers, designers, and stakeholders", proof: "My stakeholders are business owners. Turning “Can it just do this?” into something they can run is the work.", href: "#chat-cms", cta: "Chat CMS" },
		{ status: "yes", ask: "Uses AI tools like Claude Code and knows when to push back", proof: "I use AI tools daily, but I check the output against the real code, data, and constraints. Several claims on this site were corrected that way.", href: "#how", cta: "How I work" },
		{ status: "yes", ask: "TypeScript and a modern framework, with Svelte as a bonus", proof: "This site is built with SvelteKit and Svelte 5. Ops Tasks is built with Next.js and React. Most of my Workers are strict TypeScript.", href: "#this-site", cta: "This site" },
		{ status: "part", ask: "Bonus: Sanity CMS", proof: "I am learning it now. The project data on this site is already modeled as typed documents, ready to move into a Studio.", href: "", cta: "" },
		{ status: "part", ask: "Bonus: Figma and design feedback", proof: "I use Figma through Claude Code API to inspect designs, understand layout systems, and translate design feedback into shipped implementation changes.", href: "", cta: "" },
		{ status: "yes", ask: "Bonus: documentation others actually use", proof: "I wrote a step-by-step CMS build playbook, which helped the second deployment move about twice as fast.", href: "#clearpoint", cta: "The redeploy" },
		{ status: "no", ask: "Bonus: localization, GDPR, and cookie consent", proof: "I have not shipped multilingual sites or a full cookie consent flow yet, but I understand the basics: region-aware content, privacy-safe tracking, consent before non-essential cookies, and clear handling of user data.", href: "", cta: "" }
	];

	const principles = [
		{ t: "Make changes safe.", d: "A business owner should be able to update a page without worrying about breaking the site. In the CMS, I validate changes on the server, ask before deleting, and keep an activity log." },
		{ t: "Find out what happened.", d: "I like the troubleshooting part. A broken layout, a blocked request, a page Google indexed twice: I want to understand the cause before changing things." },
		{ t: "Leave a useful check behind.", d: "When I keep running into the same mistake, I look for a way to catch it automatically. That has led to build checks, validators, and a Vitest suite for my call-dispatch tool." },
		{ t: "Use AI, but stay responsible for the work.", d: "Claude Code is part of how I build. I still have to understand the output, test it, and handle the parts that go wrong." }
	];
</script>

<svelte:head>
	<title>Brayden Gregersen · For the Nex team</title>
	<meta
		name="description"
		content="Brayden Gregersen, applying for Frontend Engineer, Marketing &amp; Digital Experience at Nex. A product he believes in, and the work to back it up."
	/>
</svelte:head>

<section class="hero" use:motion use:scrollScene>
	<div class="wrap">
		<p class="eyebrow intro">FOR THE NEX TEAM · FRONTEND ENGINEER, MARKETING &amp; DIGITAL EXPERIENCE</p>
		<h1 class="display"><span>A product</span><span>my family uses.</span><span><em>The work I</em></span><span><em>want to do.</em></span></h1>
		<p class="lede">I build marketing sites, CMS tools, integrations, analytics, and the guardrails that keep real teams from breaking things when they move fast.</p>
		<p class="hero-note">Most of my projects start with the same sentence: “There has to be an easier way.”</p>
		<Button href="#fit" label="See how I fit the role" />
	</div>
	<div class="hero-art" aria-hidden="true">
		<div class="win w1"><i></i><i></i><i></i><b style="width:70%"></b><b style="width:45%"></b></div>
		<div class="win w2"><span>Websites.</span><span>Tools.</span><span>Less busywork.</span></div>
		<div class="win w3"><em>“Change Saturday hours to 9am to 5pm.”</em><strong>✓ Change saved to activity log</strong></div>
	</div>
	<svg class="wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0 60 L1440 0 V90 H0Z" fill="var(--mint)" />
	</svg>
</section>

<section id="why-nex" class="why-nex" use:whyNexScroll>
	<div class="why-sticky">
	<div class="wrap why-grid">
		<h2 class="why-title">WHY NEX?</h2>
		<div class="why-copy"><h3 class="display">We already have one<br />in our living room.</h3></div>
		<div class="why-body"><p>My family owns and regularly uses Nex Playground. My two boys know the product before they know the company behind it.</p><p>So when I saw a frontend engineering role focused on marketing and digital experience, it felt different.</p><p>This is not just a company I found on a job board. It is a product already part of our home.</p></div>
	</div>
	</div>
</section>

<section class="meet" use:scrollScene>
	<div class="wrap meet-grid">
		<div>
			<h2 class="display">From machines<br />to software.</h2>
			<p>I have spent nine years troubleshooting production equipment. In that world, a bad diagnosis means more downtime, another trip back, and a problem that still is not solved.</p>
			<p>In 2023, I started studying software development at Southwest Applied Technology College, focused on Java. I spent about a year and a half in the program.</p>
			<p>Then I started building.</p>
			<p>That became PL Pages in 2024.</p>
			<p>Today I build production marketing sites and business systems for small companies, usually as the only engineer involved. That means I own a lot of the path: frontend, content structure, APIs, deployment, analytics, CMS tooling, and the production problems that show up after launch.</p>
			<p>The tools changed.</p>
			<p>The way I work did not.</p>
			<p>Find the real problem. Understand why it happened. Build the fix. Test it under real conditions. Leave the system better than you found it.</p>
		</div>
		<div class="background-art"><Cube size={200} /></div>
	</div>
</section>

<section id="why-now" class="career-move">
	<div class="wrap move-grid">
		<div use:motion>
			<p class="eyebrow">Why now</p>
			<h2 class="display">I am not looking<br />for an exit.</h2>
		</div>
		<div class="move-story" use:motion>
			<p>I checked out the role because my family already knew Nex. I kept reading because the work sounded like the direction I have been moving toward on my own.</p>
			<p>I have spent the last few years learning software and building sites, tools, and systems outside my full-time job.</p>
			<p class="move-heart"><strong>I am not trying to get away from what I do now. I am trying to get closer to what I want to get really good at.</strong></p>
			<p>Doing that full time, for a product my family already uses, makes this role stand out.</p>
		</div>
	</div>
</section>

<section id="fit" class="fit">
	<div class="wrap">
		<p class="eyebrow">The job, line by line</p>
		<h2 class="display">What you asked for.<br />Where to see it.</h2>
		<p class="fit-lede">Every line below comes from the Nex posting. Where I have direct proof, I show it. Where I am still growing, I say so.</p>
		<ul class="fit-list">
			{#each fit as f}
				<li class={f.status}>
					<span class="mark" aria-hidden="true">{f.status === 'yes' ? '✓' : f.status === 'part' ? '◐' : '○'}</span>
					<div>
						<b>{f.ask}</b>
						<span>{f.proof}</span>
					</div>
					{#if f.href}<a href={f.href}>{f.cta} →</a>{:else}<em>{f.status === 'part' ? 'In progress' : 'Not yet'}</em>{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="one" use:motion use:scrollScene>
	<div class="wrap">
		<h2 class="display"><span>Here is what</span><span>I have built.</span></h2>
		<p>Client websites, safer CMS tools, SEO systems, call workflows, and internal tools I built when the existing options did not fit.</p>
	</div>
</section>

<section id="work" class="work">
	<div class="wrap project-list">
		{#each projects as p, i (p.slug)}
			<ProjectCard project={p} index={i} />
		{/each}
	</div>
</section>

<WordBands />

<section id="how" class="how" use:motion>
	<div class="wrap">
		<h2 class="display">What I have learned<br />along the way.</h2>
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

<section class="family" use:motion use:scrollScene>
	<div class="wrap fam-grid">
		<img src="/family.jpg" alt="Brayden with his partner and two young sons" width="960" height="960" loading="lazy" />
		<div>
			<span class="eyebrow">Away from the keyboard</span>
			<h2 class="display">The reason this<br />role stood out.</h2>
			<p>
				These are the two behind the Nex connection. It would mean a lot to help build the web experience for a product we already enjoy together.
			</p>
			<Button href="/resume/" label="Read the resume" tone="green" />
		</div>
	</div>
</section>

<style>
	.fit { background: var(--paper); padding: 110px 0 90px; scroll-margin-top: 84px; }
	.fit .eyebrow { color: var(--green); margin: 0 0 18px; }
	.fit h2 { font-size: clamp(42px, 6vw, 84px); line-height: .96; }
	.fit-lede { font-size: 19px; max-width: 52ch; margin: 22px 0 40px; }
	.fit-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
	.fit-list li { display: grid; grid-template-columns: 44px 1fr auto; gap: 18px; align-items: center; background: var(--white); border-radius: 16px; padding: 18px 22px; }
	.fit-list .mark { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; font-weight: 700; background: var(--green); color: #fff; }
	.fit-list .part .mark { background: #f2c14e; color: var(--ink); }
	.fit-list .no .mark { background: var(--mist); color: var(--ink); }
	.fit-list b { display: block; font-size: 17px; margin-bottom: 3px; }
	.fit-list span { font-size: 15px; color: #4a3f36; }
	.fit-list a { font-weight: 700; color: var(--green); white-space: nowrap; text-underline-offset: 4px; padding: 10px 0; }
	.fit-list em { font-style: normal; font: 500 12px var(--mono); color: #6b5f55; white-space: nowrap; }
	@media (max-width: 700px) { .fit { padding: 70px 0; } .fit-list li { grid-template-columns: 36px 1fr; padding: 16px; gap: 12px; } .fit-list .mark { width: 34px; height: 34px; } .fit-list a, .fit-list em { grid-column: 2; } }
	.career-move { background: var(--green); color: var(--white); padding: 100px 0; scroll-margin-top: 84px; }
	.move-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 70px; align-items: start; }
	.career-move .eyebrow { color: var(--mint); margin: 0 0 24px; }
	.career-move h2 { font-size: clamp(42px, 5.5vw, 72px); line-height: .98; }
	.move-story p { max-width: 50ch; margin: 0 0 22px; }
	.move-story p:last-child { margin-bottom: 0; }
	.move-story .move-heart { font-size: clamp(23px, 2.2vw, 29px); line-height: 1.4; color: var(--white); margin-block: 30px; }
	@media (max-width: 860px) { .career-move { padding: 64px 0; } .move-grid { grid-template-columns: minmax(0, 1fr); gap: 36px; } }

	.hero-note { max-width: 46ch; margin: 0 auto 28px; }
	.why-nex { background: var(--mint); padding: 84px 0; }
	.why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
	.why-nex .why-copy h3 { font-size: clamp(40px, 5vw, 64px); margin-top: 20px; }
	.why-nex p { max-width: 48ch; }
	@media (max-width: 860px) { .why-grid { grid-template-columns: 1fr; gap: 20px; } }
	.intro { margin-bottom: 28px; color: var(--green); }
	.hero h1 span { display: block; }
	.hero h1 em { font-style: normal; color: var(--green); display: inline-block; }
	@media (prefers-reduced-motion: no-preference) {
		.hero h1 span { animation: headline-in 850ms cubic-bezier(.16,1,.3,1) both; }
		.hero h1 span:nth-child(2) { animation-delay: 140ms; }
		.hero .lede { animation: headline-in 850ms 250ms both; }
		.win { animation: float 5s ease-in-out infinite alternate; }
		.w2 { animation-delay: -2s; }
		.w3 { animation-delay: -4s; }
		.hero h1 em { animation: hello 1.2s 650ms both; }
		.fam-grid img { transform: rotate(calc(-3deg + var(--travel, 0) * 5deg)); }
	}
	@keyframes headline-in { from { opacity: 0; transform: translateY(65px) rotate(3deg); } to { opacity: 1; transform: none; } }
	@keyframes hello { 0%,100% { rotate: 0deg; } 35% { rotate: -7deg; } 70% { rotate: 3deg; } }
	@keyframes float { from { transform: translateY(-9px); } to { transform: translateY(12px); } }
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
		font-size: clamp(44px, 7vw, 88px);
		max-width: 16ch;
		margin-inline: auto;
	}
	.lede {
		font-size: clamp(18px, 2vw, 21px);
		max-width: 48ch;
		margin: 22px auto 20px;
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
		font-size: clamp(48px, 6vw, 80px);
		margin-bottom: 24px;
	}
	.background-art { position: sticky; top: 160px; align-self: start; padding-top: 50px; }
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
	.project-list {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 72px;
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
		.project-list,
		.how ol {
			grid-template-columns: minmax(0, 1fr);
		}
		.background-art { position: static; padding-top: 0; }
		.hero {
			margin-top: -68px;
			padding: 120px 0 120px;
		}
		.hero-art {
			height: 310px;
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
