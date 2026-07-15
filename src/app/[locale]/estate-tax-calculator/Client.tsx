"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function EstateTaxClient() {
	const t = useTranslations("EstateTax");
	const [grossEstate, setGrossEstate] = useState(15000000);
	const [familyHome, setFamilyHome] = useState(8000000);
	const [medicalExpenses, setMedicalExpenses] = useState(500000);
	const [otherDeductions, setOtherDeductions] = useState(0);

	const STANDARD_DEDUCTION = 5000000;
	const allowedFamilyHome = Math.min(familyHome, 10000000);
	const allowedMedical = Math.min(medicalExpenses, 500000);

	const totalDeductions =
		STANDARD_DEDUCTION + allowedFamilyHome + allowedMedical + otherDeductions;
	const netEstate = Math.max(0, grossEstate - totalDeductions);
	const estateTaxDue = netEstate * 0.06;

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
							{t("estateDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-grossEstateLabel">
								{t("grossEstateLabel")}
							</label>
							<input
								id="f-grossEstateLabel"
								type="number"
								className="form-control"
								value={grossEstate || ""}
								onChange={(e) => setGrossEstate(Number(e.target.value))}
							/>
						</div>

						<h2
							style={{
								fontSize: "16px",
								marginBottom: "12px",
								marginTop: "24px",
								color: "var(--primary)",
							}}
						>
							{t("deductions")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-field-2">
								{t("standardDeductionLabel")}
							</label>
							<input
								id="f-field-2"
								type="text"
								className="form-control"
								value="₱ 5,000,000.00"
								disabled
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-familyHomeLabel">
								{t("familyHomeLabel")}
							</label>
							<input
								id="f-familyHomeLabel"
								type="number"
								className="form-control"
								value={familyHome || ""}
								onChange={(e) => setFamilyHome(Number(e.target.value))}
							/>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "4px",
								}}
							>
								{t("familyHomeHint")}
							</p>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-medicalLabel">
								{t("medicalLabel")}
							</label>
							<input
								id="f-medicalLabel"
								type="number"
								className="form-control"
								value={medicalExpenses || ""}
								onChange={(e) => setMedicalExpenses(Number(e.target.value))}
							/>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "4px",
								}}
							>
								{t("medicalHint")}
							</p>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="f-otherDeductionsLabel">
								{t("otherDeductionsLabel")}
							</label>
							<input
								id="f-otherDeductionsLabel"
								type="number"
								className="form-control"
								value={otherDeductions || ""}
								onChange={(e) => setOtherDeductions(Number(e.target.value))}
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
							{t("resultsTitle")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("grossEstate")}</span>
							<strong>{formatPHP(grossEstate)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
								color: "red",
							}}
						>
							<span>{t("totalDeductions")}</span>
							<span>- {formatPHP(totalDeductions)}</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
							}}
						>
							<span>{t("netTaxableEstate")}</span>
							<strong>{formatPHP(netEstate)}</strong>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								paddingTop: "12px",
								borderTop: "1px dashed rgba(13, 71, 161, 0.2)",
								fontSize: "18px",
								fontWeight: 700,
								color: "var(--primary)",
							}}
						>
							<span>{t("estateTaxDue")}</span>
							<span>{formatPHP(estateTaxDue)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
