"use client";

import { useState } from "react";
import { ZonalStreet } from "../../../../types/zonalValues";
import InteractiveSlider from "../../components/InteractiveSlider";

interface ZonalTaxCalculatorProps {
	streets: ZonalStreet[];
}

export default function ZonalTaxCalculator({
	streets,
}: ZonalTaxCalculatorProps) {
	const [selectedStreet, setSelectedStreet] = useState<string>(
		streets[0].street,
	);
	const [areaSqm, setAreaSqm] = useState<number>(100);
	const [sellingPrice, setSellingPrice] = useState<number>(5000000);

	const currentStreet =
		streets.find((s) => s.street === selectedStreet) || streets[0];
	const zonalValuePerSqm = currentStreet.valuePerSqm;

	// CGT Rules
	const grossZonalValue = areaSqm * zonalValuePerSqm;
	const taxableBase = Math.max(sellingPrice, grossZonalValue);

	// Taxes
	const capitalGainsTax = taxableBase * 0.06;
	const docStampTax = taxableBase * 0.015;
	const localTransferTax = taxableBase * 0.005; // ~0.5% average
	const totalTaxes = capitalGainsTax + docStampTax + localTransferTax;

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);
	};

	return (
		<div
			className="card tool-grid"
			style={{
				marginTop: "24px",
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gap: "24px",
			}}
		>
			<div className="input-section">
				<h3
					style={{
						borderBottom: "1px solid var(--border-color)",
						paddingBottom: "8px",
						marginBottom: "16px",
					}}
				>
					Property Details
				</h3>

				<div style={{ marginBottom: "16px" }}>
					<label
						htmlFor="zonal-street"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: "bold",
						}}
					>
						Select Street / Classification
					</label>
					<select
						id="zonal-street"
						value={selectedStreet}
						onChange={(e) => setSelectedStreet(e.target.value)}
						style={{
							width: "100%",
							padding: "12px",
							borderRadius: "8px",
							border: "1px solid var(--border-color)",
							fontSize: "16px",
						}}
					>
						{streets.map((s) => (
							<option key={s.street} value={s.street}>
								{s.street} ({s.classification}) -{" "}
								{formatCurrency(s.valuePerSqm)}/sqm
							</option>
						))}
					</select>
				</div>

				<InteractiveSlider
					label="Lot / Floor Area (SQM)"
					value={areaSqm}
					min={10}
					max={1000}
					step={1}
					onChange={setAreaSqm}
				/>

				<InteractiveSlider
					label="Actual Selling Price (Deed of Sale)"
					value={sellingPrice}
					min={500000}
					max={50000000}
					step={50000}
					onChange={setSellingPrice}
					formatValue={formatCurrency}
				/>
			</div>

			<div
				className="result-section"
				style={{
					backgroundColor: "#f5f9ff",
					padding: "24px",
					borderRadius: "12px",
					border: "1px solid #d0e1fd",
				}}
			>
				<h3 style={{ marginTop: 0, color: "var(--primary)" }}>
					Tax Computation
				</h3>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "12px",
					}}
				>
					<span>Gross Zonal Value:</span>
					<strong>{formatCurrency(grossZonalValue)}</strong>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "16px",
						color: "var(--text-secondary)",
						fontSize: "0.9rem",
					}}
				>
					<span>Taxable Base (Higher of Zonal or Selling):</span>
					<strong>{formatCurrency(taxableBase)}</strong>
				</div>

				<hr
					style={{
						borderColor: "#d0e1fd",
						borderStyle: "solid",
						marginBottom: "16px",
					}}
				/>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "8px",
					}}
				>
					<span>Capital Gains Tax (6%):</span>
					<strong>{formatCurrency(capitalGainsTax)}</strong>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "8px",
					}}
				>
					<span>Documentary Stamp Tax (1.5%):</span>
					<strong>{formatCurrency(docStampTax)}</strong>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: "16px",
					}}
				>
					<span>Estimated Local Transfer Tax (~0.5%):</span>
					<strong>{formatCurrency(localTransferTax)}</strong>
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginTop: "16px",
						paddingTop: "16px",
						borderTop: "2px solid var(--primary)",
						fontSize: "1.2rem",
						fontWeight: "bold",
						color: "var(--primary)",
					}}
				>
					<span>Total Estimated Taxes:</span>
					<span>{formatCurrency(totalTaxes)}</span>
				</div>
			</div>
		</div>
	);
}
