"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolLayout from "../components/ToolLayout";

export default function PhilHealthClient() {
	const t = useTranslations("PhilHealthCalculator");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [basicSalaryStr, setBasicSalaryStr] = useState(
		searchParams.get("salary") || "30000",
	);

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

	const basicSalary = parseFloat(basicSalaryStr) || 0;

	// PhilHealth 2026 Rates (5% premium rate, 10k floor, 100k ceiling)
	const premiumRate = 0.05;
	const floorSalary = 10000;
	const ceilingSalary = 100000;

	let applicableSalary = basicSalary;
	if (basicSalary === 0) applicableSalary = 0;
	else if (basicSalary < floorSalary) applicableSalary = floorSalary;
	else if (basicSalary > ceilingSalary) applicableSalary = ceilingSalary;

	const totalPremium = applicableSalary * premiumRate;
	const employeeShare = totalPremium / 2;
	const employerShare = totalPremium / 2;

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

				<AdBanner dataAdSlot="philhealth-top" />

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
							{t("inputTitle")}
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
						{basicSalary > 0 && basicSalary < floorSalary && (
							<div
								style={{
									marginTop: "8px",
									padding: "6px 10px",
									backgroundColor: "#fff3e0",
									borderRadius: "6px",
									fontSize: "12px",
									color: "#e65100",
									border: "1px solid #ffe0b2",
									display: "flex",
									alignItems: "center",
									gap: "6px",
								}}
							>
								<span>️</span> {t("belowFloorWarning")}
							</div>
						)}
						{basicSalary >= ceilingSalary && (
							<div
								style={{
									marginTop: "8px",
									padding: "6px 10px",
									backgroundColor: "#e3f2fd",
									borderRadius: "6px",
									fontSize: "12px",
									color: "#0d47a1",
									border: "1px solid #bbdefb",
									display: "flex",
									alignItems: "center",
									gap: "6px",
								}}
							>
								<span>️</span> {t("aboveCeilingWarning")}
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
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("totalPremium")}</span>
							<span>{formatCurrency(totalPremium)}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
							}}
						>
							<span>{t("employerShare")}</span>
							<span style={{ color: "var(--text-secondary)" }}>
								{formatCurrency(employerShare)}
							</span>
						</div>

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
							<span>{t("yourShare")}</span>
							<span style={{ color: "#b71c1c" }}>
								- {formatCurrency(employeeShare)}
							</span>
						</div>
					</div>
				</div>

				{/* Interactive Contribution Table */}
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
								fontSize: "13px",
							}}
						>
							<thead>
								<tr
									style={{
										borderBottom: "2px solid var(--border-color)",
										textAlign: "right",
									}}
								>
									<th style={{ padding: "10px 8px", textAlign: "left" }}>
										{t("colSalaryRange")}
									</th>
									<th style={{ padding: "10px 8px" }}>{t("colTotalPremium")}</th>
									<th style={{ padding: "10px 8px" }}>{t("colEmployeeShare")}</th>
									<th style={{ padding: "10px 8px" }}>{t("colEmployerShare")}</th>
								</tr>
							</thead>
							<tbody>
								{[
									{ min: 0, max: 10000, label: "₱10,000 and below" },
									{ min: 10001, max: 20000, label: "₱10,001 – ₱20,000" },
									{ min: 20001, max: 30000, label: "₱20,001 – ₱30,000" },
									{ min: 30001, max: 40000, label: "₱30,001 – ₱40,000" },
									{ min: 40001, max: 50000, label: "₱40,001 – ₱50,000" },
									{ min: 50001, max: 60000, label: "₱50,001 – ₱60,000" },
									{ min: 60001, max: 70000, label: "₱60,001 – ₱70,000" },
									{ min: 70001, max: 80000, label: "₱70,001 – ₱80,000" },
									{ min: 80001, max: 90000, label: "₱80,001 – ₱90,000" },
									{ min: 90001, max: 100000, label: "₱90,001 – ₱100,000" },
									{ min: 100001, max: Infinity, label: "₱100,001 and above" },
								].map((bracket) => {
									const isActive =
										basicSalary >= bracket.min && basicSalary <= bracket.max;
									const salForCalc =
										bracket.max === Infinity
											? 100000
											: bracket.min <= 10000
												? 10000
												: bracket.max;
									const premium = salForCalc * 0.05;
									const rangeLabel =
										bracket.min === 0
											? t("rangeAndBelow", { amount: "₱10,000" })
											: bracket.max === Infinity
												? t("rangeAndAbove", { amount: "₱100,001" })
												: bracket.label;
									return (
										<tr
											key={bracket.label}
											style={{
												borderBottom: "1px solid var(--border-color)",
												textAlign: "right",
												backgroundColor: isActive
													? "rgba(13, 71, 161, 0.08)"
													: "transparent",
												fontWeight: isActive ? 600 : 400,
												transition: "background-color 0.2s ease",
											}}
										>
											<td style={{ padding: "10px 8px", textAlign: "left" }}>
												{isActive && (
													<span
														style={{
															color: "var(--primary)",
															marginRight: "4px",
														}}
													>
														▸
													</span>
												)}
												{rangeLabel}
											</td>
											<td style={{ padding: "10px 8px" }}>
												{formatCurrency(premium)}
											</td>
											<td
												style={{
													padding: "10px 8px",
													color: isActive ? "#b71c1c" : "inherit",
												}}
											>
												{formatCurrency(premium / 2)}
											</td>
											<td
												style={{
													padding: "10px 8px",
													color: "var(--text-secondary)",
												}}
											>
												{formatCurrency(premium / 2)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					<ul
						style={{
							paddingLeft: "24px",
							marginBottom: "16px",
							lineHeight: "1.6",
							fontSize: "14px",
						}}
					>
						<li>
							<strong>{t("floorLabel")}</strong> {t("floorDesc")}
						</li>
						<li>
							<strong>{t("ceilingLabel")}</strong> {t("ceilingDesc")}
						</li>
						<li>
							<strong>{t("sharingLabel")}</strong> {t("sharingDesc")}
						</li>
					</ul>
					<div style={{ marginTop: "16px" }}>
						<TipCard title={t("tipTitle")}>{t("tipBody")}</TipCard>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
