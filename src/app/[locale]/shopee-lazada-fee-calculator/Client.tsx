"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

export default function EcommerceFeeClient() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [platform, setPlatform] = useState<"shopee" | "lazada" | "tiktok">(
		(searchParams.get("platform") as "shopee" | "lazada" | "tiktok") ||
			"shopee",
	);
	const [itemPriceStr, setItemPriceStr] = useState(
		searchParams.get("price") || "1000",
	);
	const [shippingFeeStr, setShippingFeeStr] = useState(
		searchParams.get("shipping") || "50",
	);

	const [isFss, setIsFss] = useState(searchParams.get("fss") === "true");
	const [isCcb, setIsCcb] = useState(searchParams.get("ccb") === "true");

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

	const itemPrice = parseFloat(itemPriceStr) || 0;
	const shippingFee = parseFloat(shippingFeeStr) || 0;

	// Total amount paid by buyer (Item Price + Shipping)
	const totalOrderAmount = itemPrice + shippingFee;

	// 1. Transaction / Payment Fee (Standard across both is ~2.24% of Total Order Amount)
	const transactionFeeRate = 0.0224;
	const transactionFee = totalOrderAmount * transactionFeeRate;

	// 2. Commission Fee (Standard is around 4% - 5% of Item Price depending on category)
	// We'll use 5% for Shopee, 4.5% for Lazada, and 4% for TikTok Shop as conservative estimates.
	const commissionFeeRate =
		platform === "shopee" ? 0.05 : platform === "lazada" ? 0.045 : 0.04;
	const commissionFee = itemPrice * commissionFeeRate;

	// 3. Optional Program Fees (FSS & CCB or TikTok Affiliate) - applied to Item Price
	// Shopee FSS is typically ~5.6% (5% + VAT). Lazada Free Shipping Max is similar.
	// TikTok Affiliate commission is typically 10% average.
	const programFeeRate =
		(isFss ? (platform === "tiktok" ? 0.1 : 0.056) : 0) + (isCcb ? 0.0336 : 0);
	const programFee = itemPrice * programFeeRate;

	// Total Deductions
	const totalDeductions = transactionFee + commissionFee + programFee;

	// Net Payout (What the seller receives)
	// Net = Item Price - Total Deductions (Seller does not keep shipping fee, logistics takes it)
	const netPayout = itemPrice - totalDeductions;

	// Profit Margin percentage
	const profitMargin = itemPrice > 0 ? (netPayout / itemPrice) * 100 : 0;

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
					<Link
						href="/"
						style={{
							fontSize: "14px",
							display: "inline-block",
							marginBottom: "16px",
						}}
					>
						&larr; Back to Tools
					</Link>
					<h1 className="page-title">
						TikTok, Shopee & Lazada Seller Fee Calculator
					</h1>
					<p className="page-subtitle">
						Calculate exact deductions (Commission, Transaction, Affiliate) and
						find out your actual net payout per item.
					</p>
				</div>

				<AdBanner dataAdSlot="ecommerce-top" />

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
							Order Details
						</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<div className="form-label">E-Commerce Platform</div>
							<div style={{ display: "flex", gap: "12px" }}>
								<button
									className={`btn-secondary ${platform === "shopee" ? "active" : ""}`}
									style={{
										flex: 1,
										backgroundColor: platform === "shopee" ? "#ff5722" : "",
										color: platform === "shopee" ? "white" : "",
									}}
									onClick={() => {
										setPlatform("shopee");
										updateUrl({ platform: "shopee" });
									}}
								>
									Shopee
								</button>
								<button
									className={`btn-secondary ${platform === "lazada" ? "active" : ""}`}
									style={{
										flex: 1,
										backgroundColor: platform === "lazada" ? "#0f136d" : "",
										color: platform === "lazada" ? "white" : "",
									}}
									onClick={() => {
										setPlatform("lazada");
										updateUrl({ platform: "lazada" });
									}}
								>
									Lazada
								</button>
								<button
									className={`btn-secondary ${platform === "tiktok" ? "active" : ""}`}
									style={{
										flex: 1,
										backgroundColor: platform === "tiktok" ? "#000000" : "",
										color: platform === "tiktok" ? "white" : "",
									}}
									onClick={() => {
										setPlatform("tiktok");
										updateUrl({ platform: "tiktok" });
									}}
								>
									TikTok Shop
								</button>
							</div>
						</div>

						<div className="form-group">
							<label className="form-label" htmlFor="itemPrice">
								Selling Price of Item (PHP)
							</label>
							<input
								type="number"
								id="itemPrice"
								className="form-control"
								value={itemPriceStr}
								onChange={(e) => {
									setItemPriceStr(e.target.value);
									updateUrl({ price: e.target.value });
								}}
								min="0"
							/>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="shippingFee">
								Shipping Fee paid by Buyer (PHP)
							</label>
							<input
								type="number"
								id="shippingFee"
								className="form-control"
								value={shippingFeeStr}
								onChange={(e) => {
									setShippingFeeStr(e.target.value);
									updateUrl({ shipping: e.target.value });
								}}
								min="0"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								Transaction fees apply to the entire order amount, including
								shipping.
							</p>
						</div>

						<div
							style={{
								marginTop: "24px",
								paddingTop: "16px",
								borderTop: "1px solid var(--border-color)",
							}}
						>
							<div className="form-label">
								Opt-in Programs (Extra Deductions)
							</div>

							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									marginTop: "12px",
									cursor: "pointer",
									fontSize: "14px",
								}}
							>
								<input
									type="checkbox"
									checked={isFss}
									onChange={(e) => {
										setIsFss(e.target.checked);
										updateUrl({ fss: e.target.checked ? "true" : "" });
									}}
									style={{ width: "16px", height: "16px" }}
								/>
								{platform === "tiktok"
									? "Paid to Affiliate Creators (~10% Fee)"
									: "Joined Free Shipping Program (~5.6% Fee)"}
							</label>

							{platform !== "tiktok" && (
								<label
									style={{
										display: "flex",
										alignItems: "center",
										gap: "8px",
										marginTop: "12px",
										cursor: "pointer",
										fontSize: "14px",
									}}
								>
									<input
										type="checkbox"
										checked={isCcb}
										onChange={(e) => {
											setIsCcb(e.target.checked);
											updateUrl({ ccb: e.target.checked ? "true" : "" });
										}}
										style={{ width: "16px", height: "16px" }}
									/>
									Joined Cashback Program (~3.36% Fee)
								</label>
							)}
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
							Payout Breakdown
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
							}}
						>
							<span>Item Price</span>
							<span style={{ fontWeight: 600 }}>
								{formatCurrency(itemPrice)}
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
							<span>Transaction Fee (2.24%)</span>
							<span style={{ color: "var(--text-secondary)" }}>
								- {formatCurrency(transactionFee)}
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
							<span>
								Commission Fee (~
								{platform === "shopee"
									? "5"
									: platform === "lazada"
										? "4.5"
										: "4"}
								%)
							</span>
							<span style={{ color: "var(--text-secondary)" }}>
								- {formatCurrency(commissionFee)}
							</span>
						</div>

						{(isFss || isCcb) && (
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: "8px",
									fontSize: "14px",
								}}
							>
								<span>
									{platform === "tiktok"
										? "Affiliate Commission"
										: "Program Fees (FSS/CCB)"}
								</span>
								<span style={{ color: "var(--text-secondary)" }}>
									- {formatCurrency(programFee)}
								</span>
							</div>
						)}

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
							<span>Net Payout</span>
							<span style={{ color: "#1b5e20" }}>
								{formatCurrency(netPayout)}
							</span>
						</div>

						<div
							style={{
								textAlign: "right",
								marginTop: "8px",
								fontSize: "14px",
								color: profitMargin > 0 ? "#2e7d32" : "#b71c1c",
							}}
						>
							{profitMargin > 0 ? "Margin: " : "Loss: "}{" "}
							{profitMargin.toFixed(1)}% of Item Price
						</div>
					</div>
				</div>

							</div>
		</ToolLayout>
	);
}

