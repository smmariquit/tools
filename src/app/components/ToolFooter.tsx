import Link from "next/link";
import { useTranslations } from "next-intl";
import { toolCategories } from "../../lib/routes";
import ToolIcon from "./ToolIcon";

const toolToSourcesMap: Record<string, { name: string; url: string }[]> = {
	"/salary-calculator": [
		{
			name: "BIR RA 10963 (TRAIN Law)",
			url: "https://www.bir.gov.ph/index.php/train.html",
		},
		{
			name: "PhilHealth Circular 2024-0001",
			url: "https://www.philhealth.gov.ph/circulars/2024/",
		},
		{
			name: "SSS Circular 2022-033",
			url: "https://www.officialgazette.gov.ph/2018/02/07/republic-act-no-11199/",
		},
	],
	"/bpo-night-differential-calculator": [
		{
			name: "DOLE Labor Code Article 86",
			url: "https://bwc.dole.gov.ph/labor-code-of-the-philippines",
		},
	],
	"/budget-calculator": [
		{
			name: "Bangko Sentral ng Pilipinas (Financial Literacy)",
			url: "https://www.bsp.gov.ph/SitePages/InclusiveFinance/FinancialEducation.aspx",
		},
	],
	"/sss-contribution-calculator": [
		{
			name: "SSS Circular 2022-033 (New Schedule)",
			url: "https://www.officialgazette.gov.ph/2018/02/07/republic-act-no-11199/",
		},
	],
	"/sss-pension-calculator": [
		{
			name: "SSS Retirement Benefits",
			url: "https://www.officialgazette.gov.ph/2018/02/07/republic-act-no-11199/",
		},
	],
	"/gsis-pension-calculator": [
		{
			name: "GSIS RA 8291 Retirement Laws",
			url: "https://www.gsis.gov.ph/active-members/benefits/retirement/ra-8291/",
		},
	],
	"/philhealth-calculator": [
		{
			name: "PhilHealth Premium Rate 2024",
			url: "https://www.officialgazette.gov.ph/2019/02/20/republic-act-no-11223/",
		},
	],
	"/income-tax-calculator": [
		{
			name: "BIR Withholding Tax Tables",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/gross-from-tax-calculator": [
		{
			name: "BIR Tax Tables (TRAIN Law)",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/13th-month-pay-calculator": [
		{
			name: "DOLE 13th Month Pay Law (PD 851)",
			url: "https://bwc.dole.gov.ph/images/Issuances/DepartmentOrder/DO_13th_Month_Pay.pdf",
		},
	],
	"/backpay-calculator": [
		{
			name: "DOLE Labor Advisory No. 06-20",
			url: "https://bwc.dole.gov.ph/images/Issuances/LaborAdvisory/LA_06_20.pdf",
		},
	],
	"/separation-pay-calculator": [
		{
			name: "DOLE Guide on Separation Pay",
			url: "https://bwc.dole.gov.ph/faqs-on-separation-pay",
		},
	],
	"/freelance-tax-calculator": [
		{
			name: "BIR RR 8-2018 (8% Flat Tax)",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/freelance-rate-calculator": [
		{
			name: "DTI Freelance Guidelines",
			url: "https://www.dti.gov.ph/negosyo/freelance-services/",
		},
	],
	"/tax-optimizer-calculator": [
		{
			name: "BIR Income Tax Options",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/digital-bank-calculator": [
		{
			name: "BSP Digital Bank Regulations",
			url: "https://www.bsp.gov.ph/Regulations/Issuances/2020/c1105.pdf",
		},
	],
	"/shopee-lazada-fee-calculator": [
		{
			name: "DTI E-Commerce Regulations",
			url: "https://ecommerce.dti.gov.ph/",
		},
	],
	"/food-cost-calculator": [
		{
			name: "DTI MSME Pricing Guide",
			url: "https://www.dti.gov.ph/konsyumer/e-presyo/",
		},
	],
	"/de-minimis-tax-calculator": [
		{
			name: "BIR RR 11-2018 (De Minimis)",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/lto-registration-fee-calculator": [
		{
			name: "LTO MVUC Schedule",
			url: "https://lto.gov.ph/motor-vehicle-registration/",
		},
	],
	"/sss-maternity-benefit-calculator": [
		{
			name: "SSS Expanded Maternity Leave Law",
			url: "https://www.officialgazette.gov.ph/2019/02/20/republic-act-no-11210/",
		},
	],
	"/bir-donors-tax-calculator": [
		{
			name: "BIR Donor's Tax Requirements",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/architectural-fee-calculator": [
		{
			name: "UAP SPP Document 202",
			url: "https://united-architects.org/about/uap-documents/",
		},
	],
	"/customs-brokerage-fee-calculator": [
		{
			name: "BOC CAO No. 1-2001",
			url: "https://customs.gov.ph/",
		},
	],
	"/influencer-rate-calculator": [
		{
			name: "BIR RMC 97-2021 (Influencer Taxes)",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/final-pay-calculator": [
		{
			name: "DOLE Final Pay Guidelines",
			url: "https://bwc.dole.gov.ph/images/Issuances/LaborAdvisory/LA_06_20.pdf",
		},
	],
	"/tax-refund-calculator": [
		{
			name: "BIR Tax Refund Guidelines",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/kasambahay-payroll-calculator": [
		{
			name: "DOLE Batas Kasambahay (RA 10361)",
			url: "https://bwc.dole.gov.ph/ra-10361",
		},
	],
	"/kasambahay-retirement-calculator": [
		{
			name: "Labor Code Article 302",
			url: "https://bwc.dole.gov.ph/labor-code-of-the-philippines",
		},
	],
	"/estate-tax-calculator": [
		{
			name: "BIR Estate Tax TRAIN Law",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/gotrade-vs-ibkr-calculator": [
		{
			name: "BSP Forex Regulations",
			url: "https://www.bsp.gov.ph/SitePages/Regulations/Forex.aspx",
		},
	],
	"/pdic-insurance-calculator": [
		{
			name: "PDIC Maximum Deposit Insurance",
			url: "https://www.pdic.gov.ph/depositinsurance",
		},
	],
	"/philhealth-late-contribution-calculator": [
		{
			name: "PhilHealth Penalty Circulars",
			url: "https://www.philhealth.gov.ph/circulars/",
		},
	],
	"/retail-treasury-bond-calculator": [
		{
			name: "BTr Retail Treasury Bonds",
			url: "https://www.treasury.gov.ph/rtb/",
		},
	],
	"/shipping-logistics-estimator": [
		{
			name: "DTI Logistics Resources",
			url: "https://www.dti.gov.ph/negosyo/logistics/",
		},
	],
	"/civil-service-reviewer": [
		{
			name: "CSC Exam Announcements",
			url: "https://csc.gov.ph/examinations",
		},
	],
	"/legal-contract-generator": [
		{
			name: "Philippine Civil Code",
			url: "https://www.officialgazette.gov.ph/1949/06/18/republic-act-no-386/",
		},
	],
	"/invoice-factoring-calculator": [
		{
			name: "SEC Financing Company Act",
			url: "https://www.sec.gov.ph/",
		},
	],
	"/digital-ticket-generator": [
		{
			name: "DTI Consumer Protection",
			url: "https://www.dti.gov.ph/konsyumer/",
		},
	],
	"/bir-withholding-tax-calculator": [
		{
			name: "BIR Creditable Withholding Tax",
			url: "https://www.officialgazette.gov.ph/2017/12/19/republic-act-no-10963/",
		},
	],
	"/car-loan-calculator": [
		{
			name: "BSP Auto Loan Regulations",
			url: "https://www.bsp.gov.ph/Regulations/Issuances/2014/c855.pdf",
		},
	],
	"/motorcycle-loan-calculator": [
		{
			name: "DTI Installment Sales Act",
			url: "https://www.officialgazette.gov.ph/1992/04/13/republic-act-no-7394/",
		},
	],
	"/pagibig-mp2-calculator": [
		{
			name: "Pag-IBIG MP2 FAQ",
			url: "https://www.pagibigfund.gov.ph/FAQ_MP2.html",
		},
	],
	"/home-loan-calculator": [
		{
			name: "BSP Real Estate Loan Limits",
			url: "https://www.bsp.gov.ph/Regulations/Issuances/2014/c855.pdf",
		},
	],
	"/amilyar-calculator": [
		{
			name: "Local Government Code (Real Property Tax)",
			url: "https://www.officialgazette.gov.ph/1991/10/10/republic-act-no-7160/",
		},
	],
	"/pagibig-calculator": [
		{
			name: "Pag-IBIG Fund Circular 460",
			url: "https://www.pagibigfund.gov.ph/document/pdf/circulars/housing/Circular%20No.%20460.pdf",
		},
	],
	"/pagibig-foreclosed-roi-calculator": [
		{
			name: "Pag-IBIG Acquired Assets Guidelines",
			url: "https://www.pagibigfund.gov.ph/acquiredassets/",
		},
	],
	"/pagibig-affordability-calculator": [
		{
			name: "Pag-IBIG Housing Loan Programs",
			url: "https://www.pagibigfund.gov.ph/FAQ_HousingLoan.html",
		},
	],
	"/gwa-calculator": [
		{
			name: "CHED Grading System Guidelines",
			url: "https://ched.gov.ph/wp-content/uploads/2017/10/CMO-No.-46-s.-2012.pdf",
		},
	],
	"/prc-board-exam-rating-calculator": [
		{
			name: "PRC Board Exam Passing Marks",
			url: "https://www.prc.gov.ph/resolutions",
		},
	],
	"/latin-honors-calculator": [
		{
			name: "UP System Code (Latin Honors)",
			url: "https://osu.up.edu.ph/wp-content/uploads/2015/05/UP-University-Code.pdf",
		},
	],
	"/dost-scholarship-stipend-calculator": [
		{
			name: "DOST-SEI Scholarship Privileges",
			url: "https://sei.dost.gov.ph/index.php/programs-and-projects/scholarships/undergraduate-scholarships",
		},
	],
	"/ched-scholarship-calculator": [
		{
			name: "CHED StuFAP Guidelines",
			url: "https://ched.gov.ph/stufaps/",
		},
	],
	"/qpi-gpa-calculator": [
		{
			name: "Ateneo Loyola Schools Grading System",
			url: "https://www.ateneo.edu/ls/registrar/policies/grading-system",
		},
	],
	"/id-photo-maker": [
		{
			name: "DFA Passport Photo Guidelines",
			url: "https://dfa-oca.ph/passport/passport-photo-guidelines/",
		},
	],
	"/fuel-cost-calculator": [
		{
			name: "DOE Oil Monitor",
			url: "https://www.doe.gov.ph/oil-monitor",
		},
	],
	"/lto-penalty-calculator": [
		{
			name: "LTO Fines and Penalties",
			url: "https://lto.gov.ph/fines-and-penalties/",
		},
	],
	"/toll-calculator": [
		{
			name: "TRB Approved Toll Rates",
			url: "https://trb.gov.ph/index.php/toll-rates",
		},
	],
	"/holiday-calculator": [
		{
			name: "DOLE Holiday Pay Rules",
			url: "https://bwc.dole.gov.ph/faqs-on-holiday-pay",
		},
	],
	"/dfa-age-calculator": [
		{
			name: "DFA Passport Requirements",
			url: "https://dfa-oca.ph/passport/passport-requirements/",
		},
	],
	"/bill-splitter-calculator": [
		{
			name: "DTI Service Charge Law",
			url: "https://www.officialgazette.gov.ph/2019/03/22/republic-act-no-11360/",
		},
	],
	"/electric-bill-calculator": [
		{
			name: "ERC Approved Meralco Rates",
			url: "https://www.erc.gov.ph/SectorPage/Electricity",
		},
	],
	"/overtime-pay-calculator": [
		{
			name: "DOLE Holiday and Premium Pay",
			url: "https://bwc.dole.gov.ph/faqs-on-holiday-pay",
		},
	],
};

export default function ToolFooter({ currentPath }: { currentPath: string }) {
	const t = useTranslations("ToolFooter");

	// Find the category of the current tool
	let currentCategory = "";
	for (const cat of toolCategories) {
		if (cat.items.find((item) => item.path === currentPath)) {
			currentCategory = cat.category;
			break;
		}
	}

	// Find 3 related tools (same category preferred)
	type ToolItem = (typeof toolCategories)[number]["items"][number];
	let relatedTools: ToolItem[] = [];
	const categoryObj = toolCategories.find(
		(c) => c.category === currentCategory,
	);
	if (categoryObj) {
		relatedTools = categoryObj.items
			.filter((item) => item.path !== currentPath)
			.slice(0, 3);
	}

	// If less than 3, fill from other categories
	if (relatedTools.length < 3) {
		for (const cat of toolCategories) {
			if (cat.category !== currentCategory) {
				const extras = cat.items.filter(
					(item) => item.path !== currentPath && !relatedTools.includes(item),
				);
				relatedTools.push(...extras);
				if (relatedTools.length >= 3) break;
			}
		}
		relatedTools = relatedTools.slice(0, 3);
	}

	return (
		<div
			style={{
				marginTop: "48px",
				borderTop: "1px solid var(--border-color)",
				paddingTop: "32px",
				paddingBottom: "32px",
			}}
		>
			<h2
				style={{
					fontSize: "20px",
					marginBottom: "16px",
					color: "var(--text-secondary)",
				}}
			>
				{t("sourcesTitle")}
			</h2>
			<div
				style={{
					marginBottom: "32px",
					fontSize: "16px",
					lineHeight: "1.6",
					color: "var(--text-primary)",
				}}
			>
				{toolToSourcesMap[currentPath] &&
				toolToSourcesMap[currentPath].length > 0 ? (
					<ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
						{toolToSourcesMap[currentPath].map((src, i) => (
							<li key={i}>
								<a
									href={src.url}
									target="_blank"
									rel="noopener noreferrer"
									style={{ color: "var(--primary)" }}
								>
									{src.name}
								</a>
							</li>
						))}
					</ul>
				) : (
					<ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
						<li>
							<a
								href="https://www.gov.ph/"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "var(--primary)" }}
							>
								Official Gazette of the Philippines
							</a>
						</li>
					</ul>
				)}
				<p style={{ fontStyle: "italic", fontSize: "12px" }}>
					{t("disclaimer")}
				</p>
			</div>

			<h2
				style={{
					fontSize: "20px",
					marginBottom: "16px",
					color: "var(--text-secondary)",
				}}
			>
				{t("relatedToolsTitle")}
			</h2>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
					gap: "16px",
				}}
			>
				{relatedTools.map((tool) => (
					<Link
						href={tool.path}
						key={tool.path}
						style={{ textDecoration: "none" }}
					>
						<div
							className="card tool-card"
							style={{
								height: "100%",
								padding: "16px",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<ToolIcon path={tool.path} />
							<h3
								style={{
									fontSize: "16px",
									color: "var(--primary)",
									marginBottom: "8px",
								}}
							>
								{tool.name}
							</h3>
							<p
								style={{
									fontSize: "14px",
									color: "var(--text-secondary)",
									marginTop: "auto",
									lineHeight: "1.5",
								}}
							>
								{tool.desc}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
