<!-- Recreates the Midnight shared inbox (black, purple #a855f7, amber #e0a35c, Rajdhani). Names are placeholders. -->
<script lang="ts">
	let { step }: { step: number } = $props();
	const chain = ['Jess', 'Dana', 'Rico'];
	// who is ringing / answered at each step
	const ringing = $derived(step === 1 ? 1 : -1);
</script>

<div class="inbox">
	<aside>
		<b class="brand">MIDNIGHT · INBOX</b>
		<div class="thread sel">
			<span class="who">(435) 555-0142</span>
			<span class="prev">{step === 0 ? '📞 Incoming call' : 'Can you haul a load of road base Friday?'}</span>
			{#if step >= 2}<span class="owner">Dana</span>{/if}
		</div>
		<div class="thread"><span class="who">Cedar Ridge HOA</span><span class="prev">Thanks, invoice paid</span><span class="owner o2">Jess</span></div>
		<div class="thread"><span class="who">(435) 555-0199</span><span class="prev">Price on 3/4" gravel?</span><span class="owner o3">Rico</span></div>
	</aside>

	<section class="convo">
		{#if step === 3}
			<div class="banner">Dana spoke to them 2 min ago</div>
		{/if}
		<div class="head">
			<b>(435) 555-0142</b>
			<span>{step >= 2 ? 'Claimed by Dana' : 'Unassigned'}</span>
		</div>

		{#if step <= 1}
			<div class="ring">
				<span class="phone">☎</span>
				<b>{step === 0 ? 'Incoming call' : 'Ring chain'}</b>
				<div class="chain">
					{#each chain as name, i}
						<div class="person" class:ringing={ringing === i} class:missed={step === 1 && i === 0}>
							<span>{name}</span>
							<i><em style="--dur:{step === 1 && i === 1 ? '3s' : '0s'}"></em></i>
							<small>{step === 1 && i === 0 ? 'no answer · 10s' : step === 1 && i === 1 ? 'ringing…' : '10s'}</small>
						</div>
					{/each}
					<div class="person screener"><span>Voice screener</span><small>if nobody answers</small></div>
				</div>
			</div>
		{:else}
			<div class="timeline">
				<div class="ev call">📞 Call · answered by <b>Dana</b> · 3m 12s</div>
				<div class="msg in">Can you haul a load of road base Friday?</div>
				<div class="msg out">Yes, we can do Friday morning. Sending the quote now. <small>Dana · delivered</small></div>
				{#if step === 3}
					<div class="ev jess">👀 Jess opened this thread · reply box shows the warning first</div>
				{/if}
			</div>
		{/if}
	</section>
</div>

<style>
	.inbox {
		background: #0a0a0a;
		color: #ececec;
		min-height: 470px;
		display: grid;
		grid-template-columns: 0.8fr 1.4fr;
		font: 500 15px/1.4 'Rajdhani', system-ui, sans-serif;
	}
	aside {
		background: #141414;
		border-right: 1px solid #2a2a2a;
		padding: 16px 12px;
		display: grid;
		align-content: start;
		gap: 8px;
	}
	.brand {
		font-weight: 700;
		letter-spacing: 0.16em;
		color: #a855f7;
		padding: 0 6px 6px;
	}
	.thread {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 2px 8px;
		padding: 10px;
		border-radius: 8px;
		background: #1c1c1c;
	}
	.thread.sel {
		background: #241a2e;
		box-shadow: inset 3px 0 #a855f7;
	}
	.who {
		font-weight: 700;
	}
	.prev {
		grid-column: 1;
		font-size: 13px;
		color: #9a9a9a;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.owner {
		grid-row: 1 / 3;
		grid-column: 2;
		align-self: center;
		font-size: 12px;
		font-weight: 700;
		background: #2f4a2f;
		color: #b6e3b6;
		padding: 2px 8px;
		border-radius: 999px;
		animation: in 0.35s both;
	}
	.o2,
	.o3 {
		background: #2a2a2a;
		color: #bdbdbd;
		animation: none;
	}
	.convo {
		position: relative;
		padding: 16px 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.banner {
		background: #4a3a2a;
		color: #ffcd70;
		border: 1px solid #e0a35c;
		border-radius: 8px;
		padding: 10px 14px;
		font-weight: 700;
		animation: in 0.4s both;
	}
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #2a2a2a;
		padding-bottom: 10px;
	}
	.head span {
		font-size: 13px;
		color: #a855f7;
		font-weight: 700;
	}
	.ring {
		display: grid;
		justify-items: center;
		gap: 12px;
		padding: 10px 0;
	}
	.phone {
		width: 58px;
		height: 58px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: #a855f7;
		font-size: 26px;
		animation: ring 0.9s ease-in-out infinite;
	}
	.chain {
		display: grid;
		gap: 8px;
		width: min(100%, 380px);
	}
	.person {
		display: grid;
		grid-template-columns: 90px 1fr auto;
		gap: 10px;
		align-items: center;
		background: #141414;
		border: 1px solid #2a2a2a;
		border-radius: 8px;
		padding: 8px 10px;
	}
	.person i {
		height: 6px;
		background: #2a2a2a;
		border-radius: 6px;
		overflow: hidden;
	}
	.person em {
		display: block;
		height: 100%;
		width: 0;
		background: #a855f7;
	}
	.person.ringing {
		border-color: #a855f7;
	}
	.person.ringing em {
		animation: fill var(--dur) linear forwards;
	}
	.person.missed em {
		width: 100%;
		background: #555;
	}
	.person small {
		font-size: 12px;
		color: #9a9a9a;
	}
	.screener {
		grid-template-columns: 1fr auto;
		opacity: 0.6;
	}
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.ev {
		font-size: 13px;
		color: #9a9a9a;
		text-align: center;
	}
	.ev b {
		color: #b6e3b6;
	}
	.jess {
		color: #ffcd70;
		animation: in 0.4s both;
	}
	.msg {
		max-width: 80%;
		padding: 9px 12px;
		border-radius: 12px;
		animation: in 0.35s both;
	}
	.in {
		background: #1c1c1c;
		align-self: flex-start;
	}
	.out {
		background: #a855f7;
		color: #fff;
		align-self: flex-end;
		display: grid;
	}
	.out small {
		font-size: 11px;
		opacity: 0.8;
	}
	@keyframes in {
		from { opacity: 0; transform: translateY(6px); }
		to { opacity: 1; transform: none; }
	}
	@keyframes ring {
		0%, 100% { transform: rotate(0); }
		25% { transform: rotate(-12deg); }
		75% { transform: rotate(12deg); }
	}
	@keyframes fill {
		to { width: 100%; }
	}
	@media (max-width: 700px) {
		.inbox {
			grid-template-columns: 1fr;
		}
		aside {
			display: none;
		}
		.person {
			grid-template-columns: 60px 1fr auto;
		}
	}
</style>
