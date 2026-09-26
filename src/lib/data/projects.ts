// Content model for the portfolio. Kept as typed data so it can move into a
// headless CMS (Sanity documents map 1:1 to Project) without touching components.

export type Tone = 'green' | 'teal' | 'coral' | 'ink' | 'violet' | 'tan';

export interface Project {
	slug: string;
	title: string;
	kicker: string;
	tone: Tone;
	summary: string;
	hard: string;
	stack: string[];
	link?: { href: string; label: string };
	note?: string;
	featured?: boolean;
}

export const projects: Project[] = [
	{
		slug: 'chat-cms',
		title: 'Chat CMS',
		kicker: 'Brave Lizard Tactical',
		tone: 'green',
		featured: true,
		summary:
			'A range owner types what he wants changed in plain English. A Cloudflare Worker runs a Claude tool loop that turns the request into WordPress REST calls, so he never opens WP admin. It has three tabs: Chat, Activity Log and a recurring Checklist.',
		hard:
			"The model is never the security boundary. Every write goes through a server-side validator (scoped CSS only, no scripts or iframes, embed allowlist), deletes can only go to trash and need an explicit confirmation, and the endpoint list is structural, so pages, posts and media are the only things it can reach. The host's bot wall then blocked the Worker's rotating IPs. I proved it with a matched test (same request, only the source IP differed), routed traffic through a small static-IP proxy, and got that IP allowlisted.",
		stack: ['Cloudflare Workers', 'Anthropic tool use', 'WordPress REST', 'Cloudflare Access', 'Airtable'],
		link: { href: 'https://bravelizard.com', label: 'bravelizard.com' }
	},
	{
		slug: 'clearpoint',
		title: 'Counter-drone marketing site',
		kicker: 'ClearPoint Aero',
		tone: 'ink',
		featured: true,
		summary:
			'A 7-page site for a counter-drone company, built as a small component system: shared header, nav, FAQ, breadcrumb and CTA partials, with JSON-LD generated from the same data as the markup so the two cannot drift.',
		hard:
			"The client's CMS strips every script, so the mega-nav, a five-step process explorer and the mobile menu work with CSS alone, using :has(), native <details> and grid-row animation, with a plain-link fallback. A flex-basis bug bit twice. When a row stacks into a column, flex-basis starts sizing height, which left image wells 0px wide. I checked it with live DOM measurements at 360 to 1440px and made sure every page cleared WCAG AA contrast.",
		stack: ['HTML', 'Modern CSS', 'Python build', 'JSON-LD', 'Cloudflare Pages Functions'],
		note: 'Private client preview behind a server-side password gate. Walkthrough on request.'
	},
	{
		slug: 'seo-pipeline',
		title: 'Multi-agent SEO pipeline',
		kicker: 'SEO Ops',
		tone: 'teal',
		featured: true,
		summary:
			'Five Workers stages: Collector, Analyst, Planner, Verifier and Doer. They pull DataForSEO, PageSpeed (LCP, INP, CLS) and Search Console data, write findings and severity-ranked action items to Airtable, and draft pages that publish only after a human clicks Approve on a dashboard.',
		hard:
			'Keeping it honest. Each action item has to link back to a finding, and the Verifier stage writes a pass or flag verdict with grounding notes before anything reaches the approve queue.',
		stack: ['TypeScript', 'Cloudflare Workers', 'Cloudflare Pages', 'Airtable', 'DataForSEO', 'PageSpeed API', 'GSC'],
		note: 'Internal tool behind SSO.'
	},
	{
		slug: 'ops-tasks',
		title: 'Ops Tasks PWA',
		kicker: 'Personal tool',
		tone: 'green',
		summary:
			'A mobile task app built in Next.js 14 and React. You type a rough idea, an agent turns it into structured tasks, and the app installs to the home screen.',
		hard:
			'Model output is never trusted as state. Replies end in fenced JSON blocks that the client parses, checks field by field against enums and then applies. The API key stays server side behind an edge route, and I got next-on-pages running on Cloudflare after pinning around a version mismatch.',
		stack: ['Next.js 14', 'React 18', 'Edge runtime', 'PWA / service worker', 'Cloudflare Pages']
	},
	{
		slug: 'kalama',
		title: 'Wix to Cloudflare migration',
		kicker: 'Kalama Silvas',
		tone: 'tan',
		summary:
			'Rebuilt a hospitality design and procurement firm’s site as a static build on Cloudflare Pages, moved the domain off Wix with 301s for every old URL, and set up Search Console.',
		hard:
			'After launch, a duplicate preview domain was fully indexed and an iframed brochure gave Google credit to the wrong URL. I found it with URL Inspection, then fixed it with noindex headers, a proper URL for the brochure, and a verified property so the removal would stick.',
		stack: ['Cloudflare Pages', 'Static HTML/CSS', 'Search Console', 'Redirects'],
		link: { href: 'https://kalamasilvas.com', label: 'kalamasilvas.com' }
	},
	{
		slug: 'vault-mcp',
		title: 'Secrets vault + MCP server',
		kicker: 'SEO Ops',
		tone: 'violet',
		summary:
			'An AES-GCM encrypted secrets vault on Workers KV with a remote MCP server in front, so AI tools can fetch a credential without me pasting it into chat.',
		hard:
			'Access is scoped by the password you use at the OAuth consent step. A contractor’s scope only sees secrets tagged for them (default deny, even for direct ID lookups). A new tier is one Worker secret, not a code change, and repeated bad passwords trigger an IP lockout.',
		stack: ['Workers', 'KV', 'OAuth 2.1 / DCR', 'MCP', 'WebCrypto']
	},
	{
		slug: 'inbox',
		title: 'Shared SMS + call inbox',
		kicker: 'Midnight Services',
		tone: 'coral',
		summary:
			'Replaced a CRM’s conversations tab for a hauling company. Threads, web push, delivery status, lead assignment and one timeline of calls and texts, plus a ring chain that tries each person for 10 seconds before a voice screener picks up.',
		hard:
			'It exists to enforce one rule: never contact a lead twice. Whoever answers a call claims the thread without stealing an existing owner, and a banner shows who spoke to the customer and how long ago.',
		stack: ['Workers', 'D1', 'Twilio', 'Web Push', 'ElevenLabs']
	},
	{
		slug: 'crew',
		title: 'Crew agent console',
		kicker: 'The Learner',
		tone: 'ink',
		summary:
			'A self-hosted console for named AI agents that I can DM, pull into group chats, send off on background tasks or schedule on cron.',
		hard:
			'Long jobs survive failures. Each step checkpoints to D1, stale leases get requeued, and the cron pass repairs jobs that a database hiccup dropped. It has zero npm dependencies.',
		stack: ['Workers', 'D1', 'Cron Triggers', 'Anthropic API'],
		link: { href: 'https://crew.plpages.com', label: 'crew.plpages.com (login)' }
	},
	{
		slug: 'outbound',
		title: 'plp-outbound',
		kicker: 'PL Pages',
		tone: 'teal',
		summary:
			'Outbound call dispatch with signed webhooks, calling-window and attempt-limit gating, a concurrency cap, and Airtable sync every 5 minutes.',
		hard:
			'The webhooks use HMAC with replay protection, so a captured request cannot be sent again, and a 40-test Vitest suite covers the gating logic.',
		stack: ['TypeScript', 'Workers', 'D1', 'Vitest']
	},
	{
		slug: 'this-site',
		title: 'This site',
		kicker: 'Portfolio',
		tone: 'coral',
		featured: true,
		summary:
			'SvelteKit on Cloudflare Pages. It has a typed content model, a small component set, a CSS-only 3D cube, and a resume route with a print stylesheet so the PDF comes from the same source.',
		hard:
			'The design takes cues from nexplayground.com, rebuilt from scratch on open-source fonts.',
		stack: ['SvelteKit', 'Svelte 5 runes', 'TypeScript', 'Cloudflare Pages'],
		link: { href: 'https://github.com/brayden-create/portfolio', label: 'Source on GitHub' }
	}
];
