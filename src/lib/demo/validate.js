// @ts-nocheck
// scrub:ignore-file
// VERBATIM copy of the production validator from the Brave Lizard chat CMS Worker
// (chat-cms/src/validate.js). The demo runs this exact code in the browser.

/**
 * Content validation gate. Runs server-side on EVERY page/post write,
 * regardless of what the model produced or was talked into producing.
 * If validation fails, the write never happens.
 *
 * Our coded pages are self-contained fragments:
 *   <style> …all selectors scoped to #blt-v1… </style><div id="blt-v1">…</div>
 * wrapped in a wp:html block. The theme can't bleed in; our CSS can't leak out.
 */

const EMBED_ALLOWLIST = [
  "bravelizard.com",
  "www.bravelizard.com",
  "events.bravelizard.com",
  "tickettailor.com",
  "www.tickettailor.com",
  "buytickets.at", // TicketTailor short domain
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "brave-lizard-preview.pages.dev", // image CDN until media migrates to wp-content
];

function hostAllowed(url) {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return EMBED_ALLOWLIST.some((d) => h === d || h.endsWith("." + d));
  } catch {
    return false;
  }
}

/**
 * @param {string} content - the full page/post content about to be written
 * @returns {{ok: boolean, errors: string[]}}
 */
export function validateContent(content) {
  const errors = [];
  if (typeof content !== "string" || !content.trim()) {
    return { ok: false, errors: ["empty content"] };
  }

  // --- scripts: block everything EXCEPT inert <script type="application/ld+json"> (schema) ---
  // A <script> element is only terminated by </script>, so a JSON-LD block whose body
  // is valid JSON and contains no </script> cannot break out or execute — it is pure data.
  const pairRe = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let sm;
  let scriptResidue = content;
  const badScripts = [];
  while ((sm = pairRe.exec(content)) !== null) {
    const attrs = sm[1] || "";
    const body = sm[2] || "";
    const isLdType = /type\s*=\s*["']?\s*application\/ld\+json\s*["']?/i.test(attrs);
    const hasSrc = /\bsrc\s*=/i.test(attrs);
    let ok = false;
    if (isLdType && !hasSrc && !/<\s*\/\s*script/i.test(body)) {
      try { JSON.parse(body.trim()); ok = true; } catch { ok = false; }
    }
    if (ok) scriptResidue = scriptResidue.replace(sm[0], "");
    else badScripts.push((attrs.trim() || "(no attrs)").slice(0, 60));
  }
  if (badScripts.length) errors.push(`only inert <script type="application/ld+json"> schema is allowed; rejected: ${badScripts.join("; ").slice(0, 140)}`);
  // catch any stray/unclosed/src-only <script that the paired regex didn't consume
  if (/<script\b/i.test(scriptResidue)) errors.push("malformed or non-JSON-LD <script> tag");
  if (/<iframe\b|<object\b|<embed\b|<applet\b/i.test(content)) errors.push("iframe/object/embed not allowed");
  if (/<link\b/i.test(content)) errors.push("<link> not allowed (use @import for Google Fonts inside <style>)");
  if (/<meta\b/i.test(content)) errors.push("<meta> not allowed in content");
  if (/<form\b/i.test(content)) errors.push("raw <form> not allowed (use the Forminator shortcode)");
  if (/\bjavascript\s*:/i.test(content)) errors.push("javascript: URLs not allowed");
  if (/\bdata\s*:\s*text\/html/i.test(content)) errors.push("data:text/html URLs not allowed");
  if (/srcdoc\s*=/i.test(content)) errors.push("srcdoc not allowed");

  // inline event handlers (onclick=, onload=, …) inside tags
  const tagMatches = content.match(/<[a-zA-Z][^>]*>/g) || [];
  for (const tag of tagMatches) {
    if (/\son[a-z]+\s*=/i.test(tag)) {
      errors.push(`inline event handler found: ${tag.slice(0, 80)}`);
      break;
    }
  }

  // --- external references must be on the allowlist ---
  const urlAttrRe = /(?:src|href|poster)\s*=\s*["']?(https?:\/\/[^"'\s>]+)/gi;
  let m;
  while ((m = urlAttrRe.exec(content)) !== null) {
    if (!hostAllowed(m[1])) errors.push(`external URL not on allowlist: ${m[1].slice(0, 100)}`);
  }

  // --- CSS rules ---
  const styleBlocks = [...content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((x) => x[1]);
  const css = styleBlocks.join("\n");
  if (css) {
    const importRe = /@import\s+(?:url\()?["']?(https?:\/\/[^"')\s;]+)/gi;
    while ((m = importRe.exec(css)) !== null) {
      if (!hostAllowed(m[1])) errors.push(`@import not on allowlist: ${m[1].slice(0, 100)}`);
    }
    const urlRe = /url\(\s*["']?(https?:\/\/[^"')\s]+)/gi;
    while ((m = urlRe.exec(css)) !== null) {
      if (!hostAllowed(m[1])) errors.push(`css url() not on allowlist: ${m[1].slice(0, 100)}`);
    }
    // scoping heuristic: no bare html/body/:root selectors — everything under #blt-v1
    if (/(^|})\s*(html|body|:root)\s*[,{[]/i.test(css)) {
      errors.push("CSS contains unscoped html/body/:root selectors — all selectors must live under #blt-v1");
    }
  }

  // --- coded-page structural check ---
  // If the fragment carries a <style>, it must also carry the #blt-v1 container.
  if (styleBlocks.length > 0 && !/id\s*=\s*["']blt-v1["']/.test(content)) {
    errors.push("styled content must be wrapped in <div id=\"blt-v1\"> (coded-page convention)");
  }

  return { ok: errors.length === 0, errors };
}
