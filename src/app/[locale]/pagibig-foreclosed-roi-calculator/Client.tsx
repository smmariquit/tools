"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

export default function PagibigRoiClient() {
	const t = useTranslations("PagibigForeclosedROI");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [purchasePriceStr, setPurchasePriceStr] = useState(
		searchParams.get("price") || "1000000",
	);
	const [repairCostStr, setRepairCostStr] = useState(
		searchParams.get("repair") || "200000",
	);
	const [monthlyRentStr, setMonthlyRentStr] = useState(
		searchParams.get("rent") || "12000",
	);
	const [resalePriceStr, setResalePriceStr] = useState(
		searchParams.get("resale") || "1800000",
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

	const purchasePrice = parseFloat(purchasePriceStr) || 0;
	const repairCost = parseFloat(repairCostStr) || 0;
	const monthlyRent = parseFloat(monthlyRentStr) || 0;
	const resalePrice = parseFloat(resalePriceStr) || 0;

	// Real Estate Math
	const totalInvestment = purchasePrice + repairCost;

	// Rental Yield
	const annualRent = monthlyRent * 12;
	const grossRentalYield =
		totalInvestment > 0 ? (annualRent / totalInvestment) * 100 : 0;

	// Flipping ROI
	// Deduct 6% Capital Gains Tax and 5% Broker Fee from Resale Price
	const capitalGainsTax = resalePrice * 0.06;
	const brokerFee = resalePrice * 0.05;
	const netResale = resalePrice - capitalGainsTax - brokerFee;

	const flippingProfit = netResale - totalInvestment;
	const flippingRoi =
		totalInvestment > 0 ? (flippingProfit / totalInvestment) * 100 : 0;

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

				<AdBanner dataAdSlot="real-estate-roi-top" />

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
							{t("inputTitle")}
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="purchasePrice">
								{t("purchasePriceLabel")}
							</label>
							<input
								type="number"
								id="purchasePrice"
								className="form-control"
								value={purchasePriceStr}
								onChange={(e) => {
									setPurchasePriceStr(e.target.value);
									updateUrl({ price: e.target.value });
								}}
								min="0"
								step="50000"
							/>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label" htmlFor="repairCost">
								{t("repairCostLabel")}
							</label>
							<input
								type="number"
								id="repairCost"
								className="form-control"
								value={repairCostStr}
								onChange={(e) => {
									setRepairCostStr(e.target.value);
									updateUrl({ repair: e.target.value });
								}}
								min="0"
								step="10000"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								{t("repairCostHint")}
							</p>
						</div>

						<div
							className="form-group"
							style={{
								marginBottom: "16px",
								paddingTop: "16px",
								borderTop: "1px solid var(--border-color)",
							}}
						>
							<label className="form-label" htmlFor="monthlyRent">
								{t("monthlyRentLabel")}
							</label>
							<input
								type="number"
								id="monthlyRent"
								className="form-control"
								value={monthlyRentStr}
								onChange={(e) => {
									setMonthlyRentStr(e.target.value);
									updateUrl({ rent: e.target.value });
								}}
								min="0"
								step="1000"
							/>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="resalePrice">
								{t("resalePriceLabel")}
							</label>
							<input
								type="number"
								id="resalePrice"
								className="form-control"
								value={resalePriceStr}
								onChange={(e) => {
									setResalePriceStr(e.target.value);
									updateUrl({ resale: e.target.value });
								}}
								min="0"
								step="50000"
							/>
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
								marginBottom: "24px",
								fontSize: "14px",
							}}
						>
							<span>{t("totalCapital")}</span>
							<span style={{ fontWeight: 700 }}>
								{formatCurrency(totalInvestment)}
							</span>
						</div>

						<h3
							style={{
								fontSize: "16px",
								color: "var(--primary)",
								marginBottom: "12px",
							}}
						>
							{t("strategy1Title")}
						</h3>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("annualRent")}</span>
							<span style={{ color: "#2e7d32" }}>
								{formatCurrency(annualRent)}
							</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "24px",
								fontSize: "16px",
								fontWeight: 700,
							}}
						>
							<span>{t("grossYield")}</span>
							<span
								style={{ color: grossRentalYield >= 8 ? "#2e7d32" : "#b71c1c" }}
							>
								{grossRentalYield.toFixed(2)}%
							</span>
						</div>

						<h3
							style={{
								fontSize: "16px",
								color: "var(--primary)",
								marginBottom: "12px",
							}}
						>
							{t("strategy2Title")}
						</h3>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("sellingPrice")}</span>
							<span>{formatCurrency(resalePrice)}</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
								color: "var(--text-secondary)",
							}}
						>
							<span>{t("capitalGainsTax")}</span>
							<span>- {formatCurrency(capitalGainsTax)}</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
								color: "var(--text-secondary)",
							}}
						>
							<span>{t("brokerFee")}</span>
							<span>- {formatCurrency(brokerFee)}</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>{t("netProfit")}</span>
							<span
								style={{
									color: flippingProfit > 0 ? "#2e7d32" : "#b71c1c",
									fontWeight: 600,
								}}
							>
								{formatCurrency(flippingProfit)}
							</span>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								fontSize: "16px",
								fontWeight: 700,
								marginTop: "8px",
								paddingTop: "8px",
								borderTop: "1px dashed var(--border-color)",
							}}
						>
							<span>{t("flippingRoi")}</span>
							<span style={{ color: flippingRoi > 0 ? "#2e7d32" : "#b71c1c" }}>
								{flippingRoi.toFixed(2)}%
							</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
