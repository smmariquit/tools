/**
 * Rough-drawn doodle primitives shared by every tool illustration.
 *
 * House style (Notion-doodle): single-color monoline (currentColor), no fills
 * except tiny accents, deliberately imperfect. Geometric perfection is the
 * enemy here, so circles are drawn as slightly over-rotated arcs and most
 * shapes are left a touch open. The shared roughen filter in ToolIllustration
 * adds the final hand-drawn waver.
 *
 * All helpers draw in a 300x190 viewBox space.
 */
import type { ReactNode } from "react";

const n = (v: number) => Math.round(v * 10) / 10;

/** A four-point twinkle (filled). */
export const spark = (x: number, y: number, s = 6, k = "sp"): ReactNode => (
	<path
		key={k}
		d={`M${x} ${y - s}q${n(s * 0.22)} ${n(s * 0.78)} ${s} ${n(s * 0.92)}q${n(-s * 0.78)} ${n(s * 0.16)} ${-s} ${n(s * 0.92)}q${n(-s * 0.22)} ${n(-s * 0.78)} ${-s} ${n(-s * 0.92)}q${n(s * 0.78)} ${n(-s * 0.16)} ${s} ${n(-s * 0.92)}z`}
		fill="currentColor"
		stroke="none"
	/>
);

/** A near-closed hand-drawn circle (over-rotates slightly so the ends cross). */
export const ring = (cx: number, cy: number, r: number, k = "r"): ReactNode => (
	<path key={k} d={`M${cx} ${n(cy - r)}a${r} ${r} 0 1 1 ${n(-r * 0.06)} 0`} />
);

/** A 5-point star outline. */
export const star = (
	cx: number,
	cy: number,
	r: number,
	k = "st",
): ReactNode => {
	let d = "";
	for (let i = 0; i < 10; i++) {
		const a = -Math.PI / 2 + (i * Math.PI) / 5;
		const rr = i % 2 ? r * 0.44 : r;
		d += `${i ? "L" : "M"}${n(cx + rr * Math.cos(a))} ${n(cy + rr * Math.sin(a))}`;
	}
	return <path key={k} d={`${d}z`} />;
};

/** A peso (₱) glyph: stem at (x,y) with given height. */
export const peso = (x: number, y: number, h: number, k = "p"): ReactNode => (
	<g key={k}>
		<path d={`M${x} ${y}v${h}`} />
		<path
			d={`M${x} ${y}h${n(h * 0.42)}a${n(h * 0.26)} ${n(h * 0.26)} 0 0 1 0 ${n(h * 0.52)}h${n(-h * 0.42)}`}
		/>
		<path d={`M${n(x - h * 0.28)} ${n(y + h * 0.34)}h${n(h * 0.78)}`} />
		<path d={`M${n(x - h * 0.28)} ${n(y + h * 0.52)}h${n(h * 0.78)}`} />
	</g>
);

/** A peso coin (ring + glyph), centered at (cx,cy). */
export const coin = (
	cx: number,
	cy: number,
	r: number,
	k = "co",
): ReactNode => (
	<g key={k}>
		{ring(cx, cy, r, `${k}-o`)}
		{peso(n(cx - r * 0.2), n(cy - r * 0.5), n(r * 0.95), `${k}-g`)}
	</g>
);

/** A document/paper with ruled lines. */
export const doc = (
	x: number,
	y: number,
	w: number,
	h: number,
	k = "doc",
): ReactNode => (
	<g key={k}>
		<path d={`M${x} ${y}h${w}v${h}h${-w}z`} />
		<path d={`M${n(x + w * 0.18)} ${n(y + h * 0.24)}h${n(w * 0.64)}`} />
		<path d={`M${n(x + w * 0.18)} ${n(y + h * 0.46)}h${n(w * 0.48)}`} />
		<path d={`M${n(x + w * 0.18)} ${n(y + h * 0.68)}h${n(w * 0.64)}`} />
	</g>
);

/** A simple house (roof overshoots the eaves a touch). */
export const house = (
	x: number,
	y: number,
	w: number,
	h: number,
	k = "ho",
): ReactNode => (
	<g key={k}>
		<path
			d={`M${n(x - 5)} ${n(y + h * 0.34)}L${n(x + w / 2)} ${n(y - 5)}L${n(x + w + 5)} ${n(y + h * 0.34)}`}
		/>
		<path d={`M${x} ${n(y + h * 0.28)}v${n(h * 0.72)}h${w}v${n(-h * 0.72)}`} />
		<path
			d={`M${n(x + w * 0.4)} ${n(y + h)}v${n(-h * 0.36)}h${n(w * 0.2)}v${n(h * 0.36)}`}
		/>
	</g>
);

/** A wall calendar with binding rings. */
export const calendar = (
	x: number,
	y: number,
	w: number,
	h: number,
	k = "cal",
): ReactNode => (
	<g key={k}>
		<path d={`M${x} ${y}h${w}v${h}h${-w}z`} />
		<path d={`M${x} ${n(y + h * 0.28)}h${w}`} />
		<path
			d={`M${n(x + w * 0.28)} ${n(y - 6)}v10M${n(x + w * 0.72)} ${n(y - 6)}v10`}
		/>
	</g>
);

/** An analog clock face with hands. */
export const clock = (
	cx: number,
	cy: number,
	r: number,
	k = "ck",
): ReactNode => (
	<g key={k}>
		{ring(cx, cy, r, `${k}-o`)}
		<path d={`M${cx} ${cy}v${n(-r * 0.55)}`} />
		<path d={`M${cx} ${cy}h${n(r * 0.42)}`} />
	</g>
);

/** A graduation mortarboard, centered horizontally on cx with top at y. */
export const gradCap = (
	cx: number,
	y: number,
	w: number,
	k = "gc",
): ReactNode => (
	<g key={k}>
		<path
			d={`M${cx} ${y}l${w} ${n(w * 0.36)}l${-w} ${n(w * 0.36)}l${-w} ${n(-w * 0.36)}z`}
		/>
		<path
			d={`M${n(cx - w * 0.46)} ${n(y + w * 0.52)}v${n(w * 0.34)}c0 ${n(w * 0.16)} ${n(w * 0.92)} ${n(w * 0.16)} ${n(w * 0.92)} 0v${n(-w * 0.34)}`}
		/>
		<path d={`M${n(cx + w)} ${n(y + w * 0.36)}v${n(w * 0.4)}`} />
		{ring(n(cx + w), n(y + w * 0.82), 2.4, `${k}-t`)}
	</g>
);
