<!-- A CSS-only 3D cube: six faces positioned with translateZ, spun with a keyframe animation. -->
<script lang="ts">
	let { size = 220 }: { size?: number } = $props();
	const faces = [
		{ cls: 'front', label: 'TS' },
		{ cls: 'right', label: 'CSS' },
		{ cls: 'back', label: 'CMS' },
		{ cls: 'left', label: 'LCP' },
		{ cls: 'top', label: '' },
		{ cls: 'bottom', label: '' }
	];
</script>

<div class="scene" style="--s:{size}px" aria-hidden="true">
	<div class="cube">
		{#each faces as f}<div class="face {f.cls}"><span>{f.label}</span></div>{/each}
	</div>
	<div class="shadow"></div>
</div>

<style>
	.scene {
		width: var(--s);
		height: calc(var(--s) * 1.5);
		perspective: 900px;
		display: grid;
		justify-items: center;
		align-content: center;
		margin-inline: auto;
	}
	.cube {
		position: relative;
		width: var(--s);
		height: var(--s);
		transform-style: preserve-3d;
		animation: spin 14s linear infinite, bob 3.5s ease-in-out infinite alternate;
	}
	.face {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		font: 900 calc(var(--s) * 0.24) / 1 var(--display);
		color: var(--ink);
		border-radius: 6px;
		backface-visibility: hidden;
	}
	.front {
		background: #e6e07a;
		transform: translateZ(calc(var(--s) / 2));
	}
	.right {
		background: #7fd3c5;
		transform: rotateY(90deg) translateZ(calc(var(--s) / 2));
	}
	.back {
		background: #f4f4f4;
		transform: rotateY(180deg) translateZ(calc(var(--s) / 2));
		background-image: radial-gradient(#9a9aa3 1.4px, transparent 1.6px);
		background-size: 12px 12px;
	}
	.left {
		background: #9ee0d4;
		transform: rotateY(-90deg) translateZ(calc(var(--s) / 2));
	}
	.top {
		background: #b8ebe2;
		transform: rotateX(90deg) translateZ(calc(var(--s) / 2));
	}
	.bottom {
		background: #d8d5a2;
		transform: rotateX(-90deg) translateZ(calc(var(--s) / 2));
	}
	.back span {
		background: #f4f4f4;
		padding: 4px 10px;
		border-radius: 4px;
	}
	.shadow {
		width: calc(var(--s) * 1.1);
		height: calc(var(--s) * 0.18);
		margin-top: calc(var(--s) * 0.32);
		border-radius: 50%;
		background: radial-gradient(rgba(0, 60, 50, 0.35), transparent 70%);
		animation: breathe 3.5s ease-in-out infinite alternate;
	}
	@keyframes spin {
		from {
			rotate: y 0deg;
		}
		to {
			rotate: y 360deg;
		}
	}
	@keyframes bob {
		from {
			transform: rotateX(-18deg) translateY(-6px);
		}
		to {
			transform: rotateX(-18deg) translateY(10px);
		}
	}
	@keyframes breathe {
		from {
			transform: scale(0.92);
			opacity: 0.8;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cube {
			transform: rotateX(-18deg) rotateY(-32deg);
		}
	}
</style>
