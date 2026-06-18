import { ImageResponse } from "next/og";
import type { ReactNode } from "react";
import { doodles } from "../../components/illustrations/doodles";

export const runtime = "edge";

const DOODLE_STROKE = "#66b2ff";

const SVG_ATTR: Record<string, string> = {
	strokeWidth: "stroke-width",
	strokeLinecap: "stroke-linecap",
	strokeLinejoin: "stroke-linejoin",
	strokeDasharray: "stroke-dasharray",
	fillOpacity: "fill-opacity",
	strokeOpacity: "stroke-opacity",
};

// Minimal React-element → SVG-string serializer. The doodles only use <g>/<path>
// (plus fragments/arrays), so a tiny walker avoids react-dom/server (banned in
// the app router) and Satori's flaky inline-SVG handling.
function serialize(node: ReactNode): string {
	if (node == null || typeof node === "boolean") return "";
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(serialize).join("");

	const el = node as { type?: unknown; props?: Record<string, unknown> };
	const props = el.props ?? {};
	const childrenStr = serialize(props.children as ReactNode);
	if (typeof el.type !== "string") return childrenStr; // Fragment/component

	let attrs = "";
	for (const [k, v] of Object.entries(props)) {
		if (k === "children" || k === "key" || v == null || v === false) continue;
		const name = SVG_ATTR[k] ?? k;
		attrs += ` ${name}="${String(v).replace(/"/g, "&quot;")}"`;
	}
	return `<${el.type}${attrs}>${childrenStr}</${el.type}>`;
}

/** Build an SVG data URI for a tool's doodle, or null if there's no doodle. */
function doodleDataUri(toolSlug: string | null): string | null {
	if (!toolSlug) return null;
	const doodle = doodles[`/${toolSlug.replace(/^\//, "")}`];
	if (!doodle) return null;
	const inner = serialize(doodle).replace(/currentColor/g, DOODLE_STROKE);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 190" width="300" height="190" fill="none" stroke="${DOODLE_STROKE}" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const title =
			searchParams.get("title")?.slice(0, 100) || "PHTools Calculator";
		const desc =
			searchParams.get("desc")?.slice(0, 160) ||
			"Free online calculators and tools for the Philippines.";
		const doodleUri = doodleDataUri(searchParams.get("tool"));

		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					backgroundColor: "#121212",
					padding: "56px 72px",
					fontFamily: "sans-serif",
				}}
			>
				{/* 1. Visual — the tool's hand-drawn SVG (or wordmark fallback) */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: 256,
						transform: "rotate(-1.6deg)",
					}}
				>
					{doodleUri ? (
						// biome-ignore lint/performance/noImgElement: OG (Satori) image, not the DOM
						<img src={doodleUri} width={404} height={256} alt="" />
					) : (
						<div
							style={{
								display: "flex",
								fontSize: 96,
								fontWeight: 800,
								color: DOODLE_STROKE,
								letterSpacing: "-0.03em",
							}}
						>
							PHTools
						</div>
					)}
				</div>

				{/* 2. Tool info — title + description */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flex: 1,
						justifyContent: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							fontSize: 58,
							fontWeight: 800,
							color: "#ffffff",
							lineHeight: 1.12,
							letterSpacing: "-0.02em",
							marginBottom: 18,
						}}
					>
						{title}
					</div>
					<div
						style={{
							display: "flex",
							fontSize: 29,
							color: "#c4c7c5",
							lineHeight: 1.4,
							maxWidth: "92%",
						}}
					>
						{desc}
					</div>
				</div>

				{/* 3. Site info — brand strip */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						paddingTop: 28,
						borderTop: "2px solid #2a2d31",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: 44,
							height: 44,
							borderRadius: 10,
							backgroundColor: "#0d47a1",
							color: "#ffffff",
							fontSize: 26,
							fontWeight: 800,
						}}
					>
						₱
					</div>
					<div
						style={{
							display: "flex",
							fontSize: 30,
							fontWeight: 700,
							color: "#e2e8f0",
							letterSpacing: "-0.01em",
						}}
					>
						PHTools.me
					</div>
					<div
						style={{
							display: "flex",
							fontSize: 24,
							color: "#9aa0a6",
							marginLeft: 8,
						}}
					>
						Free, accurate calculators & tools for the Philippines
					</div>
				</div>
			</div>,
			{ width: 1200, height: 630 },
		);
	} catch {
		return new Response("Failed to generate the image", { status: 500 });
	}
}
