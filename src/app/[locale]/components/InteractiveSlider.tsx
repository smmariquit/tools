"use client";

import React from "react";

interface InteractiveSliderProps {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (value: number) => void;
	formatValue?: (val: number) => string;
	hint?: string;
}

export default function InteractiveSlider({
	label,
	value,
	min,
	max,
	step = 1,
	onChange,
	formatValue,
	hint,
}: InteractiveSliderProps) {
	const percentage = ((value - min) / (max - min)) * 100;
	const inputId = React.useId();

	return (
		<div style={{ marginBottom: "20px" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "8px",
					gap: "12px",
				}}
			>
				<label
					htmlFor={inputId}
					style={{
						fontSize: "14px",
						fontWeight: 600,
						color: "var(--text-primary)",
					}}
				>
					{label}
				</label>
				<span
					style={{
						fontSize: "16px",
						fontWeight: 700,
						color: "var(--primary)",
					}}
				>
					{formatValue ? formatValue(value) : value.toLocaleString()}
				</span>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "12px",
				}}
			>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					style={{
						flex: 1,
						height: "6px",
						borderRadius: "3px",
						background: `linear-gradient(to right, var(--primary) ${percentage}%, var(--border-color) ${percentage}%)`,
						WebkitAppearance: "none",
						cursor: "pointer",
						outline: "none",
					}}
				/>
				<input
					id={inputId}
					type="number"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => {
						const val = Number(e.target.value);
						if (!isNaN(val)) {
							// For number input, we only strictly enforce the min, allowing the user to type higher than max if they want
							onChange(Math.max(min, val));
						}
					}}
					style={{
						width: "90px",
						padding: "6px 8px",
						fontSize: "14px",
						textAlign: "right",
						backgroundColor: "var(--bg-color)",
						color: "var(--text-primary)",
						border: "1px solid var(--border-color)",
						borderRadius: "var(--border-radius-sm)",
						outline: "none",
					}}
				/>
			</div>
			{hint && (
				<span
					style={{
						display: "block",
						fontSize: "12px",
						color: "var(--text-secondary)",
						marginTop: "4px",
					}}
				>
					{hint}
				</span>
			)}
		</div>
	);
}
