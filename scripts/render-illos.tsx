import fs from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { doodles } from "../src/app/components/illustrations/doodles";

const filter = `<defs><filter id="wob" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="4.4" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;

const out = "/tmp/illos";
fs.mkdirSync(out, { recursive: true });

const names: string[] = [];
for (const [key, node] of Object.entries(doodles)) {
	// biome-ignore lint/suspicious/noExplicitAny: rendering arbitrary ReactNode
	const inner = renderToStaticMarkup(node as any);
	const name = key.replace(/\//g, "") || "root";
	names.push(name);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 190" width="300" height="190" color="#2b2b2b">${filter}<g filter="url(#wob)" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
	fs.writeFileSync(`${out}/${name}.svg`, svg);
}
fs.writeFileSync(`${out}/_names.txt`, names.join("\n"));
console.log("wrote", names.length, "doodles");
