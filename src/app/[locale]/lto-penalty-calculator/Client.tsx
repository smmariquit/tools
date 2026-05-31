"use client";

import Link from "next/link";
import { useState } from "react";
import AdBanner from "../components/AdBanner";

export default function LtoPenaltyClient() {
	const [vehicleType, setVehicleType] = useState<
		"motorcycle" | "carLight" | "carMedium" | "carHeavy"
	>("motorcycle");
	const [monthsLateStr, setMonthsLateStr] = useState("1");

	const monthsLate = parseInt(monthsLateStr) || 0;

	// LTO MVUC (Motor Vehicle User's Charge) Base Rates
	const mvucRates = {
		motorcycle: 240,
		carLight: 1600, // up to 1600 kg
		carMedium: 3600, // 1601 - 2300 kg
		carHeavy: 8000, // 2301 kg and above
	};

	const baseMvuc = mvucRates[vehicleType];

	let penalty = 0;

	if (monthsLate > 0) {
		if (monthsLate <= 12) {
			// Less than 1 year late: 50% flat penalty
			penalty = baseMvuc * 0.5;
		} else {
			// More than 1 year late: 50% penalty + 50% for every additional year
			// E.g., 2 years late = 100% penalty.
			const yearsLate = Math.ceil(monthsLate / 12);
			penalty = baseMvuc * (0.5 * yearsLate);
		}
	}

	// Legal Research Fund (LRF) is a standard fixed fee added to LTO transactions
	const lrfFee = 10;
	const computerFee = 169.06; // Standard IT fee per transaction

	const totalDue = baseMvuc + penalty + lrfFee + computerFee;

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
				<h1 className="page-title">LTO Registration Penalty Calculator</h1>
				<p className="page-subtitle">
					Calculate the exact MVUC fines and penalties for late motor vehicle or
					motorcycle registration renewal in the Philippines.
				</p>
			</div>

			<AdBanner dataAdSlot="lto-top" />

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
						Vehicle Details
					</h2>

					<div className="form-group">
						<label className="form-label" htmlFor="vehicleType">
							Vehicle Type / Weight
						</label>
						<select
							id="vehicleType"
							className="form-control"
							value={vehicleType}
							onChange={(e) =>
								setVehicleType(
									e.target.value as
										| "motorcycle"
										| "carLight"
										| "carMedium"
										| "carHeavy",
								)
							}
						>
							<option value="motorcycle">Motorcycle (w/ or w/o sidecar)</option>
							<option value="carLight">
								Passenger Car - Light (Up to 1,600 kg)
							</option>
							<option value="carMedium">
								Passenger Car - Medium (1,601 - 2,300 kg)
							</option>
							<option value="carHeavy">
								Passenger Car - Heavy (2,301 kg and above)
							</option>
						</select>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="monthsLate">
							How many months late?
						</label>
						<input
							type="number"
							id="monthsLate"
							className="form-control"
							value={monthsLateStr}
							onChange={(e) => setMonthsLateStr(e.target.value)}
							min="0"
							max="120"
						/>
						<p className="form-hint" style={{ marginTop: "4px" }}>
							Enter 0 if registering on time.
						</p>
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
						Estimated Renewal Fee
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "8px",
							fontSize: "14px",
						}}
					>
						<span>Basic MVUC (Registration Fee)</span>
						<span>{formatCurrency(baseMvuc)}</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "8px",
							fontSize: "14px",
						}}
					>
						<span>Late Registration Penalty</span>
						<span
							style={{
								color: penalty > 0 ? "#b71c1c" : "var(--text-secondary)",
							}}
						>
							{penalty > 0 ? "+" : ""} {formatCurrency(penalty)}
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
						<span>Legal Research Fund (LRF)</span>
						<span>{formatCurrency(lrfFee)}</span>
					</div>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							fontSize: "14px",
						}}
					>
						<span>IT / Computer Fee</span>
						<span>{formatCurrency(computerFee)}</span>
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
						<span>Total Amount Due</span>
						<span style={{ color: "#1b5e20" }}>{formatCurrency(totalDue)}</span>
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
					How LTO Computes Late Penalties
				</h2>
				<p style={{ marginBottom: "16px" }}>
					The Land Transportation Office (LTO) computes your penalty based on
					your <strong>Motor Vehicle User&apos;s Charge (MVUC)</strong>. This is
					the base registration fee of your vehicle.
				</p>
				<ul
					style={{
						paddingLeft: "24px",
						marginBottom: "16px",
						lineHeight: "1.6",
					}}
				>
					<li>
						<strong>Late by 1 week to 12 months:</strong> 50% flat penalty
						surcharge on top of the MVUC.
					</li>
					<li>
						<strong>Delinquent beyond 1 year:</strong> 50% surcharge + 50%
						additional penalty for every year of delinquency.
					</li>
				</ul>
				<p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
					Note: This calculator provides an estimate of your MVUC renewal and
					penalty fees. It does not include the cost of CTPL Insurance, Emission
					Testing (PETC), or other localized LTO surcharges. Verify with
					`lto.gov.ph`.
				</p>
			</div>
		</div>
	);
}
