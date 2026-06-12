"use client";

import Link from "next/link";
import { useState } from "react";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";
import ExpresswayMap from "../../components/ExpresswayMap";
import { expressways, getTollFee } from "./tollData";

type TripLeg = {
	id: string;
	expressway: string;
	origin: string;
	destination: string;
};

export default function TollCalculatorClient() {
	const [vehicleClass, setVehicleClass] = useState<
		"class1" | "class2" | "class3"
	>("class1");
	const [legs, setLegs] = useState<TripLeg[]>([
		{
			id: Date.now().toString(),
			expressway: expressways[0].name,
			origin: expressways[0].exits[0],
			destination: expressways[0].exits[expressways[0].exits.length - 1],
		},
	]);

	const addLeg = () => {
		setLegs([
			...legs,
			{
				id: Date.now().toString(),
				expressway: expressways[0].name,
				origin: expressways[0].exits[0],
				destination: expressways[0].exits[expressways[0].exits.length - 1],
			},
		]);
	};

	const removeLeg = (id: string) => {
		if (legs.length > 1) {
			setLegs(legs.filter((leg) => leg.id !== id));
		}
	};

	const updateLeg = (id: string, field: keyof TripLeg, value: string) => {
		setLegs(
			legs.map((leg) => {
				if (leg.id === id) {
					const updated = { ...leg, [field]: value };
					if (field === "expressway") {
						const newExits =
							expressways.find((exp) => exp.name === value)?.exits || [];
						if (newExits.length > 0) {
							updated.origin = newExits[0];
							updated.destination = newExits[newExits.length - 1];
						}
					}
					return updated;
				}
				return leg;
			}),
		);
	};

	const handleMapSelect = (name: string) => {
		// Update the last leg with the selected expressway
		if (legs.length > 0) {
			updateLeg(legs[legs.length - 1].id, "expressway", name);
		}
	};

	let totalToll = 0;
	const computedLegs = legs.map((leg) => {
		const fee =
			getTollFee(leg.expressway, leg.origin, leg.destination, vehicleClass) ||
			0;
		totalToll += fee;
		return { ...leg, fee };
	});

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(amount);
	};

	return (
		<ToolLayout maxWidth="1200px">
			<div>
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
					<h1 className="page-title">PH Expressway Toll Calculator</h1>
					<p className="page-subtitle">
						Check TRB-approved toll fees for Skyway, SLEX, TPLEX, and other
						major Philippine expressways.
					</p>
				</div>

				<AdBanner dataAdSlot="toll-top" />

				<div className="tool-grid" style={{ marginTop: "24px" }}>
					{/* Interactive Map */}
					<div style={{ alignSelf: "start" }}>
						<ExpresswayMap 
							onSelectExpressway={handleMapSelect} 
							selectedExpressway={legs[legs.length - 1]?.expressway} 
						/>
					</div>

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
							<h2 style={{ fontSize: "18px", margin: 0 }}>Trip Planner</h2>
							<select
								className="form-control"
								style={{ width: "auto", padding: "4px 8px" }}
								value={vehicleClass}
								onChange={(e) =>
									setVehicleClass(
										e.target.value as "class1" | "class2" | "class3",
									)
								}
							>
								<option value="class1">Class 1 (Cars, SUVs)</option>
								<option value="class2">Class 2 (Buses, Light Trucks)</option>
								<option value="class3">Class 3 (Heavy Trucks)</option>
							</select>
						</div>

						<div
							style={{ display: "flex", flexDirection: "column", gap: "16px" }}
						>
							{computedLegs.map((leg, index) => {
								const currentExpressway =
									expressways.find((e) => e.name === leg.expressway) ||
									expressways[0];
								return (
									<div
										key={leg.id}
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
											<strong>Leg {index + 1}</strong>
											{legs.length > 1 && (
												<button
													onClick={() => removeLeg(leg.id)}
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

										<div
											className="form-group"
											style={{ marginBottom: "12px" }}
										>
											<label
												className="form-label"
												htmlFor={`expressway-${leg.id}`}
											>
												Expressway
											</label>
											<select
												id={`expressway-${leg.id}`}
												className="form-control"
												value={leg.expressway}
												onChange={(e) =>
													updateLeg(leg.id, "expressway", e.target.value)
												}
											>
												{expressways.map((exp) => (
													<option key={exp.name} value={exp.name}>
														{exp.name}
													</option>
												))}
											</select>
										</div>

										<div style={{ display: "flex", gap: "12px" }}>
											<div className="form-group" style={{ flex: 1 }}>
												<label className="form-label" htmlFor="entry-origin">
													Entry (Origin)
												</label>
												<select
													id="entry-origin"
													className="form-control"
													value={leg.origin}
													onChange={(e) =>
														updateLeg(leg.id, "origin", e.target.value)
													}
												>
													{currentExpressway.exits.map((exit) => (
														<option key={exit} value={exit}>
															{exit}
														</option>
													))}
												</select>
											</div>
											<div className="form-group" style={{ flex: 1 }}>
												<label
													className="form-label"
													htmlFor="exit-destination"
												>
													Exit (Destination)
												</label>
												<select
													id="exit-destination"
													className="form-control"
													value={leg.destination}
													onChange={(e) =>
														updateLeg(leg.id, "destination", e.target.value)
													}
												>
													{currentExpressway.exits.map((exit) => (
														<option key={exit} value={exit}>
															{exit}
														</option>
													))}
												</select>
											</div>
										</div>
										<div
											style={{
												textAlign: "right",
												marginTop: "12px",
												color: "var(--primary)",
												fontWeight: "bold",
											}}
										>
											Fee: {formatCurrency(leg.fee)}
										</div>
									</div>
								);
							})}
						</div>

						<button
							onClick={addLeg}
							className="btn-secondary"
							style={{ width: "100%", marginTop: "16px" }}
						>
							+ Add Another Expressway
						</button>
					</div>

					{/* Results Card */}
					<div
						style={{ display: "flex", flexDirection: "column", gap: "16px" }}
					>
						<div
							className="card"
							style={{ backgroundColor: "var(--bg-color)" }}
						>
							<h2
								style={{
									fontSize: "18px",
									marginBottom: "16px",
									borderBottom: "1px solid var(--border-color)",
									paddingBottom: "8px",
									color: "var(--primary)",
								}}
							>
								Total Toll Fees
							</h2>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<span style={{ fontSize: "16px" }}>Total Estimated Cost</span>
								<strong style={{ fontSize: "32px", color: "var(--primary)" }}>
									{formatCurrency(totalToll)}
								</strong>
							</div>
						</div>

						<div
							className="card"
							style={{ border: "2px solid var(--primary)" }}
						>
							<h3
								style={{
									fontSize: "16px",
									marginBottom: "12px",
									color: "var(--primary)",
									display: "flex",
									alignItems: "center",
									gap: "8px",
								}}
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
									<line x1="2" y1="10" x2="22" y2="10"></line>
								</svg>
								Reload Your RFID
							</h3>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "16px",
								}}
							>
								Make sure your account has enough balance before your trip to
								avoid penalties.
							</p>
							<div
								style={{
									display: "flex",
									gap: "12px",
									flexDirection: "column",
								}}
							>
								<a
									href="https://easytrip.ph"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-primary"
									style={{ textAlign: "center", textDecoration: "none" }}
								>
									Reload Easytrip (NLEX, SCTEX, CAVITEX, CALAX)
								</a>
								<a
									href="https://autosweeprfid.com"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-secondary"
									style={{ textAlign: "center", textDecoration: "none" }}
								>
									Reload Autosweep (SLEX, Skyway, STAR, TPLEX)
								</a>
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
								Open vs. Closed Toll Systems
							</h3>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginBottom: "12px",
								}}
							>
								It can be confusing when you get charged! Philippine expressways
								use two different systems:
							</p>
							<ul
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									paddingLeft: "20px",
									marginBottom: "12px",
								}}
							>
								<li style={{ marginBottom: "8px" }}>
									<strong>Open System (Pay on Entry/Plaza):</strong> You pay a
									fixed flat fee immediately when you pass a toll plaza,
									regardless of where you exit.
									<br />
									<span style={{ fontSize: "12px", fontStyle: "italic" }}>
										Examples: Skyway Stage 3, CAVITEX, NAIAX, NLEX Open System.
									</span>
								</li>
								<li>
									<strong>Closed System (Tap on Entry, Pay on Exit):</strong>{" "}
									You tap your RFID or get a ticket at the entry point, and the
									system records where you came from. You only pay when you{" "}
									<strong>exit</strong>, and the fee is based exactly on the
									distance you traveled.
									<br />
									<span style={{ fontSize: "12px", fontStyle: "italic" }}>
										Examples: SLEX, TPLEX, STAR Tollway, NLEX Closed System.
									</span>
								</li>
							</ul>
							<p
								style={{
									fontSize: "12px",
									color: "var(--text-secondary)",
									fontStyle: "italic",
								}}
							>
								Note: If you travel from NLEX to SLEX via Skyway, you will
								experience both systems in a single trip. Make sure your RFID
								has enough balance for the sum of all systems.
							</p>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
