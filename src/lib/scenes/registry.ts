// One animated scene per project. `steps` are the numbered chips in the frame,
// `notes` the caption for each step. Tones are Nex brand panels.
import type { Component } from 'svelte';
import ChatCmsScene from './ChatCmsScene.svelte';
import SeoScene from './SeoScene.svelte';
import CmsForkScene from './CmsForkScene.svelte';
import OpsTasksScene from './OpsTasksScene.svelte';
import KalamaUiScene from './KalamaUiScene.svelte';
import VaultScene from './VaultScene.svelte';
import InboxScene from './InboxScene.svelte';
import CrewScene from './CrewScene.svelte';
import OutboundScene from './OutboundScene.svelte';
import ThisSiteScene from './ThisSiteScene.svelte';

export type Tone = 'green' | 'teal' | 'coral' | 'ink' | 'tan' | 'mist' | 'mint' | 'paper';

export interface SceneDef {
	component: Component<{ step: number }>;
	tone: Tone;
	headline: string;
	steps: string[];
	notes: string[];
}

export const scenes: Record<string, SceneDef> = {
	'chat-cms': {
		component: ChatCmsScene,
		tone: 'green',
		headline: 'One message. One change.',
		steps: ['Ask', 'Tools', 'Validate', 'Log'],
		notes: [
			"John types what he wants changed, in plain English.",
			"The model can only call a short list of tools, and every call shows in the chat.",
			"The real validator checks the new content before WordPress ever sees it.",
			"The site updates, and the change lands in the activity log so it can be undone."
		]
	},
	'clearpoint': {
		component: CmsForkScene,
		tone: 'ink',
		headline: 'Built once. Deployed twice.',
		steps: ['Copy', 'Rebrand', 'Wire', 'Live'],
		notes: [
			"The Brave Lizard CMS pattern gets copied into a new project for ClearPoint Aero.",
			"Same components, new tokens. Most of the new code is the assistant’s instructions for a counter-drone business.",
			"Fresh infrastructure. Nothing shared. Scoped database, capped AI key, proxy, and SSO.",
			"Drafting pages on their site in about half the time the first build took."
		]
	},
	'seo-pipeline': {
		component: SeoScene,
		tone: 'teal',
		headline: 'Find it. Check it. Ship it.',
		steps: ['Collect', 'Plan', 'Verify', 'Publish'],
		notes: [
			"An audit pulls rankings, Core Web Vitals, and Search Console data.",
			"The planner turns findings into ranked tasks that wait for approval.",
			"A verifier checks every task against the finding it came from.",
			"After a person approves, the system publishes the change to WordPress."
		]
	},
	'ops-tasks': {
		component: OpsTasksScene,
		tone: 'coral',
		headline: 'Rough idea in. Real tasks out.',
		steps: ['Dump', 'Parse', 'Check', 'Plan'],
		notes: [
			"I type a messy note on my phone.",
			"The model answers with fenced JSON task blocks.",
			"Every field is checked against allowed values before it touches state.",
			"Clean tasks appear, and the JSON is stripped from the chat."
		]
	},
	'kalama': {
		component: KalamaUiScene,
		tone: 'tan',
		headline: 'Quiet design. Careful motion.',
		steps: ['Hero', 'Menu', 'Scroll', 'Phone'],
		notes: [
			"Hotel projects cross-fade behind the headline with a slow zoom.",
			"A full-screen serif menu groups the site the way a client thinks about the studio.",
			"Words reveal as you scroll, numbers count up once, and client logos drift past.",
			"The portfolio grid reflows from three columns to one on a phone."
		]
	},
	'vault-mcp': {
		component: VaultScene,
		tone: 'mist',
		headline: 'Just the keys it needs.',
		steps: ['Consent', 'Token', 'Scoped', 'Denied'],
		notes: [
			"An AI tool asks to connect. The consent password decides the scope.",
			"The server issues a token for that scope.",
			"Listing secrets only returns the ones tagged for that scope.",
			"Anything untagged is denied, even by exact name. Default deny."
		]
	},
	'inbox': {
		component: InboxScene,
		tone: 'coral',
		headline: 'Never call a lead twice.',
		steps: ['Call', 'Ring', 'Claim', 'Warn'],
		notes: [
			"A customer calls the business line.",
			"Each teammate rings for 10 seconds, then a voice screener picks up.",
			"Whoever answers claims the thread automatically.",
			"Anyone else who opens it sees who already talked to the customer."
		]
	},
	'crew': {
		component: CrewScene,
		tone: 'green',
		headline: 'Long jobs survive.',
		steps: ['Ask', 'Work', 'Recover', 'Report'],
		notes: [
			"I mention an agent with a research task.",
			"Each step checkpoints to the database as it runs.",
			"A worker dies mid-job. The stale lease requeues it from the last checkpoint.",
			"The report posts back to the chat with what it cost."
		]
	},
	'outbound': {
		component: OutboundScene,
		tone: 'teal',
		headline: 'Check first. Then call.',
		steps: ['Verify', 'Replay', 'Gate', 'Test'],
		notes: [
			"The post-call webhook is checked with an HMAC signature.",
			"A replayed request is rejected, and a redelivered one is processed only once.",
			"Before any call, the system checks calling hours, attempt limits, do-not-call status, and whether another call is already running.",
			"40 Vitest tests cover signatures, gating, suppression, and CRM updates."
		]
	},
	'this-site': {
		component: ThisSiteScene,
		tone: 'mint',
		headline: 'Content in. Checks on.',
		steps: ['Edit', 'Caught', 'Build', 'Ship'],
		notes: [
			"Projects live as typed data, not hard-coded markup.",
			"The copy lint finds an unsafe character and stops the build.",
			"Fixed, type-checked, and prerendered to static HTML.",
			"Deployed to Cloudflare Pages."
		]
	}
};
