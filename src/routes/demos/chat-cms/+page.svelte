<script lang="ts">
	import { tick } from 'svelte';
	import { validateContent } from '$lib/demo/validate.js';
	import { scenarios, type Scenario } from '$lib/demo/scenarios';

	type Msg =
		| { id: number; kind: 'user' | 'bot'; text: string }
		| { id: number; kind: 'act'; text: string }
		| { id: number; kind: 'check'; ok: boolean; errors: string[] }
		| { id: number; kind: 'confirm'; text: string; scenario: Scenario; answered: boolean };

	let tab = $state<'chat' | 'log' | 'tasks'>('chat');
	let msgs = $state<Msg[]>([
		{
			id: 0,
			kind: 'bot',
			text: 'Hey John. Tell me what you want changed on bravelizard.com in plain English. New pages start as drafts, and anything I change shows up in the Activity Log.'
		}
	]);
	let input = $state('');
	let busy = $state(false);
	let n = 1;

	let site = $state({
		sat: '10am to 4pm',
		pages: [
			{ title: 'Home', status: 'Published' },
			{ title: 'Memberships', status: 'Published' },
			{ title: 'Training', status: 'Published' },
			{ title: 'Summer League 2025', status: 'Published' }
		],
		flash: ''
	});
	let log = $state<{ time: string; action: string; target: string; ok: boolean }[]>([
		{ time: 'Tue 9:12am', action: 'update_page', target: 'Memberships · pricing table', ok: true },
		{ time: 'Mon 4:40pm', action: 'set_seo', target: 'Training · title + description', ok: true }
	]);
	let tasks = $state([
		{ title: 'Send Q4 event photos to Brayden', due: 'Oct 1', owner: 'John', done: false },
		{ title: 'Renew range insurance certificate', due: 'Sep 20', owner: 'John', done: true }
	]);

	let sandbox = $state(
		`<div id="blt-v1">\n  <h2 onclick="alert('hi')">Hello</h2>\n  <iframe src="https://example.com"></iframe>\n</div>`
	);
	let sandboxResult = $state<{ ok: boolean; errors: string[] } | null>(null);

	let msgBox: HTMLDivElement | undefined = $state();
	const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const wait = (ms: number) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
	const now = () => new Date().toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' });

	type NewMsg = Msg extends infer M ? (M extends Msg ? Omit<M, 'id'> : never) : never;

	async function push(m: NewMsg) {
		msgs.push({ ...m, id: n++ } as Msg);
		await tick();
		msgBox?.scrollTo({ top: msgBox.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
	}

	function flash(what: string) {
		site.flash = what;
		setTimeout(() => (site.flash = ''), 2200);
	}

	function apply(s: Scenario) {
		const e = s.effect;
		if (!e) return;
		if (e.kind === 'hours') site.sat = e.value;
		if (e.kind === 'addDraft') site.pages.push({ title: e.title, status: 'Draft' });
		if (e.kind === 'trash') {
			const p = site.pages.find((p) => p.title === e.title);
			if (p) p.status = 'Trash';
		}
		if (e.kind === 'task') tasks.unshift({ title: e.title, due: e.due, owner: e.owner, done: false });
		flash(e.kind);
	}

	async function run(s: Scenario, text: string) {
		busy = true;
		await push({ kind: 'user', text });
		await wait(500);
		for (const t of s.tools) {
			await push({ kind: 'act', text: t });
			await wait(550);
		}
		if (s.confirm) {
			await push({ kind: 'confirm', text: s.confirm.question, scenario: s, answered: false });
			busy = false;
			return;
		}
		await finish(s);
	}

	async function finish(s: Scenario) {
		if (s.content) {
			const res = validateContent(s.content);
			await push({ kind: 'check', ok: res.ok, errors: res.errors });
			await wait(500);
			if (!res.ok) {
				log.unshift({ time: now(), action: s.log?.action ?? 'write', target: s.log?.target ?? '', ok: false });
				await push({ kind: 'bot', text: s.blockedReply ?? 'That change was blocked.' });
				busy = false;
				return;
			}
		}
		apply(s);
		if (s.log) log.unshift({ time: now(), action: s.log.action, target: s.log.target, ok: true });
		await push({ kind: 'bot', text: s.reply });
		busy = false;
	}

	async function answer(m: Extract<Msg, { kind: 'confirm' }>, yes: boolean) {
		m.answered = true;
		busy = true;
		await push({ kind: 'user', text: yes ? 'Yes, delete it.' : 'No, keep it.' });
		await wait(400);
		if (!yes) {
			await push({ kind: 'bot', text: 'No problem, I left it alone.' });
			busy = false;
			return;
		}
		await push({ kind: 'act', text: 'delete_page {id: 50112, confirmed: true}' });
		await wait(500);
		await finish({ ...m.scenario, confirm: undefined });
	}

	async function send(text = input) {
		const t = text.trim();
		if (!t || busy) return;
		input = '';
		const s = scenarios.find((s) => s.chip === t) ?? scenarios.find((s) => s.match.test(t));
		if (s) return run(s, t);
		busy = true;
		await push({ kind: 'user', text: t });
		await wait(400);
		await push({
			kind: 'bot',
			text: 'This demo runs on scripted replies, so it only knows the requests in the buttons above. The real one talks to Claude and can handle anything on the site.'
		});
		busy = false;
	}

	function runSandbox() {
		sandboxResult = validateContent(sandbox);
	}

	function reset() {
		location.reload();
	}

	// Walkthrough
	const steps = [
		{ sel: '#wt-chips', title: 'Plain English in', body: 'The owner types what he wants changed. Pick any request here, or type your own.' },
		{ sel: '#wt-msgs', title: 'Tools, not free rein', body: 'The model can only call a short list of tools (list, get, create, update, trash, SEO, tasks). Each call shows up here so nothing happens out of sight.' },
		{ sel: '#wt-preview', title: 'The site updates', body: 'Changes land on the real WordPress site. Here a mock of bravelizard.com shows the result. New pages start as drafts.' },
		{ sel: '#wt-chips', title: 'Try to break it', body: 'Ask for the countdown timer script. The model will write it, and the validator will stop it before it reaches WordPress.' },
		{ sel: '#wt-sandbox', title: 'This is the real validator', body: 'This box runs the exact production validate.js from the live Worker. Paste any HTML and see what it allows.' },
		{ sel: '#wt-tabs', title: 'Nothing is silent', body: 'Every write, including blocked ones, lands in the Activity Log. Deletes need an explicit yes and only move pages to the trash.' }
	];
	let step = $state(-1);
	let target: Element | null = null;

	async function goStep(i: number) {
		target?.classList.remove('wt-on');
		step = i;
		if (i < 0 || i >= steps.length) {
			step = -1;
			return;
		}
		await tick();
		target = document.querySelector(steps[i].sel);
		target?.classList.add('wt-on');
		target?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
	}
</script>

<svelte:head>
	<title>Chat CMS demo · Brayden Gregersen</title>
	<meta name="description" content="Try a scripted demo of the plain-English CMS Brayden built for Brave Lizard Tactical. The content validator is the real production code." />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" />
</svelte:head>

<div class="demo-page">
	<div class="wrap intro">
		<a class="back" href="/#chat-cms">← Back to portfolio</a>
		<h1 class="display">Try the chat CMS</h1>
		<p>
			I built this for the owner of Brave Lizard Tactical, a private range in Beryl, Utah, so he can
			update his WordPress site without ever opening WP admin. This is a <strong>scripted demo</strong>:
			the replies are pre-written, but the content validator is the <strong>real production code</strong>
			from the live Worker.
		</p>
		<div class="intro-actions">
			<button class="walk" onclick={() => goStep(0)}>▶ Start the walkthrough</button>
			<button class="ghost" onclick={reset}>Reset demo</button>
		</div>
	</div>

	<div class="stage wrap">
		<!-- The CMS app, styled like the real one -->
		<section class="app" aria-label="Chat CMS demo">
			<div class="strip">DEMO ENVIRONMENT · SCRIPTED REPLIES · REAL VALIDATOR</div>
			<header class="app-head">
				<span class="app-title">🦎 Brave Lizard CMS</span>
				<span class="who">john@bravelizard.com</span>
			</header>
			<nav class="app-tabs" id="wt-tabs">
				<button class:on={tab === 'chat'} onclick={() => (tab = 'chat')}>Chat</button>
				<button class:on={tab === 'log'} onclick={() => (tab = 'log')}>Activity Log <span class="count">{log.length}</span></button>
				<button class:on={tab === 'tasks'} onclick={() => (tab = 'tasks')}>Tasks <span class="count">{tasks.filter((t) => !t.done).length}</span></button>
			</nav>

			{#if tab === 'chat'}
				<div class="chips" id="wt-chips">
					{#each scenarios as s}
						<button disabled={busy} onclick={() => send(s.chip)}>{s.chip}</button>
					{/each}
				</div>
				<div class="msgs" id="wt-msgs" bind:this={msgBox} aria-live="polite">
					{#each msgs as m (m.id)}
						{#if m.kind === 'user'}
							<div class="m user">{m.text}</div>
						{:else if m.kind === 'bot'}
							<div class="m bot">{m.text}</div>
						{:else if m.kind === 'act'}
							<div class="m act">→ {m.text}</div>
						{:else if m.kind === 'check'}
							<div class="m check" class:bad={!m.ok}>
								<b>validateContent() · {m.ok ? 'PASS' : 'BLOCKED'}</b>
								{#if m.ok}
									<span>Scoped CSS, no scripts, allowlisted URLs only. Write allowed.</span>
								{:else}
									<ul>{#each m.errors as e}<li>{e}</li>{/each}</ul>
								{/if}
							</div>
						{:else if m.kind === 'confirm'}
							<div class="m bot confirm">
								{m.text}
								{#if !m.answered}
									<div class="yn">
										<button class="danger" onclick={() => answer(m, true)}>Yes, delete it</button>
										<button onclick={() => answer(m, false)}>Keep it</button>
									</div>
								{/if}
							</div>
						{/if}
					{/each}
					{#if busy}<div class="m act typing">working…</div>{/if}
				</div>
				<form class="composer" onsubmit={(e) => { e.preventDefault(); send(); }}>
					<label class="sr" for="inp">Message</label>
					<textarea id="inp" rows="2" placeholder="What do you want to change on the site?" bind:value={input}
						onkeydown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}></textarea>
					<button class="send" type="submit" disabled={busy || !input.trim()}>Send</button>
				</form>
			{:else if tab === 'log'}
				<ul class="log">
					{#each log as l}
						<li class:bad={!l.ok}>
							<span class="t">{l.time}</span>
							<span class="a">{l.action}</span>
							<span class="g">{l.target}</span>
							<span class="s">{l.ok ? 'OK' : 'BLOCKED'}</span>
						</li>
					{/each}
				</ul>
			{:else}
				<ul class="tasks">
					{#each tasks as t}
						<li class:done={t.done}>
							<label><input type="checkbox" bind:checked={t.done} /> {t.title}</label>
							<span class="meta">{t.owner} · due {t.due}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</section>

		<!-- Mock of the live site -->
		<section class="preview" id="wt-preview" aria-label="Mock of bravelizard.com">
			<div class="browser">
				<span class="dots"><i></i><i></i><i></i></span>
				<span class="url">bravelizard.com</span>
			</div>
			<div class="site">
				<div class="hero">
					<span class="k">BERYL, UTAH · PRIVATE RANGE</span>
					<strong>BRAVE LIZARD TACTICAL</strong>
				</div>
				<div class="block" class:flash={site.flash === 'hours'}>
					<b>RANGE HOURS</b>
					<span>Thursday to Friday: 12pm to sunset</span>
					<span>Saturday: {site.sat}</span>
					<span>Sunday: closed</span>
				</div>
				<div class="block" class:flash={site.flash === 'addDraft' || site.flash === 'trash'}>
					<b>PAGES</b>
					{#each site.pages as p}
						<span class="page">
							<span class:struck={p.status === 'Trash'}>{p.title}</span>
							<em class={p.status.toLowerCase()}>{p.status}</em>
						</span>
					{/each}
				</div>
			</div>
		</section>
	</div>

	<!-- Real validator sandbox -->
	<section class="wrap sandbox" id="wt-sandbox">
		<h2 class="display">Run the real validator</h2>
		<p>
			This is the exact <code>validate.js</code> that guards every write on the live site. Paste any HTML
			fragment and it runs in your browser.
		</p>
		<label class="sr" for="sb">HTML to validate</label>
		<textarea id="sb" rows="7" bind:value={sandbox} spellcheck="false"></textarea>
		<button class="walk" onclick={runSandbox}>Run validateContent()</button>
		{#if sandboxResult}
			<div class="result" class:bad={!sandboxResult.ok}>
				<b>{sandboxResult.ok ? 'PASS · this would be written' : 'BLOCKED · the write never happens'}</b>
				{#if !sandboxResult.ok}<ul>{#each sandboxResult.errors as e}<li>{e}</li>{/each}</ul>{/if}
			</div>
		{/if}
	</section>
</div>

{#if step >= 0}
	<div class="wt-card" role="dialog" aria-label="Walkthrough">
		<span class="wt-n">STEP {step + 1} / {steps.length}</span>
		<b>{steps[step].title}</b>
		<p>{steps[step].body}</p>
		<div class="wt-btns">
			<button onclick={() => goStep(-1)}>Close</button>
			<span>
				<button disabled={step === 0} onclick={() => goStep(step - 1)}>Back</button>
				<button class="next" onclick={() => goStep(step + 1)}>{step === steps.length - 1 ? 'Done' : 'Next'}</button>
			</span>
		</div>
	</div>
{/if}

<style>
	.demo-page {
		--bg: #0a0b09;
		--panel: #16150f;
		--panel2: #221e18;
		--line: #2c2a22;
		--text: #e8e4da;
		--dim: #a09a8c;
		--tan: #c2b280;
		--rust: #8a3b1e;
		--good: #6f9a3f;
		--bad: #c0463a;
		--head: 'Oswald', sans-serif;
		--cbody: 'Work Sans', system-ui, sans-serif;
		--cmono: 'IBM Plex Mono', ui-monospace, monospace;
		background: var(--paper);
		padding: 40px 0 100px;
	}
	.sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}
	.back {
		font-weight: 600;
		text-underline-offset: 4px;
	}
	.intro h1 {
		color: var(--green);
		font-size: clamp(48px, 8vw, 104px);
		margin: 18px 0 16px;
	}
	.intro p {
		max-width: 68ch;
		font-size: 18px;
		margin: 0;
	}
	.intro-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		margin: 26px 0 34px;
	}
	.walk,
	.ghost {
		font: 600 16px var(--body);
		min-height: 48px;
		padding: 0 20px;
		border: 0;
		cursor: pointer;
		background: var(--violet);
		color: #fff;
	}
	.ghost {
		background: transparent;
		color: var(--ink);
		border: 2px solid var(--ink);
	}

	.stage {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
		gap: 20px;
		align-items: start;
	}

	/* App */
	.app {
		background: var(--bg);
		color: var(--text);
		border-radius: var(--radius);
		overflow: hidden;
		font: 14px/1.5 var(--cbody);
		display: flex;
		flex-direction: column;
		min-height: 640px;
	}
	.strip {
		font: 500 11px var(--cmono);
		letter-spacing: 0.08em;
		color: var(--tan);
		background: rgba(194, 178, 128, 0.08);
		padding: 8px 18px;
		border-bottom: 1px solid var(--line);
	}
	.app-head {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 18px;
		background: var(--panel);
		border-bottom: 1px solid var(--line);
	}
	.app-title {
		font: 600 16px var(--head);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--tan);
	}
	.who {
		margin-left: auto;
		color: var(--dim);
		font: 12px var(--cmono);
	}
	.app-tabs {
		display: flex;
		border-bottom: 1px solid var(--line);
		background: var(--panel);
	}
	.app-tabs button {
		flex: 1;
		background: none;
		border: 0;
		color: var(--dim);
		font: 500 13px var(--head);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 12px 8px;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		min-height: 44px;
	}
	.app-tabs button.on {
		color: var(--tan);
		border-bottom-color: var(--tan);
	}
	.count {
		font: 11px var(--cmono);
		opacity: 0.8;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 14px 16px 4px;
	}
	.chips button {
		background: var(--panel2);
		color: var(--text);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 8px 12px;
		font: 13px var(--cbody);
		cursor: pointer;
		text-align: left;
	}
	.chips button:hover:not(:disabled) {
		border-color: var(--tan);
	}
	.chips button:disabled {
		opacity: 0.5;
		cursor: default;
	}
	.msgs {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 14px 16px;
		overflow-y: auto;
		max-height: 440px;
		min-height: 300px;
	}
	.m {
		max-width: 88%;
		padding: 10px 13px;
		border-radius: 12px;
		white-space: pre-wrap;
	}
	.m.user {
		align-self: flex-end;
		background: var(--rust);
		color: #fbf3ea;
		border-bottom-right-radius: 3px;
	}
	.m.bot {
		align-self: flex-start;
		background: var(--panel2);
		border-bottom-left-radius: 3px;
	}
	.m.act {
		align-self: flex-start;
		border: 1px dashed #8a7f5e;
		color: var(--tan);
		font: 12.5px var(--cmono);
		padding: 6px 10px;
	}
	.typing {
		opacity: 0.7;
	}
	.m.check {
		align-self: flex-start;
		border: 1px solid var(--good);
		background: rgba(111, 154, 63, 0.1);
		font: 12.5px/1.5 var(--cmono);
		display: grid;
		gap: 4px;
	}
	.m.check.bad {
		border-color: var(--bad);
		background: rgba(192, 70, 58, 0.12);
	}
	.m.check b {
		color: var(--good);
	}
	.m.check.bad b {
		color: #ff8a7a;
	}
	.m.check ul,
	.result ul {
		margin: 0;
		padding-left: 18px;
	}
	.yn {
		display: flex;
		gap: 8px;
		margin-top: 10px;
	}
	.yn button {
		background: transparent;
		color: var(--text);
		border: 1px solid var(--line);
		border-radius: 6px;
		padding: 8px 12px;
		cursor: pointer;
		font: 600 13px var(--cbody);
		min-height: 40px;
	}
	.yn .danger {
		background: var(--rust);
		border-color: var(--rust);
	}
	.composer {
		display: flex;
		gap: 8px;
		padding: 12px 16px 16px;
		border-top: 1px solid var(--line);
	}
	.composer textarea {
		flex: 1;
		resize: none;
		background: var(--panel2);
		color: var(--text);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 10px 12px;
		font: 14px var(--cbody);
	}
	.send {
		background: var(--tan);
		color: #1a1812;
		border: 0;
		border-radius: 8px;
		padding: 0 18px;
		font: 600 13px var(--head);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		cursor: pointer;
	}
	.send:disabled {
		opacity: 0.5;
	}
	.log,
	.tasks {
		list-style: none;
		margin: 0;
		padding: 16px;
		display: grid;
		gap: 8px;
	}
	.log li {
		display: grid;
		grid-template-columns: 96px 150px 1fr auto;
		gap: 10px;
		align-items: baseline;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 10px 12px;
		font-size: 13px;
	}
	.log .t,
	.log .a {
		font: 12px var(--cmono);
		color: var(--dim);
	}
	.log .a {
		color: var(--tan);
	}
	.log .s {
		font: 600 11px var(--cmono);
		color: var(--good);
	}
	.log li.bad .s {
		color: #ff8a7a;
	}
	.tasks li {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 12px;
	}
	.tasks li.done label {
		text-decoration: line-through;
		opacity: 0.6;
	}
	.tasks .meta {
		font: 12px var(--cmono);
		color: var(--dim);
		white-space: nowrap;
	}

	/* Preview */
	.preview {
		background: var(--white);
		border-radius: var(--radius);
		overflow: hidden;
		box-shadow: 0 30px 60px -30px rgba(39, 28, 19, 0.4);
		position: sticky;
		top: 100px;
	}
	.browser {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		background: #e4e2dd;
	}
	.dots {
		display: flex;
		gap: 6px;
	}
	.dots i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #c9c5bd;
	}
	.url {
		flex: 1;
		background: #fff;
		border-radius: 6px;
		padding: 4px 10px;
		font: 12px var(--cmono);
		color: #555;
	}
	.site {
		background: #0f0e0b;
		color: #e8e4da;
		font: 14px/1.5 'Work Sans', sans-serif;
		padding-bottom: 16px;
	}
	.hero {
		padding: 44px 22px 36px;
		background:
			linear-gradient(180deg, rgba(15, 14, 11, 0.2), #0f0e0b),
			radial-gradient(120% 90% at 70% 0%, #6b5a3a 0%, #2a241a 55%, #0f0e0b 100%);
		display: grid;
		gap: 6px;
	}
	.hero .k {
		font: 500 11px 'IBM Plex Mono', monospace;
		letter-spacing: 0.14em;
		color: #c2b280;
	}
	.hero strong {
		font: 600 30px/1.05 'Oswald', sans-serif;
		letter-spacing: 0.08em;
	}
	.block {
		margin: 14px 16px 0;
		padding: 14px 16px;
		border: 1px solid #2c2a22;
		border-radius: 10px;
		display: grid;
		gap: 4px;
		transition: box-shadow 0.3s, border-color 0.3s;
	}
	.block b {
		font: 600 13px 'Oswald', sans-serif;
		letter-spacing: 0.14em;
		color: #c2b280;
	}
	.block.flash {
		border-color: #c2b280;
		box-shadow: 0 0 0 3px rgba(194, 178, 128, 0.35);
	}
	.page {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}
	.page em {
		font: normal 500 11px 'IBM Plex Mono', monospace;
		padding: 2px 8px;
		border-radius: 999px;
		background: rgba(111, 154, 63, 0.18);
		color: #9cc36b;
	}
	.page em.draft {
		background: rgba(194, 178, 128, 0.18);
		color: #c2b280;
	}
	.page em.trash {
		background: rgba(192, 70, 58, 0.18);
		color: #ff8a7a;
	}
	.struck {
		text-decoration: line-through;
		opacity: 0.55;
	}

	/* Sandbox */
	.sandbox {
		margin-top: 70px;
	}
	.sandbox h2 {
		font-size: clamp(36px, 5vw, 60px);
		margin-bottom: 12px;
	}
	.sandbox p {
		max-width: 64ch;
		margin: 0 0 16px;
	}
	.sandbox textarea {
		width: 100%;
		background: #0a0b09;
		color: #e8e4da;
		border: 0;
		border-radius: 12px;
		padding: 16px;
		font: 13px/1.6 'IBM Plex Mono', monospace;
		margin-bottom: 12px;
	}
	.result {
		margin-top: 14px;
		padding: 14px 16px;
		border-radius: 12px;
		background: var(--mint);
		font: 13px/1.6 var(--mono);
	}
	.result.bad {
		background: #ffd9d3;
	}

	/* Walkthrough */
	:global(.wt-on) {
		outline: 3px solid var(--violet) !important;
		outline-offset: 4px;
		border-radius: 12px;
	}
	.wt-card {
		position: fixed;
		left: 50%;
		bottom: 20px;
		translate: -50% 0;
		width: min(440px, calc(100vw - 32px));
		background: #16131f;
		color: #efeaf7;
		border: 1px solid #5b2eff;
		border-radius: 14px;
		padding: 16px 18px;
		z-index: 60;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
		display: grid;
		gap: 6px;
	}
	.wt-n {
		font: 500 11px var(--mono);
		letter-spacing: 0.12em;
		color: #b8a4ff;
	}
	.wt-card p {
		margin: 0;
		font-size: 14.5px;
	}
	.wt-btns {
		display: flex;
		justify-content: space-between;
		margin-top: 8px;
	}
	.wt-btns button {
		background: transparent;
		color: inherit;
		border: 1px solid #3b3552;
		border-radius: 8px;
		padding: 8px 14px;
		min-height: 40px;
		cursor: pointer;
		font: 600 13px var(--body);
	}
	.wt-btns .next {
		background: var(--violet);
		border-color: var(--violet);
	}
	.wt-btns button:disabled {
		opacity: 0.4;
	}

	@media (max-width: 900px) {
		.stage {
			grid-template-columns: minmax(0, 1fr);
		}
		.preview {
			position: static;
		}
		.log li {
			grid-template-columns: 1fr auto;
		}
		.log .g {
			grid-column: 1 / -1;
		}
	}
</style>
