"use client";

import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export interface PagibigChartDatum {
	year: number;
	totalSaved: number;
	dividendsEarned: number;
	totalValue: number;
}

export interface PagibigChartProps {
	data: PagibigChartDatum[];
	formatValue: (amount: number) => string;
	formatYearTick: (tick: number | string) => string;
	formatYearLabel: (label: number | string) => string;
	principalName: string;
	dividendsName: string;
}

export default function PagibigChart({
	data,
	formatValue,
	formatYearTick,
	formatYearLabel,
	principalName,
	dividendsName,
}: PagibigChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				data={data}
				margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
			>
				<defs>
					<linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#0d47a1" stopOpacity={0.3} />
						<stop offset="95%" stopColor="#0d47a1" stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorDividend" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#2e7d32" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#2e7d32" stopOpacity={0.1} />
					</linearGradient>
				</defs>
				<CartesianGrid
					strokeDasharray="3 3"
					vertical={false}
					stroke="var(--border-color)"
				/>
				<XAxis
					dataKey="year"
					tickFormatter={(tick) => formatYearTick(tick)}
					tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
					axisLine={false}
					tickLine={false}
				/>
				<YAxis
					tickFormatter={(tick) => `₱${(tick / 1000).toFixed(0)}k`}
					tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
					axisLine={false}
					tickLine={false}
				/>
				<Tooltip
					formatter={(value) => formatValue(Number(value) || 0)}
					labelFormatter={(label) => formatYearLabel(label)}
					contentStyle={{
						borderRadius: "8px",
						border: "none",
						boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
					}}
				/>
				<Area
					type="monotone"
					dataKey="totalSaved"
					name={principalName}
					stackId="1"
					stroke="#0d47a1"
					fill="url(#colorPrincipal)"
					strokeWidth={2}
				/>
				<Area
					type="monotone"
					dataKey="dividendsEarned"
					name={dividendsName}
					stackId="1"
					stroke="#2e7d32"
					fill="url(#colorDividend)"
					strokeWidth={2}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
