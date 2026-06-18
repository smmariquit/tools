/**
 * Per-tool hand-drawn doodles (Notion-doodle style).
 *
 * Each entry is the inner stroke content for a 300x190 viewBox. ToolIllustration
 * wraps it in <svg> with the shared roughen filter, currentColor stroke, and
 * round caps. Keep scenes simple and recognizable: one focal motif + 1-2 small
 * accents (sparkle / motion line). Draw loosely; the filter adds the waver.
 */
import type { ReactNode } from "react";
import {
	calendar,
	clock,
	coin,
	doc,
	gradCap,
	house,
	peso,
	ring,
	spark,
	star,
} from "./primitives";

/* ---- local motif helpers (absolute 300x190 space) ---- */

const car = (dx: number, dy: number, s = 1, k = "car"): ReactNode => (
	<g key={k} transform={`translate(${dx} ${dy}) scale(${s})`}>
		<path d="M0 31c-3-12 3-15 13-15h9c4-12 11-16 22-16h20c12 0 16 7 20 16h8c10 0 14 4 13 15" />
		<path d="M-1 31l118-1" />
		<path d="M32 16c3-9 8-13 16-13l16 1c8 1 11 5 15 12" />
		<path d="M31 18c-8-1-13 5-12 13 1 7 6 11 13 11 7-1 12-6 11-13-1-6-5-10-12-11" />
		<path d="M93 18c-8-1-13 5-12 13 1 7 6 11 13 11 7-1 12-6 11-13-1-6-6-11-13-11" />
		<path d="M111 21h.01" />
		<path d="M54 24l15-1" />
	</g>
);

const moto = (dx: number, dy: number, k = "mt"): ReactNode => (
	<g key={k} transform={`translate(${dx} ${dy})`}>
		{ring(20, 20, 16, `${k}-w1`)}
		{ring(80, 20, 16, `${k}-w2`)}
		<path d="M20 20l16-22h18l8 14" />
		<path d="M36 -2l-10 22M50 -2c10 0 18 6 30 22" />
		<path d="M30 -10h16" />
	</g>
);

const plus = (
	cx: number,
	cy: number,
	l: number,
	w: number,
	k = "pl",
): ReactNode => {
	const p: [number, number][] = [
		[-w, -l],
		[w, -l],
		[w, -w],
		[l, -w],
		[l, w],
		[w, w],
		[w, l],
		[-w, l],
		[-w, w],
		[-l, w],
		[-l, -w],
		[-w, -w],
	];
	let d = "";
	p.forEach((q, i) => {
		d += `${i ? "L" : "M"}${cx + q[0]} ${cy + q[1]}`;
	});
	return <path key={k} d={`${d}z`} />;
};

const gift = (
	x: number,
	y: number,
	w: number,
	h: number,
	k = "gf",
): ReactNode => (
	<g key={k}>
		<path d={`M${x} ${y}h${w}v${h}h${-w}z`} />
		<path d={`M${x} ${y + h * 0.3}h${w}`} />
		<path d={`M${x + w / 2} ${y}v${h}`} />
		<path
			d={`M${x + w / 2} ${y}c-7-11-19-8-15 1M${x + w / 2} ${y}c7-11 19-8 15 1`}
		/>
	</g>
);

const balance = (cx: number, cy: number, k = "bal"): ReactNode => (
	<g key={k}>
		<path d={`M${cx} ${cy - 24}v36`} />
		<path d={`M${cx - 28} ${cy - 24}h56`} />
		<path d={`M${cx - 28} ${cy - 24}l-8 13h16z`} />
		<path d={`M${cx + 28} ${cy - 24}l-8 13h16z`} />
		<path d={`M${cx - 12} ${cy + 12}h24`} />
	</g>
);

const chart = (
	x: number,
	y: number,
	w: number,
	h: number,
	k = "ch",
): ReactNode => (
	<g key={k}>
		<path d={`M${x} ${y}v${h}h${w}`} />
		<path
			d={`M${x + w * 0.08} ${y + h * 0.72}l${w * 0.26} ${-h * 0.32} l${w * 0.2} ${h * 0.16} l${w * 0.42} ${-h * 0.52}`}
		/>
		<path d={`M${x + w * 0.78} ${y + h * 0.04}h${w * 0.18}v${h * 0.18}`} />
	</g>
);

const phone = (
	x: number,
	y: number,
	w: number,
	h: number,
	k = "ph",
): ReactNode => (
	<g key={k}>
		<path
			d={`M${x + 6} ${y}h${w - 12}q6 0 6 6v${h - 12}q0 6 -6 6h${-(w - 12)}q-6 0 -6 -6v${-(h - 12)}q0 -6 6 -6z`}
		/>
		<path d={`M${x + w * 0.38} ${y + h * 0.9}h${w * 0.24}`} />
	</g>
);

const heart = (cx: number, cy: number, s: number, k = "ht"): ReactNode => (
	<path
		key={k}
		d={`M${cx} ${cy + s * 0.7}c${-s * 1.1} ${-s * 0.7} ${-s} ${-s * 1.7} ${-s * 0.3} ${-s * 1.7}c${s * 0.4} 0 ${s * 0.3} ${s * 0.4} ${s * 0.3} ${s * 0.4}c0 0 ${-s * 0.1} ${-s * 0.4} ${s * 0.3} ${-s * 0.4}c${s * 0.7} 0 ${s * 0.8} ${s} ${-s * 0.3} ${s * 1.7}z`}
	/>
);

const truck = (dx: number, dy: number, k = "tk"): ReactNode => (
	<g key={k} transform={`translate(${dx} ${dy})`}>
		<path d="M0 0h58v34H0z" />
		<path d="M58 10h22l12 12v12H58z" />
		<path d="M80 10v12h12" />
		{ring(18, 40, 9, `${k}-w1`)}
		{ring(74, 40, 9, `${k}-w2`)}
	</g>
);

const box = (x: number, y: number, s: number, k = "bx"): ReactNode => (
	<g key={k}>
		<path
			d={`M${x} ${y + s * 0.25}l${s * 0.5} ${-s * 0.25}l${s * 0.5} ${s * 0.25}v${s * 0.62}l${-s * 0.5} ${s * 0.25}l${-s * 0.5} ${-s * 0.25}z`}
		/>
		<path
			d={`M${x} ${y + s * 0.25}l${s * 0.5} ${s * 0.27}l${s * 0.5} ${-s * 0.27}`}
		/>
		<path d={`M${x + s * 0.5} ${y + s * 0.52}v${s * 0.6}`} />
	</g>
);

const ribbon = (cx: number, cy: number, k = "rb"): ReactNode => (
	<g key={k}>
		{ring(cx, cy, 18, `${k}-o`)}
		{star(cx, cy, 8, `${k}-s`)}
		<path d={`M${cx - 9} ${cy + 15}l-5 22 14-8 14 8-5-22`} />
	</g>
);

const crescent = (cx: number, cy: number, r: number, k = "cr"): ReactNode => (
	<path
		key={k}
		d={`M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r * 0.72} ${r * 0.72} 0 1 0 0 ${-2 * r}z`}
	/>
);

const hourglass = (
	cx: number,
	cy: number,
	w: number,
	h: number,
	k = "hg",
): ReactNode => (
	<g key={k}>
		<path d={`M${cx - w} ${cy - h}h${2 * w}`} />
		<path d={`M${cx - w} ${cy + h}h${2 * w}`} />
		<path d={`M${cx - w} ${cy - h}L${cx} ${cy}L${cx - w} ${cy + h}`} />
		<path d={`M${cx + w} ${cy - h}L${cx} ${cy}L${cx + w} ${cy + h}`} />
		<path d={`M${cx - w * 0.5} ${cy - h * 0.5}h${w}`} />
	</g>
);

const key = (x: number, y: number, k = "ky"): ReactNode => (
	<g key={k}>
		{ring(x, y, 12, `${k}-b`)}
		<path d={`M${x + 11} ${y}h34`} />
		<path d={`M${x + 33} ${y}v9M${x + 41} ${y}v9`} />
	</g>
);

const cake = (cx: number, cy: number, k = "ca"): ReactNode => (
	<g key={k}>
		<path d={`M${cx - 22} ${cy}h44v20c0 4-44 4-44 0z`} />
		<path d={`M${cx - 22} ${cy}c0-4 44-4 44 0`} />
		<path d={`M${cx} ${cy - 16}v10`} />
		<path d={`M${cx} ${cy - 18}c-3 3-3 7 0 7 3 0 3-4 0-7z`} />
	</g>
);

const bulb = (cx: number, cy: number, k = "bl"): ReactNode => (
	<g key={k}>
		<path
			d={`M${cx} ${cy - 24}c-13 0-21 9-21 19 0 7 5 11 7 16h28c2-5 7-9 7-16 0-10-8-19-21-19z`}
		/>
		<path d={`M${cx - 9} ${cy + 16}h18M${cx - 7} ${cy + 22}h14`} />
	</g>
);

const ribbonPercent = (cx: number, cy: number, k = "pc"): ReactNode => (
	<g key={k}>
		{ring(cx - 9, cy - 9, 5, `${k}-a`)}
		{ring(cx + 9, cy + 9, 5, `${k}-b`)}
		<path d={`M${cx + 13} ${cy - 14}l-26 28`} />
	</g>
);

/* ---- the registry ---- */

export const doodles: Record<string, ReactNode> = {
	/* ============ Finance & Salary ============ */
	"/salary-calculator": (
		<>
			<g transform="rotate(-4 120 100)">
				<path d="M74 40h74v104l-9-7-8 7-8-7-8 7-8-7-8 7-8-7-9 7z" />
				<path d="M88 60h46" />
				<path d="M88 76h30M88 90h46M88 104h36" />
				<path d="M88 122h28" strokeWidth={3.4} />
			</g>
			{coin(198, 122, 30, "c")}
			{spark(238, 64, 6, "s")}
		</>
	),
	"/bpo-night-differential-calculator": (
		<>
			{crescent(116, 94, 30, "m")}
			{coin(194, 100, 22, "c")}
			{star(202, 54, 8, "st")}
			{spark(150, 52, 5, "s")}
		</>
	),
	"/overtime-pay-calculator": (
		<>
			{clock(120, 96, 38, "ck")}
			<path d="M158 70l16-10M158 122l16 10" />
			{peso(196, 86, 26, "p")}
			{spark(214, 66, 6, "s")}
		</>
	),
	"/budget-calculator": (
		<>
			<path d="M70 90c0-12 8-18 22-18h66c10 0 16 6 16 16v54c0 10-6 16-16 16H88c-12 0-18-6-18-18z" />
			<path d="M174 104h16c4 0 6 3 6 8s-2 8-6 8h-16z" />
			{ring(184, 112, 1.6, "dot")}
			<path d="M70 92c30-8 70-8 100 0" />
			{coin(108, 128, 14, "c")}
			{spark(214, 80, 6, "s")}
		</>
	),
	"/sss-contribution-calculator": (
		<>
			<path d="M150 50l46 16v34c0 30-24 46-46 56-22-10-46-26-46-56V66z" />
			{peso(140, 92, 26, "p")}
			{spark(214, 72, 6, "s")}
		</>
	),
	"/sss-pension-calculator": (
		<>
			{hourglass(120, 96, 30, 38, "hg")}
			{coin(196, 100, 22, "c")}
			{spark(150, 52, 6, "s")}
		</>
	),
	"/gsis-pension-calculator": (
		<>
			<path d="M96 88l54-30 54 30" />
			<path d="M100 88v52h100V88" />
			<path d="M112 100v32M134 100v32M166 100v32M188 100v32" />
			<path d="M92 140h116" />
			{coin(150, 96, 13, "c")}
			{spark(214, 70, 6, "s")}
		</>
	),
	"/sss-maternity-benefit-calculator": (
		<>
			{heart(110, 98, 30, "h")}
			{calendar(164, 70, 58, 52, "cal")}
			<path d="M178 102h8M200 102h8M178 114h8M200 114h8" />
			{spark(150, 50, 6, "s")}
		</>
	),
	"/philhealth-calculator": (
		<>
			{plus(126, 96, 30, 12, "pl")}
			{heart(186, 90, 18, "h")}
			{spark(208, 130, 6, "s")}
		</>
	),
	"/income-tax-calculator": (
		<>
			{doc(96, 46, 86, 104, "d")}
			<path d="M118 118l40-44" />
			{ring(124, 84, 7, "a")}
			{ring(154, 112, 7, "b")}
			{spark(206, 70, 6, "s")}
		</>
	),
	"/gross-from-tax-calculator": (
		<>
			{peso(112, 84, 30, "p")}
			<path d="M150 78c20-8 40-8 56 0M206 78l-10-8M206 78l-10 8" />
			<path d="M206 116c-20 8-40 8-56 0M150 116l10-8M150 116l10 8" />
			{spark(212, 60, 6, "s")}
		</>
	),
	"/13th-month-pay-calculator": (
		<>
			{gift(108, 82, 64, 60, "g")}
			{peso(133, 102, 22, "p")}
			{spark(200, 78, 6, "s")}
		</>
	),
	"/backpay-calculator": (
		<>
			<path d="M104 96h72v52h-72z" />
			<path d="M124 96v-12c0-6 4-8 10-8h12c6 0 10 2 10 8v12" />
			<path d="M104 116h72" />
			{coin(196, 132, 16, "c")}
			{spark(208, 76, 6, "s")}
		</>
	),
	"/separation-pay-calculator": (
		<>
			<path d="M92 56h52v94H92z" />
			<path d="M92 56v94" strokeWidth={3} />
			{ring(136, 104, 1.8, "kn")}
			<path d="M156 104h28M178 96l10 8-10 8" />
			{peso(204, 92, 22, "p")}
			{spark(150, 52, 6, "s")}
		</>
	),
	"/freelance-tax-calculator": (
		<>
			<path d="M82 70h106v60H82z" />
			<path d="M72 142h126l-8-12H80z" />
			{peso(122, 86, 24, "p")}
			{spark(206, 70, 6, "s")}
		</>
	),
	"/freelance-rate-calculator": (
		<>
			<path d="M82 70h106v60H82z" />
			<path d="M72 142h126l-8-12H80z" />
			{clock(196, 80, 16, "ck")}
			{peso(118, 88, 22, "p")}
		</>
	),
	"/tax-optimizer-calculator": (
		<>
			{balance(140, 92, "b")}
			{ribbonPercent(196, 120, "pc")}
			{spark(206, 64, 6, "s")}
		</>
	),
	"/digital-bank-calculator": (
		<>
			{phone(108, 50, 60, 100, "ph")}
			{peso(132, 80, 22, "p")}
			<path d="M118 124h40" />
			{ribbonPercent(196, 90, "pc")}
		</>
	),
	"/shopee-lazada-fee-calculator": (
		<>
			<path d="M104 80h64l8 68h-80z" />
			<path d="M122 80c0-14 6-22 14-22s14 8 14 22" />
			<path d="M116 110l44-10" />
			{spark(206, 80, 6, "s")}
		</>
	),
	"/food-cost-calculator": (
		<>
			{ring(132, 104, 34, "plate")}
			{ring(132, 104, 22, "inner")}
			<path d="M186 72v40M180 72v18c0 4 12 4 12 0V72" />
			<path d="M186 112v32" />
			{spark(206, 76, 6, "s")}
		</>
	),
	"/de-minimis-tax-calculator": (
		<>
			{gift(104, 80, 60, 62, "g")}
			<path d="M180 96l10 12 20-24" />
			{spark(206, 130, 6, "s")}
		</>
	),
	"/lto-registration-fee-calculator": (
		<>
			{car(54, 70, 0.78, "car")}
			{doc(172, 64, 50, 64, "d")}
			{spark(208, 132, 6, "s")}
		</>
	),
	"/bir-donors-tax-calculator": (
		<>
			{gift(98, 78, 58, 60, "g")}
			<path d="M170 138c10-4 18-12 18-22 0-8-10-10-14-4-4-6-14-4-14 4 0 10 8 18 10 22z" />
			{spark(206, 78, 6, "s")}
		</>
	),
	"/architectural-fee-calculator": (
		<>
			<path d="M88 150l24-80 24 80" />
			<path d="M98 120h28" />
			<path d="M170 150V70l40 20v60" />
			<path d="M178 96h24M178 114h24M178 132h24" />
			{spark(150, 60, 6, "s")}
		</>
	),
	"/customs-brokerage-fee-calculator": (
		<>
			<path d="M76 130h120l-12 26H88z" />
			<path d="M120 130v-58h44l16 22v36" />
			<path d="M124 84h30M124 100h44" />
			{ring(150, 60, 7, "stamp")}
			{spark(208, 78, 6, "s")}
		</>
	),
	"/influencer-rate-calculator": (
		<>
			{phone(106, 50, 62, 100, "ph")}
			{heart(137, 92, 18, "h")}
			<path d="M118 122h40" />
			{coin(200, 96, 14, "c")}
		</>
	),
	"/final-pay-calculator": (
		<>
			<path d="M88 88h84v54H88z" />
			<path d="M88 88l42 30 42-30" />
			{peso(196, 78, 22, "p")}
			{spark(206, 130, 6, "s")}
		</>
	),
	"/tax-refund-calculator": (
		<>
			{doc(100, 48, 70, 92, "d")}
			<path d="M150 150c26-2 42-20 42-42M192 108l8 12 12-8" />
			{peso(116, 150, 0, "x")}
			{coin(196, 70, 14, "c")}
		</>
	),
	"/kasambahay-payroll-calculator": (
		<>
			{house(90, 80, 70, 64, "ho")}
			{coin(198, 110, 18, "c")}
			{spark(196, 62, 6, "s")}
		</>
	),
	"/kasambahay-retirement-calculator": (
		<>
			{house(92, 80, 66, 64, "ho")}
			{clock(196, 104, 22, "ck")}
			{spark(208, 64, 6, "s")}
		</>
	),
	"/estate-tax-calculator": (
		<>
			{house(86, 82, 64, 60, "ho")}
			{key(176, 98, "ky")}
			{spark(150, 54, 6, "s")}
		</>
	),
	"/gotrade-vs-ibkr-calculator": (
		<>
			{chart(86, 64, 88, 76, "ch")}
			{balance(196, 92, "b")}
			{spark(150, 56, 6, "s")}
		</>
	),
	"/pdic-insurance-calculator": (
		<>
			<path d="M96 88l54-30 54 30" />
			<path d="M104 88v52h92V88" />
			<path d="M118 100v34M138 100v34M162 100v34M182 100v34" />
			<path d="M92 140h116" />
			{plus(150, 64, 10, 4, "pl")}
			{spark(214, 76, 6, "s")}
		</>
	),
	"/philhealth-late-contribution-calculator": (
		<>
			{plus(122, 96, 28, 11, "pl")}
			{clock(188, 92, 22, "ck")}
			<path d="M188 64v-8" />
			{spark(150, 56, 6, "s")}
		</>
	),
	"/retail-treasury-bond-calculator": (
		<>
			{doc(94, 56, 100, 80, "d")}
			{ring(120, 120, 12, "seal")}
			<path d="M120 132v18l8-6 8 6v-18" />
			{ribbonPercent(190, 84, "pc")}
		</>
	),
	"/shipping-logistics-estimator": (
		<>
			{box(86, 70, 64, "bx")}
			{truck(150, 96, "tk")}
			{spark(140, 60, 6, "s")}
		</>
	),
	"/civil-service-reviewer": (
		<>
			{doc(96, 46, 86, 104, "d")}
			<path d="M112 76l8 8 14-16M112 104l8 8 14-16" />
			<path d="M150 80h22M150 108h22" />
			<path d="M196 70l18 18-44 44-20 4 4-20z" />
			{spark(210, 132, 6, "s")}
		</>
	),
	"/legal-contract-generator": (
		<>
			{doc(96, 44, 84, 104, "d")}
			<path d="M150 122l34-36 10 10-34 36-14 4z" />
			{ring(140, 134, 9, "seal")}
			{spark(204, 66, 6, "s")}
		</>
	),
	"/invoice-factoring-calculator": (
		<>
			{doc(84, 44, 74, 98, "d")}
			{clock(188, 78, 20, "ck")}
			{coin(196, 128, 16, "c")}
		</>
	),
	"/digital-ticket-generator": (
		<>
			<path d="M82 76h120v18a8 8 0 0 0 0 16v18H82v-18a8 8 0 0 0 0-16z" />
			<path d="M150 76v52" strokeDasharray="3 5" />
			<path d="M100 96h6v6h-6zM114 96h6v6h-6zM100 110h6v6h-6zM114 110h6v6h-6z" />
			{spark(206, 70, 6, "s")}
		</>
	),
	"/bir-withholding-tax-calculator": (
		<>
			{doc(98, 46, 84, 104, "d")}
			<path d="M118 118h44" strokeWidth={3.2} />
			{ribbonPercent(196, 92, "pc")}
			{spark(206, 64, 6, "s")}
		</>
	),
	"/electric-bill-calculator": (
		<>
			{bulb(120, 96, "bl")}
			<path d="M118 60l-8 14h14l-8 14" />
			{doc(170, 70, 50, 64, "d")}
			{spark(208, 138, 6, "s")}
		</>
	),

	/* ============ Loans, Housing & Real Estate ============ */
	"/zonal-value-calculator": (
		<>
			<path d="M150 48c-22 0-38 16-38 38 0 28 38 60 38 60s38-32 38-60c0-22-16-38-38-38z" />
			{house(132, 78, 36, 34, "ho")}
			{spark(206, 72, 6, "s")}
		</>
	),
	"/car-loan-calculator": (
		<>
			{car(52, 72, 0.82, "car")}
			{ribbonPercent(196, 96, "pc")}
			{spark(208, 64, 6, "s")}
		</>
	),
	"/motorcycle-loan-calculator": (
		<>
			{moto(70, 110, "mt")}
			{ribbonPercent(198, 90, "pc")}
			{spark(150, 60, 6, "s")}
		</>
	),
	"/pagibig-mp2-calculator": (
		<>
			<path d="M78 110c0-22 18-32 40-32h6c4-8 14-8 18 0 16 4 28 14 28 32 0 14-12 26-30 30v8h-14v-6c-6 0-14 0-20-2v8H94v-8c-10-6-16-18-16-30z" />
			<path d="M150 84h12" />
			{ring(112, 102, 1.8, "eye")}
			<path d="M168 96c10-12 22-14 34-14M198 82l4 12 10-6" />
			{coin(150, 60, 12, "c")}
		</>
	),
	"/home-loan-calculator": (
		<>
			{house(98, 76, 74, 68, "ho")}
			{ribbonPercent(202, 96, "pc")}
			{spark(208, 64, 6, "s")}
		</>
	),
	"/amilyar-calculator": (
		<>
			{house(94, 76, 68, 66, "ho")}
			{doc(176, 70, 46, 62, "d")}
			{spark(150, 58, 6, "s")}
		</>
	),
	"/pagibig-calculator": (
		<>
			{house(96, 78, 70, 66, "ho")}
			{peso(196, 96, 24, "p")}
			{spark(208, 64, 6, "s")}
		</>
	),
	"/pagibig-foreclosed-roi-calculator": (
		<>
			{house(86, 80, 64, 62, "ho")}
			<path d="M176 136c6-16 14-26 30-34" />
			<path d="M206 102l-3-9M206 102l-9 2" />
			{coin(190, 140, 12, "c")}
			{spark(150, 56, 6, "s")}
		</>
	),
	"/pagibig-affordability-calculator": (
		<>
			{house(94, 78, 66, 64, "ho")}
			{ring(192, 104, 22, "chk")}
			<path d="M182 104l7 8 13-15" />
			{spark(208, 66, 6, "s")}
		</>
	),

	/* ============ Education & Students ============ */
	"/gwa-calculator": (
		<>
			<path d="M84 150c20-6 72-6 92 0" />
			<path d="M84 150v14c20-6 72-6 92 0v-14" />
			<path d="M130 150v14" />
			{gradCap(130, 78, 56, "gc")}
			{star(226, 70, 12, "st")}
		</>
	),
	"/prc-board-exam-rating-calculator": (
		<>
			{ribbon(126, 92, "rb")}
			{doc(170, 68, 50, 68, "d")}
			{spark(150, 54, 6, "s")}
		</>
	),
	"/latin-honors-calculator": (
		<>
			{gradCap(118, 70, 44, "gc")}
			{ribbon(196, 110, "rb")}
			{spark(150, 54, 6, "s")}
		</>
	),
	"/dost-scholarship-stipend-calculator": (
		<>
			{gradCap(114, 68, 42, "gc")}
			<path
				d="M174 104a24 9 0 1 0 48 0a24 9 0 1 0 -48 0"
				transform="rotate(34 198 104)"
			/>
			<path
				d="M174 104a24 9 0 1 0 48 0a24 9 0 1 0 -48 0"
				transform="rotate(-34 198 104)"
			/>
			{ring(198, 104, 2.4, "nuc")}
		</>
	),
	"/ched-scholarship-calculator": (
		<>
			<path d="M84 76c22-8 40-8 60 0v66c-20-8-38-8-60 0z" />
			<path d="M144 76c22-8 40-8 60 0v66c-20-8-38-8-60 0z" />
			<path d="M144 76v66" />
			{coin(150, 60, 12, "c")}
			{spark(214, 70, 6, "s")}
		</>
	),
	"/qpi-gpa-calculator": (
		<>
			{doc(100, 48, 72, 96, "d")}
			{star(146, 86, 14, "st")}
			<path d="M118 116h40M118 130h28" />
			{spark(206, 70, 6, "s")}
		</>
	),

	/* ============ Creative & Media ============ */
	"/id-photo-maker": (
		<>
			<path d="M112 44h76v100h-76z" />
			{ring(150, 84, 15, "head")}
			<path d="M124 138c2-18 14-28 26-28s24 10 26 28" />
			<path d="M92 36h12M92 36v12M208 36h-12M208 36v12M92 152h12M92 152v-12M208 152h-12M208 152v-12" />
			{spark(226, 92, 6, "s")}
		</>
	),

	/* ============ Utilities ============ */
	"/fuel-cost-calculator": (
		<>
			<path d="M86 70h54v74H86z" />
			<path d="M80 144h66" />
			<path d="M96 84h34v22H96z" />
			<path d="M140 86l16 12v34c0 6 10 6 10 0v-26h-8" />
			<path d="M166 88h6" />
			{spark(206, 76, 6, "s")}
		</>
	),
	"/lto-penalty-calculator": (
		<>
			{car(50, 78, 0.8, "car")}
			{ring(196, 92, 22, "alert")}
			<path d="M196 82v12M196 102h.01" />
			{spark(150, 58, 6, "s")}
		</>
	),
	"/toll-calculator": (
		<>
			<path d="M85 156V57" />
			<path d="M235 153V60" />
			<path d="M72 61h180" />
			<path d="M153 61v16h25l-1-17" />
			<path d="M169 65l-7 9h8l-4 7" />
			<path d="M150 99h.01" />
			<path d="M159 91c5 5 5 13 0 18" />
			<path d="M167 85c8 8 7 23-1 31" />
			<path d="M16 149c60 7 130 9 268 1" />
			<path d="M40 166l18-1M80 166l16-1M118 166l16-1" />
			{car(56, 100, 1, "car")}
			<path d="M29 118l21-1M25 130l16-1" />
			{spark(252, 119, 6, "s")}
		</>
	),
	"/holiday-calculator": (
		<>
			{calendar(96, 60, 90, 84, "cal")}
			<path d="M126 96l6 12 12 2-9 9 2 13-11-6-11 6 2-13-9-9 12-2z" />
			{ring(196, 74, 12, "sun")}
			<path d="M196 56v-8M214 74h8M210 60l5-5" />
		</>
	),
	"/dfa-age-calculator": (
		<>
			{calendar(84, 66, 82, 78, "cal")}
			{cake(198, 118, "ca")}
			{spark(206, 62, 6, "s")}
		</>
	),
	"/bill-splitter-calculator": (
		<>
			{ring(116, 100, 32, "plate")}
			{ring(116, 100, 20, "rim")}
			<path d="M116 66v68" strokeDasharray="4 6" />
			{coin(200, 104, 18, "c")}
			{spark(196, 150, 5, "s")}
		</>
	),
};
