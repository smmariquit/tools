import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["BIRWithholdingTax"] = {
	title: "Expanded Withholding Tax (EWT) Calculator",
	subtitle:
		"Calculate BIR Form 2307 deductions for freelancers, professionals, and suppliers (1%, 2%, 5%, 10%).",
	inputDetails: "Invoice Details",
	grossAmountLabel: "Gross Amount Billed (PHP)",
	taxRateLabel: "EWT Rate (%)",
	rate1: "1% (Goods / Materials)",
	rate2: "2% (Services / Contractors)",
	rate5: "5% (Professionals / Freelancers under 3M)",
	rate10: "10% (Professionals / Freelancers over 3M)",
	rate15: "15% (Management / Technical Consultants)",
	vatInclusiveLabel: "Is the Gross Amount VAT Inclusive (12%)?",
	vatHint:
		"If VAT inclusive, the withholding tax is calculated strictly on the Vatable Sales base (Gross ÷ 1.12), not the total invoice amount.",
	resultsTitle: "Computation Result",
	netAmountLabel: "Net Amount You Will Receive",
	wtLabel: "Withholding Tax (Deducted)",
	wtHint: "Ask your client for BIR Form 2307 for this amount.",
	taxBaseLabel: "Tax Base (Vatable Sales)",
	vatAmountLabel: "12% VAT",
	readGuideBtn: "Read EWT Guide →",
};

tlJson["BIRWithholdingTax"] = {
	title: "Expanded Withholding Tax (EWT) Calculator",
	subtitle:
		"Kwentahin ang ibabawas sa invoice mo ng client mo para sa BIR Form 2307 (1%, 2%, 5%, 10%).",
	inputDetails: "Detalye ng Invoice",
	grossAmountLabel: "Gross Amount (PHP)",
	taxRateLabel: "EWT Rate (%)",
	rate1: "1% (Goods / Materials)",
	rate2: "2% (Services / Contractors)",
	rate5: "5% (Professionals / Freelancers under 3M)",
	rate10: "10% (Professionals / Freelancers over 3M)",
	rate15: "15% (Management / Technical Consultants)",
	vatInclusiveLabel: "Kasama na ba ang 12% VAT sa Gross Amount?",
	vatHint:
		"Kung VAT inclusive, sa Vatable Sales (Gross ÷ 1.12) ibabase ang withholding tax, hindi sa total gross.",
	resultsTitle: "Resulta ng Computation",
	netAmountLabel: "Net Amount na Matatanggap Mo",
	wtLabel: "Withholding Tax (Ibabawas)",
	wtHint:
		"Hingin ang BIR Form 2307 sa client mo para ma-claim ito bilang tax credit.",
	taxBaseLabel: "Tax Base (Vatable Sales)",
	vatAmountLabel: "12% VAT",
	readGuideBtn: "Basahin ang EWT Guide →",
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\n");
console.log("BIR WT Translations injected!");
