<!-- scrub:ignore-file (shows the em dash the copy lint catches) -->
<!-- This portfolio's own pipeline: typed content → copy lint gate → prerender → Cloudflare Pages. -->
<script lang="ts">
	let { step }: { step: number } = $props();
</script>

<div class="site">
	<div class="editor">
		<div class="tab">projects.ts</div>
<pre><code><span class="k">export const</span> projects: <span class="t">Project</span>[] = [
  {'{'}
    slug: <span class="s">'chat-cms'</span>,
    title: <span class="s">'Chat CMS'</span>,
    tone: <span class="s">'green'</span>,
    summary: <span class="s">'A range owner types what he wants{#if step === 1}<mark> — </mark>{:else}. {/if}'</span>,
    demo: {'{'} href: <span class="s">'/demos/chat-cms/'</span> {'}'},
  {'}'},</code></pre>
	</div>

	<div class="right">
		<div class="term">
			<div class="l cmd">$ npm run build</div>
			{#if step === 0}<div class="l dim">waiting…</div>{/if}
			{#if step === 1}
				<div class="l bad">src/lib/data/projects.ts:7 /—/ :: summary: 'A range owner types…</div>
				<div class="l bad">copy lint: 1 hit(s) · build stopped</div>
			{/if}
			{#if step >= 2}
				<div class="l ok">copy lint: clean</div>
				<div class="l ok" style="--d:.2s">✓ svelte-check 0 errors</div>
				<div class="l ok" style="--d:.4s">✓ prerendered / · /resume/ · /demos/chat-cms/</div>
			{/if}
			{#if step === 3}
				<div class="l cmd" style="--d:.1s">$ wrangler pages deploy</div>
				<div class="l go" style="--d:.3s">✨ brayden-gregersen.pages.dev</div>
			{/if}
		</div>

		<div class="preview" class:live={step === 3}>
			<div class="pbar"><i></i><i></i><i></i><span>{step === 3 ? 'brayden-gregersen.pages.dev' : 'localhost'}</span></div>
			<div class="pbody">
				<strong>I BUILD SITES PEOPLE CAN <em>ACTUALLY RUN.</em></strong>
				<span class="btn"><i>➜</i>See the work</span>
			</div>
		</div>
	</div>
</div>

<style>
	.site {
		background: #ffffff;
		min-height: 470px;
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		font: 13px/1.6 'JetBrains Mono', ui-monospace, monospace;
	}
	.editor {
		background: #1e1b18;
		color: #e7e0d6;
		min-width: 0;
	}
	.tab {
		background: #271c13;
		color: #c4e1ce;
		padding: 9px 16px;
		font-size: 12px;
		border-bottom: 2px solid #007e2e;
		display: inline-block;
	}
	pre {
		margin: 0;
		padding: 16px 18px;
		overflow-x: auto;
		white-space: pre-wrap;
	}
	.k {
		color: #ff8a7a;
	}
	.t {
		color: #5cc9b8;
	}
	.s {
		color: #c4e1ce;
	}
	mark {
		background: #ff4733;
		color: #fff;
		padding: 0 2px;
		animation: flash 0.5s 3 alternate;
	}
	.right {
		display: grid;
		grid-template-rows: auto auto;
		align-content: start;
		gap: 14px;
		padding: 18px;
		background: #ededed;
		min-width: 0;
	}
	.term {
		background: #271c13;
		color: #ededed;
		border-radius: 10px;
		padding: 12px 14px;
		font-size: 12px;
		min-height: 140px;
		overflow-wrap: anywhere;
	}
	.l {
		animation: in 0.3s var(--d, 0s) both;
	}
	.cmd {
		color: #fff;
	}
	.dim {
		color: #bbbcc4;
	}
	.bad {
		color: #ff8a7a;
	}
	.ok {
		color: #7fd8a0;
	}
	.go {
		color: #5cc9b8;
	}
	.preview {
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 16px 30px -20px rgba(39, 28, 19, 0.5);
		transition: transform 0.5s;
	}
	.preview.live {
		transform: rotate(-1.5deg) translateY(-4px);
	}
	.pbar {
		display: flex;
		gap: 5px;
		align-items: center;
		padding: 7px 10px;
		background: #e4e2dd;
	}
	.pbar i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #c9c5bd;
	}
	.pbar span {
		margin-left: 6px;
		font-size: 11px;
		color: #555;
	}
	.pbody {
		background: #eee5d9;
		padding: 22px 18px;
		display: grid;
		gap: 14px;
		justify-items: center;
		text-align: center;
	}
	.pbody strong {
		font: 900 22px/1 'Rubik', sans-serif;
		color: #271c13;
	}
	.pbody em {
		font-style: normal;
		color: #007e2e;
	}
	.btn {
		display: inline-flex;
		background: #fff;
		color: #5b2eff;
		font: 500 12px 'Be Vietnam Pro', sans-serif;
	}
	.btn i {
		font-style: normal;
		background: #5b2eff;
		color: #fff;
		padding: 6px 9px;
	}
	.btn {
		align-items: center;
		gap: 8px;
		padding-right: 10px;
	}
	@keyframes in {
		from { opacity: 0; transform: translateX(-6px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes flash {
		to { background: transparent; color: #ff4733; }
	}
	@media (max-width: 760px) {
		.site {
			grid-template-columns: 1fr;
		}
	}
</style>
