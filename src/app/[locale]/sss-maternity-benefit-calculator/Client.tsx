"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";
import TrustBadge from "../../components/TrustBadge";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SssMaternityClient() {
	const t = useTranslations("SSSMaternity");
	const [deliveryDate, setDeliveryDate] = useState("");
	const [leaveType, setLeaveType] = useState("105");
	const [mscs, setMscs] = useState<number[]>([
		30000, 30000, 30000, 30000, 30000, 30000,
	]);

	const handleMscChange = (index: number, val: number) => {
		const newMscs = [...mscs];
		newMscs[index] = val;
		setMscs(newMscs);
	};

	// Logic for Semesters and Base Period
	let semesterContingency = t("semesterPlaceholder");
	let basePeriod = t("basePeriodPlaceholder");

	if (deliveryDate) {
		const d = new Date(deliveryDate);
		const year = d.getFullYear();
		const month = d.getMonth() + 1; // 1-12

		let quarter = 1;
		if (month >= 4 && month <= 6) quarter = 2;
		else if (month >= 7 && month <= 9) quarter = 3;
		else if (month >= 10 && month <= 12) quarter = 4;

		let prevQuarter = quarter - 1;
		let prevYear = year;
		if (prevQuarter === 0) {
			prevQuarter = 4;
			prevYear = year - 1;
		}

		semesterContingency = t("semesterValue", {
			prevQuarter: String(prevQuarter),
			prevYear: String(prevYear),
			quarter: String(quarter),
			year: String(year),
		});

		let baseStartQuarter = prevQuarter - 4;
		let baseStartYear = prevYear;
		if (baseStartQuarter <= 0) {
			baseStartQuarter += 4;
			baseStartYear -= 1;
		}

		let baseEndQuarter = prevQuarter - 1;
		let baseEndYear = prevYear;
		if (baseEndQuarter === 0) {
			baseEndQuarter = 4;
			baseEndYear -= 1;
		}

		basePeriod = t("basePeriodValue", {
			startQuarter: String(baseStartQuarter),
			startYear: String(baseStartYear),
			endQuarter: String(baseEndQuarter),
			endYear: String(baseEndYear),
		});
	}

	const totalMsc = mscs.reduce((a, b) => a + b, 0);
	const dailyAllowance = totalMsc / 180;
	const totalBenefit = dailyAllowance * Number(leaveType);

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
							{t("deliveryHeading")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
							<label className="form-label" htmlFor="f-deliveryDateLabel">
								{t("deliveryDateLabel")}
							</label>
							<input
								id="f-deliveryDateLabel"
								type="date"
								className="form-control"
								value={deliveryDate}
								onChange={(e) => setDeliveryDate(e.target.value)}
							/>
						</div>

						<div className="form-group">
							{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
							<label className="form-label" htmlFor="f-claimTypeLabel">
								{t("claimTypeLabel")}
							</label>
							<select
								id="f-claimTypeLabel"
								className="form-control"
								value={leaveType}
								onChange={(e) => setLeaveType(e.target.value)}
							>
								<option value="105">{t("typeNormal")}</option>
								<option value="120">{t("typeSoloParent")}</option>
								<option value="60">{t("typeMiscarriage")}</option>
							</select>
						</div>
					</div>

					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								color: "var(--primary)",
							}}
						>
							{t("contributionHeading")}
						</h2>
						<div
							style={{
								padding: "12px",
								backgroundColor: "var(--bg-color)",
								borderRadius: "6px",
								marginBottom: "16px",
								fontSize: "14px",
							}}
						>
							<p style={{ margin: "0 0 4px 0" }}>
								<strong>{t("semesterLabel")}</strong> {semesterContingency}
							</p>
							<p style={{ margin: 0, color: "var(--primary)" }}>
								<strong>{t("basePeriodLabel")}</strong> {basePeriod}
							</p>
						</div>
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "16px",
							}}
						>
							{t.rich("mscInstruction", {
								b: (chunks) => <strong>{chunks}</strong>,
							})}
						</p>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "12px",
							}}
						>
							{mscs.map((msc, i) => (
								<div key={i} className="form-group">
									{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
									<label
										className="form-label"
										htmlFor="f-field-3"
										style={{ fontSize: "14px" }}
									>
										{t("highestMscLabel", { number: i + 1 })}
									</label>
									<input
										id="f-field-3"
										type="number"
										className="form-control"
										value={msc || ""}
										onChange={(e) => handleMscChange(i, Number(e.target.value))}
									/>
								</div>
							))}
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
							{t("estimatedBenefitHeading")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("totalMscsLabel")}</span>
							<strong>{formatPHP(totalMsc)}</strong>
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
							<span>{t("dailyAllowanceLabel")}</span>
							<span>{formatPHP(dailyAllowance)}</span>
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
							<span>{t("totalCashBenefitLabel")}</span>
							<span>{formatPHP(totalBenefit)}</span>
						</div>
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginTop: "4px",
								textAlign: "right",
							}}
						>
							{t("daysOfLeave", { days: leaveType })}
						</p>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
