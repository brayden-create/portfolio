// Scripted scenarios for the chat CMS demo. Replies are pre-written, but any
// content a scenario "writes" is passed through the real production validator
// before the demo lets it land, exactly like the live Worker.

export type Effect =
	| { kind: 'hours'; value: string }
	| { kind: 'addDraft'; title: string }
	| { kind: 'trash'; title: string }
	| { kind: 'task'; title: string; due: string; owner: string };

export interface Scenario {
	key: string;
	chip: string;
	match: RegExp;
	/** Tool calls shown in the transcript before the write */
	tools: string[];
	/** HTML the model "produced". Runs through validateContent() for real. */
	content?: string;
	/** Requires an explicit yes before the write */
	confirm?: { question: string; target: string };
	effect?: Effect;
	log?: { action: string; target: string };
	reply: string;
	blockedReply?: string;
}

const hoursFragment = `<style>
#blt-v1 .hours{display:grid;gap:6px;font:500 16px 'Work Sans',sans-serif}
#blt-v1 .hours b{font-family:'Oswald',sans-serif;letter-spacing:.08em}
</style>
<div id="blt-v1"><section class="hours">
<b>RANGE HOURS</b>
<span>Thursday to Friday: 12pm to sunset</span>
<span>Saturday: 9am to 5pm</span>
<span>Sunday: closed</span>
</section></div>`;

const clinicFragment = `<style>
#blt-v1 .clinic{padding:32px;background:#16150f;color:#e8e4da}
#blt-v1 .clinic h1{font-family:'Oswald',sans-serif;letter-spacing:.06em}
</style>
<div id="blt-v1"><section class="clinic">
<h1>BEGINNER PISTOL CLINIC · OCT 18</h1>
<p>Four hours, eye and ear protection provided, loaner pistols available.</p>
<a href="https://www.tickettailor.com/events/bravelizard">Get tickets</a>
</section></div>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"Beginner Pistol Clinic","startDate":"2026-10-18T08:00:00-06:00","eventStatus":"https://schema.org/EventScheduled","location":{"@type":"Place","name":"FOB Gunslinger"}}</script>`;

const timerFragment = `<style>#blt-v1 .cd{font:700 32px 'Oswald',sans-serif}</style>
<div id="blt-v1">
<div class="cd" id="cd"></div>
<img src="https://cdn.fancy-timers.io/flame.gif" alt="">
<script>setInterval(() => { cd.textContent = new Date().toLocaleTimeString() }, 1000)</script>
</div>`;

export const scenarios: Scenario[] = [
	{
		key: 'hours',
		chip: 'Change Saturday hours to 9am to 5pm',
		match: /hour|saturday|open|close/i,
		tools: ['list_pages {search: "home"}', 'get_page {id: 49544}', 'update_page {id: 49544, section: "hours"}'],
		content: hoursFragment,
		effect: { kind: 'hours', value: '9am to 5pm' },
		log: { action: 'update_page', target: 'Home · hours block' },
		reply:
			'Done. Saturday now reads 9am to 5pm on the home page. The change passed the content check and it’s in the Activity Log if you need to undo it.'
	},
	{
		key: 'clinic',
		chip: 'Draft a page for the Oct 18 beginner pistol clinic',
		match: /clinic|draft|event|class|page for/i,
		tools: [
			'get_tickettailor_events {from: "2026-10-01"}',
			'create_page {title: "Beginner Pistol Clinic · Oct 18", status: "draft"}',
			'set_seo {title: "Beginner Pistol Clinic in Beryl, UT | Brave Lizard"}'
		],
		content: clinicFragment,
		effect: { kind: 'addDraft', title: 'Beginner Pistol Clinic · Oct 18' },
		log: { action: 'create_page', target: 'Beginner Pistol Clinic · Oct 18 (draft)' },
		reply:
			'I pulled the date and ticket link from TicketTailor and saved a draft page with Event schema so Google can show it as an event. It’s a draft, so nothing is public until you hit publish.'
	},
	{
		key: 'timer',
		chip: 'Add a live countdown timer script to the homepage',
		match: /script|timer|countdown|javascript|widget/i,
		tools: ['get_page {id: 49544}', 'update_page {id: 49544, section: "countdown"}'],
		content: timerFragment,
		log: { action: 'update_page', target: 'Home · BLOCKED by validator' },
		reply: '',
		blockedReply:
			'I can’t add that. The site only accepts content without scripts or outside images, so the write was stopped before it reached WordPress. I can build a countdown section that shows the event date instead, with no script needed.'
	},
	{
		key: 'delete',
		chip: 'Delete the old Summer League 2025 page',
		match: /delete|remove|trash|summer/i,
		tools: ['list_pages {search: "summer league"}'],
		confirm: {
			question: 'I found “Summer League 2025” (published). Deleting moves it to the trash, where it can be restored. Want me to go ahead?',
			target: 'Summer League 2025'
		},
		effect: { kind: 'trash', title: 'Summer League 2025' },
		log: { action: 'delete_page', target: 'Summer League 2025 → trash' },
		reply: 'Moved “Summer League 2025” to the trash. It can be restored from WordPress any time.'
	},
	{
		key: 'task',
		chip: 'Remind John to update the range rules PDF by Friday',
		match: /remind|task|todo|checklist|pdf/i,
		tools: ['add_checklist_task {title: "Update range rules PDF", due: "Fri", owner: "John"}'],
		effect: { kind: 'task', title: 'Update range rules PDF', due: 'Fri', owner: 'John' },
		log: { action: 'add_checklist_task', target: 'Update range rules PDF' },
		reply: 'Added to the Tasks tab for John, due Friday.'
	}
];
