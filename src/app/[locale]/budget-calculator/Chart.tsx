"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface BudgetChartDatum {
	name: string;
	value: number;
	color: string;
}

export interface BudgetChartProps {
	data: BudgetChartDatum[];
	formatValue: (amount: number) => string;
	height: number;
	innerRadius: number;
	outerRadius: number;
}

export default function BudgetChart({
	data,
	formatValue,
	height,
	innerRadius,
	outerRadius,
}: BudgetChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					dataKey="value"
					paddingAngle={2}
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
					labelStyle={{ color: "var(--text-secondary)" }}
					formatter={(value) => formatValue(Number(value))}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
}
