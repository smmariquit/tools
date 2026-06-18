"use client";

import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export interface DigitalBankChartDatum {
	month: number;
	label?: string;
	balance: number;
	deposits: number;
	interest: number;
}

export interface DigitalBankChartProps {
	data: DigitalBankChartDatum[];
	formatValue: (val: number) => string;
}

export default function DigitalBankChart({
	data,
	formatValue,
}: DigitalBankChartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				data={data}
				margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
			>
				<defs>
					<linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
						<stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
					</linearGradient>
				</defs>
				<CartesianGrid
					strokeDasharray="3 3"
					vertical={false}
					stroke="var(--border-color)"
				/>
				<XAxis
					dataKey="label"
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
				<Area
					type="monotone"
					dataKey="balance"
					name="Total Balance"
					stroke="var(--primary)"
					fillOpacity={1}
					fill="url(#colorBalance)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
