"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import SampleCases from "../components/SampleCases";
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

export default function FreelanceTaxClient() {
	const t = useTranslations("FreelanceTax");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [currencyMode, setCurrencyMode] = useState<"php" | "usd">(
		(searchParams.get("currency") as "php" | "usd") || "usd",
	);
	const [usdIncomeStr, setUsdIncomeStr] = useState(
		searchParams.get("usd") || "2000",
	);
	const [forexRateStr, setForexRateStr] = useState(
		searchParams.get("rate") || "57.50",
	);
	const [grossIncomeStr, setGrossIncomeStr] = useState(
		searchParams.get("php") || "100000",
	);
	const [includeUpwork, setIncludeUpwork] = useState(
		searchParams.get("upwork") !== "false",
	);
	const [mounted, setMounted] = useState(false);

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

	const applyUsdCase = (usd: string, rate: string, upwork: boolean) => {
		setCurrencyMode("usd");
		setUsdIncomeStr(usd);
		setForexRateStr(rate);
		setIncludeUpwork(upwork);
		updateUrl({
			currency: "usd",
			usd,
			rate,
			upwork: upwork ? "true" : "false",
		});
	};

	const applyPhpCase = (php: string) => {
		setCurrencyMode("php");
		setGrossIncomeStr(php);
		updateUrl({ currency: "php", php });
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const usdIncome = parseFloat(usdIncomeStr) || 0;
	const forexRate = parseFloat(forexRateStr) || 0;
	const phpGrossIncome = parseFloat(grossIncomeStr) || 0;

	// Upwork charges a flat 10% fee on all contracts
	const platformFeeRate = 0.1;
	const platformFeeUsd = includeUpwork ? usdIncome * platformFeeRate : 0;
	const netUsd = usdIncome - platformFeeUsd;

	// Calculate total PHP equivalent before tax
	const totalPhp = currencyMode === "usd" ? netUsd * forexRate : phpGrossIncome;

	// 8% Flat Rate Logic (BIR for freelancers/self-employed)
	// Note: the 250k exemption is annual. For a monthly calculator, we assume they prorate it or we just show the raw monthly deduction.
	// We'll calculate it as a simple 8% of the gross receipt since most freelancers just set aside 8% of every payout.
	const eightPercentTax = totalPhp * 0.08;
	const netIncome8Percent = totalPhp - eightPercentTax;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	const platformFeePhp =
		currencyMode === "usd" ? platformFeeUsd * forexRate : 0;

	const chartData = [
		{ name: t("chartNetTakeHome"), value: netIncome8Percent, color: "#1b5e20" },
		{ name: t("chart8BirTax"), value: eightPercentTax, color: "#b71c1c" },
		{ name: t("chartUpworkFee"), value: platformFeePhp, color: "#f57c00" },
	].filter((item) => item.value > 0);

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

				<AdBanner dataAdSlot="freelance-tax-top" />

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
							{t("incomeDetails")}
						</h2>

						<SampleCases
							cases={[
								{
									label: "Upwork $2k/mo",
									onSelect: () => applyUsdCase("2000", "57.50", true),
								},
								{
									label: "Direct client $3.5k",
									onSelect: () => applyUsdCase("3500", "57.50", false),
								},
								{
									label: "₱100k/mo local",
									onSelect: () => applyPhpCase("100000"),
								},
							]}
						/>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<div className="form-label">{t("currency")}</div>
							<div style={{ display: "flex", gap: "12px" }}>
								<button
									className={`btn-secondary ${currencyMode === "usd" ? "active" : ""}`}
									style={{
										flex: 1,
										backgroundColor: currencyMode === "usd" ? "#14a800" : "",
										color: currencyMode === "usd" ? "white" : "",
									}}
									onClick={() => {
										setCurrencyMode("usd");
										updateUrl({ currency: "usd" });
									}}
								>
									{t("currencyUsd")}
								</button>
								<button
									className={`btn-secondary ${currencyMode === "php" ? "active" : ""}`}
									style={{
										flex: 1,
										backgroundColor: currencyMode === "php" ? "#0f136d" : "",
										color: currencyMode === "php" ? "white" : "",
									}}
									onClick={() => {
										setCurrencyMode("php");
										updateUrl({ currency: "php" });
									}}
								>
									{t("currencyPhp")}
								</button>
							</div>
						</div>

						{currencyMode === "usd" ? (
							<>
								<div className="form-group">
									<label className="form-label" htmlFor="usdIncome">
										{t("grossUsdLabel")}
									</label>
									<input
										type="number"
										id="usdIncome"
										className="form-control"
										value={usdIncomeStr}
										onChange={(e) => {
											setUsdIncomeStr(e.target.value);
											updateUrl({ usd: e.target.value });
										}}
										min="0"
									/>
								</div>
								<div className="form-group" style={{ marginTop: "16px" }}>
									<label className="form-label" htmlFor="forexRate">
										{t("forexRateLabel")}
									</label>
									<input
										type="number"
										id="forexRate"
										className="form-control"
										value={forexRateStr}
										onChange={(e) => {
											setForexRateStr(e.target.value);
											updateUrl({ rate: e.target.value });
										}}
										min="0"
										step="0.01"
									/>
									<p className="form-hint" style={{ marginTop: "4px" }}>
										{t("forexHint")}
									</p>
								</div>
								<div
									style={{
										marginTop: "16px",
										paddingTop: "16px",
										borderTop: "1px solid var(--border-color)",
									}}
								>
									<label className="form-label" htmlFor="platformSelect">
										{t("platformFee")}
									</label>
									<select
										id="platformSelect"
										className="form-control"
										value={includeUpwork ? "upwork" : "none"}
										onChange={(e) => {
											setIncludeUpwork(e.target.value !== "none");
											updateUrl({
												upwork: e.target.value === "none" ? "false" : "true",
											});
										}}
									>
										<option value="none">{t("noPlatformFee")}</option>
										<option value="upwork">{t("upworkOption")}</option>
									</select>
									<p className="form-hint" style={{ marginTop: "6px" }}>
										{t("platformHint")}
									</p>
								</div>
							</>
						) : (
							<div className="form-group">
								<label className="form-label" htmlFor="grossIncome">
									{t("grossPhpLabel")}
								</label>
								<input
									type="number"
									id="grossIncome"
									className="form-control"
									value={grossIncomeStr}
									onChange={(e) => setGrossIncomeStr(e.target.value)}
									min="0"
									step="1000"
								/>
							</div>
						)}
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

						{currencyMode === "usd" && (
							<>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "8px",
										fontSize: "14px",
									}}
								>
									<span>{t("grossUsd")}</span>
									<span>${usdIncome.toFixed(2)}</span>
								</div>
								{includeUpwork && (
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											marginBottom: "8px",
											fontSize: "14px",
										}}
									>
										<span>{t("upworkFee")}</span>
										<span style={{ color: "#d32f2f" }}>
											- ${platformFeeUsd.toFixed(2)}
										</span>
									</div>
								)}
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "16px",
										paddingBottom: "16px",
										borderBottom: "1px dashed var(--border-color)",
										fontSize: "14px",
									}}
								>
									<span>{t("netUsdWithdrawal")}</span>
									<span style={{ fontWeight: 600 }}>${netUsd.toFixed(2)}</span>
								</div>
							</>
						)}

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("grossPhpReceipts")}</span>
							<span style={{ fontWeight: 600 }}>
								{formatCurrency(totalPhp)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								padding: "12px",
								backgroundColor: "#ffebee",
								borderRadius: "var(--border-radius-sm)",
								border: "1px solid #ffcdd2",
							}}
						>
							<span style={{ fontWeight: 500, color: "#b71c1c" }}>
								{t("totalTaxDue8")}
							</span>
							<strong style={{ color: "#b71c1c" }}>
								{formatCurrency(eightPercentTax)}
							</strong>
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
							<span>{t("netTakeHome")}</span>
							<span style={{ color: "#1b5e20" }}>
								{formatCurrency(netIncome8Percent)}
							</span>
						</div>
					</div>
				</div>

				{/* Recharts Visualization */}
				{mounted && totalPhp > 0 && (
					<div
						className="card"
						style={{ marginTop: "24px", padding: "24px", maxWidth: "100%" }}
					>
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								textAlign: "center",
							}}
						>
							{t("incomeBreakdown")}
						</h2>
						<div style={{ width: "100%", height: 300 }}>
							<Chart data={chartData} formatValue={formatCurrency} />
						</div>
					</div>
				)}
			</div>
		</ToolLayout>
	);
}
