<!-- Recreates the real Brave Lizard chat CMS (tan on near-black, Oswald / Work Sans / IBM Plex Mono). -->
<script lang="ts">
	let { step }: { step: number } = $props();
</script>

<div class="cms">
	<div class="app">
		<header><span class="t">🦎 Brave Lizard CMS</span><span class="who">john@bravelizard.com</span></header>
		<nav><span class="on">Chat</span><span>Activity Log</span><span>Tasks</span><span>Memory</span></nav>
		<div class="msgs">
			<div class="m user">{#key step === 0}<span class="type">Change Saturday hours to 8am to 4pm</span>{/key}</div>
			{#if step >= 1}
				<div class="m act" style="--d:0s">→ list_pages {'{'}search: "home"{'}'}</div>
				<div class="m act" style="--d:.35s">→ get_page {'{'}id: 49544{'}'}</div>
				<div class="m act" style="--d:.7s">→ update_page {'{'}id: 49544, section: "hours"{'}'}</div>
			{/if}
			{#if step >= 2}
				<div class="m check">validateContent() · PASS<small>scoped CSS · no scripts · allowlisted URLs</small></div>
			{/if}
			{#if step >= 3}
				<div class="m bot">Done. Saturday now reads 8am to 4pm. It’s in the Activity Log if you need to undo it.</div>
			{/if}
		</div>
		<div class="composer"><span>What do you want to change on the site?</span><b>SEND</b></div>
	</div>

	<div class="site" class:lift={step >= 2}>
		<div class="bar"><i></i><i></i><i></i><span>bravelizard.com</span></div>
		<div class="hero"><small>BERYL, UTAH · PRIVATE RANGE</small><strong>BRAVE LIZARD TACTICAL</strong></div>
		<div class="hours" class:flash={step >= 2}>
			<b>RANGE HOURS</b>
			<span>Thu to Fri <em>12pm to sunset</em></span>
			<span>Saturday <em class="swap">{#if step >= 2}<ins>8am to 4pm</ins>{:else}9am to 5pm{/if}</em></span>
		</div>
	</div>

	{#if step >= 3}
		<div class="log">
			<b>ACTIVITY LOG</b>
			<span><em>just now</em> update_page · Home · hours <strong>OK</strong></span>
		</div>
	{/if}
</div>

<style>
	.cms {
		position: relative;
		background: #0a0b09;
		color: #e8e4da;
		font: 14px/1.5 'Work Sans', system-ui, sans-serif;
		min-height: 470px;
		padding: 0;
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
	}
	.app {
		display: flex;
		flex-direction: column;
		border-right: 1px solid #2c2a22;
	}
	header {
		display: flex;
		align-items: center;
		padding: 12px 18px;
		background: #16150f;
		border-bottom: 1px solid #2c2a22;
	}
	.t {
		font: 600 15px 'Oswald', sans-serif;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #c2b280;
	}
	.who {
		margin-left: auto;
		font: 11px 'IBM Plex Mono', monospace;
		color: #a09a8c;
	}
	nav {
		display: flex;
		background: #16150f;
		border-bottom: 1px solid #2c2a22;
	}
	nav span {
		flex: 1;
		text-align: center;
		padding: 9px 4px;
		font: 500 11px 'Oswald', sans-serif;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #a09a8c;
	}
	nav .on {
		color: #c2b280;
		box-shadow: inset 0 -2px #c2b280;
	}
	.msgs {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
	}
	.m {
		max-width: 90%;
		padding: 9px 12px;
		border-radius: 12px;
		animation: in 0.4s both;
		animation-delay: var(--d, 0s);
	}
	.user {
		align-self: flex-end;
		background: #8a3b1e;
		color: #fbf3ea;
		border-bottom-right-radius: 3px;
	}
	.type {
		display: inline-block;
		animation: wipe 1.4s steps(24) both;
	}
	.act {
		align-self: flex-start;
		border: 1px dashed #8a7f5e;
		color: #c2b280;
		font: 12px 'IBM Plex Mono', monospace;
		padding: 5px 10px;
	}
	.check {
		align-self: flex-start;
		border: 1px solid #6f9a3f;
		background: rgba(111, 154, 63, 0.12);
		color: #a9d17a;
		font: 600 12px 'IBM Plex Mono', monospace;
		display: grid;
	}
	.check small {
		font-weight: 400;
		color: #a09a8c;
	}
	.bot {
		align-self: flex-start;
		background: #221e18;
		border-bottom-left-radius: 3px;
	}
	.composer {
		margin: 0 16px 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #221e18;
		border: 1px solid #2c2a22;
		border-radius: 8px;
		padding: 10px 12px;
		color: #6a655a;
		font-size: 13px;
	}
	.composer b {
		background: #c2b280;
		color: #1a1812;
		font: 600 11px 'Oswald', sans-serif;
		letter-spacing: 0.1em;
		padding: 5px 10px;
		border-radius: 6px;
	}
	.site {
		margin: 26px 22px;
		align-self: start;
		background: #0f0e0b;
		border: 1px solid #2c2a22;
		border-radius: 12px;
		overflow: hidden;
		transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s;
	}
	.site.lift {
		transform: translateY(-6px) rotate(-1deg);
		box-shadow: 0 24px 40px -20px #000;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 8px 10px;
		background: #1c1b16;
	}
	.bar i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #3a372e;
	}
	.bar span {
		margin-left: 8px;
		font: 11px 'IBM Plex Mono', monospace;
		color: #a09a8c;
	}
	.hero {
		padding: 30px 16px 26px;
		background: radial-gradient(120% 100% at 80% 0%, #6b5a3a, #2a241a 55%, #0f0e0b);
		display: grid;
		gap: 4px;
	}
	.hero small {
		font: 10px 'IBM Plex Mono', monospace;
		letter-spacing: 0.14em;
		color: #c2b280;
	}
	.hero strong {
		font: 600 24px/1.05 'Oswald', sans-serif;
		letter-spacing: 0.08em;
	}
	.hours {
		margin: 14px;
		padding: 12px 14px;
		border: 1px solid #2c2a22;
		border-radius: 10px;
		display: grid;
		gap: 5px;
		transition: border-color 0.4s, box-shadow 0.4s;
	}
	.hours.flash {
		border-color: #c2b280;
		box-shadow: 0 0 0 3px rgba(194, 178, 128, 0.3);
	}
	.hours b {
		font: 600 12px 'Oswald', sans-serif;
		letter-spacing: 0.14em;
		color: #c2b280;
	}
	.hours span {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		font-size: 13px;
	}
	.hours em {
		font-style: normal;
		color: #a09a8c;
	}
	ins {
		text-decoration: none;
		color: #e8e4da;
		background: rgba(194, 178, 128, 0.25);
		padding: 0 4px;
		border-radius: 4px;
		animation: in 0.4s both;
	}
	.log {
		position: absolute;
		right: 22px;
		bottom: 22px;
		width: min(340px, 44%);
		background: #16150f;
		border: 1px solid #c2b280;
		border-radius: 10px;
		padding: 12px 14px;
		display: grid;
		gap: 6px;
		animation: in 0.45s both;
	}
	.log b {
		font: 600 11px 'Oswald', sans-serif;
		letter-spacing: 0.14em;
		color: #c2b280;
	}
	.log span {
		font: 12px 'IBM Plex Mono', monospace;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}
	.log em {
		color: #6a655a;
		font-style: normal;
	}
	.log strong {
		color: #9cc36b;
		margin-left: auto;
	}
	@keyframes in {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes wipe {
		from { clip-path: inset(0 100% 0 0); }
		to { clip-path: inset(0 0 0 0); }
	}
	@media (max-width: 760px) {
		.cms {
			grid-template-columns: minmax(0, 1fr);
		}
		.app {
			border-right: 0;
		}
		nav span:last-child {
			display: none;
		}
		.site {
			margin: 0 16px 16px;
		}
		.log {
			position: static;
			width: auto;
			margin: 0 16px 16px;
		}
	}
</style>
