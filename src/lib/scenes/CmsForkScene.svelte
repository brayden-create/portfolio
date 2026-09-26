<!-- The Brave Lizard chat CMS copied and redeployed for ClearPoint Aero. Line counts are the real diff per file. -->
<script lang="ts">
	let { step }: { step: number } = $props();
	const files = [
		['auth.js', 11, 'identities'],
		['index.js', 20, 'routes'],
		['validate.js', 41, '#blt-v1 → #cpa-v1'],
		['wp.js', 75, 'Avada theme'],
		['ui.js', 141, 'brand'],
		['chat.js', 428, 'C-UAS prompt']
	];
	const infra = [
		'Airtable base, token scoped to it (other bases 403)',
		'Anthropic key in a capped workspace',
		'Static-IP proxy for the SiteGround firewall',
		'Google SSO for John and Brayden only',
		'5 Worker secrets set, every leg verified'
	];
	const cp = $derived(step >= 1);
</script>

<div class="fork" class:cp>
	<div class="app">
		<header>
			<span class="t">{cp ? '◇ ClearPoint Aero CMS' : '🦎 Brave Lizard CMS'}</span>
			<span class="who">{cp ? 'john@clearpointaero.com' : 'john@bravelizard.com'}</span>
		</header>
		<nav><span class="on">Chat</span><span>Activity Log</span><span>Tasks</span><span>Memory</span></nav>

		<div class="body">
			{#if step === 0}
				<div class="panel">
					<small>cp -r brave-lizard/chat-cms → clearpoint-aero/chat-cms</small>
					{#each files as [f, n, why], i}
						<div class="file" style="--d:{i * 0.18}s">
							<span class="tick">✓</span><code>{f}</code><em>{why}</em>
						</div>
					{/each}
				</div>
			{:else if step === 1}
				<div class="panel">
					<small>what actually changed (lines)</small>
					{#each files as [f, n, why], i}
						<div class="file diff" style="--d:{i * 0.12}s">
							<code>{f}</code>
							<i><b style="--w:{Math.max(4, (Number(n) / 428) * 100)}%"></b></i>
							<em>{n}</em>
						</div>
					{/each}
					<p class="kept">Auth, routing and the validator carried over almost untouched. Most new work went into the system prompt.</p>
				</div>
			{:else if step === 2}
				<div class="panel">
					<small>fresh infrastructure, nothing shared with Brave Lizard</small>
					{#each infra as item, i}
						<div class="file" style="--d:{i * 0.22}s"><span class="tick">✓</span><span>{item}</span></div>
					{/each}
				</div>
			{:else}
				<div class="chat">
					<div class="m user">Draft a page for water and wastewater facilities</div>
					<div class="m act" style="--d:.2s">→ create_page {'{'}status: "draft", template: "100-width"{'}'}</div>
					<div class="m ok" style="--d:.45s">validateContent() · PASS · #cpa-v1 scoped</div>
					<div class="m bot" style="--d:.7s">Draft saved. Preview it, then hit Publish when you’re happy.</div>
				</div>
			{/if}
		</div>
	</div>

	<aside class="timeline" class:show={step === 3}>
		<small>KICKOFF TO DEPLOYED CMS</small>
		<div class="row"><span>Brave Lizard</span><i><b class="a"></b></i><em>4 days</em></div>
		<div class="row"><span>ClearPoint</span><i><b class="b"></b></i><em>2 days</em></div>
	</aside>
</div>

<style>
	.fork {
		--bg: #0a0b09;
		--panel: #16150f;
		--panel2: #221e18;
		--line: #2c2a22;
		--text: #e8e4da;
		--dim: #a09a8c;
		--accent: #c2b280;
		--user: #8a3b1e;
		--head: 'Oswald', sans-serif;
		--body: 'Work Sans', system-ui, sans-serif;
		--mono: 'IBM Plex Mono', monospace;
		position: relative;
		min-height: 470px;
		background: var(--bg);
		color: var(--text);
		padding: 22px;
		display: grid;
		grid-template-columns: minmax(0, 1fr) 260px;
		gap: 18px;
		align-items: start;
		font: 14px/1.5 var(--body);
		transition: background 0.8s;
	}
	/* The rebrand: same component, new tokens. Everything transitions. */
	.fork.cp {
		--bg: #111214;
		--panel: #18191d;
		--panel2: #222328;
		--line: #33343a;
		--text: #f2f3f5;
		--dim: #9a9ca1;
		--accent: #71b55c;
		--user: #2f5f2a;
		--head: 'Inter', sans-serif;
		--body: 'Inter', system-ui, sans-serif;
		--mono: 'JetBrains Mono', monospace;
	}
	.app {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 12px;
		overflow: hidden;
		transition: background 0.8s, border-color 0.8s;
		min-height: 420px;
		display: flex;
		flex-direction: column;
	}
	header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		border-bottom: 1px solid var(--line);
		transition: border-color 0.8s;
	}
	.t {
		font: 600 15px var(--head);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
		transition: color 0.8s;
	}
	.who {
		margin-left: auto;
		font: 11px var(--mono);
		color: var(--dim);
	}
	nav {
		display: flex;
		border-bottom: 1px solid var(--line);
	}
	nav span {
		flex: 1;
		text-align: center;
		padding: 8px 4px;
		font: 500 11px var(--head);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--dim);
	}
	nav .on {
		color: var(--accent);
		box-shadow: inset 0 -2px var(--accent);
		transition: color 0.8s, box-shadow 0.8s;
	}
	.body {
		flex: 1;
		padding: 16px;
		background: var(--bg);
		transition: background 0.8s;
	}
	.panel {
		display: grid;
		gap: 8px;
	}
	.panel small {
		font: 11px var(--mono);
		color: var(--dim);
		margin-bottom: 4px;
	}
	.file {
		display: grid;
		grid-template-columns: 22px auto 1fr;
		gap: 10px;
		align-items: center;
		background: var(--panel2);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 8px 12px;
		animation: in 0.35s var(--d, 0s) both;
	}
	.file code {
		font: 12.5px var(--mono);
	}
	.file em {
		font-style: normal;
		font-size: 12px;
		color: var(--dim);
		text-align: right;
	}
	.tick {
		color: var(--accent);
		font-weight: 700;
	}
	.diff {
		grid-template-columns: 90px 1fr 44px;
	}
	.diff i {
		height: 8px;
		background: var(--line);
		border-radius: 8px;
		overflow: hidden;
	}
	.diff b {
		display: block;
		height: 100%;
		width: var(--w);
		background: var(--accent);
		border-radius: 8px;
		transform-origin: left;
		animation: grow 0.8s var(--d) both;
	}
	.kept {
		margin: 6px 0 0;
		font-size: 13px;
		color: var(--dim);
	}
	.chat {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.m {
		max-width: 88%;
		padding: 9px 12px;
		border-radius: 12px;
		animation: in 0.4s var(--d, 0s) both;
	}
	.user {
		align-self: flex-end;
		background: var(--user);
		border-bottom-right-radius: 3px;
	}
	.act {
		border: 1px dashed var(--dim);
		color: var(--accent);
		font: 12px var(--mono);
	}
	.ok {
		border: 1px solid var(--accent);
		color: var(--accent);
		font: 600 12px var(--mono);
	}
	.bot {
		background: var(--panel2);
	}
	.timeline {
		background: #f2f3f5;
		color: #18191d;
		border-radius: 12px;
		padding: 16px;
		display: grid;
		gap: 12px;
		opacity: 0.25;
		transition: opacity 0.5s;
	}
	.timeline.show {
		opacity: 1;
	}
	.timeline small {
		font: 600 10px 'JetBrains Mono', monospace;
		letter-spacing: 0.12em;
		color: #5a5c61;
	}
	.row {
		display: grid;
		gap: 6px;
		font-size: 13px;
		font-weight: 600;
	}
	.row i {
		height: 14px;
		background: #dfe0e3;
		border-radius: 14px;
		overflow: hidden;
	}
	.row b {
		display: block;
		height: 100%;
		border-radius: 14px;
		transform-origin: left;
	}
	.row .a {
		width: 100%;
		background: #c2b280;
	}
	.row .b {
		width: 50%;
		background: #71b55c;
	}
	.show .row b {
		animation: grow 1s both;
	}
	.show .row:last-of-type b {
		animation-delay: 0.4s;
	}
	.row em {
		font: normal 600 12px 'JetBrains Mono', monospace;
		justify-self: end;
		margin-top: -4px;
	}
	@keyframes in {
		from { opacity: 0; transform: translateY(6px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes grow {
		from { transform: scaleX(0); }
		to { transform: scaleX(1); }
	}
	@media (max-width: 760px) {
		.fork {
			grid-template-columns: 1fr;
			padding: 14px;
		}
		nav span:last-child {
			display: none;
		}
		.file {
			grid-template-columns: 18px auto;
		}
		.file em {
			grid-column: 1 / -1;
			text-align: left;
		}
		.diff {
			grid-template-columns: 76px 1fr 36px;
		}
		.diff em {
			grid-column: auto;
			text-align: right;
		}
	}
</style>
