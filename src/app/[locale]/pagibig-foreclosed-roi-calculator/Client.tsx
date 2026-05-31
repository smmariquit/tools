"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AdBanner from "../components/AdBanner";

export default function PagibigRoiClient() {
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
		<div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
					Pag-IBIG Foreclosed Property ROI Calculator
				</h1>
				<p className="page-subtitle">
					Calculate potential rental yield and flipping returns for Pag-IBIG
					Acquired Assets.
				</p>
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
						Investment Details
					</h2>

					<div className="form-group" style={{ marginBottom: "16px" }}>
						<label className="form-label" htmlFor="purchasePrice">
							Discounted Purchase Price (PHP)
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
							Estimated Repair / Renovation Cost (PHP)
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
							Foreclosures are bought "As-Is, Where-Is". Expect repairs.
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
							Expected Monthly Rent (PHP)
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
							Expected Resale / Flipping Price (PHP)
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
						ROI Projections
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "24px",
							fontSize: "14px",
						}}
					>
						<span>Total Capital Needed</span>
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
						Strategy 1: Buy and Hold (Rental)
					</h3>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "8px",
							fontSize: "14px",
						}}
					>
						<span>Annual Rent Income</span>
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
						<span>Gross Rental Yield</span>
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
						Strategy 2: Fix and Flip
					</h3>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "8px",
							fontSize: "14px",
						}}
					>
						<span>Selling Price</span>
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
						<span>Capital Gains Tax (6%)</span>
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
						<span>Broker&apos;s Fee (5%)</span>
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
						<span>Net Profit</span>
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
						<span>Flipping ROI</span>
						<span style={{ color: flippingRoi > 0 ? "#2e7d32" : "#b71c1c" }}>
							{flippingRoi.toFixed(2)}%
						</span>
					</div>
				</div>
			</div>

			<div
				style={{
					marginTop: "48px",
					paddingTop: "32px",
					borderTop: "1px solid var(--border-color)",
					color: "var(--text-primary)",
				}}
			>
				<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
					Analyzing Pag-IBIG Acquired Assets
				</h2>
				<p style={{ marginBottom: "16px" }}>
					Pag-IBIG foreclosed properties offer great opportunities for
					investors, but you must factor in the "hidden costs" of real estate
					investing in the Philippines.
				</p>
				<ul
					style={{
						paddingLeft: "24px",
						marginBottom: "16px",
						lineHeight: "1.6",
					}}
				>
					<li>
						<strong>&quot;As-Is, Where-Is&quot;:</strong> Pag-IBIG sells
						properties in their current physical condition. Always inspect the
						property with a contractor to estimate repair costs accurately.
					</li>
					<li>
						<strong>Rental Yield Target:</strong> In the Philippines, a good
						gross rental yield is generally between <strong>6% to 8%</strong>.
						If your yield is below 5%, it might be better to flip it or put the
						money in Pag-IBIG MP2 instead.
					</li>
					<li>
						<strong>Flipping Taxes:</strong> When you sell a property, you are
						legally required to pay a 6% Capital Gains Tax (CGT) based on the
						Gross Selling Price or Zonal Value (whichever is higher). You also
						typically pay a 5% commission to a licensed real estate broker.
					</li>
				</ul>
			</div>
		</div>
	);
}
