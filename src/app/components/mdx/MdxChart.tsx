"use client";

import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// Design-token palette (WCAG-AAA friendly, matches globals.css)
const TOKENS: Record<string, string> = {
	primary: "#0d47a1",
	green: "#1b5e20",
	red: "#b71c1c",
	amber: "#b26a00",
	teal: "#00695c",
	indigo: "#4527a0",
};
const CYCLE = ["primary", "green", "amber", "teal", "indigo", "red"];

function resolveColor(c: string | undefined, i: number): string {
	if (c) return TOKENS[c] ?? c;
	return TOKENS[CYCLE[i % CYCLE.length]];
}

type Series = { key: string; label?: string; color?: string };

type Props = {
	type?: "bar" | "line" | "area" | "pie";
	data: Array<Record<string, string | number>>;
	/** Category key for the X axis / pie labels. Default "name". */
	x?: string;
	/** One or more value series. Pie uses the first series. */
	series?: Series[];
	/** Single value key shorthand (alternative to `series`). */
	y?: string;
	valuePrefix?: string;
	valueSuffix?: string;
	height?: number;
	caption?: string;
	stacked?: boolean;
};

export default function MdxChart({
	type = "bar",
	data,
	x = "name",
	series,
	y,
	valuePrefix = "",
	valueSuffix = "",
	height = 300,
	caption,
	stacked = false,
}: Props) {
	if (!Array.isArray(data) || data.length === 0) return null;

	const resolvedSeries: Series[] =
		series && series.length > 0 ? series : [{ key: y ?? "value" }];

	const fmt = (v: number | string) => {
		const n = typeof v === "number" ? v : Number(v);
		if (Number.isNaN(n)) return String(v);
		return `${valuePrefix}${n.toLocaleString("en-US")}${valueSuffix}`;
	};

	const tooltipStyle = {
		background: "var(--surface-color)",
		border: "1px solid var(--border-color)",
		borderRadius: "8px",
		color: "var(--text-primary)",
	} as const;

	const axisTick = { fill: "currentColor", fontSize: 12 } as const;

	return (
		<figure style={{ margin: "0 0 28px" }}>
			<div
				style={{
					width: "100%",
					height,
					color: "var(--text-secondary)",
				}}
			>
				<ResponsiveContainer width="100%" height="100%">
					{type === "pie" ? (
						<PieChart>
							<Pie
								data={data}
								dataKey={resolvedSeries[0].key}
								nameKey={x}
								cx="50%"
								cy="50%"
								innerRadius={60}
								outerRadius={95}
								paddingAngle={2}
								stroke="none"
							>
								{data.map((_entry, i) => (
									<Cell key={`c-${i}`} fill={resolveColor(undefined, i)} />
								))}
							</Pie>
							<Tooltip
								formatter={(v) => fmt(v as number)}
								contentStyle={tooltipStyle}
							/>
							<Legend verticalAlign="bottom" height={36} iconType="circle" />
						</PieChart>
					) : type === "line" ? (
						<LineChart
							data={data}
							margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
						>
							<CartesianGrid
								stroke="currentColor"
								strokeOpacity={0.15}
								vertical={false}
							/>
							<XAxis
								dataKey={x}
								tick={axisTick}
								stroke="currentColor"
								strokeOpacity={0.3}
							/>
							<YAxis
								tick={axisTick}
								stroke="currentColor"
								strokeOpacity={0.3}
								tickFormatter={(v) => fmt(v)}
								width={70}
							/>
							<Tooltip
								formatter={(v) => fmt(v as number)}
								contentStyle={tooltipStyle}
							/>
							{resolvedSeries.length > 1 && <Legend />}
							{resolvedSeries.map((s, i) => (
								<Line
									key={s.key}
									type="monotone"
									dataKey={s.key}
									name={s.label ?? s.key}
									stroke={resolveColor(s.color, i)}
									strokeWidth={2.5}
									dot={false}
								/>
							))}
						</LineChart>
					) : type === "area" ? (
						<AreaChart
							data={data}
							margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
						>
							<CartesianGrid
								stroke="currentColor"
								strokeOpacity={0.15}
								vertical={false}
							/>
							<XAxis
								dataKey={x}
								tick={axisTick}
								stroke="currentColor"
								strokeOpacity={0.3}
							/>
							<YAxis
								tick={axisTick}
								stroke="currentColor"
								strokeOpacity={0.3}
								tickFormatter={(v) => fmt(v)}
								width={70}
							/>
							<Tooltip
								formatter={(v) => fmt(v as number)}
								contentStyle={tooltipStyle}
							/>
							{resolvedSeries.length > 1 && <Legend />}
							{resolvedSeries.map((s, i) => (
								<Area
									key={s.key}
									type="monotone"
									dataKey={s.key}
									name={s.label ?? s.key}
									stroke={resolveColor(s.color, i)}
									fill={resolveColor(s.color, i)}
									fillOpacity={0.15}
									strokeWidth={2.5}
									stackId={stacked ? "a" : undefined}
								/>
							))}
						</AreaChart>
					) : (
						<BarChart
							data={data}
							margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
						>
							<CartesianGrid
								stroke="currentColor"
								strokeOpacity={0.15}
								vertical={false}
							/>
							<XAxis
								dataKey={x}
								tick={axisTick}
								stroke="currentColor"
								strokeOpacity={0.3}
							/>
							<YAxis
								tick={axisTick}
								stroke="currentColor"
								strokeOpacity={0.3}
								tickFormatter={(v) => fmt(v)}
								width={70}
							/>
							<Tooltip
								formatter={(v) => fmt(v as number)}
								contentStyle={tooltipStyle}
								cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
							/>
							{resolvedSeries.length > 1 && <Legend />}
							{resolvedSeries.map((s, i) => (
								<Bar
									key={s.key}
									dataKey={s.key}
									name={s.label ?? s.key}
									fill={resolveColor(s.color, i)}
									radius={[4, 4, 0, 0]}
									stackId={stacked ? "a" : undefined}
								/>
							))}
						</BarChart>
					)}
				</ResponsiveContainer>
			</div>
			{caption && (
				<figcaption
					style={{
						fontSize: "14px",
						color: "var(--text-secondary)",
						textAlign: "center",
						marginTop: "8px",
					}}
				>
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
