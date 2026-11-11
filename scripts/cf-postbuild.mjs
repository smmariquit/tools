// Runs after `next build` (output: "export") to finish the static site for
// Cloudflare Workers static assets:
// 1. Prerender every /api/og?... image referenced by the exported pages to
//    out/og/<hash>.png and rewrite the references (no runtime OG rendering).
// 2. Append /<route> -> /en/<route> redirects (what the next-intl middleware did
//    for unprefixed paths).
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, appendFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { runnerImport } from "vite";

const OUT = path.resolve("out");

async function walk(dir) {
	const files = [];
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) files.push(...(await walk(p)));
		else if (/\.(html|txt)$/.test(e.name)) files.push(p);
	}
	return files;
}

// 1. OG images
const { module: og } = await runnerImport(path.resolve("src/lib/ogImage.tsx"));
const OG_RE = /\/api\/og\?[^"'\s<>\\]+/g;
const rendered = new Map(); // normalized query -> /og/<hash>.png
await mkdir(path.join(OUT, "og"), { recursive: true });

for (const file of await walk(OUT)) {
	const src = await readFile(file, "utf8");
	const matches = [...new Set(src.match(OG_RE) ?? [])];
	if (!matches.length) continue;
	let out = src;
	for (const m of matches) {
		const query = m.slice("/api/og?".length).replaceAll("&amp;", "&");
		let url = rendered.get(query);
		if (!url) {
			const hash = createHash("sha1").update(query).digest("hex").slice(0, 16);
			url = `/og/${hash}.png`;
			const res = og.renderOg(new URLSearchParams(query));
			if (!res.ok) throw new Error(`OG render failed for ${query}`);
			await writeFile(path.join(OUT, url), Buffer.from(await res.arrayBuffer()));
			rendered.set(query, url);
		}
		out = out.replaceAll(m, url);
	}
	await writeFile(file, out);
}
console.log(`cf-postbuild: ${rendered.size} OG images`);

// 2. Unprefixed routes -> /en (static rules; _redirects caps dynamic ones at 100)
const lines = [];
for (const e of await readdir(path.join(OUT, "en"), { withFileTypes: true })) {
	const name = e.name.replace(/\.(html|txt)$/, "");
	if (name.startsWith("_") || name.startsWith(".")) continue;
	if (e.name.endsWith(".html")) lines.push(`/${name} /en/${name} 308`);
	// Splat only for routes with nested pages (blog posts, categories, zonal):
	// every route has a dir of RSC segment files, but only these need it.
	else if (
		e.isDirectory() &&
		(await walk(path.join(OUT, "en", name))).some((f) => f.endsWith(".html"))
	)
		lines.push(`/${name}/* /en/${name}/:splat 308`);
}
await appendFile(path.join(OUT, "_redirects"), `${[...new Set(lines)].join("\n")}\n`);
console.log(`cf-postbuild: ${lines.length} locale redirects`);
