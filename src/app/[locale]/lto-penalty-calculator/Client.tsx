"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

export default function LtoPenaltyClient() {
	const t = useTranslations("LTOPenalty");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [vehicleType, setVehicleType] = useState<
		"motorcycle" | "carLight" | "carMedium" | "carHeavy"
	>(
		(searchParams.get("vehicle") as
			| "motorcycle"
			| "carLight"
			| "carMedium"
			| "carHeavy") || "motorcycle",
	);
	const [monthsLateStr, setMonthsLateStr] = useState(
		searchParams.get("months") || "1",
	);

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

	const monthsLate = parseInt(monthsLateStr, 10) || 0;

	// LTO MVUC (Motor Vehicle User's Charge) Base Rates
	const mvucRates = {
		motorcycle: 240,
		carLight: 1600, // up to 1600 kg
		carMedium: 3600, // 1601 - 2300 kg
		carHeavy: 8000, // 2301 kg and above
	};

	const baseMvuc = mvucRates[vehicleType];

	let penalty = 0;

	if (monthsLate > 0) {
		if (monthsLate <= 12) {
			// Less than 1 year late: 50% flat penalty
			penalty = baseMvuc * 0.5;
		} else {
			// More than 1 year late: 50% penalty + 50% for every additional year
			// E.g., 2 years late = 100% penalty.
			const yearsLate = Math.ceil(monthsLate / 12);
			penalty = baseMvuc * (0.5 * yearsLate);
		}
	}

	// Legal Research Fund (LRF) is a standard fixed fee added to LTO transactions
	const lrfFee = 10;
	const computerFee = 169.06; // Standard IT fee per transaction

	const totalDue = baseMvuc + penalty + lrfFee + computerFee;

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

				<AdBanner dataAdSlot="lto-top" />

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
							{t("vehicleDetails")}
						</h2>

						<div className="form-group">
							<label className="form-label" htmlFor="vehicleType">
								{t("vehicleTypeLabel")}
							</label>
							<select
								id="vehicleType"
								className="form-control"
								value={vehicleType}
								onChange={(e) => {
									const val = e.target.value as
										| "motorcycle"
										| "carLight"
										| "carMedium"
										| "carHeavy";
									setVehicleType(val);
									updateUrl({ vehicle: val });
								}}
							>
								<option value="motorcycle">{t("vehicleMotorcycle")}</option>
								<option value="carLight">{t("vehicleCarLight")}</option>
								<option value="carMedium">{t("vehicleCarMedium")}</option>
								<option value="carHeavy">{t("vehicleCarHeavy")}</option>
							</select>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="monthsLate">
								{t("monthsLateLabel")}
							</label>
							<input
								type="number"
								id="monthsLate"
								className="form-control"
								value={monthsLateStr}
								onChange={(e) => {
									setMonthsLateStr(e.target.value);
									updateUrl({ months: e.target.value });
								}}
								min="0"
								max="120"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								{t("monthsLateHint")}
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
							{t("estimatedFeeTitle")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("basicMvucLabel")}</span>
							<span>{formatCurrency(baseMvuc)}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("latePenaltyLabel")}</span>
							<span
								style={{
									color:
										penalty > 0 ? "var(--danger)" : "var(--text-secondary)",
								}}
							>
								{penalty > 0 ? "+" : ""} {formatCurrency(penalty)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("lrfLabel")}</span>
							<span>{formatCurrency(lrfFee)}</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
							}}
						>
							<span>{t("computerFeeLabel")}</span>
							<span>{formatCurrency(computerFee)}</span>
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
							<span>{t("totalDueLabel")}</span>
							<span style={{ color: "var(--success)" }}>
								{formatCurrency(totalDue)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
