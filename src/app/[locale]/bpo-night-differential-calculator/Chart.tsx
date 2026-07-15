"use client";

import {
	Bar,
	BarChart,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export interface BpoChartDatum {
	name: string;
	value: number;
	color: string;
}

export interface BpoChartProps {
	data: BpoChartDatum[];
	formatValue: (amount: number) => string;
}

export default function BpoChart({ data, formatValue }: BpoChartProps) {
	return (
		<ResponsiveContainer width="100%" height={200}>
			<BarChart data={data} layout="vertical">
				<XAxis type="number" hide />
				<YAxis
					type="category"
					dataKey="name"
					width={120}
					tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
					axisLine={false}
					tickLine={false}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: "var(--surface-color)",
						borderColor: "var(--border-color)",
						borderRadius: "var(--border-radius-sm)",
						color: "var(--text-primary)",
					}}
					itemStyle={{ color: "var(--text-primary)" }}
					labelStyle={{ color: "var(--text-secondary)" }}
					separator=""
					formatter={(value) => [formatValue(Number(value)), ""]}
				/>
				<Bar dataKey="value" radius={[0, 4, 4, 0]}>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
