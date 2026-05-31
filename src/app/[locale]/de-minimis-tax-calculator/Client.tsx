"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";
import TrustBadge from "../../components/TrustBadge";
import PrivacyGuarantee from "../../components/PrivacyGuarantee";

const DE_MINIMIS_CAPS = {
	uniform: 8000,
	rice: 30000, // 2500 per month
	medicalDependents: 4000,
	actualMedical: 12000,
	laundry: 4800, // 400 per month
	achievement: 12000,
	gifts: 6000,
	cba: 12000,
};

export default function DeMinimisClient() {
	const [uniform, setUniform] = useState(0);
	const [rice, setRice] = useState(0);
	const [medicalDependents, setMedicalDependents] = useState(0);
	const [actualMedical, setActualMedical] = useState(0);
	const [laundry, setLaundry] = useState(0);
	const [achievement, setAchievement] = useState(0);
	const [gifts, setGifts] = useState(0);
	const [cba, setCba] = useState(0);

	const [thirteenthMonth, setThirteenthMonth] = useState(0);
	const [otherBonuses, setOtherBonuses] = useState(0);

	// Computations
	const calcExempt = (val: number, cap: number) => Math.min(val || 0, cap);
	const calcExcess = (val: number, cap: number) => Math.max(0, (val || 0) - cap);

	const uEx = calcExempt(uniform, DE_MINIMIS_CAPS.uniform);
	const rEx = calcExempt(rice, DE_MINIMIS_CAPS.rice);
	const mEx = calcExempt(medicalDependents, DE_MINIMIS_CAPS.medicalDependents);
	const aEx = calcExempt(actualMedical, DE_MINIMIS_CAPS.actualMedical);
	const lEx = calcExempt(laundry, DE_MINIMIS_CAPS.laundry);
	const wEx = calcExempt(achievement, DE_MINIMIS_CAPS.achievement);
	const gEx = calcExempt(gifts, DE_MINIMIS_CAPS.gifts);
	const iEx = calcExempt(cba, DE_MINIMIS_CAPS.cba);

	const totalExemptDeMinimis = uEx + rEx + mEx + aEx + lEx + wEx + gEx + iEx;

	const uExs = calcExcess(uniform, DE_MINIMIS_CAPS.uniform);
	const rExs = calcExcess(rice, DE_MINIMIS_CAPS.rice);
	const mExs = calcExcess(medicalDependents, DE_MINIMIS_CAPS.medicalDependents);
	const aExs = calcExcess(actualMedical, DE_MINIMIS_CAPS.actualMedical);
	const lExs = calcExcess(laundry, DE_MINIMIS_CAPS.laundry);
	const wExs = calcExcess(achievement, DE_MINIMIS_CAPS.achievement);
	const gExs = calcExcess(gifts, DE_MINIMIS_CAPS.gifts);
	const iExs = calcExcess(cba, DE_MINIMIS_CAPS.cba);

	const excessDeMinimis = uExs + rExs + mExs + aExs + lExs + wExs + gExs + iExs;

	const poolTotal = (thirteenthMonth || 0) + (otherBonuses || 0) + excessDeMinimis;
	const poolExempt = Math.min(poolTotal, 90000);
	const poolTaxable = Math.max(0, poolTotal - 90000);

	const totalTaxFreeBenefits = totalExemptDeMinimis + poolExempt;

	const formatPHP = (val: number) =>
		new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(val);

	return (
		<ToolLayout>
			<ToolHeader
				title="De Minimis Tax Optimization Estimator"
				subtitle="Maximize your tax-free allowances and bonuses based on BIR regulations."
			/>
			
			<div style={{ marginTop: "24px", maxWidth: "800px" }}>
				<TrustBadge year={2026} lastReviewed="May 2026" />
			</div>

			<div className="tool-grid">
				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>
							Annual De Minimis Benefits
						</h2>
						<p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px" }}>
							Enter the total ANNUAL amounts provided by your employer.
						</p>

						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
							<div className="form-group">
								<label className="form-label">Rice Subsidy</label>
								<input type="number" className="form-control" value={rice || ""} onChange={e => setRice(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.rice)}`} />
							</div>
							<div className="form-group">
								<label className="form-label">Uniform Allowance</label>
								<input type="number" className="form-control" value={uniform || ""} onChange={e => setUniform(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.uniform)}`} />
							</div>
							<div className="form-group">
								<label className="form-label">Medical Assist.</label>
								<input type="number" className="form-control" value={actualMedical || ""} onChange={e => setActualMedical(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.actualMedical)}`} />
							</div>
							<div className="form-group">
								<label className="form-label">Laundry Allowance</label>
								<input type="number" className="form-control" value={laundry || ""} onChange={e => setLaundry(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.laundry)}`} />
							</div>
							<div className="form-group">
								<label className="form-label">Gifts (Christmas)</label>
								<input type="number" className="form-control" value={gifts || ""} onChange={e => setGifts(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.gifts)}`} />
							</div>
							<div className="form-group">
								<label className="form-label">Achievement Award</label>
								<input type="number" className="form-control" value={achievement || ""} onChange={e => setAchievement(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.achievement)}`} />
							</div>
							<div className="form-group">
								<label className="form-label">Medical (Dependents)</label>
								<input type="number" className="form-control" value={medicalDependents || ""} onChange={e => setMedicalDependents(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.medicalDependents)}`} />
							</div>
							<div className="form-group">
								<label className="form-label">CBA Productivity</label>
								<input type="number" className="form-control" value={cba || ""} onChange={e => setCba(Number(e.target.value))} placeholder={`Max ${formatPHP(DE_MINIMIS_CAPS.cba)}`} />
							</div>
						</div>
					</div>

					<div className="card">
						<h2 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--primary)" }}>
							Other Bonuses (₱90,000 Pool)
						</h2>
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
							<div className="form-group">
								<label className="form-label">13th Month Pay</label>
								<input type="number" className="form-control" value={thirteenthMonth || ""} onChange={e => setThirteenthMonth(Number(e.target.value))} />
							</div>
							<div className="form-group">
								<label className="form-label">Other Bonuses</label>
								<input type="number" className="form-control" value={otherBonuses || ""} onChange={e => setOtherBonuses(Number(e.target.value))} />
							</div>
						</div>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
					<div className="card" style={{ position: "sticky", top: "100px", backgroundColor: "var(--bg-color)" }}>
						<h2 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--primary)" }}>Optimization Summary</h2>
						
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
							<span>Exempt De Minimis:</span>
							<strong>{formatPHP(totalExemptDeMinimis)}</strong>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px", color: "var(--text-secondary)" }}>
							<span>De Minimis Excess:</span>
							<span>{formatPHP(excessDeMinimis)}</span>
						</div>

						<div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", marginBottom: "24px" }}>
							<h3 style={{ fontSize: "14px", marginBottom: "12px", color: "var(--primary)" }}>₱90,000 Tax-Free Pool</h3>
							<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
								<span>Total in Pool:</span>
								<strong>{formatPHP(poolTotal)}</strong>
							</div>
							<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "var(--text-secondary)" }}>
								<span>Taxable Overflow:</span>
								<strong style={{ color: poolTaxable > 0 ? "red" : "inherit" }}>{formatPHP(poolTaxable)}</strong>
							</div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "18px", fontWeight: 700, color: "var(--primary)" }}>
							<span>Total Tax-Free Benefits:</span>
							<span>{formatPHP(totalTaxFreeBenefits)}</span>
						</div>

						<PrivacyGuarantee />
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
