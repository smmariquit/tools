"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AdBanner from "../components/AdBanner";

const RouteSelectorMap = dynamic(
	() => import("../../components/RouteSelectorMap"),
	{
		ssr: false,
		loading: () => (
			<div
				style={{
					height: "300px",
					width: "100%",
					backgroundColor: "var(--surface-color)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					border: "1px solid var(--border-color)",
					borderRadius: "8px",
				}}
			>
				Loading Map...
			</div>
		),
	},
);

export default function FuelCostClient() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [distanceStr, setDistanceStr] = useState(
		searchParams.get("dist") || "250",
	);
	const [efficiencyStr, setEfficiencyStr] = useState(
		searchParams.get("eff") || "12",
	);
	const [fuelPriceStr, setFuelPriceStr] = useState(
		searchParams.get("price") || "65",
	);
	const [passengersStr, setPassengersStr] = useState(
		searchParams.get("pax") || "4",
	);
	const [showMapModal, setShowMapModal] = useState(false);

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

	const distance = parseFloat(distanceStr) || 0;
	const efficiency = parseFloat(efficiencyStr) || 0;
	const fuelPrice = parseFloat(fuelPriceStr) || 0;
	const passengers = parseInt(passengersStr, 10) || 1;

	// Math
	const litersNeeded = efficiency > 0 ? distance / efficiency : 0;
	const totalFuelCost = litersNeeded * fuelPrice;
	const costPerPerson =
		passengers > 0 ? totalFuelCost / passengers : totalFuelCost;

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
				<h1 className="page-title">Fuel Cost & Trip Calculator</h1>
				<p className="page-subtitle">
					Estimate your gas expenses for road trips in the Philippines. Perfect
					for dividing costs among friends (ambagan).
				</p>
			</div>

			<AdBanner dataAdSlot="fuel-top" />

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
						Trip Details
					</h2>

					<div style={{ marginBottom: "24px" }}>
						<button
							type="button"
							className="btn-secondary"
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								gap: "8px",
							}}
							onClick={() => setShowMapModal(true)}
						>
							📍 Open Map to Select Route
						</button>
					</div>

					{showMapModal && (
						<div
							style={{
								position: "fixed",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "rgba(0,0,0,0.7)",
								zIndex: 9999,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								padding: "16px",
							}}
						>
							<div
								style={{
									backgroundColor: "var(--bg-color)",
									borderRadius: "12px",
									width: "100%",
									maxWidth: "800px",
									padding: "24px",
									position: "relative",
									maxHeight: "90vh",
									overflowY: "auto",
									boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
								}}
							>
								<button
									type="button"
									onClick={() => setShowMapModal(false)}
									style={{
										position: "absolute",
										top: "16px",
										right: "16px",
										background: "none",
										border: "none",
										fontSize: "24px",
										cursor: "pointer",
										color: "var(--text-primary)",
										zIndex: 10,
									}}
								>
									&times;
								</button>
								<h3 style={{ marginBottom: "16px", fontSize: "20px" }}>
									Select Route on Map
								</h3>
								<RouteSelectorMap
									onDistanceComputed={(dist) => {
										const val = dist.toFixed(1);
										setDistanceStr(val);
										updateUrl({ dist: val });
									}}
								/>
								<div
									style={{
										marginTop: "24px",
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									<button
										type="button"
										className="btn-primary"
										onClick={() => setShowMapModal(false)}
									>
										Confirm Distance & Close
									</button>
								</div>
							</div>
						</div>
					)}

					<div className="form-group">
						<label className="form-label" htmlFor="distance">
							Total Distance (Kilometers)
						</label>
						<input
							type="number"
							id="distance"
							className="form-control"
							value={distanceStr}
							onChange={(e) => {
								setDistanceStr(e.target.value);
								updateUrl({ dist: e.target.value });
							}}
							min="0"
						/>
						<p className="form-hint" style={{ marginTop: "4px" }}>
							E.g., Manila to Baguio is approx 250 km.
						</p>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="carType">
							Select Common Vehicle Type
						</label>
						<select
							id="carType"
							className="form-control"
							onChange={(e) => {
								if (e.target.value) {
									setEfficiencyStr(e.target.value);
									updateUrl({ eff: e.target.value });
								}
							}}
						>
							<option value="">-- Custom Efficiency / Enter Manually --</option>
							<option value="25">🏍️ Motorcycle (150cc) - ~25 km/L</option>
							<option value="15">
								🚗 Small Hatchback (Wigo, Brio) - ~15 km/L
							</option>
							<option value="12">
								🚙 Compact Sedan (Vios, City) - ~12 km/L
							</option>
							<option value="9">
								🛻 Mid-size SUV (Fortuner, Montero) - ~9 km/L
							</option>
							<option value="7">🚐 Large Van (Hiace, Urvan) - ~7 km/L</option>
						</select>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="efficiency">
							Vehicle Fuel Efficiency (km/L)
						</label>
						<input
							type="number"
							id="efficiency"
							className="form-control"
							value={efficiencyStr}
							onChange={(e) => {
								setEfficiencyStr(e.target.value);
								updateUrl({ eff: e.target.value });
							}}
							min="0"
						/>
						<p className="form-hint" style={{ marginTop: "4px" }}>
							Average sedan gets 10-14 km/L. SUVs get 7-10 km/L.
						</p>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="fuelPrice">
							Fuel Price (₱ per Liter)
						</label>
						<input
							type="number"
							id="fuelPrice"
							className="form-control"
							value={fuelPriceStr}
							onChange={(e) => {
								setFuelPriceStr(e.target.value);
								updateUrl({ price: e.target.value });
							}}
							min="0"
							step="0.01"
						/>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="passengers">
							Number of Passengers (for Ambagan)
						</label>
						<input
							type="number"
							id="passengers"
							className="form-control"
							value={passengersStr}
							onChange={(e) => {
								setPassengersStr(e.target.value);
								updateUrl({ pax: e.target.value });
							}}
							min="1"
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
						Estimated Expenses
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "8px",
							fontSize: "14px",
						}}
					>
						<span>Fuel Required</span>
						<span style={{ fontWeight: 600 }}>
							{litersNeeded.toFixed(2)} Liters
						</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							padding: "16px",
							backgroundColor: "#e8f5e9",
							borderRadius: "var(--border-radius-md)",
							border: "1px solid #c8e6c9",
						}}
					>
						<div style={{ width: "100%", textAlign: "center" }}>
							<span
								style={{
									display: "block",
									fontSize: "12px",
									color: "#2e7d32",
									textTransform: "uppercase",
									fontWeight: 600,
									marginBottom: "8px",
								}}
							>
								Total Gas Cost
							</span>
							<strong
								style={{ fontSize: "42px", color: "#1b5e20", lineHeight: 1 }}
							>
								{formatCurrency(totalFuelCost)}
							</strong>
						</div>
					</div>

					{passengers > 1 && (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "16px",
								paddingTop: "16px",
								borderTop: "2px dashed var(--border-color)",
								fontSize: "16px",
								fontWeight: 600,
								color: "var(--text-primary)",
							}}
						>
							<span>Cost per Person (Ambagan)</span>
							<span style={{ color: "var(--text-secondary)" }}>
								{formatCurrency(costPerPerson)}
							</span>
						</div>
					)}
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
					How to compute Fuel Consumption
				</h2>
				<p style={{ marginBottom: "16px" }}>
					The math behind fuel expenses is straightforward. Just divide the
					total distance by your car&apos;s efficiency, then multiply by the
					price of gas.
				</p>
				<div
					style={{
						padding: "16px",
						backgroundColor: "var(--surface-color)",
						borderRadius: "var(--border-radius-md)",
						border: "1px solid var(--border-color)",
						marginBottom: "16px",
						fontFamily: "monospace",
						textAlign: "center",
						fontSize: "16px",
					}}
				>
					(Distance in km ÷ Efficiency in km/L) × Price per Liter
				</div>
				<p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
					Note: Traffic congestion in Metro Manila can heavily reduce your km/L
					efficiency. If driving in heavy traffic, adjust your efficiency number
					downwards (e.g., from 12 km/L to 7 km/L) for a more accurate cost
					estimate.
				</p>
			</div>
		</div>
	);
}
