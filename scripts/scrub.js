// Copy lint: fails the build on em/en dashes and stock AI phrasing in any source file.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const banned = [/—/, /–/, /\bdelve\b/i, /\bseamless(ly)?\b/i, /\bleverag(e|ing)\b/i, /\bgame[- ]changer\b/i, /\bunlock\b/i, /\belevate\b/i];
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
let hits = 0;
for (const file of walk('src')) {
	const text = readFileSync(file, 'utf8');
	if (text.includes('scrub:ignore-file')) continue; // verbatim third-party/production copies
	text.split('\n').forEach((line, i) => {
		for (const re of banned) if (re.test(line)) { hits++; console.error(`${file}:${i + 1} ${re} :: ${line.trim().slice(0, 90)}`); }
	});
}
if (hits) { console.error(`copy lint: ${hits} hit(s)`); process.exit(1); }
console.log('copy lint: clean');
