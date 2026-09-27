<!-- Recreates the SEO Ops dashboard (near-black, #00FF94, Space Grotesk / JetBrains Mono). -->
<script lang="ts">
	let { step }: { step: number } = $props();
	const stages = ['Collect', 'Analyze', 'Plan', 'Verify', 'Doer'];
	// how far the pipeline has run at each step
	const reached = $derived([1, 3, 4, 5][step]);
</script>

<div class="ops">
	<div class="head">
		<div>
			<strong>PL Pages</strong>
			<small>plpages.com · Web, SEO &amp; business systems · Southern Utah</small>
		</div>
		<span class="tags"><span class="live">LIVE</span><span class="sample">SAMPLE DATA</span></span>
	</div>
	<div class="stats">
		<span><em>KEYWORDS</em>48</span>
		<span><em>PAGES</em>22</span>
		<span><em>AWAITING</em><b class="y">{step >= 1 && step < 3 ? 1 : 0}</b></span>
		<span><em>PUBLISHED</em><b class="g">{step === 3 ? 1 : 0}</b></span>
	</div>

	<div class="pipe">
		{#each stages as s, i}
			<span class="stage" class:done={i < reached} class:run={i === reached - 1 && step === 0}>
				{s}
			</span>
			{#if i < stages.length - 1}<i class:lit={i < reached - 1}></i>{/if}
		{/each}
	</div>

	{#if step === 0}
		<div class="scan">
			<span class="dot"></span> RUN-0927-A · pulling DataForSEO rankings, PageSpeed (LCP, INP, CLS), Search Console…
			<div class="bars">{#each [62, 88, 45, 74, 51, 93, 67, 80] as h, i}<i style="--h:{h}%; --d:{i * 0.08}s"></i>{/each}</div>
		</div>
	{:else}
		<div class="item" class:approved={step >= 3}>
			<div class="body">
				<span class="title">Rewrite title tag on /results/</span>
				<span class="desc">The title never says what the page proves. Searchers looking for local SEO results in Southern Utah see “What We Built and What Happened”. Lead with the service and the place.</span>
				<span class="meta">ON-PAGE · 10m · DOER</span>
				{#if step >= 2}
					<span class="verify">VERIFY: PASS <small>grounded in finding #F-12 (Search Console queries + current title)</small></span>
				{/if}
				{#if step >= 3}
					<div class="diff">
						<del>&lt;title&gt;Results: What We Built and What Happened | Precision Landing Pages&lt;/title&gt;</del>
						<ins>&lt;title&gt;Local SEO &amp; Website Results in Southern Utah | PL Pages&lt;/title&gt;</ins>
					</div>
				{/if}
			</div>
			<div class="side">
				<span class="p1">P1</span>
				{#if step === 1}<span class="badge wait">AWAITING APPROVAL</span>{/if}
				{#if step === 2}<span class="badge approve">✓ APPROVE</span>{/if}
				{#if step === 3}<span class="badge pub">PUBLISHED</span>{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.ops {
		background: #0a0e14;
		color: #e8e8e8;
		font: 14px/1.5 'Space Grotesk', system-ui, sans-serif;
		min-height: 470px;
		padding: 22px clamp(16px, 3vw, 30px);
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.head {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		align-items: flex-start;
	}
	.head strong {
		display: block;
		font-size: 22px;
		letter-spacing: -0.01em;
	}
	.head small {
		font: 11px 'JetBrains Mono', monospace;
		color: #6b7280;
	}
	.live,
	.badge,
	.p1 {
		font: 700 10px 'JetBrains Mono', monospace;
		letter-spacing: 0.12em;
		padding: 3px 8px;
		border-radius: 4px;
		border: 1px solid;
		white-space: nowrap;
	}
	.tags {
		display: flex;
		gap: 6px;
	}
	.sample {
		font: 700 10px 'JetBrains Mono', monospace;
		letter-spacing: 0.12em;
		padding: 3px 8px;
		border-radius: 4px;
		border: 1px solid rgba(187, 161, 255, 0.5);
		color: #bba1ff;
	}
	.live {
		color: #00ff94;
		border-color: rgba(0, 255, 148, 0.4);
	}
	.stats {
		display: flex;
		gap: 26px;
		flex-wrap: wrap;
		padding: 14px 16px;
		background: #0f141c;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
	}
	.stats span {
		display: grid;
		font-size: 22px;
		font-weight: 700;
	}
	.stats em {
		font: normal 10px 'JetBrains Mono', monospace;
		letter-spacing: 0.12em;
		color: #6b7280;
	}
	.y {
		color: #e5c100;
	}
	.g {
		color: #00ff94;
	}
	.pipe {
		display: flex;
		align-items: center;
		gap: 6px;
		flex-wrap: wrap;
	}
	.stage {
		font: 500 11px 'JetBrains Mono', monospace;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 7px 11px;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: #6b7280;
		transition: all 0.35s;
	}
	.stage.done {
		color: #0a0e14;
		background: #00ff94;
		border-color: #00ff94;
	}
	.stage.run {
		animation: pulse 1s ease-in-out infinite alternate;
	}
	.pipe i {
		width: 18px;
		height: 2px;
		background: rgba(255, 255, 255, 0.12);
		transition: background 0.35s;
	}
	.pipe i.lit {
		background: #00ff94;
	}
	.scan {
		font: 12px 'JetBrains Mono', monospace;
		color: #c5cad3;
		padding: 16px;
		border: 1px dashed rgba(0, 255, 148, 0.35);
		border-radius: 10px;
	}
	.dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #00ff94;
		animation: pulse 0.8s infinite alternate;
	}
	.bars {
		display: flex;
		gap: 8px;
		align-items: flex-end;
		height: 90px;
		margin-top: 16px;
	}
	.bars i {
		flex: 1;
		max-width: 38px;
		height: var(--h);
		background: linear-gradient(#00ff94, rgba(0, 255, 148, 0.25));
		border-radius: 4px 4px 0 0;
		transform-origin: bottom;
		animation: grow 0.8s var(--d) both;
	}
	.item {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 14px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-left: 3px solid #e5c100;
		border-radius: 10px;
		padding: 16px 18px;
		animation: in 0.45s both;
		transition: border-color 0.4s;
	}
	.item.approved {
		border-left-color: #00ff94;
	}
	.body {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}
	.title {
		font-size: 16px;
		font-weight: 700;
	}
	.desc {
		font-size: 13px;
		color: #c5cad3;
	}
	.meta {
		font: 10px 'JetBrains Mono', monospace;
		letter-spacing: 0.1em;
		color: #6b7280;
	}
	.verify {
		font: 700 11px 'JetBrains Mono', monospace;
		color: #00ff94;
		animation: in 0.4s both;
	}
	.verify small {
		font-weight: 400;
		color: #6b7280;
		margin-left: 6px;
	}
	.diff {
		display: grid;
		gap: 3px;
		margin-top: 6px;
		font: 12px 'JetBrains Mono', monospace;
		animation: in 0.4s both;
	}
	.diff del {
		color: #ff6b6b;
		background: rgba(255, 107, 107, 0.08);
		padding: 3px 6px;
		border-radius: 4px;
		overflow-wrap: anywhere;
	}
	.diff ins {
		text-decoration: none;
		color: #00ff94;
		background: rgba(0, 255, 148, 0.08);
		padding: 3px 6px;
		border-radius: 4px;
		overflow-wrap: anywhere;
	}
	.side {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 6px;
	}
	.p1 {
		color: #e5c100;
		border-color: rgba(229, 193, 0, 0.4);
	}
	.badge {
		animation: in 0.35s both;
	}
	.wait {
		color: #e5c100;
		border-color: rgba(229, 193, 0, 0.4);
	}
	.approve {
		color: #0a0e14;
		background: #00ff94;
		border-color: #00ff94;
	}
	.pub {
		color: #bba1ff;
		border-color: rgba(187, 161, 255, 0.5);
	}
	@keyframes in {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes pulse {
		from { opacity: 0.45; }
		to { opacity: 1; }
	}
	@keyframes grow {
		from { transform: scaleY(0.05); }
		to { transform: scaleY(1); }
	}
	@media (max-width: 640px) {
		.item {
			grid-template-columns: 1fr;
		}
		.side {
			flex-direction: row;
			align-items: center;
		}
		.stats {
			gap: 16px;
		}
	}
</style>
