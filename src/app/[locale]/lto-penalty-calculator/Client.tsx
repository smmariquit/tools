"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

export default function LtoPenaltyClient() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [vehicleType, setVehicleType] = useState<
		"motorcycle" | "carLight" | "carMedium" | "carHeavy"
	>(
		(searchParams.get("vehicle") as
			| "motorcycle"
			| "carLight"
			| "carMedium"
			| "carHeavy") || "motorcycle",
	);
	const [monthsLateStr, setMonthsLateStr] = useState(
		searchParams.get("months") || "1",
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

	const monthsLate = parseInt(monthsLateStr, 10) || 0;

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
					<h1 className="page-title">LTO Registration Penalty Calculator</h1>
					<p className="page-subtitle">
						Calculate the exact MVUC fines and penalties for late motor vehicle
						or motorcycle registration renewal in the Philippines.
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
								onChange={(e) => {
									const val = e.target.value as
										| "motorcycle"
										| "carLight"
										| "carMedium"
										| "carHeavy";
									setVehicleType(val);
									updateUrl({ vehicle: val });
								}}
							>
								<option value="motorcycle">
									Motorcycle (w/ or w/o sidecar)
								</option>
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
								onChange={(e) => {
									setMonthsLateStr(e.target.value);
									updateUrl({ months: e.target.value });
								}}
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
							<span style={{ color: "#1b5e20" }}>
								{formatCurrency(totalDue)}
							</span>
						</div>
					</div>
				</div>

							</div>
		</ToolLayout>
	);
}

