// Phase 2 merge: applies new-key patches into messages/en.json, tl.json, ceb.json.
// Patches live in research/i18n2/<lang>/*.json (nested namespace->key->value).
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const langs = ["en", "tl", "ceb"];

function deepMerge(target, source) {
	for (const key of Object.keys(source)) {
		const sv = source[key];
		if (sv && typeof sv === "object" && !Array.isArray(sv)) {
			if (!target[key] || typeof target[key] !== "object") target[key] = {};
			deepMerge(target[key], sv);
		} else {
			target[key] = sv;
		}
	}
	return target;
}

for (const lang of langs) {
	const dir = path.join(root, "research", "i18n2", lang);
	if (!fs.existsSync(dir)) {
		console.log(`(skip) no patch dir for ${lang}`);
		continue;
	}
	const targetPath = path.join(root, "messages", `${lang}.json`);
	const target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
	for (const f of files)
		deepMerge(target, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
	fs.writeFileSync(targetPath, `${JSON.stringify(target, null, 2)}\n`);
	console.log(`${lang}: merged ${files.length} patch file(s)`);
}
