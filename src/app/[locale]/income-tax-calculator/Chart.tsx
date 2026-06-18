"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

export interface IncomeTaxChartDatum {
	name: string;
	value: number;
}

export interface IncomeTaxChartProps {
	data: IncomeTaxChartDatum[];
	colors: string[];
	formatValue: (amount: number) => string;
}

export default function IncomeTaxChart({
	data,
	colors,
	formatValue,
}: IncomeTaxChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={90}
					paddingAngle={2}
					dataKey="value"
					stroke="none"
				>
					{data.map((_entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
					))}
				</Pie>
				<Tooltip
					formatter={(value) => formatValue(Number(value) || 0)}
					contentStyle={{
						borderRadius: "8px",
						border: "none",
						boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
					}}
				/>
				<Legend verticalAlign="bottom" height={36} iconType="circle" />
			</PieChart>
		</ResponsiveContainer>
	);
}
