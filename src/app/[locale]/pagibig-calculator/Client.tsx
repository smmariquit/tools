"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
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

export default function PagIbigClient() {
	const t = useTranslations("PagibigCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [basicSalaryStr, setBasicSalaryStr] = useState(
		searchParams.get("salary") || "20000",
	);
	const [mp2MonthlyStr, setMp2MonthlyStr] = useState(
		searchParams.get("mp2") || "1000",
	);
	const [dividendRateStr, setDividendRateStr] = useState(
		searchParams.get("rate") || "7",
	); // Historical avg is around 6-7%
	const [mounted, setMounted] = useState(false);

	const updateUrl = (updates: Record<string, string>) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value) newSearchParams.set(key, value);
			else newSearchParams.delete(key);
		}
		router.replace(`${pathname}?${newSearchParams.toString()}`, {
			scroll: false,
		});
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const basicSalary = parseFloat(basicSalaryStr) || 0;
	const mp2Monthly = parseFloat(mp2MonthlyStr) || 0;
	const dividendRate = parseFloat(dividendRateStr) || 0;

	// Regular Pag-IBIG Computation (2024/2026 update: 2% up to 10k max MFS = P200)
	const regularFundSalary = basicSalary > 0 ? Math.min(basicSalary, 10000) : 0;

	// Rate logic: 1% if basic salary <= 1500, else 2%. Employer always pays 2%.
	const employeeRate =
		basicSalary === 0 ? 0 : basicSalary <= 1500 ? 0.01 : 0.02;
	const employerRate = basicSalary === 0 ? 0 : 0.02;

	const regularEE = regularFundSalary * employeeRate;
	const regularER = regularFundSalary * employerRate;

	// MP2 Computation (5 Year Term, compounded annually)
	// Simplified compound interest for monthly deposits:
	// We calculate year by year to show the table.
	let cumulativeSavings = 0;
	let cumulativeDividends = 0;
	const annualDeposit = mp2Monthly * 12;
	const rate = dividendRate / 100;

	const mp2Table = [];
	for (let year = 1; year <= 5; year++) {
		cumulativeSavings += annualDeposit;
		// Average balance during the year gets half the interest for that year's deposits, plus full interest on previous balance
		const yearlyDividend = (cumulativeSavings - annualDeposit / 2) * rate;
		cumulativeDividends += yearlyDividend;
		cumulativeSavings += yearlyDividend; // Dividends are reinvested

		mp2Table.push({
			year,
			totalSaved: mp2Monthly * 12 * year,
			dividendsEarned: cumulativeDividends,
			totalValue: cumulativeSavings,
		});
	}

	const finalValue = mp2Table[4]?.totalValue || 0;
	const totalDividends = mp2Table[4]?.dividendsEarned || 0;
	const totalPrincipal = mp2Monthly * 12 * 5;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<ToolLayout maxWidth="1200px">
			<div style={{ width: "100%", margin: "0 auto" }}>
				<div style={{ marginBottom: "24px" }}>
					<BackButton style={{ marginBottom: "16px" }}>
						{t("backToTools")}
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">{t("subtitle")}</p>
				</div>

				<AdBanner dataAdSlot="pagibig-top" />

				<div className="tool-grid" style={{ marginTop: "24px" }}>
					{/* Input Card */}
					<div className="card" style={{ alignSelf: "start" }}>
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "8px",
							}}
						>
							{t("mandatoryTitle")}
						</h2>

						<InteractiveSlider
							label={t("salaryLabel")}
							value={basicSalary}
							min={0}
							max={150000}
							step={1000}
							onChange={(val) => {
								setBasicSalaryStr(val.toString());
								updateUrl({ salary: val.toString() });
							}}
							hint={t("salaryHint")}
						/>
						{basicSalary >= 10000 && (
							<div style={{ marginTop: "12px" }}>
								<TipCard title={t("maxTipTitle")}>{t("maxTipBody")}</TipCard>
							</div>
						)}

						<div
							style={{
								marginTop: "16px",
								padding: "16px",
								backgroundColor: "var(--bg-color)",
								borderRadius: "var(--border-radius)",
								border: "1px solid var(--border-color)",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									gap: "16px",
									marginBottom: "12px",
									fontSize: "14px",
								}}
							>
								<span style={{ color: "var(--text-secondary)" }}>
									{t("employeeShare")}
								</span>
								<strong style={{ color: "var(--primary)", fontSize: "16px" }}>
									{formatCurrency(regularEE)}
								</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									gap: "16px",
									fontSize: "14px",
								}}
							>
								<span style={{ color: "var(--text-secondary)" }}>
									{t("employerShare")}
								</span>
								<strong
									style={{ color: "var(--text-primary)", fontSize: "16px" }}
								>
									{formatCurrency(regularER)}
								</strong>
							</div>
						</div>

						<h2
							style={{
								fontSize: "18px",
								marginTop: "32px",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "8px",
							}}
						>
							{t("mp2Title")}
						</h2>

						<div className="form-group">
							<label className="form-label" htmlFor="mp2Monthly">
								{t("mp2DepositLabel")}
							</label>
							<input
								type="number"
								id="mp2Monthly"
								className="form-control"
								value={mp2MonthlyStr}
								onChange={(e) => {
									setMp2MonthlyStr(e.target.value);
									updateUrl({ mp2: e.target.value });
								}}
								min="500"
								step="500"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								{t("mp2DepositHint")}
							</p>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="dividendRate">
								{t("dividendRateLabel")}
							</label>
							<input
								type="number"
								id="dividendRate"
								className="form-control"
								value={dividendRateStr}
								onChange={(e) => {
									setDividendRateStr(e.target.value);
									updateUrl({ rate: e.target.value });
								}}
								min="1"
								max="15"
								step="0.1"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								{t("dividendRateHint")}
							</p>
						</div>
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
							{t("projectionTitle")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								padding: "16px",
								backgroundColor: "#e8f5e9",
								borderRadius: "var(--border-radius-md)",
								border: "1px solid #c8e6c9",
							}}
						>
							<div>
								<span
									style={{
										display: "block",
										fontSize: "14px",
										color: "#2e7d32",
										textTransform: "uppercase",
										fontWeight: 600,
										marginBottom: "4px",
									}}
								>
									{t("finalValueLabel")}
								</span>
								<strong
									style={{ fontSize: "28px", color: "#1b5e20", lineHeight: 1 }}
								>
									{formatCurrency(finalValue)}
								</strong>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("totalPrincipal")}</span>
							<span>{formatCurrency(totalPrincipal)}</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "24px",
								fontSize: "14px",
							}}
						>
							<span>{t("totalDividends")}</span>
							<span style={{ color: "#2e7d32", fontWeight: 600 }}>
								+ {formatCurrency(totalDividends)}
							</span>
						</div>

						{/* Visual Chart */}
						{mounted && (
							<div
								style={{
									height: "250px",
									marginTop: "32px",
									marginBottom: "16px",
								}}
							>
								<Chart
									data={mp2Table}
									formatValue={formatCurrency}
									formatYearTick={(tick) => t("yrTick", { year: String(tick) })}
									formatYearLabel={(label) =>
										t("yearLabel", { year: String(label) })
									}
									principalName={t("areaPrincipal")}
									dividendsName={t("areaDividends")}
								/>
							</div>
						)}

						{/* Table */}
						<div style={{ overflowX: "auto" }}>
							<table
								style={{
									width: "100%",
									borderCollapse: "collapse",
									fontSize: "14px",
								}}
							>
								<thead>
									<tr
										style={{
											borderBottom: "2px solid var(--border-color)",
											textAlign: "right",
										}}
									>
										<th style={{ padding: "8px 4px", textAlign: "left" }}>
											{t("colYear")}
										</th>
										<th style={{ padding: "8px 4px" }}>{t("colPrincipal")}</th>
										<th style={{ padding: "8px 4px" }}>{t("colDividends")}</th>
										<th style={{ padding: "8px 4px" }}>{t("colTotalValue")}</th>
									</tr>
								</thead>
								<tbody>
									{mp2Table.map((row) => (
										<tr
											key={row.year}
											style={{
												borderBottom: "1px solid var(--border-color)",
												textAlign: "right",
											}}
										>
											<td
												style={{
													padding: "12px 4px",
													textAlign: "left",
													fontWeight: 600,
												}}
											>
												{row.year}
											</td>
											<td
												style={{
													padding: "12px 4px",
													color: "var(--text-secondary)",
												}}
											>
												{formatCurrency(row.totalSaved)}
											</td>
											<td style={{ padding: "12px 4px", color: "#2e7d32" }}>
												{formatCurrency(row.dividendsEarned)}
											</td>
											<td style={{ padding: "12px 4px", fontWeight: 500 }}>
												{formatCurrency(row.totalValue)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
