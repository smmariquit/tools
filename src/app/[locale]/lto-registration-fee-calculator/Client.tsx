"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";
import TrustBadge from "../../components/TrustBadge";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function LtoClient() {
	const t = useTranslations("LTORegistrationFee");
	const [vehicleClass, setVehicleClass] = useState("car");
	const [gvw, setGvw] = useState(1600);
	const [modelYear, setModelYear] = useState(2024);
	const [plateEnding, setPlateEnding] = useState(1);
	const [plateMiddle, setPlateMiddle] = useState(1);

	const [isLateMonth, setIsLateMonth] = useState(false);
	const [isLateWeek, setIsLateWeek] = useState(false);

	let mvuc = 0;

	if (vehicleClass === "car") {
		if (modelYear >= 2001) {
			if (gvw <= 1600) mvuc = 1600;
			else if (gvw <= 2300) mvuc = 3600;
			else mvuc = 8000;
		} else if (modelYear >= 1995) {
			if (gvw <= 1600) mvuc = 2000;
			else if (gvw <= 2300) mvuc = 6000;
			else mvuc = 12000;
		} else {
			if (gvw <= 1600) mvuc = 1400;
			else if (gvw <= 2300) mvuc = 2400;
			else mvuc = 5600;
		}
	} else if (vehicleClass === "uv") {
		if (gvw <= 2700) mvuc = 2000;
		else if (gvw <= 4500) mvuc = 2000 + 0.4 * (gvw - 2700);
		else mvuc = 2000 + 0.4 * (4500 - 2700); // capped at 4500 for standard UVs
	} else if (vehicleClass === "suv") {
		if (gvw <= 2700) mvuc = 2300;
		else if (gvw <= 4500) mvuc = 2300 + 0.46 * (gvw - 2700);
		else mvuc = 2300 + 0.46 * (4500 - 2700);
	} else if (vehicleClass === "mc") {
		mvuc = 240; // without sidecar default
	}

	let lateMonthPenalty = 0;
	let lateWeekPenalty = 0;

	if (isLateMonth) {
		lateMonthPenalty = mvuc * 0.5;
	} else if (isLateWeek) {
		lateWeekPenalty = vehicleClass === "mc" ? 100 : 200;
	}

	const inspectionFee = 90; // Standard computer fee
	const stickerFee = 50;

	const totalFee =
		mvuc + lateMonthPenalty + lateWeekPenalty + inspectionFee + stickerFee;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	// Determine Scheduled Month
	const months = [
		"October",
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
	];
	const scheduledMonth = plateEnding === 0 ? "October" : months[plateEnding];

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
							{t("vehicleDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
							<label className="form-label">{t("vehicleClassLabel")}</label>
							<select
								className="form-control"
								value={vehicleClass}
								onChange={(e) => setVehicleClass(e.target.value)}
							>
								<option value="car">{t("vehicleCar")}</option>
								<option value="uv">{t("vehicleUv")}</option>
								<option value="suv">{t("vehicleSuv")}</option>
								<option value="mc">{t("vehicleMc")}</option>
							</select>
						</div>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "16px",
							}}
						>
							<div className="form-group">
								{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
								<label className="form-label">{t("gvwLabel")}</label>
								<input
									type="number"
									className="form-control"
									value={gvw}
									onChange={(e) => setGvw(Number(e.target.value))}
								/>
							</div>
							<div className="form-group">
								{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
								<label className="form-label">{t("yearModelLabel")}</label>
								<input
									type="number"
									className="form-control"
									value={modelYear}
									onChange={(e) => setModelYear(Number(e.target.value))}
								/>
							</div>
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
							{t("renewalScheduleTitle")}
						</h2>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "16px",
								marginBottom: "16px",
							}}
						>
							<div className="form-group">
								{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
								<label className="form-label">{t("plateEndingLabel")}</label>
								<input
									type="number"
									className="form-control"
									min="0"
									max="9"
									value={plateEnding}
									onChange={(e) => setPlateEnding(Number(e.target.value))}
								/>
								<p
									style={{
										fontSize: "14px",
										color: "var(--text-secondary)",
										marginTop: "4px",
									}}
								>
									{t("scheduledMonthLabel")}{" "}
									<strong>{t(`months.${scheduledMonth}`)}</strong>
								</p>
							</div>
							<div className="form-group">
								{/* biome-ignore lint/a11y/noLabelWithoutControl: simple layout */}
								<label className="form-label">{t("plateMiddleLabel")}</label>
								<input
									type="number"
									className="form-control"
									min="0"
									max="9"
									value={plateMiddle}
									onChange={(e) => setPlateMiddle(Number(e.target.value))}
								/>
							</div>
						</div>

						<div className="form-group" style={{ marginBottom: "12px" }}>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
								}}
							>
								<input
									type="checkbox"
									checked={isLateMonth}
									onChange={(e) => setIsLateMonth(e.target.value === "true")}
									onClick={() => setIsLateMonth(!isLateMonth)}
								/>
								<span style={{ fontWeight: 500 }}>{t("lateMonthLabel")}</span>
							</label>
						</div>

						<div className="form-group">
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
								}}
							>
								<input
									type="checkbox"
									checked={isLateWeek}
									disabled={isLateMonth}
									onChange={(e) => setIsLateWeek(e.target.value === "true")}
									onClick={() => setIsLateWeek(!isLateWeek)}
								/>
								<span style={{ fontWeight: 500 }}>{t("lateWeekLabel")}</span>
							</label>
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
							{t("estimatedFeesTitle")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("baseMvucLabel")}</span>
							<strong>{formatPHP(mvuc)}</strong>
						</div>

						{lateMonthPenalty > 0 && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
									color: "red",
								}}
							>
								<span>{t("latePenaltyMonthLabel")}</span>
								<span>+{formatPHP(lateMonthPenalty)}</span>
							</div>
						)}
						{lateWeekPenalty > 0 && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
									color: "red",
								}}
							>
								<span>{t("latePenaltyWeekLabel")}</span>
								<span>+{formatPHP(lateWeekPenalty)}</span>
							</div>
						)}

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
								color: "var(--text-secondary)",
							}}
						>
							<span>{t("computerStickerLabel")}</span>
							<span>{formatPHP(inspectionFee + stickerFee)}</span>
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
							<span>{t("totalEstimatedLabel")}</span>
							<span>{formatPHP(totalFee)}</span>
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
