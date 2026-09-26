<!--
  Recreates the kalamasilvas.com interface: full-bleed Ken Burns hero, full-screen serif menu,
  scroll reveals with counters and a client marquee, and the responsive work grid.
  Photos are stand-in gradients; the type, layout and motion match the live site.
-->
<script lang="ts">
	let { step }: { step: number } = $props();
	const slides = ['The Fairmount · San Antonio, TX', 'Hyatt Place Uptown · Charlotte, NC', 'Warhorse Casino · Lincoln, NE'];
	const menu = [
		['Studio', ['About the Studio', 'Team', 'How We Work', 'Journal']],
		['Work', ['Projects', 'On the Boards', 'The Brochure', 'Press']],
		['Services', ['Interior Design', 'FF&E Procurement', 'Budget & PIP Review']]
	] as const;
	const brands = ['WESTIN', 'WYNDHAM', 'DoubleTree', 'HYATT PLACE', 'Unbound Collection', 'Tapestry'];
</script>

<div class="ks">
	<div class="device" class:phone={step === 3}>
		<header class:dark={step !== 2}>
			<b>kalama<strong>silvas</strong></b>
			<span>{step === 1 ? 'CLOSE' : 'MENU'}</span>
		</header>

		{#if step === 0}
			<section class="hero">
				{#each slides as s, i}<div class="slide s{i}" style="--i:{i}"></div>{/each}
				<div class="shade"></div>
				<div class="copy">
					<span class="eb"><i></i>PROCUREMENT · INTERIOR DESIGN</span>
					<h5><span>Memorable</span><em>by design.</em></h5>
					<p>Twenty years inside the world’s hotels, from boutique to über luxury, coast to coast.</p>
					<span class="cta">THE WORK</span>
				</div>
				<div class="cap">
					{#each slides as s, i}<span style="--i:{i}">0{i + 1} · {s}</span>{/each}
				</div>
			</section>
		{:else if step === 1}
			<section class="menu">
				{#each menu as [group, items], g}
					<div class="grp">
						<small>{group.toUpperCase()}</small>
						{#each items as it, i}<span style="--d:{g * 0.18 + i * 0.07}s">{it}</span>{/each}
					</div>
				{/each}
			</section>
		{:else if step === 2}
			<section class="practice">
				<small class="lbl">THE PRACTICE</small>
				<p class="lead">
					{#each 'We take what is already good in a property and refine it into something'.split(' ') as w, i}<span style="--d:{i * 0.05}s">{w + ' '}</span>{/each}<em style="--d:.7s">outstanding.</em>
				</p>
				<div class="stats">
					<div><b class="c c1"></b><small>FOUNDED</small></div>
					<div><b class="c c2"></b><small>PROPERTIES</small></div>
					<div><b class="c c3"></b><small>IN HOSPITALITY</small></div>
				</div>
				<div class="marq"><div class="track">{#each [...brands, ...brands] as b}<span>{b}</span>{/each}</div></div>
			</section>
		{:else}
			<section class="work">
				<div class="title"><b>SELECTED</b><em>Work</em></div>
				<div class="grid">
					{#each slides as s, i}
						<figure style="--d:{i * 0.12}s"><div class="img s{i}"></div><small>0{i + 1}</small><span>{s.split(' · ')[0]}</span></figure>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	.ks {
		background: #cfc9bf;
		min-height: 470px;
		display: grid;
		place-items: center;
		padding: 20px;
	}
	.device {
		position: relative;
		width: 100%;
		max-width: 900px;
		height: 430px;
		background: #edeae4;
		color: #0a0a0a;
		border-radius: 10px;
		overflow: hidden;
		font-family: 'Jost', system-ui, sans-serif;
		box-shadow: 0 24px 50px -28px rgba(0, 0, 0, 0.6);
		transition: max-width 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.7s;
	}
	.device.phone {
		max-width: 300px;
		border-radius: 26px;
		border: 7px solid #1a1a1a;
	}
	header {
		position: absolute;
		inset: 0 0 auto;
		z-index: 5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18px 24px;
		font-size: 11px;
		letter-spacing: 0.24em;
	}
	header.dark {
		color: #fff;
	}
	header b {
		font: 400 20px 'Jost', sans-serif;
		letter-spacing: -0.01em;
	}
	header strong {
		font-weight: 600;
	}
	/* Hero: slides cross-fade on a 9s cycle while each one slowly zooms (Ken Burns). */
	.hero {
		position: absolute;
		inset: 0;
		background: #111;
		color: #fff;
	}
	.slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		animation: fade 9s calc(var(--i) * 3s) infinite, kb 9s calc(var(--i) * 3s) infinite;
	}
	.s0 {
		background:
			radial-gradient(18% 12% at 55% 18%, #d9c08a 0 40%, transparent 60%),
			linear-gradient(180deg, #8f8a80 0%, #cfcac1 55%, #6b4f38 56%, #4a3526 100%);
	}
	.s1 {
		background:
			radial-gradient(30% 22% at 30% 40%, #e7dccb, transparent 70%),
			linear-gradient(160deg, #3a3531 0%, #7d6c5b 50%, #1f1b18 100%);
	}
	.s2 {
		background:
			radial-gradient(40% 30% at 70% 30%, #f3ead8, transparent 70%),
			linear-gradient(180deg, #9aa3a0 0%, #d6d2c7 60%, #8d7a63 61%, #5f503f 100%);
	}
	.shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.1));
	}
	.copy {
		position: absolute;
		left: 28px;
		bottom: 64px;
		right: 28px;
		display: grid;
		gap: 12px;
		max-width: 420px;
	}
	.eb {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 10px;
		letter-spacing: 0.32em;
	}
	.eb i {
		height: 1px;
		width: 44px;
		background: #fff;
		transform-origin: left;
		animation: line 0.9s 0.2s both;
	}
	h5 {
		margin: 0;
		font: 500 clamp(34px, 5vw, 52px)/1 'Cormorant Garamond', serif;
		display: grid;
	}
	h5 span,
	h5 em {
		animation: up 0.9s both;
	}
	h5 em {
		animation-delay: 0.18s;
	}
	.copy p {
		margin: 0;
		font-size: 13px;
		font-weight: 300;
		opacity: 0.85;
		animation: up 0.9s 0.35s both;
	}
	.cta {
		justify-self: start;
		border: 1px solid rgba(255, 255, 255, 0.6);
		padding: 10px 18px;
		font-size: 10px;
		letter-spacing: 0.3em;
		animation: up 0.9s 0.5s both;
	}
	.cap {
		position: absolute;
		right: 24px;
		bottom: 20px;
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		height: 14px;
		overflow: hidden;
		text-align: right;
	}
	.cap span {
		display: block;
		opacity: 0;
		position: absolute;
		right: 0;
		white-space: nowrap;
		animation: fade 9s calc(var(--i) * 3s) infinite;
	}
	/* Full-screen menu */
	.menu {
		position: absolute;
		inset: 0;
		background: #0a0a0a;
		color: #edeae4;
		padding: 70px 28px 20px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
		align-content: start;
		animation: drop 0.5s both;
	}
	.grp {
		display: grid;
		gap: 6px;
		align-content: start;
	}
	.grp small {
		font-size: 10px;
		letter-spacing: 0.3em;
		color: #8a877f;
		margin-bottom: 4px;
	}
	.grp span {
		font: 500 22px/1.2 'Cormorant Garamond', serif;
		animation: up 0.55s var(--d) both;
	}
	/* Practice: word-by-word reveal, counters, marquee */
	.practice {
		position: absolute;
		inset: 0;
		padding: 64px 28px 20px;
		display: grid;
		align-content: start;
		gap: 18px;
	}
	.lbl {
		font-size: 10px;
		letter-spacing: 0.3em;
		color: #5c5a56;
	}
	.lead {
		margin: 0;
		font: 500 clamp(22px, 2.8vw, 30px)/1.2 'Cormorant Garamond', serif;
		max-width: 620px;
	}
	.lead span,
	.lead em {
		opacity: 0;
		animation: word 0.5s var(--d) forwards;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid #cfcac1;
	}
	.stats div {
		padding: 12px 14px 0;
		border-right: 1px solid #cfcac1;
		display: grid;
	}
	.stats div:last-child {
		border-right: 0;
	}
	.stats small {
		font-size: 9px;
		letter-spacing: 0.24em;
		color: #5c5a56;
	}
	.c {
		font: 500 30px 'Cormorant Garamond', serif;
	}
	/* Counters with @property so the number itself animates, no JS */
	.c1 {
		--n: 2017;
		counter-reset: a var(--n);
		animation: c1 1.4s both;
	}
	.c1::after {
		content: counter(a);
	}
	.c2 {
		counter-reset: b var(--m);
		animation: c2 1.4s both;
	}
	.c2::after {
		content: counter(b) '+';
	}
	.c3 {
		counter-reset: c var(--y);
		animation: c3 1.4s both;
	}
	.c3::after {
		content: counter(c) ' yrs';
	}
	.marq {
		overflow: hidden;
		border-top: 1px solid #cfcac1;
		padding-top: 12px;
		mask: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
	}
	.track {
		display: flex;
		gap: 36px;
		width: max-content;
		animation: marq 14s linear infinite;
	}
	.track span {
		font: 600 15px 'Jost', sans-serif;
		letter-spacing: 0.14em;
		color: #5c5a56;
		white-space: nowrap;
	}
	/* Work grid: reflows from 3 columns to 1 inside the phone frame */
	.work {
		position: absolute;
		inset: 0;
		background: #0a0a0a;
		color: #edeae4;
		padding: 64px 24px 20px;
		overflow: hidden;
	}
	.title {
		display: grid;
		justify-items: center;
		margin-bottom: 16px;
	}
	.title b {
		font: 600 18px 'Jost', sans-serif;
		letter-spacing: 0.3em;
		color: #8a877f;
	}
	.title em {
		font: italic 500 30px/0.8 'Cormorant Garamond', serif;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 14px;
	}
	figure {
		margin: 0;
		display: grid;
		gap: 4px;
		animation: up 0.5s var(--d) both;
	}
	.img {
		aspect-ratio: 4 / 3;
		border-radius: 2px;
	}
	figure small {
		font-size: 9px;
		letter-spacing: 0.2em;
		color: #8a877f;
	}
	figure span {
		font: 500 17px 'Cormorant Garamond', serif;
	}
	.phone .copy {
		left: 18px;
		bottom: 40px;
	}
	.phone .cap {
		display: none;
	}
	.phone .menu {
		grid-template-columns: 1fr;
	}
	@property --n {
		syntax: '<integer>';
		inherits: false;
		initial-value: 0;
	}
	@property --m {
		syntax: '<integer>';
		inherits: false;
		initial-value: 0;
	}
	@property --y {
		syntax: '<integer>';
		inherits: false;
		initial-value: 0;
	}
	@keyframes c1 {
		from { --n: 1990; }
		to { --n: 2017; }
	}
	@keyframes c2 {
		from { --m: 0; }
		to { --m: 150; }
	}
	@keyframes c3 {
		from { --y: 0; }
		to { --y: 20; }
	}
	@keyframes fade {
		0% { opacity: 0; }
		5%, 33% { opacity: 1; }
		38%, 100% { opacity: 0; }
	}
	@keyframes kb {
		from { transform: scale(1); }
		to { transform: scale(1.12); }
	}
	@keyframes up {
		from { opacity: 0; transform: translateY(14px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes line {
		from { transform: scaleX(0); }
		to { transform: scaleX(1); }
	}
	@keyframes drop {
		from { clip-path: inset(0 0 100% 0); }
		to { clip-path: inset(0 0 0 0); }
	}
	@keyframes word {
		to { opacity: 1; }
	}
	@keyframes marq {
		to { transform: translateX(-50%); }
	}
	@media (max-width: 700px) {
		.menu {
			grid-template-columns: 1fr;
			gap: 12px;
		}
		.grp span {
			font-size: 18px;
		}
		.stats .c {
			font-size: 22px;
		}
	}
</style>
