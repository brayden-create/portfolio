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
	demo?: { href: string; label: string };
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
			'I built this so a range owner could change his website by asking, instead of digging through WordPress. He can update content, see what changed, and keep track of recurring jobs in one place.',
		hard:
			"The model is never the security boundary. Every write goes through a server-side validator (scoped CSS only, no scripts or iframes, embed allowlist), deletes can only go to trash and need an explicit confirmation, and the endpoint list is structural, so pages, posts and media are the only things it can reach. The host's bot wall then blocked the Worker's rotating IPs. I proved it with a matched test (same request, only the source IP differed), routed traffic through a small static-IP proxy, and got that IP allowlisted.",
		stack: ['Cloudflare Workers', 'Anthropic tool use', 'WordPress REST', 'Cloudflare Access', 'Airtable'],
		demo: { href: '/demos/chat-cms/', label: 'Try the demo' },
		link: { href: 'https://bravelizard.com', label: 'Visit bravelizard.com' }
	},
	{
		slug: 'clearpoint',
		title: 'Chat CMS, redeployed',
		kicker: 'ClearPoint Aero',
		tone: 'ink',
		featured: true,
		summary:
			'A second client, a counter-drone company, wanted the same plain-English CMS. I copied the Brave Lizard build, rebranded it, pointed it at their WordPress theme and rewrote the assistant for their business. Kickoff to a deployed CMS took about two days, half the time of the original.',
		hard:
			'Reusing code without sharing anything else. The auth, routing and validator carried over almost untouched, but every piece of infrastructure is new: its own Airtable base with a token scoped to it, a capped Anthropic key, a static-IP proxy for the host firewall and Google SSO for two people. I caught the Airtable token over-scoped during setup, and the other bases now return 403.',
		stack: ['Cloudflare Workers', 'Anthropic tool use', 'WordPress REST (Avada)', 'Railway proxy', 'Cloudflare Access', 'Airtable'],
		note: 'ClearPoint’s CMS sits behind their SSO. The demo runs the same code.',
		demo: { href: '/demos/chat-cms/', label: 'Try the CMS demo' }
	},
	{
		slug: 'seo-pipeline',
		title: 'Multi-agent SEO pipeline',
		kicker: 'SEO Ops',
		tone: 'teal',
		featured: true,
		summary:
			'I wanted one place to see what needed attention across client sites. This collects search and performance data, checks the findings, and drafts changes for a person to review before anything gets published.',
		hard:
			'Keeping it honest. Each action item has to link back to a finding, and the Verifier stage writes a pass or flag verdict with grounding notes before anything reaches the approve queue.',
		stack: ['TypeScript', 'Cloudflare Workers', 'Cloudflare Pages', 'Airtable', 'DataForSEO', 'PageSpeed API', 'GSC'],
		demo: { href: '/demos/seo-ops/', label: 'Try the demo' },
		note: 'Internal tool behind SSO. The demo uses made-up data.'
	},
	{
		slug: 'ops-tasks',
		title: 'Ops Tasks PWA',
		kicker: 'Personal tool',
		tone: 'green',
		summary:
			'I built a small task app for turning a rough idea into a list I can work through. It uses Next.js and React, and installs on a phone like an app.',
		hard:
			'Model output is never trusted as state. Replies end in fenced JSON blocks that the client parses, checks field by field against enums and then applies. The API key stays server side behind an edge route, and I got next-on-pages running on Cloudflare after pinning around a version mismatch.',
		stack: ['Next.js 14', 'React 18', 'Edge runtime', 'PWA / service worker', 'Cloudflare Pages'],
		note: 'Personal app, no public login. Walkthrough on request.'
	},
	{
		slug: 'kalama',
		title: 'Editorial site for a design firm',
		kicker: 'Kalama Silvas',
		tone: 'tan',
		summary:
			'A quiet, editorial site for a hospitality interior design and procurement firm. It has a full-bleed hero that cross-fades between hotel projects, a full-screen serif menu, words and numbers that reveal as you scroll, a client logo marquee and a portfolio that reflows down to a phone.',
		hard:
			'Making motion feel calm. Every reveal runs off an IntersectionObserver, the counters animate once, and the whole thing respects reduced motion. I moved it from Wix to Cloudflare Pages with 301s for every old URL, then found a duplicate preview domain indexed in Search Console and cleaned it up. Next up is performance: the hero serves 3200px photos with no srcset or lazy loading yet.',
		stack: ['HTML', 'CSS animation', 'IntersectionObserver', 'Cloudflare Pages', 'Search Console'],
		link: { href: 'https://kalamasilvas.com', label: 'Visit kalamasilvas.com' }
	},
	{
		slug: 'vault-mcp',
		title: 'Secrets vault + MCP server',
		kicker: 'SEO Ops',
		tone: 'violet',
		summary:
			'I needed a way for my AI tools to use credentials without copying them into conversations. I built an encrypted vault with separate access for contractors.',
		hard:
			'Access is scoped by the password you use at the OAuth consent step. A contractor’s scope only sees secrets tagged for them (default deny, even for direct ID lookups). A new tier is one Worker secret, not a code change, and repeated bad passwords trigger an IP lockout.',
		stack: ['Workers', 'KV', 'OAuth 2.1 / DCR', 'MCP', 'WebCrypto'],
		note: 'Private infrastructure. Code walkthrough on request.'
	},
	{
		slug: 'inbox',
		title: 'Shared SMS + call inbox',
		kicker: 'Midnight Services',
		tone: 'coral',
		summary:
			'I built a shared inbox for a hauling company so calls and texts live together. The team can see who is handling a customer, and incoming calls try each person before going to a voice screener.',
		hard:
			'It exists to enforce one rule: never contact a lead twice. Whoever answers a call claims the thread without stealing an existing owner, and a banner shows who spoke to the customer and how long ago.',
		stack: ['Workers', 'D1', 'Twilio', 'Web Push', 'ElevenLabs'],
		note: 'Client tool behind a login. Walkthrough on request.'
	},
	{
		slug: 'crew',
		title: 'Crew agent console',
		kicker: 'The Learner',
		tone: 'ink',
		summary:
			'This is where I manage the AI agents I use for work. I can message them, bring them into a group conversation, or give them a scheduled job.',
		hard:
			'Long jobs survive failures. Each step checkpoints to D1, stale leases get requeued, and the cron pass repairs jobs that a database hiccup dropped. It has zero npm dependencies.',
		stack: ['Workers', 'D1', 'Cron Triggers', 'Anthropic API'],
		link: { href: 'https://crew.plpages.com', label: 'Open Crew (login)' }
	},
	{
		slug: 'outbound',
		title: 'plp-outbound',
		kicker: 'PL Pages',
		tone: 'teal',
		summary:
			'I built the service that decides when an outbound call can happen. It checks calling hours, attempt limits and how many calls are already running, then keeps Airtable up to date.',
		hard:
			'The post-call webhook is HMAC-signed. Stale timestamps are rejected as replays and redeliveries are processed once. A 40-test Vitest suite covers signatures, dispatch gating, do-not-call suppression and CRM updates.',
		stack: ['JavaScript', 'Workers', 'D1', 'ElevenLabs', 'Vitest'],
		note: 'Backend service with no public UI. Code walkthrough on request.'
	},
	{
		slug: 'this-site',
		title: 'This site',
		kicker: 'Portfolio',
		tone: 'coral',
		featured: true,
		summary:
			'I built this portfolio in SvelteKit for the Nex application. I liked the movement and color on their site, and wanted to try that approach with my own work. The resume has its own print layout.',
		hard:
			'The design takes cues from nexplayground.com, rebuilt from scratch on open-source fonts.',
		stack: ['SvelteKit', 'Svelte 5 runes', 'TypeScript', 'Cloudflare Pages'],
		link: { href: 'https://github.com/brayden-create/portfolio', label: 'Source on GitHub' }
	}
];
