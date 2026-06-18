"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface CarLoanChartDatum {
	name: string;
	value: number;
	color: string;
}

export interface CarLoanChartProps {
	data: CarLoanChartDatum[];
	formatValue: (amount: number) => string;
}

export default function CarLoanChart({ data, formatValue }: CarLoanChartProps) {
	return (
		<ResponsiveContainer width="100%" height={200}>
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={50}
					outerRadius={85}
					dataKey="value"
					paddingAngle={2}
					label={({ name, percent }) =>
						`${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
					}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip formatter={(value) => formatValue(Number(value))} />
			</PieChart>
		</ResponsiveContainer>
	);
}
