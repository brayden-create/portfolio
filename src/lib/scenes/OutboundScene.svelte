<!-- plp-outbound: no UI of its own, so this shows the Worker's actual request path and test run in a terminal. -->
<script lang="ts">
	let { step }: { step: number } = $props();
</script>

<div class="term">
	<div class="bar"><i></i><i></i><i></i><span>plp-outbound · wrangler tail</span></div>
	<div class="lines">
		<div class="l">POST /webhooks/elevenlabs  <em>ElevenLabs-Signature: t=1790431201,v0=9f2c…</em></div>
		<div class="l ok" style="--d:.2s">✓ HMAC-SHA256 matches · timestamp fresh</div>
		<div class="l ok" style="--d:.4s">✓ post-call result saved · CRM updated in Airtable</div>

		{#if step >= 1}
			<div class="l dim">POST /webhooks/elevenlabs  <em>(captured request, replayed later)</em></div>
			<div class="l bad" style="--d:.2s">✗ 401 stale timestamp · replay rejected</div>
			<div class="l dim" style="--d:.35s">POST /webhooks/elevenlabs  <em>(provider redelivers the same event)</em></div>
			<div class="l ok" style="--d:.5s">✓ 200 duplicate ignored · processed once</div>
		{/if}

		{#if step >= 2}
			<div class="l dim">POST /admin/dispatch  <em>{'{'} prospect_record_id: "rec…" {'}'}</em></div>
			<div class="l ok" style="--d:.15s">✓ campaign running · market approved · not on DNC</div>
			<div class="l ok" style="--d:.3s">✓ Mon to Fri 09:00 to 17:30 in prospect's time zone (Tue 10:42)</div>
			<div class="l ok" style="--d:.45s">✓ attempts 1 of 3 in 14 days</div>
			<div class="l ok" style="--d:.6s">✓ concurrency 1 · nothing in flight · attempt row locked</div>
			<div class="l go" style="--d:.75s">→ dialed · "Last contacted" mirrored to Airtable</div>
		{/if}

		{#if step === 3}
			<div class="l cmd">$ npx vitest run</div>
			<div class="l ok" style="--d:.2s"> ✓ test/backend.test.js (40 tests)</div>
			<div class="l dim" style="--d:.35s">   webhook signature 7 · dispatch validation 8 · dispatch execution 4</div>
			<div class="l dim" style="--d:.45s">   suppression 5 · CRM updates 10 · cron callbacks 3 · helpers 3</div>
			<div class="l pass" style="--d:.65s"> Tests  40 passed (40)</div>
		{/if}
		<div class="l cursor">▍</div>
	</div>
</div>

<style>
	.term {
		background: #0d1117;
		color: #c9d1d9;
		min-height: 470px;
		font: 13px/1.7 'JetBrains Mono', ui-monospace, monospace;
		display: flex;
		flex-direction: column;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 14px;
		background: #161b22;
		border-bottom: 1px solid #30363d;
	}
	.bar i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #30363d;
	}
	.bar i:first-child {
		background: #ff5f57;
	}
	.bar i:nth-child(2) {
		background: #febc2e;
	}
	.bar i:nth-child(3) {
		background: #28c840;
	}
	.bar span {
		margin-left: 10px;
		font-size: 12px;
		color: #8b949e;
	}
	.lines {
		padding: 16px 18px;
		overflow-wrap: anywhere;
	}
	.l {
		animation: in 0.3s var(--d, 0s) both;
	}
	em {
		font-style: normal;
		color: #8b949e;
	}
	.ok {
		color: #3fb950;
	}
	.bad {
		color: #f85149;
	}
	.dim {
		color: #8b949e;
		margin-top: 8px;
	}
	.go {
		color: #58a6ff;
	}
	.cmd {
		margin-top: 8px;
		color: #e6edf3;
	}
	.pass {
		color: #0d1117;
		background: #3fb950;
		display: inline-block;
		padding: 0 6px;
		border-radius: 3px;
		margin-top: 4px;
	}
	.cursor {
		animation: blink 1s steps(2) infinite;
	}
	@keyframes in {
		from { opacity: 0; transform: translateX(-6px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes blink {
		50% { opacity: 0; }
	}
	@media (max-width: 600px) {
		.term {
			font-size: 11.5px;
		}
	}
</style>
