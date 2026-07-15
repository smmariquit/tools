"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function RtbClient() {
	const t = useTranslations("RetailTreasuryBond");
	const [investment, setInvestment] = useState(100000);
	const [couponRate, setCouponRate] = useState(6.25);
	const [years, setYears] = useState(5);

	const grossAnnualYield = investment * (couponRate / 100);
	const finalWithholdingTax = grossAnnualYield * 0.2;
	const netAnnualYield = grossAnnualYield - finalWithholdingTax;

	const netQuarterlyPayout = netAnnualYield / 4;
	const totalNetEarnings = netAnnualYield * years;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader title={t("title")} subtitle={t("subtitle")} />

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							{t("bondDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("investmentLabel")}</label>
							<input
								type="number"
								className="form-control"
								value={investment || ""}
								onChange={(e) => setInvestment(Number(e.target.value))}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("couponRateLabel")}</label>
							<input
								type="number"
								step="0.01"
								className="form-control"
								value={couponRate || ""}
								onChange={(e) => setCouponRate(Number(e.target.value))}
							/>
						</div>

						<div className="form-group">
							<label className="form-label">{t("holdingPeriodLabel")}</label>
							<input
								type="number"
								className="form-control"
								value={years || ""}
								onChange={(e) => setYears(Number(e.target.value))}
							/>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div
						className="card"
						style={{
							position: "sticky",
							top: "100px",
							backgroundColor: "var(--bg-color)",
						}}
					>
						<h2
							style={{
								fontSize: "20px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							{t("yieldComputation")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("grossAnnualYield")}</span>
							<strong>{formatPHP(grossAnnualYield)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
								color: "red",
							}}
						>
							<span>{t("lessWithholdingTax")}</span>
							<span>- {formatPHP(finalWithholdingTax)}</span>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(16, 185, 129, 0.05)",
								border: "1px solid rgba(16, 185, 129, 0.2)",
								borderRadius: "8px",
								marginBottom: "16px",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "16px",
									fontWeight: "bold",
									color: "var(--primary)",
								}}
							>
								<span>{t("netQuarterlyPayout")}</span>
								<span>{formatPHP(netQuarterlyPayout)}</span>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								fontSize: "14px",
							}}
						>
							<span>{t("netAnnualPayout")}</span>
							<strong>{formatPHP(netAnnualYield)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								fontSize: "14px",
								marginTop: "8px",
							}}
						>
							<span>{t("totalEarnings", { years })}</span>
							<strong>{formatPHP(totalNetEarnings)}</strong>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
