"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface SalaryChartDatum {
	name: string;
	value: number;
	color: string;
}

export interface SalaryChartProps {
	data: SalaryChartDatum[];
	formatValue: (amount: number) => string;
}

export default function SalaryChart({ data, formatValue }: SalaryChartProps) {
	return (
		<div style={{ width: "100%", height: 200 }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={55}
						outerRadius={80}
						paddingAngle={2}
						dataKey="value"
						label={false}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
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
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
