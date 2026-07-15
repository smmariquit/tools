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
	{
		question: "Are the calculators free to use?",
		answer:
			"Yes. Every calculator on PHTools is 100% free, with no sign-up, login, or subscription required. We keep the entire suite free for students, employees, freelancers, and HR practitioners by running unobtrusive ads, which is the only thing that funds the site.",
	},
	{
		question: "Do I need to create an account?",
		answer:
			"No. We deliberately avoid accounts and logins. Open any tool and start computing immediately, with nothing to register, nothing to verify, and no email required unless you choose to contact us.",
	},
	{
		question: "Can I install PHTools on my phone or use it offline?",
		answer:
			"Yes. PHTools is a Progressive Web App (PWA), so you can use 'Add to Home Screen' on Android or iOS to install it like a regular app. Once a calculator has loaded, you can keep using it even without an internet connection.",
	},
	{
		question: "What languages does PHTools support?",
		answer:
			"The interface is available in English, Tagalog, and Bisaya (Cebuano). You can switch languages anytime using the language selector, and your choice carries across every tool on the site.",
	},
	{
		question: "How is the SSS contribution split between me and my employer?",
		answer:
			"For 2026, the total SSS rate is 15% of your Monthly Salary Credit (MSC): 10% shouldered by the employer and 5% by the employee. The MSC is capped at ₱35,000, and the portion based on salary above ₱20,000 is automatically funneled into the Mandatory Provident Fund (MPF/WISP) for additional retirement savings. Our SSS Contribution Calculator shows the full breakdown.",
	},
	{
		question:
			"What is the difference between gross pay and net (take-home) pay?",
		answer:
			"Gross pay is your total earnings before any deductions. Net pay, your actual take-home, is what remains after subtracting mandatory contributions (SSS, PhilHealth, Pag-IBIG) and withholding tax. Our Salary Calculator itemizes each deduction so you can see exactly where your money goes.",
	},
	{
		question: "Is the first ₱250,000 of my income really tax-free?",
		answer:
			"Yes. Under the TRAIN Law (RA 10963), the first ₱250,000 of annual taxable income is completely tax-exempt. Anything above that is taxed using progressive brackets, which our Income Tax Calculator applies automatically.",
	},
	{
		question:
			"As a freelancer, should I choose the 8% flat tax or graduated rates?",
		answer:
			"It depends on your income and expenses. The 8% flat rate (on gross receipts beyond the ₱250,000 exemption) is the simplest option and often wins for low-expense freelancers, while the graduated rates can be better if you have high deductible expenses. Use our 8% vs. Graduated Tax Optimizer to compare both for your exact numbers.",
	},
	{
		question: "Can I save or share my computation?",
		answer:
			"Yes. Most calculators store your inputs directly in the page URL, so you can bookmark a result or paste the link to a friend, your HR, or your accountant, and they will see the exact same computation you did.",
	},
	{
		question: "Are the 2026 SSS, PhilHealth, and Pag-IBIG rates final?",
		answer:
			"We track these against the official issuances from the SSS, PhilHealth (the Universal Health Care 5% premium schedule), and the Pag-IBIG Fund. Rates can still be adjusted by new memoranda within the year; whenever that happens, we update the calculator logic and reflect the change.",
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
