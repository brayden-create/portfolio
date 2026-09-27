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
		title: "Plain-English CMS",
		kicker: "Brave Lizard Tactical",
		tone: 'green',
		featured: true,
		summary: "I built this so a range owner could update his website by asking for changes in plain English instead of digging through WordPress. He can update content, see what changed, and track recurring jobs in one place.",
		hard: "The model is never the security boundary. Every write goes through a server-side validator: scoped CSS only, no scripts or iframes, and a strict embed allowlist. Deletes go to trash and require explicit confirmation. The endpoint list is structural, so the assistant can only reach pages, posts, and media.\n\nWhen the host’s bot wall blocked the Worker’s rotating IPs, I proved the issue with a matched test where only the source IP changed. Then I routed traffic through a small static-IP proxy and got that IP allowlisted.",
		stack: ["Cloudflare Workers", "Anthropic tool use", "WordPress REST", "Cloudflare Access", "Airtable"],
		demo: { href: '/demos/chat-cms/', label: 'Try the demo' },
		link: { href: 'https://bravelizard.com', label: 'Visit bravelizard.com' }
	},
	{
		slug: 'clearpoint',
		title: "CMS redeploy",
		kicker: "ClearPoint Aero",
		tone: 'ink',
		featured: true,
		summary: "A second client, a counter-drone company, wanted the same plain-English CMS. I reused the Brave Lizard pattern, rebranded it, pointed it at their WordPress theme, and rewrote the assistant for their business. Kickoff to deployed CMS took about two days, roughly half the time of the original.\n\nI also rebuilt their seven-page site. The navigation, mobile menu, and process explorer run on CSS alone because the CMS strips every script.",
		hard: "The code was reusable. The infrastructure was not shared. ClearPoint has its own Airtable base, scoped token, capped Anthropic key, static-IP proxy, and Google SSO for two users.\n\nDuring setup, I caught an over-scoped Airtable token and fixed it. Other bases now return 403.",
		stack: ["Cloudflare Workers", "Anthropic tool use", "WordPress REST", "Railway proxy", "Cloudflare Access", "Airtable"],
		note: "ClearPoint’s CMS sits behind SSO. The demo runs the same code.",
		demo: { href: '/demos/chat-cms/', label: 'Try the CMS demo' }
	},
	{
		slug: 'seo-pipeline',
		title: "Multi-agent SEO pipeline",
		kicker: "SEO workflow",
		tone: 'teal',
		featured: true,
		summary: "I wanted one place to see what needed attention across client sites. This system collects search and performance data, checks the findings, and drafts changes for a person to review before anything gets published.",
		hard: "Every action item has to link back to a finding. A verifier writes a pass or flag verdict with grounding notes before anything reaches the approval queue.",
		stack: ["TypeScript", "Cloudflare Workers", "Cloudflare Pages", "Airtable", "DataForSEO", "PageSpeed API", "Google Search Console"],
		demo: { href: '/demos/seo-ops/', label: 'Try the demo' }
	},
	{
		slug: 'ops-tasks',
		title: "Ops Tasks PWA",
		kicker: "Personal tool",
		tone: 'green',
		summary: "I built a small task app for turning a rough idea into a list I can work through. It uses Next.js and React, and installs on a phone like an app.",
		hard: "Model output is never trusted as state. Replies end in fenced JSON blocks. The client parses the JSON, checks every field against allowed values, and only then applies the changes.\n\nThe API key stays server side behind an edge route. I also got next-on-pages running on Cloudflare after pinning around a version mismatch.",
		stack: ["Next.js 14", "React 18", "Edge runtime", "PWA", "service worker", "Cloudflare Pages"]
	},
	{
		slug: 'kalama',
		title: "Editorial site for a design firm",
		kicker: "Kalama Silvas",
		tone: 'tan',
		summary: "A quiet editorial site for a hospitality interior design and procurement firm. It has a full-bleed hero, hotel project cross-fades, a full-screen serif menu, scroll reveals, animated numbers, a client logo marquee, and a portfolio that reflows down to a phone.",
		hard: "The motion needed to feel calm. Reveals run off an IntersectionObserver. Counters animate once. The site respects reduced motion.\n\nI moved it from Wix to Cloudflare Pages with 301s for every old URL. Then I found a duplicate preview domain indexed in Search Console and cleaned it up.\n\nNext up is performance. The hero still serves large photos without srcset or lazy loading.",
		stack: ["HTML", "CSS animation", "IntersectionObserver", "Cloudflare Pages", "Search Console"],
		link: { href: 'https://kalamasilvas.com', label: 'Visit kalamasilvas.com' }
	},
	{
		slug: 'vault-mcp',
		title: "Secrets vault and MCP server",
		kicker: "Credential access",
		tone: 'violet',
		summary: "I needed a way for AI tools to use credentials without copying secrets into conversations. I built an encrypted vault with scoped contractor access.",
		hard: "Access is scoped by the password used at OAuth consent. A contractor scope only sees secrets tagged for that scope. Untagged secrets are denied by default, even for direct ID lookups.\n\nA new access tier is one Worker secret, not a code change. Repeated bad passwords trigger an IP lockout.",
		stack: ["Cloudflare Workers", "KV", "OAuth 2.1", "DCR", "MCP", "WebCrypto"]
	},
	{
		slug: 'inbox',
		title: "Shared SMS and call inbox",
		kicker: "Midnight Services",
		tone: 'coral',
		summary: "I built a shared inbox for a hauling company so calls and texts live together. The team can see who is handling each customer, and incoming calls try each person before going to a voice screener.",
		hard: "The system exists to enforce one rule: never contact a lead twice. Whoever answers a call claims the thread without stealing an existing owner. Anyone else who opens it sees who spoke to the customer and how long ago.",
		stack: ["Cloudflare Workers", "D1", "Twilio", "Web Push", "ElevenLabs"]
	},
	{
		slug: 'crew',
		title: "Crew console",
		kicker: "Agent operations",
		tone: 'ink',
		summary: "This is where I manage the AI agents I use for work. I can message them, bring them into a group conversation, or give them a scheduled job.",
		hard: "Long jobs survive failures. Each step checkpoints to D1. Stale leases get requeued. A cron pass repairs jobs dropped by a database hiccup.\n\nIt has zero npm dependencies.",
		stack: ["Cloudflare Workers", "D1", "Cron Triggers", "Anthropic API"],
		link: { href: 'https://crew.plpages.com', label: 'Open Crew (login)' }
	},
	{
		slug: 'outbound',
		title: "Outbound call gate",
		kicker: "Call operations",
		tone: 'teal',
		summary: "I built the service that decides when an outbound call can happen. It checks calling hours, attempt limits, do-not-call status, and how many calls are already running. Then it keeps Airtable up to date.",
		hard: "The post-call webhook is HMAC-signed. Stale timestamps are rejected as replays. Redeliveries are processed once.\n\nA 40-test Vitest suite covers signatures, dispatch gating, do-not-call suppression, and CRM updates.",
		stack: ["JavaScript", "Cloudflare Workers", "D1", "ElevenLabs", "Vitest"]
	},
	{
		slug: 'this-site',
		title: "This site",
		kicker: "Portfolio",
		tone: 'coral',
		featured: true,
		summary: "I built this portfolio in SvelteKit for the Nex application. I liked the movement and color on nexplayground.com and wanted to try that kind of energy with my own work. The resume also has its own print layout.",
		hard: "Projects live as typed data, not hard-coded markup. The build checks for unsafe copy, type-checks the data, prerenders the site to static HTML, and deploys to Cloudflare Pages.",
		stack: ["SvelteKit", "Svelte 5 runes", "TypeScript", "Cloudflare Pages"],
		link: { href: 'https://github.com/brayden-create/portfolio', label: 'Source on GitHub' }
	}
];
