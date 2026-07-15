"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";
import TrustBadge from "../../components/TrustBadge";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const GROUP_RATES = {
	1: { daeds: 0.05, dads: 0.03 },
	2: { daeds: 0.06, dads: 0.036 },
	3: { daeds: 0.1, dads: 0.06 },
	4: { daeds: 0.12, dads: 0.075 },
	5: { daeds: 0.12, dads: 0.075 },
	8: { daeds: 0.15, dads: 0.15 },
};

export default function ArchitecturalFeeClient() {
	const t = useTranslations("ArchitecturalFee");
	const [pcc, setPcc] = useState(10000000);
	const [group, setGroup] = useState<keyof typeof GROUP_RATES>(4);
	const [serviceMode, setServiceMode] = useState<"daeds" | "dads">("daeds");
	const [isAlteration, setIsAlteration] = useState(false);

	let baseRate = GROUP_RATES[group][serviceMode];

	// Group 9 (Alterations & Additions): Fee is increased by 50% (1.5x)
	if (isAlteration) {
		baseRate = baseRate * 1.5;
	}

	const totalProfessionalFee = pcc * baseRate;

	// UAP Standard Milestone Billing
	const designPhase = totalProfessionalFee * 0.6;
	const constructionPhase = totalProfessionalFee * 0.4;

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
							{t("projectDetails")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-pccLabel">
								{t("pccLabel")}
							</label>
							<input
								id="f-pccLabel"
								type="number"
								className="form-control"
								value={pcc || ""}
								onChange={(e) => setPcc(Number(e.target.value))}
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-classificationLabel">
								{t("classificationLabel")}
							</label>
							<select
								id="f-classificationLabel"
								className="form-control"
								value={group}
								onChange={(e) =>
									setGroup(Number(e.target.value) as keyof typeof GROUP_RATES)
								}
							>
								{Object.keys(GROUP_RATES).map((key) => (
									<option key={key} value={key}>
										{t(`group${key}`)}
									</option>
								))}
							</select>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="f-modeOfServiceLabel">
								{t("modeOfServiceLabel")}
							</label>
							<select
								id="f-modeOfServiceLabel"
								className="form-control"
								value={serviceMode}
								onChange={(e) =>
									setServiceMode(e.target.value as "daeds" | "dads")
								}
							>
								<option value="daeds">{t("daedsOption")}</option>
								<option value="dads">{t("dadsOption")}</option>
							</select>
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
									checked={isAlteration}
									onChange={(e) => setIsAlteration(e.target.checked)}
								/>
								<span style={{ fontWeight: 500 }}>{t("alterationLabel")}</span>
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
							{t("computationTitle")}
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("effectiveRateLabel")}</span>
							<strong>
								{t("effectiveRateValue", { rate: (baseRate * 100).toFixed(2) })}
							</strong>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(16, 185, 129, 0.05)",
								border: "1px solid rgba(16, 185, 129, 0.2)",
								borderRadius: "8px",
								marginBottom: "16px",
								marginTop: "16px",
							}}
						>
							<h3
								style={{
									fontSize: "14px",
									marginBottom: "12px",
									color: "var(--primary)",
								}}
							>
								{t("milestoneTitle")}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>{t("designPhaseLabel")}</span>
								<strong>{formatPHP(designPhase)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
								}}
							>
								<span>{t("constructionPhaseLabel")}</span>
								<span>{formatPHP(constructionPhase)}</span>
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
							<span>{t("totalFeeLabel")}</span>
							<span>{formatPHP(totalProfessionalFee)}</span>
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
