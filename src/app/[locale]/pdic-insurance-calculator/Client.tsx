"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

export default function PdicClient() {
	const [singleAccounts, setSingleAccounts] = useState(600000);
	const [jointAccounts, setJointAccounts] = useState(800000);
	const [mdicCap, setMdicCap] = useState(500000); // Toggle between current 500k and proposed 1M

	const singleCoverage = Math.min(singleAccounts, mdicCap);
	
	// Joint account coverage is divided equally among co-depositors, but for simplicity here we assume the user's share is the input
	const jointCoverage = Math.min(jointAccounts, mdicCap);
	
	const totalCoverage = singleCoverage + jointCoverage;
	const uninsuredAmount = Math.max(0, singleAccounts - singleCoverage) + Math.max(0, jointAccounts - jointCoverage);

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="PDIC Deposit Insurance Calculator"
				subtitle="Calculate your maximum deposit insurance coverage in the event of a bank closure."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>Your Deposits in ONE Bank</h2>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Total in Single Accounts</label>
							<input type="number" className="form-control" value={singleAccounts || ""} onChange={(e) => setSingleAccounts(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Savings, Checking, Time Deposits under your name alone.</p>
						</div>

						<div className="form-group" style={{ marginBottom: "16px" }}>
							<label className="form-label">Total Share in Joint Accounts</label>
							<input type="number" className="form-control" value={jointAccounts || ""} onChange={(e) => setJointAccounts(Number(e.target.value))} />
							<p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Your personal 50% share of "AND/OR" accounts.</p>
						</div>

						<div className="form-group">
							<label className="form-label">Maximum Deposit Insurance Coverage (MDIC)</label>
							<select className="form-control" value={mdicCap} onChange={(e) => setMdicCap(Number(e.target.value))}>
								<option value={500000}>₱ 500,000 (Current Law)</option>
								<option value={1000000}>₱ 1,000,000 (Proposed Increase)</option>
							</select>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Coverage Breakdown</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Single Accounts Coverage:</span>
							<strong>{formatPHP(singleCoverage)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Joint Accounts Coverage:</span>
							<strong>{formatPHP(jointCoverage)}</strong>
						</div>
						
						<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", marginBottom: "16px", marginTop: "16px" }}>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "bold", color: "var(--primary)" }}>
								<span>Total Insured Amount:</span>
								<span>{formatPHP(totalCoverage)}</span>
							</div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "red" }}>
							<span>Uninsured / Risk Amount:</span>
							<span>{formatPHP(uninsuredAmount)}</span>
						</div>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
