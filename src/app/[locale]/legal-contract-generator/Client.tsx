"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function LegalContractClient() {
	const [lender, setLender] = useState("Juan Dela Cruz");
	const [borrower, setBorrower] = useState("Maria Clara");
	const [amount, setAmount] = useState(50000);
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
	const [address, setAddress] = useState("Makati City, Metro Manila");

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	const generatedTemplate = `PROMISSORY NOTE

Amount: ${formatPHP(amount)}
Date: ${date}
Location: ${address}

FOR VALUE RECEIVED, I, ${borrower} (the "Borrower"), promise to pay ${lender} (the "Lender"), the principal sum of ${formatPHP(amount)}, in Philippine currency.

This note shall be payable in full on or before [Insert Due Date]. In the event of default in the payment of this note, the Borrower agrees to pay all reasonable costs of collection, including attorney's fees.

IN WITNESS WHEREOF, the Borrower has executed this Promissory Note on the date and place first above written.


___________________________
${borrower} (Borrower)


___________________________
${lender} (Lender)
`;

	return (
		<ToolLayout>
			<ToolHeader
				title="Legal Contract Generator"
				subtitle="Generate standard Philippine legal documents (e.g., Promissory Note) securely in your browser. No data is saved to any server."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Contract Parameters</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Lender Name</label>
							<input type="text" className="form-control" value={lender} onChange={(e) => setLender(e.target.value)} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Borrower Name</label>
							<input type="text" className="form-control" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Principal Amount (PHP)</label>
							<input type="number" className="form-control" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
						</div>
						
						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Execution Date</label>
							<input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
						</div>
						
						<div className="form-group">
							<label className="form-label">Execution Location</label>
							<input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
							<h2 style={{ fontSize: "20px", color: "var(--primary)" }}>Generated Document</h2>
							<span style={{ fontSize: "12px", padding: "4px 8px", backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981", borderRadius: "4px" }}>Offline / Secure</span>
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
								resize: "none"
							}}
						/>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
