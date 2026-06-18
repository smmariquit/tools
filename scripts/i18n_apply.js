// Merges translation patch files into messages/<lang>.json.
// Patches live in research/i18n/<lang>/*.json and contain partial message
// trees (same key structure as en.json) with translated leaf values.
// Deep-merges leaves (patch overwrites), preserving keys/placeholders.
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const langs = ["tl", "ceb"];

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
	const dir = path.join(root, "research", "i18n", lang);
	if (!fs.existsSync(dir)) {
		console.log(`(skip) no patch dir for ${lang}`);
		continue;
	}
	const targetPath = path.join(root, "messages", `${lang}.json`);
	const target = JSON.parse(fs.readFileSync(targetPath, "utf8"));
	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
	let applied = 0;
	for (const f of files) {
		const patch = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
		deepMerge(target, patch);
		applied++;
	}
	fs.writeFileSync(targetPath, `${JSON.stringify(target, null, 2)}\n`);
	console.log(`${lang}: applied ${applied} patch file(s) -> ${targetPath}`);
}
