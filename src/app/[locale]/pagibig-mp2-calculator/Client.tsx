"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import InteractiveSlider from "../components/InteractiveSlider";
import SampleCases from "../components/SampleCases";
import TipCard from "../components/TipCard";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

const Chart = dynamic(() => import("./Chart"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				color: "var(--text-secondary)",
			}}
		>
			…
		</div>
	),
});

export default function PagibigMP2Client() {
	const t = useTranslations("PagibigMP2");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const selectId = useId();

	const [mounted, setMounted] = useState(false);
	const [initialContribution, setInitialContribution] = useState(
		parseFloat(searchParams.get("initial") || "0"),
	);
	const [monthlyContribution, setMonthlyContribution] = useState(
		parseFloat(searchParams.get("monthly") || "1000"),
	);
	const [dividendRate, setDividendRate] = useState(
		parseFloat(searchParams.get("rate") || "7.0"),
	);
	const [payoutType, setPayoutType] = useState(
		searchParams.get("payout") || "compounded",
	);

	useEffect(() => {
		setMounted(true);
	}, []);

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

	const applyCase = (
		initial: number,
		monthly: number,
		rate: number,
		payout: string,
	) => {
		setInitialContribution(initial);
		setMonthlyContribution(monthly);
		setDividendRate(rate);
		setPayoutType(payout);
		updateUrl({
			initial: initial.toString(),
			monthly: monthly.toString(),
			rate: rate.toString(),
			payout,
		});
	};

	// Simulation Logic
	let totalContributions = 0;
	let totalDividends = 0;
	let currentPrincipal = initialContribution;
	let currentCompoundedBalance = initialContribution;

	const chartData = [];

	for (let y = 1; y <= 5; y++) {
		const yearlyPrincipalAdded = monthlyContribution * 12;

		// If it's year 1, initial contribution earns full 12 months.
		// Monthly contributions earn based on Average Monthly Balance equivalent (weight of 6.5)
		const dividendBasis = currentCompoundedBalance + monthlyContribution * 6.5;
		const yearlyDividend = dividendBasis * (dividendRate / 100);

		totalContributions +=
			(y === 1 ? initialContribution : 0) + yearlyPrincipalAdded;
		totalDividends += yearlyDividend;

		currentPrincipal += yearlyPrincipalAdded;

		if (payoutType === "compounded") {
			currentCompoundedBalance += yearlyPrincipalAdded + yearlyDividend;
		} else {
			// If annual payout, dividend is withdrawn and not reinvested
			currentCompoundedBalance += yearlyPrincipalAdded;
		}

		chartData.push({
			year: `Year ${y}`,
			Principal: Math.round(currentPrincipal),
			Dividends: Math.round(
				payoutType === "compounded"
					? currentCompoundedBalance - currentPrincipal
					: totalDividends,
			),
		});
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
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title={t("title")}
				subtitle={t("subtitle")}
				adSlotId="mp2-top"
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

					<SampleCases
						cases={[
							{
								label: "Starter (₱500/mo)",
								onSelect: () => applyCase(0, 500, 7, "compounded"),
							},
							{
								label: "Regular saver (₱1k/mo)",
								onSelect: () => applyCase(0, 1000, 7, "compounded"),
							},
							{
								label: "With lump sum seed",
								onSelect: () => applyCase(50000, 2000, 7, "compounded"),
							},
							{
								label: "Annual payout mode",
								onSelect: () => applyCase(0, 3000, 6.5, "annual"),
							},
						]}
					/>

					<InteractiveSlider
						label={t("initialContribution")}
						value={initialContribution}
						min={0}
						max={1000000}
						step={1000}
						onChange={(val) => {
							setInitialContribution(val);
							updateUrl({ initial: val.toString() });
						}}
						hint={t("initialContributionHint")}
					/>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("monthlyContribution")}
							value={monthlyContribution}
							min={500}
							max={50000}
							step={500}
							onChange={(val) => {
								setMonthlyContribution(val);
								updateUrl({ monthly: val.toString() });
							}}
							hint={t("monthlyContributionHint")}
						/>
					</div>

					<div style={{ marginTop: "32px" }}>
						<InteractiveSlider
							label={t("dividendRate")}
							value={dividendRate}
							min={4.0}
							max={10.0}
							step={0.1}
							onChange={(val) => {
								setDividendRate(val);
								updateUrl({ rate: val.toString() });
							}}
							hint={t("dividendRateHint")}
						/>
					</div>

					<div className="form-group" style={{ marginTop: "32px" }}>
						<label className="form-label" htmlFor={selectId}>
							{t("payoutType")}
						</label>
						<select
							id={selectId}
							className="form-control"
							value={payoutType}
							onChange={(e) => {
								setPayoutType(e.target.value);
								updateUrl({ payout: e.target.value });
							}}
						>
							<option value="compounded">{t("payoutCompounded")}</option>
							<option value="annual">{t("payoutAnnual")}</option>
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
							{payoutType === "compounded"
								? t("totalSavings")
								: t("totalContributions")}
						</span>
						<strong
							style={{
								display: "block",
								fontSize: "36px",
								color: "var(--primary)",
							}}
						>
							{formatCurrency(
								payoutType === "compounded"
									? currentCompoundedBalance
									: totalContributions,
							)}
						</strong>
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
							{t("totalContributions")}
						</span>
						<strong style={{ color: "var(--text-primary)" }}>
							{formatCurrency(totalContributions)}
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
							{t("totalDividends")}
						</span>
						<strong style={{ color: "var(--success)" }}>
							+ {formatCurrency(totalDividends)}
						</strong>
					</div>

					{mounted && chartData.length > 0 && (
						<div
							style={{
								height: "300px",
								width: "100%",
								marginTop: "32px",
								marginBottom: "16px",
							}}
						>
							<Chart data={chartData} formatValue={formatCurrency} />
						</div>
					)}

					<TipCard title="Important Note">{t("note")}</TipCard>
				</div>
			</div>
		</ToolLayout>
	);
}
