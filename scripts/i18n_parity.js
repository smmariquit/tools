// Reports keys whose tl/ceb value is still identical to English (likely
// untranslated). Acronyms/units that are intentionally identical are expected
// to remain; this is a guide, not a hard gate.
const en = require("../messages/en.json");
const tl = require("../messages/tl.json");
const ceb = require("../messages/ceb.json");

function walk(a, b, p, out) {
	for (const k in a) {
		const np = p ? `${p}.${k}` : k;
		if (a[k] && typeof a[k] === "object") walk(a[k], (b && b[k]) || {}, np, out);
		else if (!(k in (b || {}))) out.missing.push(np);
		else if (String(a[k]) === String((b || {})[k])) out.identical.push(np);
	}
}

for (const [name, t] of [["tl", tl], ["ceb", ceb]]) {
	const out = { missing: [], identical: [] };
	walk(en, t, "", out);
	console.log(`\n=== ${name} ===`);
	console.log("missing:", out.missing.length);
	console.log("identical-to-English:", out.identical.length);
	if (process.argv.includes("--list"))
		console.log(out.identical.join("\n"));
}
