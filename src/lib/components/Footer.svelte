<footer id="contact">
	<div class="wrap grid">
		<div>
			<h2 class="display">Say hello.</h2>
			<p>I’m looking for a full-time frontend role with a team I can learn from and contribute to. Based in Southern Utah, working remotely.</p>
			<p class="moon"><span aria-hidden="true">☾</span> Everything on this site was built after bedtime, once my two boys were asleep, plus a few early mornings before they woke up.</p>
		</div>
		<ul>
			<li><span class="eyebrow">Email</span><a href="mailto:brayden@plpages.com">brayden@plpages.com</a></li>
			<li><span class="eyebrow">Phone</span><a href="tel:+14356508594">435-650-8594</a></li>
			<li><span class="eyebrow">Resume</span><a href="/resume/">View or print</a></li>
		</ul>
	</div>
	<div class="wrap legal">
		<small>© {new Date().getFullYear()} Brayden Gregersen. Built with SvelteKit on Cloudflare Pages at bedtimebuilds.com. Styled after nexplayground.com, not affiliated with Nex.</small>
	</div>
</footer>

<style>
	.moon {
		font-size: 15px;
		opacity: 0.85;
		max-width: 52ch;
	}
	.moon span {
		color: var(--violet);
		font-size: 18px;
		margin-right: 4px;
	}
	footer {
		background: var(--paper);
		padding: 96px 0 32px;
		border-top: 1px solid rgba(39, 28, 19, 0.12);
	}
	.grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 40px;
		align-items: end;
	}
	h2 {
		color: var(--green);
		font-size: clamp(56px, 9vw, 120px);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 18px;
	}
	li {
		display: grid;
		gap: 6px;
	}
	.eyebrow {
		color: var(--green);
	}
	li a {
		font-size: 22px;
		font-weight: 600;
		text-underline-offset: 5px;
	}
	.legal {
		margin-top: 72px;
		opacity: 0.7;
	}
	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr;
		}
		footer {
			padding-top: 64px;
		}
	}
	@media print {
		footer {
			display: none;
		}
	}
</style>
