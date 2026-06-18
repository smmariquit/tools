"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export interface PagibigMP2ChartDatum {
	year: string;
	Principal: number;
	Dividends: number;
}

export interface PagibigMP2ChartProps {
	data: PagibigMP2ChartDatum[];
	formatValue: (val: number) => string;
}

export default function PagibigMP2Chart({
	data,
	formatValue,
}: PagibigMP2ChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
				<CartesianGrid
					strokeDasharray="3 3"
					vertical={false}
					stroke="var(--border-color)"
				/>
				<XAxis
					dataKey="year"
					tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
					axisLine={false}
					tickLine={false}
				/>
				<YAxis
					tickFormatter={(value) => `₱${value / 1000}k`}
					tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
					axisLine={false}
					tickLine={false}
				/>
				<Tooltip
					formatter={(value: any) => formatValue(Number(value))}
					labelStyle={{
						color: "black",
						fontWeight: "bold",
						marginBottom: "8px",
					}}
					contentStyle={{
						borderRadius: "8px",
						border: "none",
						boxShadow: "var(--shadow-md)",
					}}
				/>
				<Legend />
				<Bar dataKey="Principal" stackId="a" fill="var(--primary)" />
				<Bar dataKey="Dividends" stackId="a" fill="#4caf50" />
			</BarChart>
		</ResponsiveContainer>
	);
}
