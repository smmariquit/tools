"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

export interface FreelanceTaxChartDatum {
	name: string;
	value: number;
	color: string;
}

export interface FreelanceTaxChartProps {
	data: FreelanceTaxChartDatum[];
	formatValue: (amount: number) => string;
}

export default function FreelanceTaxChart({
	data,
	formatValue,
}: FreelanceTaxChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={100}
					paddingAngle={2}
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={entry.color} />
					))}
				</Pie>
				<Tooltip formatter={(value) => formatValue(Number(value) || 0)} />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
