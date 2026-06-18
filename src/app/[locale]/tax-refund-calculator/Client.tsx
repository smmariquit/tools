"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function TaxRefundClient() {
	const t = useTranslations("TaxRefund");
	const [grossAnnual, setGrossAnnual] = useState(600000);
	const [mandatoryContributions, setMandatoryContributions] = useState(25000);
	const [bonuses, setBonuses] = useState(85000);
	const [taxWithheldYTD, setTaxWithheldYTD] = useState(45000);

	const taxExemptBonuses = Math.min(bonuses, 90000);
	
	const taxableIncome = grossAnnual - mandatoryContributions - taxExemptBonuses;
	let annualTaxDue = 0;

	if (taxableIncome <= 250000) annualTaxDue = 0;
	else if (taxableIncome <= 400000) annualTaxDue = (taxableIncome - 250000) * 0.15;
	else if (taxableIncome <= 800000) annualTaxDue = 22500 + (taxableIncome - 400000) * 0.20;
	else if (taxableIncome <= 2000000) annualTaxDue = 102500 + (taxableIncome - 800000) * 0.25;
	else if (taxableIncome <= 8000000) annualTaxDue = 402500 + (taxableIncome - 2000000) * 0.30;
	else annualTaxDue = 2202500 + (taxableIncome - 8000000) * 0.35;

	const taxRefund = taxWithheldYTD - annualTaxDue;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>{t("annualFinancials")}</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("grossAnnualLabel")}</label>
							<input type="number" className="form-control" value={grossAnnual || ""} onChange={(e) => setGrossAnnual(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("mandatoryContributionsLabel")}</label>
							<input type="number" className="form-control" value={mandatoryContributions || ""} onChange={(e) => setMandatoryContributions(Number(e.target.value))} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">{t("bonusesLabel")}</label>
							<input type="number" className="form-control" value={bonuses || ""} onChange={(e) => setBonuses(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
								{t("bonusesHint")}
							</p>
						</div>

						<div className="form-group">
							<label className="form-label">{t("taxWithheldLabel")}</label>
							<input type="number" className="form-control" value={taxWithheldYTD || ""} onChange={(e) => setTaxWithheldYTD(Number(e.target.value))} />
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>{t("resultsTitle")}</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>{t("netTaxableIncome")}</span>
							<strong>{formatPHP(taxableIncome)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px", color: "var(--text-secondary)" }}>
							<span>{t("actualAnnualTaxDue")}</span>
							<span>{formatPHP(annualTaxDue)}</span>
						</div>

						<div style={{ padding: "16px", backgroundColor: taxRefund >= 0 ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)", border: taxRefund >= 0 ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", marginBottom: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
								<span>{t("taxesAlreadyPaid")}</span>
								<strong>{formatPHP(taxWithheldYTD)}</strong>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
								<span>{taxRefund >= 0 ? t("taxRefundDue") : t("additionalTaxPayable")}</span>
								<strong style={{ color: taxRefund >= 0 ? "var(--primary)" : "red" }}>{formatPHP(Math.abs(taxRefund))}</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
