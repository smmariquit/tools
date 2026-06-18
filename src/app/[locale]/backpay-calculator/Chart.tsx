"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

export interface BackpayChartDatum {
	name: string;
	value: number;
	color: string;
}

export interface BackpayChartProps {
	data: BackpayChartDatum[];
	formatValue: (val: number) => string;
}

export default function BackpayChart({ data, formatValue }: BackpayChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={80}
					paddingAngle={5}
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip
					formatter={(value: any) => formatValue(Number(value))}
					contentStyle={{
						backgroundColor: "var(--surface-color)",
						borderColor: "var(--border-color)",
						color: "var(--text-primary)",
						borderRadius: "8px",
					}}
				/>
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
