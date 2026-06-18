"use client";

import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

export interface FoodCostChartDatum {
	name: string;
	value: number;
	fill: string;
}

export interface FoodCostChartProps {
	data: FoodCostChartDatum[];
	formatValue: (val: number) => string;
}

export default function FoodCostChart({
	data,
	formatValue,
}: FoodCostChartProps) {
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
						<Cell key={`cell-${index}`} fill={entry.fill} />
					))}
				</Pie>
				<Tooltip formatter={(value: any) => formatValue(Number(value))} />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
