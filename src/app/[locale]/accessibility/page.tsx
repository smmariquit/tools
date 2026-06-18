import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Accessibility Statement | PHTools",
	description:
		"Our commitment to making PHTools accessible to everyone, including those relying on keyboard navigation and screen readers.",
};

/**
 * A wobbly, hand-drawn "crayon" SVG. The feTurbulence + displacement gives the
 * waxy, imperfect line; the slight rotation makes each scene feel hand-placed.
 * Decorative only — every scene is aria-hidden, text carries the real meaning.
 */
function Crayon({
	children,
	color,
	idx,
	w = 148,
	h = 116,
	vb = "0 0 140 110",
}: {
	children: ReactNode;
	color: string;
	idx: number;
	w?: number;
	h?: number;
	vb?: string;
}) {
	const fid = `crayon-${idx}`;
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: decorative, aria-hidden
		<svg
			viewBox={vb}
			width={w}
			height={h}
			aria-hidden="true"
			focusable="false"
			style={{ overflow: "visible", flexShrink: 0 }}
		>
			<defs>
				<filter id={fid} x="-25%" y="-25%" width="150%" height="150%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.04"
						numOctaves={3}
						seed={idx * 7 + 3}
						result="n"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="n"
						scale={4.5}
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</defs>
			<g
				filter={`url(#${fid})`}
				transform="rotate(-2 70 55)"
				fill="none"
				stroke={color}
				strokeWidth={4}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{children}
			</g>
		</svg>
	);
}

const C_BLUE = "#3b82f6";
const C_VIOLET = "#8b5cf6";
const C_GREEN = "#22a06b";
const C_PINK = "#ec5f7a";

/** A little stick person of variable height — used for the "everyone" scene. */
function Person({ cx, cy, r }: { cx: number; cy: number; r: number }) {
	const shoulder = cy + r + 5;
	const hip = cy + r + 24;
	return (
		<>
			<circle cx={cx} cy={cy} r={r} />
			<line x1={cx} y1={cy + r} x2={cx} y2={hip} />
			<line x1={cx} y1={shoulder} x2={cx - 13} y2={shoulder + 11} />
			<line x1={cx} y1={shoulder} x2={cx + 13} y2={shoulder + 11} />
			<line x1={cx} y1={hip} x2={cx - 11} y2={hip + 17} />
			<line x1={cx} y1={hip} x2={cx + 11} y2={hip + 17} />
		</>
	);
}

const cardStyle = {
	display: "flex",
	flexDirection: "column" as const,
	alignItems: "center",
	textAlign: "center" as const,
	gap: "8px",
	flex: "1 1 200px",
	minWidth: "200px",
	padding: "16px",
	borderRadius: "12px",
	border: "1px dashed var(--border, #d0d7de)",
};

export default function AccessibilityPage() {
	return (
		<div
			style={{
				maxWidth: "860px",
				margin: "0 auto",
				padding: "0 20px",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "12px",
					flexWrap: "wrap",
					marginBottom: "8px",
				}}
			>
				<Crayon idx={0} color="var(--primary)" w={150} h={120} vb="0 0 170 120">
					{/* "everyone" — three friends of different heights on the ground */}
					<line x1={18} y1={108} x2={152} y2={108} />
					<Person cx={45} cy={46} r={9} />
					<Person cx={85} cy={34} r={11} />
					<Person cx={125} cy={50} r={8} />
					{/* tiny sparkles of joy */}
					<path d="M150 26 l0 10 M145 31 l10 0" />
					<path d="M22 34 l0 8 M18 38 l8 0" />
				</Crayon>
				<h1
					style={{
						fontSize: "32px",
						color: "var(--text-primary)",
						margin: 0,
					}}
				>
					Accessibility Statement
				</h1>
			</div>

			<div
				className="card"
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "16px",
					lineHeight: "1.6",
					color: "var(--text-secondary)",
				}}
			>
				<p>
					At PHTools, we are committed to ensuring our platform is accessible to
					everyone, regardless of their abilities or the assistive technologies
					they use.
				</p>

				<h2
					style={{
						fontSize: "20px",
						color: "var(--primary)",
						marginTop: "16px",
					}}
				>
					What that looks like in practice
				</h2>
				<p>
					We aim to adhere to the Web Content Accessibility Guidelines (WCAG)
					2.1 Level AA. Here&apos;s what we mean, crayons and all:
				</p>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "16px",
						marginTop: "4px",
					}}
				>
					{/* Keyboard navigation */}
					<div style={cardStyle}>
						<Crayon idx={1} color={C_BLUE}>
							{/* keyboard body */}
							<rect x={16} y={38} width={108} height={52} rx={9} />
							{/* focus ring around the Tab key */}
							<rect
								x={23}
								y={47}
								width={28}
								height={17}
								rx={4}
								strokeDasharray="3 4"
							/>
							{/* Tab key + ⇥ glyph */}
							<rect x={26} y={50} width={22} height={11} rx={2} />
							<line x1={31} y1={55.5} x2={42} y2={55.5} />
							<path d="M39 52.5 l3 3 l-3 3" />
							<line x1={44} y1={51.5} x2={44} y2={59.5} />
							{/* a few other keys */}
							<rect x={58} y={49} width={11} height={11} rx={2} />
							<rect x={74} y={49} width={11} height={11} rx={2} />
							<rect x={90} y={49} width={11} height={11} rx={2} />
							<rect x={106} y={49} width={10} height={11} rx={2} />
							{/* spacebar */}
							<rect x={34} y={73} width={72} height={9} rx={3} />
						</Crayon>
						<strong style={{ color: "var(--text-primary)" }}>
							Tab your way through
						</strong>
						<span style={{ fontSize: "14px" }}>
							Every calculator works with just a keyboard — <code>Tab</code>,{" "}
							<code>Enter</code>, and arrow keys. A clear focus ring always
							shows where you are.
						</span>
					</div>

					{/* Color contrast */}
					<div style={cardStyle}>
						<Crayon idx={2} color={C_VIOLET}>
							{/* contrast disc: left half inked, right half empty */}
							<circle cx={70} cy={55} r={28} />
							<path d="M70 27 a28 28 0 0 0 0 56 z" fill={C_VIOLET} stroke="none" />
							{/* shine marks */}
							<path d="M104 28 l0 9 M99.5 32.5 l9 0" />
							<path d="M34 84 l0 8 M30 88 l8 0" />
						</Crayon>
						<strong style={{ color: "var(--text-primary)" }}>
							Text you can actually read
						</strong>
						<span style={{ fontSize: "14px" }}>
							We keep strong color contrast in both light and dark mode, so
							numbers and labels never disappear into the background.
						</span>
					</div>

					{/* Screen readers */}
					<div style={cardStyle}>
						<Crayon idx={3} color={C_GREEN}>
							{/* listening head */}
							<circle cx={56} cy={55} r={24} />
							<circle cx={68} cy={58} r={4} fill={C_GREEN} stroke="none" />
							{/* sound waves into the ear */}
							<path d="M84 42 q11 13 0 26" />
							<path d="M94 33 q19 22 0 44" />
						</Crayon>
						<strong style={{ color: "var(--text-primary)" }}>
							Friendly to screen readers
						</strong>
						<span style={{ fontSize: "14px" }}>
							Proper labels and ARIA attributes mean tools like VoiceOver and
							NVDA can read everything out loud, in order.
						</span>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "12px",
						flexWrap: "wrap",
						marginTop: "16px",
					}}
				>
					<Crayon idx={4} color={C_PINK} w={130} h={104}>
						{/* speech bubble with a smile */}
						<path d="M26 34 h74 a9 9 0 0 1 9 9 v26 a9 9 0 0 1 -9 9 h-46 l-14 13 v-13 h-14 a9 9 0 0 1 -9 -9 v-26 a9 9 0 0 1 9 -9 z" />
						<circle cx={52} cy={52} r={2.6} fill={C_PINK} stroke="none" />
						<circle cx={74} cy={52} r={2.6} fill={C_PINK} stroke="none" />
						<path d="M50 62 q13 11 26 0" />
					</Crayon>
					<div>
						<h2
							style={{
								fontSize: "20px",
								color: "var(--primary)",
								marginTop: 0,
								marginBottom: "8px",
							}}
						>
							Tell us how we&apos;re doing
						</h2>
						<p style={{ margin: 0 }}>
							We are continuously improving the accessibility of our website. If
							you encounter any barriers or have suggestions on how we can
							improve keyboard navigation or screen reader support, please
							contact us. We welcome your feedback!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
