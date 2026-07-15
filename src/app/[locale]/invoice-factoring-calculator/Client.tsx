"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function InvoiceFactoringClient() {
	const t = useTranslations("InvoiceFactoring");
	const [invoiceAmount, setInvoiceAmount] = useState(100000);
	const [discountRateMonthly, setDiscountRateMonthly] = useState(2.0); // 2% per month
	const [daysOutstanding, setDaysOutstanding] = useState(60);
	const [processingFee, setProcessingFee] = useState(1500);
	const [hasAgreed, setHasAgreed] = useState(false);

	// Formula calculations
	const discountRateDaily = discountRateMonthly / 100 / 30;
	const totalDiscountFee = invoiceAmount * discountRateDaily * daysOutstanding;

	const netAdvance = invoiceAmount - totalDiscountFee - processingFee;

	// APR calculation: (Total Cost of Financing / Net Advance) * (365 / Days) * 100
	const totalCost = totalDiscountFee + processingFee;
	const apr = (totalCost / netAdvance) * (365 / daysOutstanding) * 100;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader title={t("title")} subtitle={t("subtitle")} />

			{!hasAgreed ? (
				<div
					className="card"
					style={{
						marginTop: "24px",
						border: "2px solid #f59e0b",
						backgroundColor: "rgba(245, 158, 11, 0.05)",
					}}
				>
					<h2
						style={{
							fontSize: "20px",
							color: "#d97706",
							marginBottom: "16px",
							display: "flex",
							alignItems: "center",
							gap: "8px",
						}}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
							<line x1="12" y1="9" x2="12" y2="13"></line>
							<line x1="12" y1="17" x2="12.01" y2="17"></line>
						</svg>
						{t("disclaimerTitle")}
					</h2>
					<p style={{ marginBottom: "12px", lineHeight: 1.6 }}>
						{t.rich("disclaimerP1", {
							strong: (chunks) => <strong>{chunks}</strong>,
						})}
					</p>
					<p style={{ marginBottom: "16px", lineHeight: 1.6 }}>
						{t.rich("disclaimerP2", {
							strong: (chunks) => <strong>{chunks}</strong>,
						})}
					</p>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "12px",
							marginTop: "24px",
							padding: "16px",
							backgroundColor: "var(--bg-color)",
							borderRadius: "8px",
							border: "1px solid var(--border-color)",
						}}
					>
						<input
							type="checkbox"
							id="agree"
							style={{ width: "20px", height: "20px", cursor: "pointer" }}
							onChange={(e) => {
								if (e.target.checked) setHasAgreed(true);
							}}
						/>
						<label
							htmlFor="agree"
							style={{
								fontSize: "14px",
								fontWeight: "bold",
								cursor: "pointer",
							}}
						>
							{t("agreeLabel")}
						</label>
					</div>
				</div>
			) : (
				<div className="tool-grid" style={{ marginTop: "24px" }}>
					<div
						style={{ display: "flex", flexDirection: "column", gap: "24px" }}
					>
						<div className="card">
							<h2
								style={{
									fontSize: "18px",
									marginBottom: "16px",
									color: "var(--primary)",
								}}
							>
								{t("invoiceDetails")}
							</h2>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-invoiceAmountLabel">
									{t("invoiceAmountLabel")}
								</label>
								<input
									id="f-invoiceAmountLabel"
									type="number"
									className="form-control"
									value={invoiceAmount || ""}
									onChange={(e) => setInvoiceAmount(Number(e.target.value))}
								/>
							</div>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-field-2">
									{t("monthlyDiscountLabel")}
								</label>
								<input
									id="f-field-2"
									type="number"
									step="0.1"
									className="form-control"
									value={discountRateMonthly || ""}
									onChange={(e) =>
										setDiscountRateMonthly(Number(e.target.value))
									}
								/>
								<p
									style={{
										fontSize: "14px",
										color: "var(--text-secondary)",
										marginTop: "4px",
									}}
								>
									{t("monthlyDiscountHint")}
								</p>
							</div>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-daysDueLabel">
									{t("daysDueLabel")}
								</label>
								<input
									id="f-daysDueLabel"
									type="number"
									className="form-control"
									value={daysOutstanding || ""}
									onChange={(e) => setDaysOutstanding(Number(e.target.value))}
								/>
							</div>

							<div className="form-group">
								<label className="form-label" htmlFor="f-processingFeeLabel">
									{t("processingFeeLabel")}
								</label>
								<input
									id="f-processingFeeLabel"
									type="number"
									className="form-control"
									value={processingFee || ""}
									onChange={(e) => setProcessingFee(Number(e.target.value))}
								/>
							</div>
						</div>
					</div>

					<div
						style={{ display: "flex", flexDirection: "column", gap: "24px" }}
					>
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
								{t("factoringAnalysis")}
							</h2>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>{t("invoiceFaceValue")}</span>
								<strong>{formatPHP(invoiceAmount)}</strong>
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
								<span>{t("timeDiscountFee", { days: daysOutstanding })}</span>
								<span>- {formatPHP(totalDiscountFee)}</span>
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
								<span>{t("processingFeeResult")}</span>
								<span>- {formatPHP(processingFee)}</span>
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
									<span>{t("netAdvance")}</span>
									<span>{formatPHP(netAdvance)}</span>
								</div>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "16px",
									fontWeight: 700,
									color: "var(--primary)",
									marginTop: "16px",
									paddingTop: "16px",
									borderTop: "1px dashed rgba(13, 71, 161, 0.2)",
								}}
							>
								<span>{t("effectiveApr")}</span>
								<span>{apr.toFixed(2)}%</span>
							</div>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "8px",
									textAlign: "right",
								}}
							>
								{t("aprHint")}
							</p>
						</div>
					</div>
				</div>
			)}
		</ToolLayout>
	);
}
