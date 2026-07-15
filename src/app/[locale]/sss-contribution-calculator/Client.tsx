"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import InteractiveSlider from "../components/InteractiveSlider";
import SampleCases from "../components/SampleCases";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const Chart = dynamic(() => import("./Chart"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--text-secondary)",
			}}
		>
			…
		</div>
	),
});

export default function SSSCalculator() {
	const t = useTranslations("SSSContribution");
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

	const applyCase = (salary: string, type: string) => {
		setSalaryStr(salary);
		setMemberType(type);
		updateUrl({ salary, type });
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

	const eeChartLabel = t("chartEmployeeShare");
	const erChartLabel = t("chartEmployerShare");
	const chartData = [
		{
			name: "SSS Breakdown",
			[eeChartLabel]: eeTotal,
			[erChartLabel]: erTotal,
		},
	];

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
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
						{t("inputTitle")}
					</h2>

					<SampleCases
						cases={[
							{
								label: "Minimum wage (~₱15k)",
								onSelect: () => applyCase("15000", "employed"),
							},
							{
								label: "Mid-level (₱25k)",
								onSelect: () => applyCase("25000", "employed"),
							},
							{
								label: "Above MSC cap (₱40k gross)",
								onSelect: () => applyCase("40000", "employed"),
							},
							{
								label: "Voluntary / OFW (₱25k)",
								onSelect: () => applyCase("25000", "voluntary"),
							},
						]}
					/>

					<div className="form-group">
						<label className="form-label" htmlFor="memberType">
							{t("membershipType")}
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
							<option value="employed">{t("memberEmployed")}</option>
							<option value="voluntary">{t("memberVoluntary")}</option>
						</select>
					</div>

					<InteractiveSlider
						label={t("salaryLabel")}
						value={salary}
						min={0}
						max={150000}
						step={1000}
						onChange={(val) => {
							setSalaryStr(val.toString());
							updateUrl({ salary: val.toString() });
						}}
						hint={t("salaryHint")}
					/>
					{salary > 0 && salary < 5000 && (
						<div style={{ marginTop: "12px" }}>
							<TipCard title={t("minTipTitle")}>{t("minTipBody")}</TipCard>
						</div>
					)}
					{salary >= 34750 && (
						<div style={{ marginTop: "12px" }}>
							<TipCard title={t("maxTipTitle")}>{t("maxTipBody")}</TipCard>
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
						{t("breakdownTitle")}
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
						<span style={{ fontWeight: 500 }}>{t("mscLabel")}</span>
						<strong style={{ color: "var(--primary)" }}>
							{formatCurrency(msc)}
						</strong>
					</div>
					{msc >= 35000 && (
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginTop: "4px",
								marginBottom: "16px",
								textAlign: "right",
								fontStyle: "italic",
							}}
						>
							{t("mscCapNote")}
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
								? t("employeeShareTitle")
								: t("yourTotalContribution")}
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
								{t("regularSss", {
									rate: memberType === "employed" ? "5%" : "15%",
								})}
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
							<span>{t("mpf")}</span>
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
								{memberType === "employed"
									? t("totalEmployeeShare")
									: t("totalShare")}
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
								{t("employerShareTitle")}
							</h3>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "4px",
									fontSize: "14px",
								}}
							>
								<span>{t("regularSssEr")}</span>
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
								<span>{t("mpf")}</span>
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
								<span>{t("ec")}</span>
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
								<span>{t("totalEmployerShare")}</span>
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
						<span>{t("totalRemittance")}</span>
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
						{t("chartTitle")}
					</h2>
					<div style={{ width: "100%", height: 300 }}>
						<Chart
							data={chartData}
							eeKey={eeChartLabel}
							erKey={erChartLabel}
							showEr={memberType === "employed"}
							formatValue={formatCurrency}
						/>
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
					{t("tableTitle")}
				</h2>
				<p style={{ marginBottom: "16px" }}>
					{t.rich("tableIntro", {
						b: (chunks) => <strong>{chunks}</strong>,
					})}
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
									{t("colSalaryRange")}
								</th>
								<th style={{ padding: "14px 12px" }}>{t("colMsc")}</th>
								<th style={{ padding: "14px 12px" }}>{t("colEe")}</th>
								<th style={{ padding: "14px 12px" }}>{t("colEr")}</th>
								<th style={{ padding: "14px 12px" }}>{t("colEc")}</th>
								<th style={{ padding: "14px 12px", fontWeight: 700 }}>
									{t("colTotal")}
								</th>
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
											? t("rowBelow", { amount: "₱5,250" })
											: i === mscValues.length - 1
												? t("rowAndAbove", { amount: "₱34,750" })
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
													></span>
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
						{isTableExpanded ? t("collapseTable") : t("viewFullTable")}
					</button>
				</div>
			</div>
		</ToolLayout>
	);
}
