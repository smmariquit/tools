"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";
import TrustBadge from "../../components/TrustBadge";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const DE_MINIMIS_CAPS = {
	uniform: 8000,
	rice: 30000, // 2500 per month
	medicalDependents: 4000,
	actualMedical: 12000,
	laundry: 4800, // 400 per month
	achievement: 12000,
	gifts: 6000,
	cba: 12000,
};

export default function DeMinimisClient() {
	const t = useTranslations("DeMinimisTax");
	const [uniform, setUniform] = useState(0);
	const [rice, setRice] = useState(0);
	const [medicalDependents, setMedicalDependents] = useState(0);
	const [actualMedical, setActualMedical] = useState(0);
	const [laundry, setLaundry] = useState(0);
	const [achievement, setAchievement] = useState(0);
	const [gifts, setGifts] = useState(0);
	const [cba, setCba] = useState(0);

	const [thirteenthMonth, setThirteenthMonth] = useState(0);
	const [otherBonuses, setOtherBonuses] = useState(0);

	// Computations
	const calcExempt = (val: number, cap: number) => Math.min(val || 0, cap);
	const calcExcess = (val: number, cap: number) =>
		Math.max(0, (val || 0) - cap);

	const uEx = calcExempt(uniform, DE_MINIMIS_CAPS.uniform);
	const rEx = calcExempt(rice, DE_MINIMIS_CAPS.rice);
	const mEx = calcExempt(medicalDependents, DE_MINIMIS_CAPS.medicalDependents);
	const aEx = calcExempt(actualMedical, DE_MINIMIS_CAPS.actualMedical);
	const lEx = calcExempt(laundry, DE_MINIMIS_CAPS.laundry);
	const wEx = calcExempt(achievement, DE_MINIMIS_CAPS.achievement);
	const gEx = calcExempt(gifts, DE_MINIMIS_CAPS.gifts);
	const iEx = calcExempt(cba, DE_MINIMIS_CAPS.cba);

	const totalExemptDeMinimis = uEx + rEx + mEx + aEx + lEx + wEx + gEx + iEx;

	const uExs = calcExcess(uniform, DE_MINIMIS_CAPS.uniform);
	const rExs = calcExcess(rice, DE_MINIMIS_CAPS.rice);
	const mExs = calcExcess(medicalDependents, DE_MINIMIS_CAPS.medicalDependents);
	const aExs = calcExcess(actualMedical, DE_MINIMIS_CAPS.actualMedical);
	const lExs = calcExcess(laundry, DE_MINIMIS_CAPS.laundry);
	const wExs = calcExcess(achievement, DE_MINIMIS_CAPS.achievement);
	const gExs = calcExcess(gifts, DE_MINIMIS_CAPS.gifts);
	const iExs = calcExcess(cba, DE_MINIMIS_CAPS.cba);

	const excessDeMinimis = uExs + rExs + mExs + aExs + lExs + wExs + gExs + iExs;

	const poolTotal =
		(thirteenthMonth || 0) + (otherBonuses || 0) + excessDeMinimis;
	const poolExempt = Math.min(poolTotal, 90000);
	const poolTaxable = Math.max(0, poolTotal - 90000);

	const totalTaxFreeBenefits = totalExemptDeMinimis + poolExempt;

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
							{t("annualBenefits")}
						</h2>
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "16px",
							}}
						>
							{t("annualBenefitsHint")}
						</p>

						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "16px",
							}}
						>
							<div className="form-group">
								<label className="form-label" htmlFor="f-riceLabel">
									{t("riceLabel")}
								</label>
								<input
									id="f-riceLabel"
									type="number"
									className="form-control"
									value={rice || ""}
									onChange={(e) => setRice(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.rice),
									})}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-uniformLabel">
									{t("uniformLabel")}
								</label>
								<input
									id="f-uniformLabel"
									type="number"
									className="form-control"
									value={uniform || ""}
									onChange={(e) => setUniform(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.uniform),
									})}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-medicalAssistLabel">
									{t("medicalAssistLabel")}
								</label>
								<input
									id="f-medicalAssistLabel"
									type="number"
									className="form-control"
									value={actualMedical || ""}
									onChange={(e) => setActualMedical(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.actualMedical),
									})}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-laundryLabel">
									{t("laundryLabel")}
								</label>
								<input
									id="f-laundryLabel"
									type="number"
									className="form-control"
									value={laundry || ""}
									onChange={(e) => setLaundry(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.laundry),
									})}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-giftsLabel">
									{t("giftsLabel")}
								</label>
								<input
									id="f-giftsLabel"
									type="number"
									className="form-control"
									value={gifts || ""}
									onChange={(e) => setGifts(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.gifts),
									})}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-achievementLabel">
									{t("achievementLabel")}
								</label>
								<input
									id="f-achievementLabel"
									type="number"
									className="form-control"
									value={achievement || ""}
									onChange={(e) => setAchievement(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.achievement),
									})}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-field-7">
									{t("medicalDependentsLabel")}
								</label>
								<input
									id="f-field-7"
									type="number"
									className="form-control"
									value={medicalDependents || ""}
									onChange={(e) => setMedicalDependents(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.medicalDependents),
									})}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-cbaLabel">
									{t("cbaLabel")}
								</label>
								<input
									id="f-cbaLabel"
									type="number"
									className="form-control"
									value={cba || ""}
									onChange={(e) => setCba(Number(e.target.value))}
									placeholder={t("maxPlaceholder", {
										value: formatPHP(DE_MINIMIS_CAPS.cba),
									})}
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
							{t("otherBonusesTitle")}
						</h2>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "16px",
							}}
						>
							<div className="form-group">
								<label className="form-label" htmlFor="f-field-9">
									{t("thirteenthMonthLabel")}
								</label>
								<input
									id="f-field-9"
									type="number"
									className="form-control"
									value={thirteenthMonth || ""}
									onChange={(e) => setThirteenthMonth(Number(e.target.value))}
								/>
							</div>
							<div className="form-group">
								<label className="form-label" htmlFor="f-otherBonusesLabel">
									{t("otherBonusesLabel")}
								</label>
								<input
									id="f-otherBonusesLabel"
									type="number"
									className="form-control"
									value={otherBonuses || ""}
									onChange={(e) => setOtherBonuses(Number(e.target.value))}
								/>
							</div>
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
							<span>{t("exemptDeMinimis")}</span>
							<strong>{formatPHP(totalExemptDeMinimis)}</strong>
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
							<span>{t("deMinimisExcess")}</span>
							<span>{formatPHP(excessDeMinimis)}</span>
						</div>

						<div
							style={{
								padding: "16px",
								backgroundColor: "rgba(16, 185, 129, 0.05)",
								border: "1px solid rgba(16, 185, 129, 0.2)",
								borderRadius: "8px",
								marginBottom: "24px",
							}}
						>
							<h3
								style={{
									fontSize: "14px",
									marginBottom: "12px",
									color: "var(--primary)",
								}}
							>
								{t("poolTitle")}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>{t("totalInPool")}</span>
								<strong>{formatPHP(poolTotal)}</strong>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									fontSize: "14px",
									color: "var(--text-secondary)",
								}}
							>
								<span>{t("taxableOverflow")}</span>
								<strong style={{ color: poolTaxable > 0 ? "red" : "inherit" }}>
									{formatPHP(poolTaxable)}
								</strong>
							</div>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "18px",
								fontWeight: 700,
								color: "var(--primary)",
							}}
						>
							<span>{t("totalTaxFreeBenefits")}</span>
							<span>{formatPHP(totalTaxFreeBenefits)}</span>
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
