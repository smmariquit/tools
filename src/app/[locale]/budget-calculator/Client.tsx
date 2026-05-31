"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { reverseSalary } from "../../../lib/reverseSalaryLogic";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

interface Expense {
	id: string;
	name: string;
	amount: string;
}

const DEFAULT_EXPENSES: Expense[] = [
	{ id: "rent", name: "Rent / Mortgage", amount: "8000" },
	{ id: "food", name: "Food & Groceries", amount: "6000" },
	{ id: "transpo", name: "Transportation", amount: "3000" },
	{
		id: "utils",
		name: "Utilities (Electric, Water, Internet)",
		amount: "3000",
	},
	{ id: "savings", name: "Savings / Emergency Fund", amount: "5000" },
];

export default function BudgetCalculator() {
	const t = useTranslations("BudgetCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [expenses, setExpenses] = useState<Expense[]>(() => {
		const urlExpenses = searchParams.get("expenses");
		if (urlExpenses) {
			try {
				const parsed = JSON.parse(decodeURIComponent(urlExpenses));
				if (Array.isArray(parsed) && parsed.length > 0) {
					return parsed;
				}
			} catch {
				// ignore bad URL data
			}
		}
		return DEFAULT_EXPENSES;
	});

	const [extraNet, setExtraNet] = useState(searchParams.get("extra") || "0");
	const [mounted, setMounted] = useState(false);

	const updateUrl = useCallback(
		(updates: Record<string, string>) => {
			const newSearchParams = new URLSearchParams(searchParams.toString());
			for (const [key, value] of Object.entries(updates)) {
				if (value && value !== "0") newSearchParams.set(key, value);
				else newSearchParams.delete(key);
			}
			router.replace(`${pathname}?${newSearchParams.toString()}`, {
				scroll: false,
			});
		},
		[router, pathname, searchParams],
	);

	useEffect(() => {
		setMounted(true);
		// Check if URL parameters are missing and initialize them
		if (!searchParams.has("expenses")) {
			updateUrl({
				expenses: encodeURIComponent(JSON.stringify(expenses)),
				extra: extraNet !== "0" ? extraNet : "",
			});
		}
	}, [searchParams, updateUrl, expenses, extraNet]);

	// Computation
	const totalExpenses = expenses.reduce(
		(sum, exp) => sum + (parseFloat(exp.amount) || 0),
		0,
	);
	const extraNetAmount = parseFloat(extraNet) || 0;
	const targetNetPay = totalExpenses + extraNetAmount;

	const result = reverseSalary(targetNetPay);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const addExpense = () => {
		const newExpenses = [
			...expenses,
			{
				id: `custom-${Date.now()}`,
				name: "",
				amount: "",
			},
		];
		setExpenses(newExpenses);
	};

	const removeExpense = (id: string) => {
		const newExpenses = expenses.filter((e) => e.id !== id);
		setExpenses(newExpenses);
		updateUrl({
			expenses: encodeURIComponent(JSON.stringify(newExpenses)),
		});
	};

	const updateExpense = (
		id: string,
		field: "name" | "amount",
		value: string,
	) => {
		const newExpenses = expenses.map((e) =>
			e.id === id ? { ...e, [field]: value } : e,
		);
		setExpenses(newExpenses);
	};

	const syncExpensesToUrl = () => {
		updateUrl({
			expenses: encodeURIComponent(JSON.stringify(expenses)),
		});
	};

	const chartData = [
		{ name: "Expenses", value: totalExpenses, color: "var(--primary)" },
		{ name: "SSS", value: result.sss, color: "#f57c00" },
		{ name: "PhilHealth", value: result.philhealth, color: "#0288d1" },
		{ name: "Pag-IBIG", value: result.pagibig, color: "#7b1fa2" },
		{ name: "Tax", value: result.tax, color: "#d32f2f" },
	].filter((item) => item.value > 0);

	const expenseChartData = expenses
		.filter((e) => (parseFloat(e.amount) || 0) > 0)
		.map((e, i) => ({
			name: e.name || `Expense ${i + 1}`,
			value: parseFloat(e.amount) || 0,
			color: [
				"#1b5e20",
				"#2e7d32",
				"#388e3c",
				"#43a047",
				"#4caf50",
				"#66bb6a",
				"#81c784",
				"#a5d6a7",
				"#c8e6c9",
				"#e8f5e9",
			][i % 10],
		}));

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="1234567890"
			/>

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				{/* Input Card */}
				<div className="card">
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						{t("detailsTitle")}
					</h2>

					{/* Expense List */}
					<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
						{expenses.map((expense, index) => (
							<div
								key={expense.id}
								style={{
									display: "flex",
									gap: "8px",
									alignItems: "center",
								}}
							>
								<input
									type="text"
									className="form-control"
									value={expense.name}
									onChange={(e) =>
										updateExpense(expense.id, "name", e.target.value)
									}
									onBlur={syncExpensesToUrl}
									placeholder={t("expenseNamePlaceholder")}
									style={{ flex: 2, fontSize: "14px" }}
								/>
								<div style={{ position: "relative", flex: 1 }}>
									<span
										style={{
											position: "absolute",
											left: "10px",
											top: "50%",
											transform: "translateY(-50%)",
											color: "var(--text-secondary)",
											fontSize: "14px",
											pointerEvents: "none",
										}}
									>
										₱
									</span>
									<input
										type="number"
										className="form-control"
										value={expense.amount}
										onChange={(e) =>
											updateExpense(expense.id, "amount", e.target.value)
										}
										onBlur={syncExpensesToUrl}
										placeholder={t("expenseAmountPlaceholder")}
										min="0"
										step="any"
										style={{ fontSize: "14px", paddingLeft: "24px" }}
									/>
								</div>
								<button
									onClick={() => removeExpense(expense.id)}
									style={{
										background: "none",
										border: "none",
										color: "#b71c1c",
										cursor: "pointer",
										fontSize: "18px",
										padding: "4px 8px",
										borderRadius: "4px",
										lineHeight: 1,
									}}
									title="Remove"
									aria-label={`Remove expense ${expense.name || index + 1}`}
								>
									✕
								</button>
							</div>
						))}
					</div>

					<button
						onClick={addExpense}
						className="btn-secondary"
						style={{
							width: "100%",
							marginTop: "12px",
							fontSize: "14px",
							padding: "10px",
						}}
					>
						{t("addExpenseButton")}
					</button>

					{/* Extra discretionary income */}
					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="extra-net">
							{t("extraSavingsLabel")}
						</label>
						<input
							type="number"
							id="extra-net"
							className="form-control"
							value={extraNet}
							onChange={(e) => {
								setExtraNet(e.target.value);
								updateUrl({ extra: e.target.value });
							}}
							min="0"
							step="any"
							placeholder="e.g., 5000"
						/>
						<span className="form-hint">{t("extraSavingsHint")}</span>
					</div>

					{/* Expense Breakdown Donut */}
					{expenseChartData.length > 1 && mounted && (
						<div style={{ marginTop: "24px" }}>
							<h3
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									textTransform: "uppercase",
									marginBottom: "8px",
								}}
							>
								{t("expenseBreakdown")}
							</h3>
							<ResponsiveContainer width="100%" height={160}>
								<PieChart>
									<Pie
										data={expenseChartData}
										cx="50%"
										cy="50%"
										innerRadius={45}
										outerRadius={65}
										dataKey="value"
										paddingAngle={2}
										label={false}
									>
										{expenseChartData.map((entry, index) => (
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
										formatter={(value) => formatCurrency(Number(value))}
									/>
								</PieChart>
							</ResponsiveContainer>

							{/* Clean, Non-Truncated Legend List */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "8px",
									marginTop: "16px",
									padding: "12px",
									backgroundColor: "var(--bg-color)",
									border: "1px solid var(--border-color)",
									borderRadius: "var(--border-radius)",
								}}
							>
								{expenseChartData.map((item, idx) => (
									<div
										key={idx}
										style={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											fontSize: "12px",
										}}
									>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "8px",
												minWidth: 0,
											}}
										>
											<span
												style={{
													display: "inline-block",
													width: "8px",
													height: "8px",
													borderRadius: "50%",
													backgroundColor: item.color,
													flexShrink: 0,
												}}
											/>
											<span
												style={{
													color: "var(--text-secondary)",
													textOverflow: "ellipsis",
													overflow: "hidden",
													whiteSpace: "nowrap",
												}}
											>
												{item.name}
											</span>
										</div>
										<strong
											style={{
												color: "var(--text-primary)",
												flexShrink: 0,
												marginLeft: "8px",
											}}
										>
											{formatCurrency(item.value)} (
											{((item.value / totalExpenses) * 100).toFixed(0)}%)
										</strong>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Results Card */}
				<div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
							color: "var(--primary)",
						}}
					>
						{t("resultsTitle")}
					</h2>

					{/* Target Net */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "14px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("targetNetPayLabel")}
						</span>
						<strong>{formatCurrency(targetNetPay)}</strong>
					</div>

					{/* Deduction Breakdown */}
					<div
						style={{
							margin: "16px 0",
							padding: "16px 0",
							borderTop: "1px dashed var(--border-color)",
							borderBottom: "1px dashed var(--border-color)",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "12px",
								textTransform: "uppercase",
							}}
						>
							{t("estimatedDeductions")}
						</h3>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>SSS</span>
							<span style={{ color: "#f57c00" }}>
								+ {formatCurrency(result.sss)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>PhilHealth</span>
							<span style={{ color: "#1976d2" }}>
								+ {formatCurrency(result.philhealth)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>Pag-IBIG</span>
							<span style={{ color: "#d32f2f" }}>
								+ {formatCurrency(result.pagibig)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>Withholding Tax (BIR)</span>
							<span style={{ color: "#b71c1c" }}>
								+ {formatCurrency(result.tax)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "12px",
								paddingTop: "12px",
								borderTop: "1px solid var(--border-color)",
								fontSize: "14px",
								fontWeight: 600,
							}}
						>
							<span>{t("totalDeductions")}</span>
							<span>
								{formatCurrency(result.totalContributions + result.tax)}
							</span>
						</div>
					</div>

					{/* THE BIG NUMBER */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginTop: "16px",
							paddingTop: "16px",
							borderTop: "2px solid var(--border-color)",
							fontSize: "24px",
							fontWeight: 700,
							color: "var(--text-primary)",
						}}
					>
						<span style={{ fontSize: "16px" }}>{t("grossSalaryNeeded")}</span>
						<span style={{ color: "#1b5e20" }}>
							{formatCurrency(result.grossSalary)}
						</span>
					</div>

					<p
						style={{
							fontSize: "12px",
							color: "var(--text-secondary)",
							marginTop: "8px",
							textAlign: "right",
						}}
					>
						{t("minimumSalaryTip")}
					</p>

					{/* Salary Split Chart */}
					{chartData.length > 0 && mounted && (
						<div style={{ marginTop: "24px" }}>
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "16px",
									color: "var(--text-primary)",
								}}
							>
								{t("whereSalaryGoes")}
							</h3>
							<ResponsiveContainer width="100%" height={200}>
								<PieChart>
									<Pie
										data={chartData}
										cx="50%"
										cy="50%"
										innerRadius={55}
										outerRadius={80}
										dataKey="value"
										paddingAngle={2}
										label={false}
									>
										{chartData.map((entry, index) => (
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
										formatter={(value) => formatCurrency(Number(value))}
									/>
								</PieChart>
							</ResponsiveContainer>

							{/* Clean Deduction Legend Grid */}
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "12px",
									justifyContent: "center",
									marginTop: "16px",
									padding: "12px",
									backgroundColor: "var(--bg-color)",
									border: "1px solid var(--border-color)",
									borderRadius: "var(--border-radius)",
								}}
							>
								{chartData.map((item, idx) => (
									<div
										key={idx}
										style={{
											display: "flex",
											alignItems: "center",
											gap: "6px",
											fontSize: "12px",
										}}
									>
										<span
											style={{
												display: "inline-block",
												width: "8px",
												height: "8px",
												borderRadius: "50%",
												backgroundColor: item.color,
												flexShrink: 0,
											}}
										/>
										<span style={{ color: "var(--text-secondary)" }}>
											{item.name}:{" "}
											<strong style={{ color: "var(--text-primary)" }}>
												{(
													(item.value / (result.grossSalary || 1)) *
													100
												).toFixed(1)}
												%
											</strong>
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* How It Works */}
					<div
						className="card"
						style={{
							backgroundColor: "var(--bg-color)",
							border: "1px solid var(--border-color)",
							borderLeft: "4px solid var(--primary)",
							marginTop: "24px",
						}}
					>
						<h3
							style={{
								fontSize: "14px",
								marginBottom: "8px",
								color: "var(--primary)",
							}}
						>
							💡 {t("howItWorksTitle")}
						</h3>
						<p
							style={{
								fontSize: "13px",
								color: "var(--text-secondary)",
								lineHeight: 1.6,
								margin: 0,
							}}
						>
							{t("howItWorksDesc")}
						</p>
					</div>

					<p
						style={{
							fontSize: "12px",
							color: "var(--text-secondary)",
							marginTop: "16px",
							fontStyle: "italic",
						}}
					>
						{t("disclaimer")}
					</p>
				</div>
			</div>
		</ToolLayout>
	);
}
