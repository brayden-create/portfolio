<!-- Recreates the Crew console (#0f1117, violet #7c5cff). Jobs checkpoint to D1 each step and requeue on a stale lease. -->
<script lang="ts">
	let { step }: { step: number } = $props();
	const agents = [
		['🧭', 'Chief of Staff', 'delegates'],
		['🔎', 'Scout', 'research'],
		['✍️', 'Scribe', 'SEO content']
	];
	const done = $derived([0, 2, 2, 4][step]);
</script>

<div class="crew">
	<aside>
		<b class="brand">CREW</b>
		{#each agents as [e, n, r], i}
			<div class="agent" class:busy={i === 1 && step >= 1 && step < 3}>
				<span class="av">{e}</span><span class="n">{n}</span><small>{i === 1 && step >= 1 && step < 3 ? 'working' : r}</small>
			</div>
		{/each}
		<small class="cron">⏱ cron · every minute</small>
	</aside>

	<section class="main">
		<div class="m you">🚀 <b>@Scout</b> research mudjacking demand in St. Joseph, MO</div>
		{#if step >= 1}
			<div class="job" class:warn={step === 2} class:ok={step === 3}>
				<div class="jhead">
					<b>TASK · Scout</b>
					<span>{step === 3 ? 'done' : step === 2 ? 'requeued' : 'running'}</span>
				</div>
				<ol>
					{#each ['web_search: "mudjacking st joseph mo"', 'http_request: DataForSEO volumes', 'compare local pack competitors', 'post_update: write report'] as s, i}
						<li class:done={i < done} class:now={i === done && step < 3}>
							<span>{i < done ? '✓' : i === done && step < 3 ? '…' : '○'}</span>{s}
						</li>
					{/each}
				</ol>
				{#if step === 1}<div class="note">checkpoint saved to D1 · step 2 of 4</div>{/if}
				{#if step === 2}<div class="note amber">lease expired · worker restarted → resumed from checkpoint 2</div>{/if}
			</div>
		{/if}
		{#if step === 3}
			<div class="report">
				<b>🔎 Scout · report</b>
				<span>~1.3k searches/mo across the metro. Local pack has 2 weak listings. Worth a rank &amp; rent test.</span>
				<small>4 steps · $0.14</small>
			</div>
		{/if}
	</section>
</div>

<style>
	.crew {
		background: #0f1117;
		color: #e8eaf2;
		min-height: 470px;
		display: grid;
		grid-template-columns: 220px 1fr;
		font: 14px/1.5 'Inter', system-ui, sans-serif;
	}
	aside {
		background: #151823;
		border-right: 1px solid #20263a;
		padding: 18px 14px;
		display: grid;
		align-content: start;
		gap: 10px;
	}
	.brand {
		letter-spacing: 0.2em;
		color: #7c5cff;
		font-size: 13px;
	}
	.agent {
		display: grid;
		grid-template-columns: 34px 1fr;
		gap: 0 10px;
		align-items: center;
		padding: 8px;
		border-radius: 10px;
		transition: background 0.3s;
	}
	.agent.busy {
		background: #20263a;
	}
	.av {
		grid-row: span 2;
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		background: #1a1e2b;
		border-radius: 50%;
	}
	.agent.busy .av {
		box-shadow: 0 0 0 2px #7c5cff;
		animation: pulse 1s infinite alternate;
	}
	.n {
		font-weight: 600;
		font-size: 13px;
	}
	.agent small {
		font-size: 11px;
		color: #9aa1b5;
	}
	.agent.busy small {
		color: #7c5cff;
	}
	.cron {
		margin-top: 10px;
		font: 11px 'JetBrains Mono', monospace;
		color: #666e85;
	}
	.main {
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.m {
		align-self: flex-end;
		background: #7c5cff;
		border-radius: 12px 12px 3px 12px;
		padding: 9px 12px;
		max-width: 85%;
	}
	.job {
		background: #1a1e2b;
		border: 1px solid #20263a;
		border-radius: 12px;
		padding: 14px;
		animation: in 0.4s both;
		transition: border-color 0.3s;
	}
	.job.warn {
		border-color: #fbbf24;
	}
	.job.ok {
		border-color: #34d399;
	}
	.jhead {
		display: flex;
		justify-content: space-between;
		font: 11px 'JetBrains Mono', monospace;
		letter-spacing: 0.08em;
		color: #9aa1b5;
		margin-bottom: 8px;
	}
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 5px;
		font: 12px 'JetBrains Mono', monospace;
	}
	li {
		display: flex;
		gap: 10px;
		color: #666e85;
	}
	li.done {
		color: #c7cbe0;
	}
	li.done span {
		color: #34d399;
	}
	li.now {
		color: #e8eaf2;
	}
	li.now span {
		color: #7c5cff;
		animation: pulse 0.6s infinite alternate;
	}
	.note {
		margin-top: 10px;
		font: 11px 'JetBrains Mono', monospace;
		color: #34d399;
		animation: in 0.35s both;
	}
	.note.amber {
		color: #fbbf24;
	}
	.report {
		background: #20263a;
		border-left: 3px solid #34d399;
		border-radius: 10px;
		padding: 12px 14px;
		display: grid;
		gap: 4px;
		animation: in 0.4s both;
	}
	.report small {
		font: 11px 'JetBrains Mono', monospace;
		color: #9aa1b5;
	}
	@keyframes in {
		from { opacity: 0; transform: translateY(6px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes pulse {
		from { opacity: 0.5; }
		to { opacity: 1; }
	}
	@media (max-width: 700px) {
		.crew {
			grid-template-columns: 1fr;
		}
		aside {
			grid-template-columns: repeat(3, 1fr);
			border-right: 0;
			border-bottom: 1px solid #20263a;
		}
		.brand,
		.cron,
		.agent small {
			display: none;
		}
		.agent {
			grid-template-columns: 1fr;
			justify-items: center;
			text-align: center;
		}
		.av {
			grid-row: auto;
		}
	}
</style>
