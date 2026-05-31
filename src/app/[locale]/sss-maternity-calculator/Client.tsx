"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function SSSMaternityClient() {
	const t = useTranslations("SSSMaternity");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const selectTypeId = useId();

	const [monthlySalary, setMonthlySalary] = useState(
		parseFloat(searchParams.get("salary") || "30000"),
	);
	const [deliveryType, setDeliveryType] = useState(
		searchParams.get("type") || "normal",
	);

	const updateUrl = (updates: Record<string, string>) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());
		for (const [key, value] of Object.entries(updates)) {
			if (value) {
				newSearchParams.set(key, value);
			} else {
				newSearchParams.delete(key);
			}
		}
		router.replace(`${pathname}?${newSearchParams.toString()}`, {
			scroll: false,
		});
	};

	// Logic for SSS Maternity
	const cappedMsc = Math.min(monthlySalary, 30000);
	const totalMsc = cappedMsc * 6;
	const adsc = totalMsc / 180;

	let days = 105;
	if (deliveryType === "solo-parent") days = 120;
	if (deliveryType === "miscarriage") days = 60;

	const maternityBenefit = adsc * days;

	const formatCurrency = (val: number) => {
		return (
			"₱" +
			val.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		);
	};

	return (
		<ToolLayout>
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="maternity-top"
			/>

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				{/* Input Card */}
				<div className="card">
					<h2
						style={{
							fontSize: "18px",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						{t("inputDetails")}
					</h2>

					<InteractiveSlider
						label={t("monthlySalary")}
						value={monthlySalary}
						min={4000}
						max={100000}
						step={1000}
						onChange={(val) => {
							setMonthlySalary(val);
							updateUrl({ salary: val.toString() });
						}}
					/>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							textAlign: "left",
						}}
					>
						{t("monthlySalaryHint")}
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectTypeId}>
							{t("deliveryType")}
						</label>
						<select
							id={selectTypeId}
							className="form-control"
							value={deliveryType}
							onChange={(e) => {
								setDeliveryType(e.target.value);
								updateUrl({ type: e.target.value });
							}}
						>
							<option value="normal">{t("typeNormal")}</option>
							<option value="solo-parent">{t("typeSoloParent")}</option>
							<option value="miscarriage">{t("typeMiscarriage")}</option>
						</select>
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
						{t("resultsTitle")}
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>{t("adsc")}</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(adsc)}
						</strong>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "24px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("daysAllocated")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{days} days
						</strong>
					</div>

					<div
						style={{
							marginBottom: "24px",
							padding: "24px",
							backgroundColor: "rgba(13, 71, 161, 0.05)",
							border: "1px solid var(--primary)",
							borderRadius: "8px",
							textAlign: "center",
						}}
					>
						<span
							style={{
								display: "block",
								fontSize: "16px",
								color: "var(--text-secondary)",
								marginBottom: "8px",
							}}
						>
							{t("maternityBenefit")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(maternityBenefit)}
						</strong>
					</div>

					<TipCard title="SSS Eligibility">{t("note")}</TipCard>
				</div>
			</div>

			<ToolFooter currentPath="/sss-maternity-calculator" />
		</ToolLayout>
	);
}
