"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AdBanner from "../components/AdBanner";

export default function HolidayClient() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [dailyRateStr, setDailyRateStr] = useState(
		searchParams.get("rate") || "1000",
	);
	const [dayType, setDayType] = useState<
		"regular" | "special" | "regularRest" | "specialRest"
	>(
		(searchParams.get("type") as
			| "regular"
			| "special"
			| "regularRest"
			| "specialRest") || "regular",
	);
	const [didWork, setDidWork] = useState<"yes" | "no">(
		(searchParams.get("worked") as "yes" | "no") || "yes",
	);
	const [hoursWorkedStr, setHoursWorkedStr] = useState(
		searchParams.get("hours") || "8",
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

	const dailyRate = parseFloat(dailyRateStr) || 0;
	const hoursWorked = parseFloat(hoursWorkedStr) || 0;
	const hourlyRate = dailyRate / 8;

	let multiplier = 1;
	let computedPay = 0;
	let breakdown = "";

	// DOLE Holiday Pay Logic
	if (didWork === "no") {
		if (dayType === "regular" || dayType === "regularRest") {
			multiplier = 1.0; // 100%
			computedPay = dailyRate;
			breakdown = "Unworked Regular Holiday: 100% of Daily Wage";
		} else {
			multiplier = 0.0; // 0%
			computedPay = 0;
			breakdown = "Unworked Special Non-Working Day: No Work, No Pay";
		}
	} else {
		// They worked
		let baseMultiplier = 1;

		switch (dayType) {
			case "regular":
				baseMultiplier = 2.0; // 200%
				breakdown = "Worked on Regular Holiday: 200% of Basic Wage";
				break;
			case "special":
				baseMultiplier = 1.3; // 130%
				breakdown = "Worked on Special Non-Working Day: 130% of Basic Wage";
				break;
			case "regularRest":
				baseMultiplier = 2.6; // 260%
				breakdown =
					"Worked on Regular Holiday falling on Rest Day: 260% of Basic Wage";
				break;
			case "specialRest":
				baseMultiplier = 1.5; // 150%
				breakdown =
					"Worked on Special Holiday falling on Rest Day: 150% of Basic Wage";
				break;
		}

		// Overtime logic (>8 hours)
		if (hoursWorked <= 8) {
			computedPay = hourlyRate * hoursWorked * baseMultiplier;
		} else {
			// First 8 hours
			const regularPay = hourlyRate * 8 * baseMultiplier;
			// Overtime hours (extra 30% on top of the holiday hourly rate)
			const otHours = hoursWorked - 8;
			const otRate = hourlyRate * baseMultiplier * 1.3;
			const otPay = otHours * otRate;

			computedPay = regularPay + otPay;
			breakdown += ` (Plus 30% Overtime Premium for ${otHours} excess hours)`;
		}
		// multiplier = baseMultiplier; (removed to pass ESLint no-unused-vars)
	}

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
				<h1 className="page-title">Holiday & Overtime Pay Calculator</h1>
				<p className="page-subtitle">
					Calculate your exact pay for working on Philippine Regular Holidays,
					Special Non-Working Days, and Rest Days based on DOLE rules.
				</p>
			</div>

			<AdBanner dataAdSlot="holiday-top" />

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
						Work Details
					</h2>

					<div className="form-group">
						<label className="form-label" htmlFor="dailyRate">
							Daily Basic Rate (PHP)
						</label>
						<input
							type="number"
							id="dailyRate"
							className="form-control"
							value={dailyRateStr}
							onChange={(e) => {
								setDailyRateStr(e.target.value);
								updateUrl({ rate: e.target.value });
							}}
							min="0"
						/>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<label className="form-label" htmlFor="dayType">
							Type of Holiday
						</label>
						<select
							id="dayType"
							className="form-control"
							value={dayType}
							onChange={(e) => {
								const val = e.target.value as
									| "regular"
									| "special"
									| "regularRest"
									| "specialRest";
								setDayType(val);
								updateUrl({ type: val });
							}}
						>
							<option value="regular">
								Regular Holiday (e.g. Christmas, Independence Day)
							</option>
							<option value="special">
								Special Non-Working Day (e.g. Ninoy Aquino Day)
							</option>
							<option value="regularRest">
								Regular Holiday AND It&apos;s your Rest Day
							</option>
							<option value="specialRest">
								Special Holiday AND It&apos;s your Rest Day
							</option>
						</select>
					</div>

					<div className="form-group" style={{ marginTop: "16px" }}>
						<div className="form-label">Did you work on this day?</div>
						<div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
								}}
							>
								<input
									type="radio"
									name="didWork"
									value="yes"
									checked={didWork === "yes"}
									onChange={() => {
										setDidWork("yes");
										updateUrl({ worked: "yes" });
									}}
								/>{" "}
								Yes
							</label>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									cursor: "pointer",
								}}
							>
								<input
									type="radio"
									name="didWork"
									value="no"
									checked={didWork === "no"}
									onChange={() => {
										setDidWork("no");
										updateUrl({ worked: "no" });
									}}
								/>{" "}
								No (Rest/Leave)
							</label>
						</div>
					</div>

					{didWork === "yes" && (
						<div className="form-group" style={{ marginTop: "16px" }}>
							<label className="form-label" htmlFor="hoursWorked">
								Total Hours Worked
							</label>
							<input
								type="number"
								id="hoursWorked"
								className="form-control"
								value={hoursWorkedStr}
								onChange={(e) => {
									setHoursWorkedStr(e.target.value);
									updateUrl({ hours: e.target.value });
								}}
								min="1"
								max="24"
							/>
							<p className="form-hint" style={{ marginTop: "4px" }}>
								Anything over 8 hours is considered Overtime.
							</p>
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
						Computed Pay for the Day
					</h2>

					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "16px",
							padding: "16px",
							backgroundColor: "#fff8e1",
							borderRadius: "var(--border-radius-md)",
							border: "1px solid #ffecb3",
						}}
					>
						<div style={{ width: "100%", textAlign: "center" }}>
							<span
								style={{
									display: "block",
									fontSize: "12px",
									color: "#f57f17",
									textTransform: "uppercase",
									fontWeight: 600,
									marginBottom: "8px",
								}}
							>
								Total Holiday Pay
							</span>
							<strong
								style={{ fontSize: "42px", color: "#e65100", lineHeight: 1 }}
							>
								{formatCurrency(computedPay)}
							</strong>
						</div>
					</div>

					<div
						style={{
							fontSize: "14px",
							color: "var(--text-secondary)",
							textAlign: "center",
							lineHeight: "1.6",
						}}
					>
						<p>
							<strong>Rule Applied:</strong>
							<br />
							{breakdown}
						</p>
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
					DOLE Holiday Pay Rules
				</h2>
				<p style={{ marginBottom: "16px" }}>
					In the Philippines, the Department of Labor and Employment (DOLE)
					strictly mandates how holiday pay is computed. The rules depend on
					whether the holiday is a <strong>Regular Holiday</strong> or a{" "}
					<strong>Special Non-Working Day</strong>.
				</p>
				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					Regular Holidays
				</h3>
				<ul
					style={{
						paddingLeft: "24px",
						marginBottom: "16px",
						lineHeight: "1.6",
					}}
				>
					<li>If unworked: You receive 100% of your daily wage.</li>
					<li>
						If worked (first 8 hours): You receive 200% of your daily wage.
					</li>
					<li>
						If worked on your rest day: You receive 260% of your daily wage.
					</li>
				</ul>
				<h3
					style={{ fontSize: "18px", marginTop: "24px", marginBottom: "12px" }}
				>
					Special Non-Working Days
				</h3>
				<ul
					style={{
						paddingLeft: "24px",
						marginBottom: "16px",
						lineHeight: "1.6",
					}}
				>
					<li>
						If unworked: &quot;No Work, No Pay&quot; principle applies (unless
						company policy states otherwise).
					</li>
					<li>
						If worked (first 8 hours): You receive 130% of your daily wage.
					</li>
					<li>
						If worked on your rest day: You receive 150% of your daily wage.
					</li>
				</ul>
			</div>
		</div>
	);
}
