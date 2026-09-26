<!-- Recreates Ops Tasks, the Next.js PWA (IRON & INTENT look: #0a0e14, neon #39ff14, JetBrains Mono / Space Grotesk). -->
<script lang="ts">
	let { step }: { step: number } = $props();
	const checks = ['title: string ✓', 'priority ∈ {high, med, low} ✓', 'due: 2026-09-29 (ISO) ✓', 'trailing comma tolerated ✓'];
</script>

<div class="ops">
	<div class="phone">
		<div class="notch"></div>
		<header><b>OPS // TASKS</b><span>{step === 3 ? '3 active' : '1 active'}</span></header>

		<div class="list">
			<div class="task"><i class="lo"></i><span>Gym, 5:30am</span><em>daily</em></div>
			{#if step === 3}
				<div class="task new" style="--d:0s"><i class="hi"></i><span>Launch Groll-Offs site</span><em>Tue 9/29</em></div>
				<div class="task new" style="--d:.2s"><i class="md"></i><span>Call client about water truck ads</span><em>Sat 9/27</em></div>
			{/if}
		</div>

		<div class="chat">
			<div class="m me">{#key step === 0}<span class="type">launch groll-offs site tue, call client tmrw re water truck</span>{/key}</div>
			{#if step === 1}
				<pre class="m raw">Got it, two tasks.
```task
{'{'} "title": "Launch Groll-Offs site",
  "priority": "high", "due": "2026-09-29", {'}'}
```</pre>
			{/if}
			{#if step === 2}
				<div class="m val">
					<b>validate() before state</b>
					{#each checks as c, i}<span style="--d:{i * 0.25}s">{c}</span>{/each}
				</div>
			{/if}
			{#if step === 3}
				<div class="m bot">Got it, two tasks. Groll-Offs launch is high priority for Tuesday.</div>
			{/if}
		</div>
		<div class="composer">› dump an idea…</div>
	</div>
	<aside class="note">
		<small>NEXT.JS 14 · APP ROUTER</small>
		<code>POST /api/chat</code>
		<span>edge runtime · key stays server side</span>
	</aside>
</div>

<style>
	.ops {
		background: radial-gradient(90% 90% at 70% 20%, #16211a, #0a0e14 70%);
		min-height: 470px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 30px;
		padding: 22px;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		color: #e6edf3;
		flex-wrap: wrap;
	}
	.phone {
		width: 300px;
		background: #0a0e14;
		border: 8px solid #1d232c;
		border-radius: 34px;
		padding: 14px 12px 12px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-height: 420px;
		box-shadow: 0 0 40px -10px rgba(57, 255, 20, 0.25);
	}
	.notch {
		width: 70px;
		height: 6px;
		border-radius: 6px;
		background: #1d232c;
		margin: 0 auto 4px;
	}
	header {
		display: flex;
		justify-content: space-between;
		font: 11px 'JetBrains Mono', monospace;
		color: #8b949e;
	}
	header b {
		color: #39ff14;
		letter-spacing: 0.1em;
	}
	.list {
		display: grid;
		gap: 6px;
	}
	.task {
		display: grid;
		grid-template-columns: 8px 1fr auto;
		gap: 10px;
		align-items: center;
		background: #111820;
		border: 1px solid #1f2a35;
		border-radius: 8px;
		padding: 9px 10px;
		font-size: 13px;
	}
	.task em {
		font: normal 10px 'JetBrains Mono', monospace;
		color: #8b949e;
	}
	.task i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
	.hi {
		background: #f43f5e;
	}
	.md {
		background: #fbbf24;
	}
	.lo {
		background: #39ff14;
	}
	.new {
		animation: pop 0.45s var(--d) both;
		border-color: rgba(57, 255, 20, 0.5);
	}
	.chat {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 6px;
	}
	.m {
		font-size: 12px;
		padding: 8px 10px;
		border-radius: 10px;
		max-width: 92%;
		animation: pop 0.35s both;
	}
	.me {
		align-self: flex-end;
		background: #39ff14;
		color: #0a0e14;
		font-weight: 600;
	}
	.type {
		display: inline-block;
		animation: wipe 1.4s steps(24) both;
	}
	.raw {
		margin: 0;
		background: #111820;
		border: 1px solid #1f2a35;
		font: 10.5px/1.5 'JetBrains Mono', monospace;
		white-space: pre-wrap;
		color: #c9d1d9;
	}
	.val {
		background: #111820;
		border: 1px solid rgba(57, 255, 20, 0.4);
		display: grid;
		gap: 2px;
		font: 11px 'JetBrains Mono', monospace;
	}
	.val b {
		color: #39ff14;
	}
	.val span {
		opacity: 0;
		animation: pop 0.3s var(--d) forwards;
	}
	.bot {
		background: #111820;
		border: 1px solid #1f2a35;
	}
	.composer {
		font: 11px 'JetBrains Mono', monospace;
		color: #8b949e;
		border: 1px solid #1f2a35;
		border-radius: 8px;
		padding: 9px 10px;
	}
	.note {
		display: grid;
		gap: 6px;
		font: 12px 'JetBrains Mono', monospace;
		color: #8b949e;
		max-width: 240px;
	}
	.note small {
		color: #39ff14;
		letter-spacing: 0.1em;
	}
	.note code {
		color: #e6edf3;
		font-size: 16px;
	}
	@keyframes pop {
		from { opacity: 0; transform: translateY(6px) scale(0.98); }
		to { opacity: 1; transform: none; }
	}
	@keyframes wipe {
		from { clip-path: inset(0 100% 0 0); }
		to { clip-path: inset(0 0 0 0); }
	}
	@media (max-width: 640px) {
		.note {
			display: none;
		}
		.phone {
			width: 100%;
			max-width: 320px;
		}
	}
</style>
