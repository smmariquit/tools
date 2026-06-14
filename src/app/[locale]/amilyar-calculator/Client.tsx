"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

export default function AmilyarClient() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [marketValueStr, setMarketValueStr] = useState(
		searchParams.get("mv") || "2000000",
	);
	const [propertyType, setPropertyType] = useState<
		"residential" | "commercial" | "agricultural"
	>(
		(searchParams.get("type") as
			| "residential"
			| "commercial"
			| "agricultural") || "residential",
	);
	const [location, setLocation] = useState<"metroManila" | "province">(
		(searchParams.get("loc") as "metroManila" | "province") || "metroManila",
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

	const marketValue = parseFloat(marketValueStr) || 0;

	// Assessment Levels
	const assessmentLevels = {
		residential: 0.2, // 20%
		commercial: 0.5, // 50%
		agricultural: 0.4, // 40%
	};

	// Basic RPT Rates
	const rptRates = {
		metroManila: 0.02, // 2%
		province: 0.01, // 1%
	};

	const assessmentLevel = assessmentLevels[propertyType];
	const assessedValue = marketValue * assessmentLevel;

	const basicRptRate = rptRates[location];
	const basicRpt = assessedValue * basicRptRate;

	// Special Education Fund (SEF) is universally 1% of the assessed value
	const sefRate = 0.01;
	const sefTax = assessedValue * sefRate;

	const totalAmilyar = basicRpt + sefTax;

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
					<h1 className="page-title">Amilyar (Real Property Tax) Calculator</h1>
					<p className="page-subtitle">
						Estimate your annual Philippine Real Property Tax (RPT) including
						the Special Education Fund (SEF) based on Local Government Code
						rates.
					</p>
				</div>

				<AdBanner dataAdSlot="amilyar-top" />

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
							Property Details
						</h2>

						<div className="form-group">
							<label className="form-label" htmlFor="marketValue">
								Fair Market Value (PHP)
							</label>
							<input
								type="number"
								id="marketValue"
								className="form-control"
								value={marketValueStr}
								onChange={(e) => {
									setMarketValueStr(e.target.value);
									updateUrl({ mv: e.target.value });
								}}
								min="0"
								step="100000"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								Check your property&apos;s Tax Declaration for the official
								market value.
							</p>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="propertyType">
								Property Classification
							</label>
							<select
								id="propertyType"
								className="form-control"
								value={propertyType}
								onChange={(e) => {
									const val = e.target.value as
										| "residential"
										| "commercial"
										| "agricultural";
									setPropertyType(val);
									updateUrl({ type: val });
								}}
							>
								<option value="residential">
									Residential (20% Assessment Level)
								</option>
								<option value="commercial">
									Commercial / Industrial (50% Assessment Level)
								</option>
								<option value="agricultural">
									Agricultural (40% Assessment Level)
								</option>
							</select>
						</div>

						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="location">
								Location
							</label>
							<select
								id="location"
								className="form-control"
								value={location}
								onChange={(e) => {
									const val = e.target.value as "metroManila" | "province";
									setLocation(val);
									updateUrl({ loc: val });
								}}
							>
								<option value="metroManila">
									Metro Manila (2% Basic Rate)
								</option>
								<option value="province">
									Provincial City / Municipality (1% Basic Rate)
								</option>
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
							Estimated Annual Amilyar
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "8px",
								fontSize: "14px",
							}}
						>
							<span>Assessed Value</span>
							<span style={{ fontWeight: 600 }}>
								{formatCurrency(assessedValue)}
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
							<span>Basic Real Property Tax</span>
							<span style={{ color: "var(--text-secondary)" }}>
								{formatCurrency(basicRpt)}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "16px",
								fontSize: "14px",
							}}
						>
							<span>Special Education Fund (SEF)</span>
							<span style={{ color: "var(--text-secondary)" }}>
								+ {formatCurrency(sefTax)}
							</span>
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
							<span>Total Annual Tax Due</span>
							<span style={{ color: "#b71c1c" }}>
								{formatCurrency(totalAmilyar)}
							</span>
						</div>
					</div>
				</div>

							</div>
		</ToolLayout>
	);
}

