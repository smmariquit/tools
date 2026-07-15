"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function PromissoryNoteClient() {
	const t = useTranslations("PromissoryNoteGenerator");
	const [lender, setLender] = useState("Juan Dela Cruz");
	const [borrower, setBorrower] = useState("Maria Clara");
	const [amount, setAmount] = useState(50000);
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
	const [address, setAddress] = useState("Makati City, Metro Manila");
	const [dueDate, setDueDate] = useState("December 31, 2026");
	const [hasAgreed, setHasAgreed] = useState(false);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", {
			style: "currency",
			currency: "PHP",
		}).format(val);

	const generatedTemplate = t("template", {
		amount: formatPHP(amount),
		date,
		address,
		borrower,
		lender,
		dueDate,
	});

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader title={t("title")} subtitle={t("subtitle")} />

			{!hasAgreed ? (
				<div
					className="card"
					style={{
						marginTop: "24px",
						border: "2px solid var(--danger)",
						backgroundColor: "rgba(239, 68, 68, 0.05)",
					}}
				>
					<h2
						style={{
							fontSize: "20px",
							color: "var(--danger)",
							marginBottom: "16px",
							display: "flex",
							alignItems: "center",
							gap: "8px",
						}}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
							<line x1="12" y1="9" x2="12" y2="13"></line>
							<line x1="12" y1="17" x2="12.01" y2="17"></line>
						</svg>
						{t("disclaimerTitle")}
					</h2>
					<p style={{ marginBottom: "12px", lineHeight: 1.6 }}>
						{t.rich("disclaimerP1", {
							strong: (chunks) => <strong>{chunks}</strong>,
						})}
					</p>
					<p style={{ marginBottom: "16px", lineHeight: 1.6 }}>
						{t.rich("disclaimerP2", {
							strong: (chunks) => <strong>{chunks}</strong>,
						})}
					</p>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "12px",
							marginTop: "24px",
							padding: "16px",
							backgroundColor: "var(--bg-color)",
							borderRadius: "8px",
							border: "1px solid var(--border-color)",
						}}
					>
						<input
							type="checkbox"
							id="agree"
							style={{ width: "20px", height: "20px", cursor: "pointer" }}
							onChange={(e) => {
								if (e.target.checked) setHasAgreed(true);
							}}
						/>
						<label
							htmlFor="agree"
							style={{
								fontSize: "14px",
								fontWeight: "bold",
								cursor: "pointer",
							}}
						>
							{t("agreeLabel")}
						</label>
					</div>
				</div>
			) : (
				<div className="tool-grid" style={{ marginTop: "24px" }}>
					<div
						style={{ display: "flex", flexDirection: "column", gap: "24px" }}
					>
						<div className="card">
							<h2
								style={{
									fontSize: "18px",
									marginBottom: "16px",
									color: "var(--primary)",
								}}
							>
								{t("contractParams")}
							</h2>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-lenderLabel">
									{t("lenderLabel")}
								</label>
								<input
									id="f-lenderLabel"
									type="text"
									className="form-control"
									value={lender}
									onChange={(e) => setLender(e.target.value)}
								/>
							</div>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-borrowerLabel">
									{t("borrowerLabel")}
								</label>
								<input
									id="f-borrowerLabel"
									type="text"
									className="form-control"
									value={borrower}
									onChange={(e) => setBorrower(e.target.value)}
								/>
							</div>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-principalLabel">
									{t("principalLabel")}
								</label>
								<input
									id="f-principalLabel"
									type="number"
									className="form-control"
									value={amount}
									onChange={(e) => setAmount(Number(e.target.value))}
								/>
							</div>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-dateLabel">
									{t("dateLabel")}
								</label>
								<input
									id="f-dateLabel"
									type="date"
									className="form-control"
									value={date}
									onChange={(e) => setDate(e.target.value)}
								/>
							</div>

							<div className="form-group" style={{ marginBottom: "16px" }}>
								<label className="form-label" htmlFor="f-locationLabel">
									{t("locationLabel")}
								</label>
								<input
									id="f-locationLabel"
									type="text"
									className="form-control"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>

							<div className="form-group">
								<label className="form-label" htmlFor="f-dueDateLabel">
									{t("dueDateLabel")}
								</label>
								<input
									id="f-dueDateLabel"
									type="text"
									className="form-control"
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div
						style={{ display: "flex", flexDirection: "column", gap: "24px" }}
					>
						<div
							className="card"
							style={{
								position: "sticky",
								top: "100px",
								backgroundColor: "var(--bg-color)",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "16px",
								}}
							>
								<h2 style={{ fontSize: "20px", color: "var(--primary)" }}>
									{t("generatedDocument")}
								</h2>
								<span
									style={{
										fontSize: "14px",
										padding: "4px 8px",
										backgroundColor: "rgba(16, 185, 129, 0.1)",
										color: "var(--success)",
										borderRadius: "4px",
									}}
								>
									{t("offlineSecure")}
								</span>
							</div>

							<textarea
								readOnly
								value={generatedTemplate}
								style={{
									width: "100%",
									height: "400px",
									padding: "16px",
									fontFamily: "monospace",
									fontSize: "14px",
									lineHeight: 1.6,
									border: "1px solid var(--border-color)",
									borderRadius: "8px",
									backgroundColor: "var(--bg-color)",
									resize: "none",
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</ToolLayout>
	);
}
