"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
	{
		question: "How accurate are the calculators on PHTools?",
		answer:
			"Our calculators are strictly based on the latest 2026 Philippine government mandates, including the Social Security Act of 2018 (RA 11199), the Universal Health Care Act (RA 11223), and the TRAIN Law tax brackets. We continuously update our logic whenever the BIR, SSS, PhilHealth, or Pag-IBIG release new memoranda.",
	},
	{
		question: "Where can I find the official contribution tables?",
		answer:
			"You can find interactive, searchable contribution tables at the bottom of their respective calculator pages. Simply go to the SSS Contribution Calculator or the PhilHealth Premium Calculator, scroll down, and you will see the full matrices with your specific bracket highlighted in real-time.",
	},
	{
		question: "Why did my net pay go down compared to last year?",
		answer:
			"In 2026, scheduled mandatory contribution hikes took effect. For example, the SSS contribution rate is now 15% (up from previous years) with a maximum Monthly Salary Credit (MSC) of ₱35,000. PhilHealth also enforces a 5% premium rate. These increased deductions lower your take-home pay.",
	},
	{
		question: "Can I use this for official payroll processing?",
		answer:
			"No. While our formulas are mathematically identical to government matrices, PHTools is designed for estimation and educational purposes only. You should always consult with a certified accountant or use official payroll software (like Sprout) for business compliance.",
	},
	{
		question: "How do you calculate the Pag-IBIG deduction?",
		answer:
			"Based on the latest updates, the Pag-IBIG Maximum Fund Salary (MFS) for regular contributions is capped at ₱10,000. At a 2% employee rate, the maximum standard deduction is ₱200 per month. If you earn less than ₱1,500, the rate is 1%.",
	},
	{
		question: "Does the calculator handle 13th month pay and bonuses?",
		answer:
			"We have a dedicated 13th Month Pay Calculator that handles prorated computations. Note that under the TRAIN Law, your 13th-month pay and other benefits are tax-exempt up to ₱90,000. Any amount exceeding ₱90,000 is added to your gross taxable income.",
	},
	{
		question: "How is my data and privacy handled?",
		answer:
			"We prioritize your privacy. The financial data you input is processed locally on your device and is never stored on our servers. For data retention inquiries or to exercise your privacy rights under the National Privacy Commission, please contact our Data Protection Officer at semariquit@gmail.com.",
	},
	{
		question: "How can I contact support or request a new calculator?",
		answer:
			"If you have a feature request, spotted a bug, or need clarification on a computation, you can reach out to us directly by emailing semariquit@gmail.com.",
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<div style={{ maxWidth: "800px", margin: "0 auto" }}>
			<div style={{ marginBottom: "32px", textAlign: "center" }}>
				<h1 className="page-title">Help & Frequently Asked Questions</h1>
				<p className="page-subtitle">
					Documentation on how our tools work and how we compute your
					deductions.
				</p>
			</div>

			<div className="card">
				{faqs.map((faq, index) => (
					<div
						key={index}
						style={{
							borderBottom:
								index === faqs.length - 1
									? "none"
									: "1px solid var(--border-color)",
							paddingBottom: index === faqs.length - 1 ? "0" : "16px",
							marginBottom: index === faqs.length - 1 ? "0" : "16px",
						}}
					>
						<button
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								background: "none",
								border: "none",
								padding: "8px 0",
								cursor: "pointer",
								textAlign: "left",
								fontSize: "16px",
								fontWeight: 600,
								color: "var(--text-primary)",
							}}
						>
							{faq.question}
							<span
								style={{
									fontSize: "20px",
									color: "var(--primary)",
									transform: openIndex === index ? "rotate(45deg)" : "none",
									transition: "transform 0.2s ease",
								}}
							>
								+
							</span>
						</button>

						{openIndex === index && (
							<div
								style={{
									marginTop: "12px",
									color: "var(--text-secondary)",
									fontSize: "15px",
									lineHeight: "1.6",
								}}
							>
								{faq.answer}
							</div>
						)}
					</div>
				))}
			</div>

			<div style={{ marginTop: "32px", textAlign: "center" }}>
				<p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
					Still have questions? Check out our tools or read our blog for deeper
					financial insights.
				</p>
				<div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
					<Link
						href="/"
						className="btn-primary"
						style={{ textDecoration: "none" }}
					>
						Browse All Tools
					</Link>
					<Link
						href="/blog"
						className="btn-secondary"
						style={{ textDecoration: "none" }}
					>
						Read the Blog
					</Link>
				</div>
			</div>
		</div>
	);
}
