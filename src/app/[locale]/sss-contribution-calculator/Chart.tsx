"use client";

import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export interface SSSChartProps {
	data: Record<string, string | number>[];
	eeKey: string;
	erKey: string;
	showEr: boolean;
	formatValue: (amount: number) => string;
}

export default function SSSChart({
	data,
	eeKey,
	erKey,
	showEr,
	formatValue,
}: SSSChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart
				data={data}
				layout="vertical"
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<XAxis type="number" />
				<YAxis dataKey="name" type="category" hide />
				<Tooltip
					contentStyle={{
						backgroundColor: "var(--surface-color)",
						borderColor: "var(--border-color)",
						borderRadius: "var(--border-radius-sm)",
						color: "var(--text-primary)",
					}}
					itemStyle={{ color: "var(--text-primary)" }}
					labelStyle={{ display: "none" }}
					formatter={(value) => formatValue(Number(value) || 0)}
				/>
				<Legend
					formatter={(value) => (
						<span style={{ color: "var(--text-primary)", fontSize: "14px" }}>
							{value}
						</span>
					)}
				/>
				<Bar dataKey={eeKey} stackId="a" fill="var(--primary)" />
				{showEr && <Bar dataKey={erKey} stackId="a" fill="var(--chart-3)" />}
			</BarChart>
		</ResponsiveContainer>
	);
}
