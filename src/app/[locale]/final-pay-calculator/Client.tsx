"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function FinalPayClient() {
	const t = useTranslations("FinalPay");
	const [dailyRate, setDailyRate] = useState(1000);
	const [unpaidDays, setUnpaidDays] = useState(10);
	const [totalBasicSalary, setTotalBasicSalary] = useState(150000); // For prorated 13th month
	const [unusedSil, setUnusedSil] = useState(5);
	const [taxWithheld, setTaxWithheld] = useState(0);

	const unpaidSalary = dailyRate * unpaidDays;
	const prorated13thMonth = totalBasicSalary / 12;
	const silCash = dailyRate * unusedSil;

	const finalPay = unpaidSalary + prorated13thMonth + silCash - taxWithheld;

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
							{t("employmentDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-dailyWageRate">
								{t("dailyWageRate")}
							</label>
							<input
								id="f-dailyWageRate"
								type="number"
								className="form-control"
								value={dailyRate || ""}
								onChange={(e) => setDailyRate(Number(e.target.value))}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-unpaidWorkDays">
								{t("unpaidWorkDays")}
							</label>
							<input
								id="f-unpaidWorkDays"
								type="number"
								className="form-control"
								value={unpaidDays || ""}
								onChange={(e) => setUnpaidDays(Number(e.target.value))}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-totalBasicSalary">
								{t("totalBasicSalary")}
							</label>
							<input
								id="f-totalBasicSalary"
								type="number"
								className="form-control"
								value={totalBasicSalary || ""}
								onChange={(e) => setTotalBasicSalary(Number(e.target.value))}
							/>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "4px",
								}}
							>
								{t("totalBasicSalaryHint")}
							</p>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-unusedSil">
								{t("unusedSil")}
							</label>
							<input
								id="f-unusedSil"
								type="number"
								className="form-control"
								value={unusedSil || ""}
								onChange={(e) => setUnusedSil(Number(e.target.value))}
							/>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="f-pendingTax">
								{t("pendingTax")}
							</label>
							<input
								id="f-pendingTax"
								type="number"
								className="form-control"
								value={taxWithheld || ""}
								onChange={(e) => setTaxWithheld(Number(e.target.value))}
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
							<span>{t("unpaidSalary")}</span>
							<strong>{formatPHP(unpaidSalary)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("prorated13th")}</span>
							<strong>{formatPHP(prorated13thMonth)}</strong>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("silConversion")}</span>
							<strong>{formatPHP(silCash)}</strong>
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
							<span>{t("lessDeductions")}</span>
							<span>- {formatPHP(taxWithheld)}</span>
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
							<span>{t("totalFinalPay")}</span>
							<span>{formatPHP(finalPay)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
