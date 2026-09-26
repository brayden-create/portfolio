<!-- The seo-ops vault MCP flow: OAuth consent picks the scope, tag filtering is default-deny. -->
<script lang="ts">
	let { step }: { step: number } = $props();
</script>

<div class="vault">
	<div class="client">
		<small>AI TOOL</small>
		<b>Claude</b>
		<div class="call" class:show={step >= 2}>
			<code>tools/call list_secrets</code>
			{#if step >= 2}
				<ul>
					<li>BrightLocal API key <em>tag: va</em></li>
					<li>DataForSEO login <em>tag: va</em></li>
					<li>WP app password (C&amp;C) <em>tag: va</em></li>
				</ul>
			{/if}
		</div>
		{#if step === 3}
			<div class="call deny">
				<code>tools/call get_secret "Cloudflare API / big"</code>
				<span>403 · not in scope mcp:va (default deny)</span>
			</div>
		{/if}
	</div>

	<div class="wire" class:on={step >= 1}><i></i></div>

	<div class="server">
		<div class="consent">
			<small>seo-ops-mcp · /authorize</small>
			<b>Connect Claude to the vault?</b>
			<div class="lbl">Consent password<span class="pw">{step === 0 ? '' : '••••••••••'}<i class="caret"></i></span></div>
			<div class="scope">
				<span>Scope</span>
				<strong>{step === 0 ? '…' : 'mcp:va'}</strong>
			</div>
			<span class="btn" class:done={step >= 1}>{step >= 1 ? '✓ Token issued' : 'Authorize'}</span>
		</div>
		<div class="kv">
			<small>KV · AES-GCM</small>
			{#each ['BrightLocal API key', 'DataForSEO login', 'Cloudflare API / big', 'WP app password (C&C)', 'Anthropic API key'] as s, i}
				<div class="sec" class:va={i !== 2 && i !== 4 && step >= 2} class:hide={(i === 2 || i === 4) && step >= 2}>
					<span>{s}</span><em>{i === 2 || i === 4 ? 'untagged' : 'va'}</em>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.vault {
		background: #0f1117;
		color: #e8eaf2;
		min-height: 470px;
		padding: 24px;
		display: grid;
		grid-template-columns: 1fr 70px 1.1fr;
		gap: 10px;
		align-items: center;
		font: 13px/1.5 'Inter', system-ui, sans-serif;
	}
	small {
		font: 10px 'JetBrains Mono', monospace;
		letter-spacing: 0.12em;
		color: #9aa1b5;
		text-transform: uppercase;
	}
	.client,
	.consent,
	.kv {
		background: #151823;
		border: 1px solid #20263a;
		border-radius: 12px;
		padding: 16px;
		display: grid;
		gap: 8px;
	}
	.client b,
	.consent b {
		font-size: 16px;
	}
	.call {
		border: 1px dashed #20263a;
		border-radius: 8px;
		padding: 10px;
		display: grid;
		gap: 6px;
		opacity: 0.35;
		transition: opacity 0.4s;
	}
	.call.show {
		opacity: 1;
		border-color: #34d399;
	}
	code {
		font: 12px 'JetBrains Mono', monospace;
		color: #c7cbe0;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 4px;
	}
	li {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		font-size: 12px;
		animation: in 0.35s both;
	}
	li em,
	.sec em {
		font: normal 10px 'JetBrains Mono', monospace;
		color: #34d399;
	}
	.deny {
		opacity: 1;
		border-color: #f87171;
		animation: in 0.35s both;
	}
	.deny span {
		font: 600 12px 'JetBrains Mono', monospace;
		color: #f87171;
	}
	.wire {
		height: 2px;
		background: #20263a;
		position: relative;
		overflow: hidden;
	}
	.wire.on {
		background: #7c5cff;
	}
	.wire.on i {
		position: absolute;
		top: -3px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #fff;
		animation: travel 1.2s linear infinite;
	}
	.server {
		display: grid;
		gap: 10px;
	}
	.lbl {
		display: grid;
		gap: 4px;
		font-size: 12px;
		color: #9aa1b5;
	}
	.pw {
		background: #0f1117;
		border: 1px solid #20263a;
		border-radius: 6px;
		padding: 8px;
		min-height: 36px;
		color: #e8eaf2;
		letter-spacing: 0.2em;
	}
	.caret {
		display: inline-block;
		width: 1px;
		height: 14px;
		background: #7c5cff;
		vertical-align: middle;
		animation: blink 0.8s steps(2) infinite;
	}
	.scope {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		color: #9aa1b5;
	}
	.scope strong {
		font-family: 'JetBrains Mono', monospace;
		color: #fbbf24;
	}
	.btn {
		text-align: center;
		background: #7c5cff;
		border-radius: 6px;
		padding: 8px;
		font-weight: 600;
		transition: background 0.3s;
	}
	.btn.done {
		background: #34d399;
		color: #0f1117;
	}
	.sec {
		display: flex;
		justify-content: space-between;
		padding: 5px 8px;
		border-radius: 6px;
		font-size: 12px;
		transition: opacity 0.4s, background 0.4s;
	}
	.sec em {
		color: #666e85;
	}
	.sec.va {
		background: rgba(52, 211, 153, 0.1);
	}
	.sec.va em {
		color: #34d399;
	}
	.sec.hide {
		opacity: 0.25;
		text-decoration: line-through;
	}
	@keyframes in {
		from { opacity: 0; transform: translateY(6px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes travel {
		from { left: -8px; }
		to { left: 100%; }
	}
	@keyframes blink {
		50% { opacity: 0; }
	}
	@media (max-width: 760px) {
		.vault {
			grid-template-columns: 1fr;
		}
		.wire {
			width: 2px;
			height: 30px;
			justify-self: center;
		}
		.wire.on i {
			display: none;
		}
	}
</style>
