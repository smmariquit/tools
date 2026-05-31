"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import ToolFooter from "../../components/ToolFooter";
import InteractiveSlider from "../components/InteractiveSlider";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function PagibigAffordabilityClient() {
	const t = useTranslations("PagibigAffordability");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const rateId = useId();

	const [grossIncome, setGrossIncome] = useState(
		parseFloat(searchParams.get("income") || "35000"),
	);
	const [age, setAge] = useState(parseFloat(searchParams.get("age") || "30"));
	const [interestRate, setInterestRate] = useState(
		parseFloat(searchParams.get("rate") || "6.25"),
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

	// Logic
	const maxTermYears = Math.max(0, Math.min(30, 70 - age));
	const n = maxTermYears * 12;
	const maxAmortization = grossIncome * 0.35;

	let maxLoanAmount = 0;
	if (n > 0) {
		const r = interestRate / 100 / 12;
		maxLoanAmount = maxAmortization * ((1 - (1 + r) ** -n) / r);
		maxLoanAmount = Math.min(maxLoanAmount, 6000000);
	}

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
				adSlotId="pagibig-affordability-top"
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
						label={t("grossIncome")}
						value={grossIncome}
						min={10000}
						max={300000}
						step={1000}
						onChange={(val) => {
							setGrossIncome(val);
							updateUrl({ income: val.toString() });
						}}
					/>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("age")}
							value={age}
							min={18}
							max={70}
							step={1}
							onChange={(val) => {
								setAge(val);
								updateUrl({ age: val.toString() });
							}}
						/>
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={rateId}>
							{t("fixingPeriod")}
						</label>
						<select
							id={rateId}
							className="form-control"
							value={interestRate}
							onChange={(e) => {
								setInterestRate(parseFloat(e.target.value));
								updateUrl({ rate: e.target.value });
							}}
						>
							<option value="5.75">1 Year Fixed (5.75%)</option>
							<option value="6.25">3 Years Fixed (6.25%)</option>
							<option value="6.50">5 Years Fixed (6.50%)</option>
							<option value="7.125">10 Years Fixed (7.125%)</option>
							<option value="7.75">15 Years Fixed (7.75%)</option>
						</select>
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginTop: "8px",
							textAlign: "left",
						}}
					>
						{t("fixingPeriodHint")}
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
						<span style={{ color: "var(--text-secondary)" }}>
							{t("maxTerm")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{maxTermYears} {t("yearsSuffix")}
						</strong>
					</div>
					<div
						style={{
							fontSize: "12px",
							color: "var(--text-tertiary)",
							marginBottom: "24px",
							textAlign: "left",
						}}
					>
						{t("maxTermHint")}
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "12px",
							fontSize: "15px",
						}}
					>
						<span style={{ color: "var(--text-secondary)" }}>
							{t("maxAmortization")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(maxAmortization)} / mo
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
							{t("maxLoanAmount")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(maxLoanAmount)}
						</strong>
						{maxLoanAmount === 6000000 && (
							<span
								style={{
									display: "block",
									fontSize: "12px",
									color: "var(--text-tertiary)",
									marginTop: "8px",
								}}
							>
								* {t("cappedHint")}
							</span>
						)}
					</div>

					<TipCard title="Pag-IBIG Rule of Thumb">{t("note")}</TipCard>
				</div>
			</div>

			<ToolFooter currentPath="/pagibig-affordability-calculator" />
		</ToolLayout>
	);
}
