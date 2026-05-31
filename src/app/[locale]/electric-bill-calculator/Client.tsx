"use client";

import Link from "next/link";
import { useState } from "react";
import AdBanner from "../components/AdBanner";

type Appliance = {
	id: string;
	name: string;
	wattsStr: string;
	hoursStr: string;
	daysStr: string;
};

export default function ElectricBillClient() {
	const [rateStr, setRateStr] = useState("11.50"); // Meralco avg approx 11-12 pesos per kWh
	const [appliances, setAppliances] = useState<Appliance[]>([
		{
			id: Date.now().toString(),
			name: "1.0 HP Non-Inverter Aircon",
			wattsStr: "1000",
			hoursStr: "8",
			daysStr: "30",
		},
	]);

	const rate = parseFloat(rateStr) || 0;

	const addAppliance = () => {
		setAppliances([
			...appliances,
			{
				id: Date.now().toString(),
				name: "Custom Appliance",
				wattsStr: "0",
				hoursStr: "0",
				daysStr: "30",
			},
		]);
	};

	const removeAppliance = (id: string) => {
		if (appliances.length > 1) {
			setAppliances(appliances.filter((app) => app.id !== id));
		}
	};

	const updateAppliance = (
		id: string,
		field: keyof Appliance,
		value: string,
	) => {
		setAppliances(
			appliances.map((app) => {
				if (app.id === id) {
					return { ...app, [field]: value };
				}
				return app;
			}),
		);
	};

	const handlePresetChange = (id: string, value: string) => {
		if (!value) return;
		const [presetWatts, presetName] = value.split("|");
		updateAppliance(id, "wattsStr", presetWatts);
		updateAppliance(id, "name", presetName);
	};

	let totalMonthlyKwh = 0;
	let totalMonthlyCost = 0;

	const computedAppliances = appliances.map((app) => {
		const watts = parseFloat(app.wattsStr) || 0;
		const hours = parseFloat(app.hoursStr) || 0;
		const days = parseFloat(app.daysStr) || 0;

		const kwh = (watts / 1000) * hours * days;
		const cost = kwh * rate;

		totalMonthlyKwh += kwh;
		totalMonthlyCost += cost;

		return { ...app, kwh, cost };
	});

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
				<h1 className="page-title">Electric Bill Estimator (Meralco)</h1>
				<p className="page-subtitle">
					Calculate your total monthly electricity cost by adding all your
					appliances.
				</p>
			</div>

			<AdBanner dataAdSlot="electric-bill-top" />

			<div className="tool-grid" style={{ marginTop: "24px" }}>
				{/* Input Card */}
				<div className="card" style={{ alignSelf: "start" }}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "16px",
							borderBottom: "1px solid var(--border-color)",
							paddingBottom: "8px",
						}}
					>
						<h2 style={{ fontSize: "18px", margin: 0 }}>Your Appliances</h2>
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<label
								style={{ fontSize: "14px", color: "var(--text-secondary)" }}
								htmlFor="global-rate"
							>
								Rate (₱/kWh):
							</label>
							<input
								id="global-rate"
								type="number"
								className="form-control"
								style={{ width: "80px", padding: "4px 8px" }}
								value={rateStr}
								onChange={(e) => setRateStr(e.target.value)}
								min="0"
								step="0.01"
							/>
						</div>
					</div>

					<div
						style={{ display: "flex", flexDirection: "column", gap: "16px" }}
					>
						{computedAppliances.map((app, _index) => (
							<div
								key={app.id}
								style={{
									padding: "16px",
									border: "1px solid var(--border-color)",
									borderRadius: "8px",
									position: "relative",
									backgroundColor: "var(--bg-color)",
								}}
							>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "12px",
									}}
								>
									<input
										type="text"
										value={app.name}
										onChange={(e) =>
											updateAppliance(app.id, "name", e.target.value)
										}
										style={{
											fontWeight: "bold",
											border: "none",
											background: "transparent",
											fontSize: "16px",
											color: "var(--text-primary)",
											outline: "none",
											borderBottom: "1px dashed var(--border-color)",
										}}
									/>
									{appliances.length > 1 && (
										<button
											onClick={() => removeAppliance(app.id)}
											style={{
												background: "none",
												border: "none",
												color: "red",
												cursor: "pointer",
											}}
										>
											✕ Remove
										</button>
									)}
								</div>

								<div className="form-group" style={{ marginBottom: "12px" }}>
									<select
										className="form-control"
										onChange={(e) => handlePresetChange(app.id, e.target.value)}
										defaultValue=""
									>
										<option value="">-- Load Common Appliance --</option>
										<option value="1000|1.0 HP Non-Inverter Aircon">
											1.0 HP Non-Inverter Aircon (1000W)
										</option>
										<option value="600|1.0 HP Inverter Aircon">
											1.0 HP Inverter Aircon (~600W)
										</option>
										<option value="60|Electric Fan">Electric Fan (60W)</option>
										<option value="150|Refrigerator">
											Refrigerator - Medium (150W)
										</option>
										<option value='70|LED TV 40"'>LED TV 40" (70W)</option>
										<option value="500|Washing Machine">
											Washing Machine (500W)
										</option>
										<option value="400|Rice Cooker">Rice Cooker (400W)</option>
										<option value="1000|Flat Iron">Flat Iron (1000W)</option>
										<option value="60|Laptop">Laptop Charger (60W)</option>
									</select>
								</div>

								<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
									<div className="form-group" style={{ flex: "1 1 30%" }}>
										<label className="form-label" htmlFor={`watts-${app.id}`}>
											Watts
										</label>
										<input
											id={`watts-${app.id}`}
											type="number"
											className="form-control"
											value={app.wattsStr}
											onChange={(e) =>
												updateAppliance(app.id, "wattsStr", e.target.value)
											}
											min="0"
										/>
									</div>
									<div className="form-group" style={{ flex: "1 1 30%" }}>
										<label className="form-label" htmlFor={`hrs-${app.id}`}>
											Hrs/Day
										</label>
										<input
											id={`hrs-${app.id}`}
											type="number"
											className="form-control"
											value={app.hoursStr}
											onChange={(e) =>
												updateAppliance(app.id, "hoursStr", e.target.value)
											}
											min="0"
											max="24"
										/>
									</div>
									<div className="form-group" style={{ flex: "1 1 30%" }}>
										<label className="form-label" htmlFor={`days-${app.id}`}>
											Days/Mo
										</label>
										<input
											id={`days-${app.id}`}
											type="number"
											className="form-control"
											value={app.daysStr}
											onChange={(e) =>
												updateAppliance(app.id, "daysStr", e.target.value)
											}
											min="0"
											max="31"
										/>
									</div>
								</div>

								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginTop: "12px",
										paddingTop: "8px",
										borderTop: "1px dashed var(--border-color)",
									}}
								>
									<span
										style={{ fontSize: "14px", color: "var(--text-secondary)" }}
									>
										Monthly Cons: {app.kwh.toFixed(1)} kWh
									</span>
									<span style={{ fontWeight: "bold", color: "var(--primary)" }}>
										{formatCurrency(app.cost)}
									</span>
								</div>
							</div>
						))}
					</div>

					<button
						onClick={addAppliance}
						className="btn-secondary"
						style={{ width: "100%", marginTop: "16px" }}
					>
						+ Add Another Appliance
					</button>
				</div>

				{/* Results Card */}
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
							Total Estimated Bill
						</h2>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: "12px",
							}}
						>
							<span>Total Monthly Consumption</span>
							<strong>{totalMonthlyKwh.toFixed(2)} kWh</strong>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginTop: "16px",
								paddingTop: "16px",
								borderTop: "1px dashed var(--border-color)",
							}}
						>
							<span style={{ fontSize: "16px" }}>Estimated Total Cost</span>
							<strong style={{ fontSize: "32px", color: "var(--primary)" }}>
								{formatCurrency(totalMonthlyCost)}
							</strong>
						</div>
					</div>

					<div className="card">
						<h3
							style={{
								fontSize: "16px",
								marginBottom: "8px",
								color: "var(--primary)",
							}}
						>
							Formula & Tips
						</h3>
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								marginBottom: "12px",
							}}
						>
							The formula to calculate the cost of a specific appliance is:
						</p>
						<code
							style={{
								display: "block",
								background: "var(--bg-color)",
								padding: "12px",
								borderRadius: "4px",
								fontSize: "13px",
								marginBottom: "12px",
							}}
						>
							(Watts / 1000) × Hours × Days × Rate
						</code>
						<ul
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								paddingLeft: "20px",
							}}
						>
							<li style={{ marginBottom: "8px" }}>
								Air conditioners are usually the biggest contributor to your
								electric bill. Look for inverter types which save up to 40%
								energy.
							</li>
							<li>
								Inverter compressors do not use their peak wattage all the time.
								A 1000W inverter AC may average only 500W-600W once the room is
								cool.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
