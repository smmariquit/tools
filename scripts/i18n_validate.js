// Validates that every t("literal") call in tool client components resolves to
// a key present in messages/en.json, based on the file's useTranslations(NS).
// Only checks string-literal keys (skips dynamic/template keys). Reports misses.
const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
const en = JSON.parse(
	fs.readFileSync(path.join(root, "messages", "en.json"), "utf8"),
);

function has(p) {
	return p.split(".").reduce((a, k) => (a && k in a ? a[k] : undefined), en) !== undefined;
}

const files = cp
	.execSync(
		"git ls-files 'src/app/[locale]/**/Client.tsx' 'src/app/[locale]/**/*Client.tsx'",
		{ cwd: root },
	)
	.toString()
	.split("\n")
	.filter(Boolean);

let problems = 0;
for (const rel of files) {
	const src = fs.readFileSync(path.join(root, rel), "utf8");
	const nsMatches = [...src.matchAll(/useTranslations\(\s*["'`]([^"'`]+)["'`]\s*\)/g)].map((m) => m[1]);
	if (nsMatches.length === 0) continue;
	const ns = nsMatches[0]; // primary namespace
	const keys = [...src.matchAll(/\bt\(\s*["']([^"']+)["']/g)].map((m) => m[1]);
	for (const k of keys) {
		if (!has(`${ns}.${k}`)) {
			console.log(`MISSING  ${rel}  ->  ${ns}.${k}`);
			problems++;
		}
	}
}
console.log(problems === 0 ? "OK: all literal t() keys resolve in en.json" : `\n${problems} missing key(s)`);
process.exit(problems === 0 ? 0 : 1);
