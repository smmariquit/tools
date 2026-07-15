"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";
import TrustBadge from "../../components/TrustBadge";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function DonorsTaxClient() {
	const t = useTranslations("BIRDonorsTax");
	const [priorGifts, setPriorGifts] = useState(0);
	const [newGift, setNewGift] = useState(0);
	const [deductions, setDeductions] = useState(0);

	const netNewGift = Math.max(0, newGift - deductions);
	const totalCumulativeGifts = priorGifts + netNewGift;

	const EXEMPT_THRESHOLD = 250000;

	const taxableCumulative = Math.max(
		0,
		totalCumulativeGifts - EXEMPT_THRESHOLD,
	);
	const totalTaxDue = taxableCumulative * 0.06;

	const priorTaxable = Math.max(0, priorGifts - EXEMPT_THRESHOLD);
	const priorTaxPaid = priorTaxable * 0.06;

	const taxPayableNow = Math.max(0, totalTaxDue - priorTaxPaid);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader title={t("title")} subtitle={t("subtitle")} />

			<div style={{ marginTop: "24px", width: "100%" }}>
				<TrustBadge year={2026} lastReviewed="May 2026" />
			</div>

			<div className="tool-grid">
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							{t("donationDetails")}
						</h2>
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "16px",
							}}
						>
							{t.rich("donationIntro", {
								strong: (chunks) => <strong>{chunks}</strong>,
							})}
						</p>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-priorGiftsLabel">
								{t("priorGiftsLabel")}
							</label>
							<input
								id="f-priorGiftsLabel"
								type="number"
								className="form-control"
								value={priorGifts || ""}
								onChange={(e) => setPriorGifts(Number(e.target.value))}
								placeholder={t("placeholderZero")}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-newGiftLabel">
								{t("newGiftLabel")}
							</label>
							<input
								id="f-newGiftLabel"
								type="number"
								className="form-control"
								value={newGift || ""}
								onChange={(e) => setNewGift(Number(e.target.value))}
								placeholder={t("placeholderZero")}
							/>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="f-deductionsLabel">
								{t("deductionsLabel")}
							</label>
							<input
								id="f-deductionsLabel"
								type="number"
								className="form-control"
								value={deductions || ""}
								onChange={(e) => setDeductions(Number(e.target.value))}
								placeholder={t("placeholderZero")}
							/>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "4px",
								}}
							>
								{t("deductionsHint")}
							</p>
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
							<span>{t("currentNetGift")}</span>
							<span>{formatPHP(netNewGift)}</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("totalCumulativeGifts")}</span>
							<strong>{formatPHP(totalCumulativeGifts)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
								color: "var(--text-secondary)",
							}}
						>
							<span>{t("lessThreshold")}</span>
							<span>- {formatPHP(EXEMPT_THRESHOLD)}</span>
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
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>{t("totalTaxDue")}</span>
								<strong>{formatPHP(totalTaxDue)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
								}}
							>
								<span>{t("lessPriorTax")}</span>
								<span>- {formatPHP(priorTaxPaid)}</span>
							</div>
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
							<span>{t("taxPayableNow")}</span>
							<span>{formatPHP(taxPayableNow)}</span>
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
