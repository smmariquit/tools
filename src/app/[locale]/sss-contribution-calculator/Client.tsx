"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SSSCalculator() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [salaryStr, setSalaryStr] = useState(
		searchParams.get("salary") || "30000",
	);
	const [memberType, setMemberType] = useState(
		searchParams.get("type") || "employed",
	); // 'employed' or 'voluntary'
	const [mounted, setMounted] = useState(false);
	const [isTableExpanded, setIsTableExpanded] = useState(false);

	const updateUrl = (updates: Record<string, string>) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value) {
				newSearchParams.set(key, value);
			} else {
				newSearchParams.delete(key);
			}
		}
		router.replace(`${pathname}?${newSearchParams.toString()}`, {
			scroll: false,
		});
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const salary = parseFloat(salaryStr) || 0;

	// SSS Calculation Logic (2026 Table)
	// MSC increments by 500 in the official table, but for a calculator, standard capping is accurate enough
	// to get the exact MSC bracket.
	// Official SSS brackets round to the nearest 500.
	const getMSC = (salary: number) => {
		if (salary === 0) return 0;
		if (salary < 5000) return 5000;
		if (salary >= 34750) return 35000; // Anything above 34,750 falls into the max 35,000 bracket
		// Round to nearest 500
		return Math.round(salary / 500) * 500;
	};

	const msc = getMSC(salary);

	// Base MSC capped at 20,000 for regular SSS, anything above goes to MPF (WISP)
	const regularMSC = Math.min(msc, 20000);
	const mpfMSC = Math.max(0, msc - 20000);

	let eeRegular = 0,
		eeMPF = 0,
		erRegular = 0,
		erMPF = 0,
		ecFee = 0;

	if (msc > 0) {
		if (memberType === "employed") {
			eeRegular = regularMSC * 0.05;
			eeMPF = mpfMSC * 0.05;

			erRegular = regularMSC * 0.1;
			erMPF = mpfMSC * 0.1;

			ecFee = msc < 15000 ? 10 : 30;
		} else {
			// Voluntary / Self-Employed pays the full 15%
			eeRegular = regularMSC * 0.15;
			eeMPF = mpfMSC * 0.15;
		}
	}

	const eeTotal = eeRegular + eeMPF;
	const erTotal = erRegular + erMPF + ecFee;
	const grandTotal = eeTotal + erTotal;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const chartData = [
		{
			name: "SSS Breakdown",
			"Employee Share": eeTotal,
			"Employer Share": erTotal,
		},
	];

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="SSS Contribution Calculator (2026)"
				subtitle="See your exact SSS breakdown (EE/ER/EC/MPF) based on the latest 15% table."
				adSlotId="0987654321"
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
						Your Details
					</h2>

					<div className="form-group">
						<label className="form-label" htmlFor="memberType">
							Membership Type
						</label>
						<select
							id="memberType"
							className="form-control"
							value={memberType}
							onChange={(e) => {
								setMemberType(e.target.value);
								updateUrl({ type: e.target.value });
							}}
							style={{
								backgroundColor: "var(--surface-color)",
								cursor: "pointer",
							}}
						>
							<option value="employed">Private Employee</option>
							<option value="voluntary">Voluntary / Self-Employed / OFW</option>
						</select>
					</div>

					<InteractiveSlider
						label="Basic Monthly Salary (PHP)"
						value={salary}
						min={0}
						max={150000}
						step={1000}
						onChange={(val) => {
							setSalaryStr(val.toString());
							updateUrl({ salary: val.toString() });
						}}
						hint="Input your basic pay excluding allowances and overtime."
					/>
					{salary > 0 && salary < 5000 && (
						<div style={{ marginTop: "12px" }}>
							<TipCard title="Minimum Contribution Applied">
								Below MSC floor — minimum MSC of ₱5,000 applies
							</TipCard>
						</div>
					)}
					{salary >= 34750 && (
						<div style={{ marginTop: "12px" }}>
							<TipCard title="Maximum Contribution Reached">
								Above MSC ceiling — maximum MSC of ₱35,000 applies
							</TipCard>
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
						Contribution Breakdown
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							padding: "12px",
							backgroundColor: "var(--surface-color)",
							borderRadius: "var(--border-radius-sm)",
							border: "1px solid var(--border-color)",
						}}
					>
						<span style={{ fontWeight: 500 }}>Monthly Salary Credit (MSC)</span>
						<strong style={{ color: "var(--primary)" }}>
							{formatCurrency(msc)}
						</strong>
					</div>
					{msc >= 35000 && (
						<p
							style={{
								fontSize: "12px",
								color: "var(--text-secondary)",
								marginTop: "4px",
								marginBottom: "16px",
								textAlign: "right",
								fontStyle: "italic",
							}}
						>
							* By law, the maximum MSC is capped at ₱35,000.
						</p>
					)}
					{msc < 35000 && <div style={{ marginBottom: "16px" }}></div>}

					{/* Employee Share Section */}
					<div style={{ marginBottom: "20px" }}>
						<h3
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "8px",
								textTransform: "uppercase",
							}}
						>
							{memberType === "employed"
								? "Employee Share (Your Deduction)"
								: "Your Total Contribution"}
						</h3>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "4px",
								fontSize: "14px",
							}}
						>
							<span>
								Regular SSS ({memberType === "employed" ? "5%" : "15%"})
							</span>
							<span>{formatCurrency(eeRegular)}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>Mandatory Provident Fund (MPF)</span>
							<span>{formatCurrency(eeMPF)}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								paddingTop: "8px",
								borderTop: "1px dashed var(--border-color)",
								fontSize: "16px",
								fontWeight: 600,
							}}
						>
							<span>
								Total {memberType === "employed" ? "Employee" : ""} Share
							</span>
							<span style={{ color: "#b71c1c" }}>
								{formatCurrency(eeTotal)}
							</span>
						</div>
					</div>

					{/* Employer Share Section */}
					{memberType === "employed" && (
						<div style={{ marginBottom: "20px" }}>
							<h3
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "8px",
									textTransform: "uppercase",
								}}
							>
								Employer Share (Company Pays)
							</h3>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "4px",
									fontSize: "14px",
								}}
							>
								<span>Regular SSS (10%)</span>
								<span>{formatCurrency(erRegular)}</span>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "4px",
									fontSize: "14px",
								}}
							>
								<span>Mandatory Provident Fund (MPF)</span>
								<span>{formatCurrency(erMPF)}</span>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>EC (Employees&apos; Compensation)</span>
								<span>{formatCurrency(ecFee)}</span>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									paddingTop: "8px",
									borderTop: "1px dashed var(--border-color)",
									fontSize: "16px",
									fontWeight: 600,
								}}
							>
								<span>Total Employer Share</span>
								<span style={{ color: "var(--text-primary)" }}>
									{formatCurrency(erTotal)}
								</span>
							</div>
						</div>
					)}

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: "16px",
							paddingTop: "16px",
							borderTop: "2px solid var(--border-color)",
							fontSize: "20px",
							fontWeight: 700,
							color: "var(--text-primary)",
						}}
					>
						<span>Total Remittance to SSS</span>
						<span style={{ color: "#1b5e20" }}>
							{formatCurrency(grandTotal)}
						</span>
					</div>
				</div>
			</div>

			{/* Recharts Visualization */}
			{mounted && grandTotal > 0 && (
				<div className="card" style={{ marginTop: "24px", padding: "24px" }}>
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							textAlign: "center",
						}}
					>
						Contribution Distribution
					</h2>
					<div style={{ width: "100%", height: 300 }}>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={chartData}
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
									formatter={(value) => formatCurrency(Number(value) || 0)}
								/>
								<Legend
									formatter={(value) => (
										<span
											style={{ color: "var(--text-primary)", fontSize: "12px" }}
										>
											{value}
										</span>
									)}
								/>
								<Bar
									dataKey="Employee Share"
									stackId="a"
									fill="var(--primary)"
								/>
								{memberType === "employed" && (
									<Bar dataKey="Employer Share" stackId="a" fill="#7c4dff" />
								)}
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			)}

			{/* Interactive SSS Contribution Table */}
			<div
				style={{
					marginTop: "48px",
					paddingTop: "32px",
					borderTop: "1px solid var(--border-color)",
					color: "var(--text-primary)",
				}}
			>
				<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
					Complete 2026 SSS Contribution Table
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Your MSC bracket is <strong>highlighted</strong> below. The total
					contribution rate is 15% (5% Employee + 10% Employer for private
					employees).
				</p>

				<div style={{ overflowX: "auto", marginBottom: "24px" }}>
					<table
						style={{
							width: "100%",
							borderCollapse: "collapse",
							fontSize: "15px",
						}}
					>
						<thead>
							<tr
								style={{
									borderBottom: "2px solid var(--border-color)",
									textAlign: "right",
								}}
							>
								<th style={{ padding: "14px 12px", textAlign: "left" }}>
									Salary Range
								</th>
								<th style={{ padding: "14px 12px" }}>MSC</th>
								<th style={{ padding: "14px 12px" }}>EE (5%)</th>
								<th style={{ padding: "14px 12px" }}>ER (10%)</th>
								<th style={{ padding: "14px 12px" }}>EC</th>
								<th style={{ padding: "14px 12px", fontWeight: 700 }}>Total</th>
							</tr>
						</thead>
						<tbody>
							{(() => {
								const rows = [];
								const mscValues = [
									5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500,
									10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000,
									14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500,
									19000, 19500, 20000, 20500, 21000, 21500, 22000, 22500, 23000,
									23500, 24000, 24500, 25000, 25500, 26000, 26500, 27000, 27500,
									28000, 28500, 29000, 29500, 30000, 30500, 31000, 31500, 32000,
									32500, 33000, 33500, 34000, 34500, 35000,
								];

								const activeIndex = mscValues.indexOf(msc);
								const startIndex = isTableExpanded
									? 0
									: Math.max(0, activeIndex - 2);
								const endIndex = isTableExpanded
									? mscValues.length
									: Math.min(mscValues.length, activeIndex + 3);

								if (!isTableExpanded && startIndex > 0) {
									rows.push(
										<tr key="ellipsis-top">
											<td
												colSpan={6}
												style={{
													textAlign: "center",
													padding: "12px",
													color: "var(--text-secondary)",
												}}
											>
												...
											</td>
										</tr>,
									);
								}

								for (let i = 0; i < mscValues.length; i++) {
									const currentMSC = mscValues[i];
									const low = i === 0 ? 0 : mscValues[i - 1] + 250.01;
									const high =
										i === mscValues.length - 1 ? Infinity : currentMSC + 249.99;

									if (!isTableExpanded && (i < startIndex || i >= endIndex))
										continue;

									const isActive = currentMSC === msc;

									const regMSC = Math.min(currentMSC, 20000);
									const mpf = Math.max(0, currentMSC - 20000);
									const ee = regMSC * 0.05 + mpf * 0.05;
									const er = regMSC * 0.1 + mpf * 0.1;
									const ec = currentMSC < 15000 ? 10 : 30;
									const total = ee + er + ec;

									const label =
										i === 0
											? "Below ₱5,250"
											: i === mscValues.length - 1
												? "₱34,750 and above"
												: `₱${(low).toLocaleString(undefined, { maximumFractionDigits: 0 })} – ₱${(high).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

									rows.push(
										<tr
											key={currentMSC}
											style={{
												borderBottom: "1px solid var(--border-color)",
												textAlign: "right",
												backgroundColor: isActive
													? "rgba(13, 71, 161, 0.12)"
													: "transparent",
												fontWeight: isActive ? 700 : 400,
												transition: "background-color 0.2s ease",
											}}
										>
											<td
												style={{
													padding: "12px 10px",
													textAlign: "left",
													whiteSpace: "nowrap",
												}}
											>
												{isActive && (
													<span
														style={{
															color: "var(--primary)",
															marginRight: "6px",
															fontWeight: 800,
														}}
													>
														
													</span>
												)}
												{label}
											</td>
											<td
												style={{
													padding: "12px 10px",
													color: isActive ? "var(--primary)" : "inherit",
												}}
											>
												{formatCurrency(currentMSC)}
											</td>
											<td
												style={{
													padding: "12px 10px",
													color: isActive ? "var(--primary)" : "inherit",
												}}
											>
												{formatCurrency(ee)}
											</td>
											<td style={{ padding: "12px 10px" }}>
												{formatCurrency(er)}
											</td>
											<td style={{ padding: "12px 10px" }}>
												{formatCurrency(ec)}
											</td>
											<td
												style={{
													padding: "12px 10px",
													fontWeight: isActive ? 700 : 600,
													color: isActive ? "var(--primary)" : "inherit",
												}}
											>
												{formatCurrency(total)}
											</td>
										</tr>,
									);
								}

								if (!isTableExpanded && endIndex < mscValues.length) {
									rows.push(
										<tr key="ellipsis-bottom">
											<td
												colSpan={6}
												style={{
													textAlign: "center",
													padding: "12px",
													color: "var(--text-secondary)",
												}}
											>
												...
											</td>
										</tr>,
									);
								}

								return rows;
							})()}
						</tbody>
					</table>
				</div>

				<div style={{ textAlign: "center", marginBottom: "24px" }}>
					<button
						className="btn-secondary"
						onClick={() => setIsTableExpanded(!isTableExpanded)}
					>
						{isTableExpanded ? "Collapse Table" : "View Full SSS Table"}
					</button>
				</div>

				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					For Private Employees
				</h3>
				<ul
					style={{
						paddingLeft: "24px",
						marginBottom: "16px",
						lineHeight: "1.6",
					}}
				>
					<li>
						<strong>Employee Share:</strong> 5% of your MSC is deducted from
						your salary.
					</li>
					<li>
						<strong>Employer Share:</strong> 10% of your MSC is paid by your
						employer.
					</li>
					<li>
						<strong>EC Fee:</strong> Your employer also pays the Employees&apos;
						Compensation (EC) fee, which is ₱10 for MSCs below ₱15,000, and ₱30
						for MSCs ₱15,000 and above.
					</li>
				</ul>

				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					The Mandatory Provident Fund (MPF / WISP)
				</h3>
				<p style={{ marginBottom: "16px" }}>
					Also known as the Workers&apos; Investment and Savings Program (WISP),
					the MPF is an automatic retirement savings program for members with a
					Monthly Salary Credit exceeding ₱20,000. Any portion of your MSC
					between ₱20,000 and the ₱35,000 ceiling goes directly into this fund,
					which earns tax-free dividends.
				</p>
			</div>
		</ToolLayout>
	);
}
