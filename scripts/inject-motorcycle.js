import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["MotorcycleLoan"] = {
	title: "Motorcycle Loan Calculator (Hulugan)",
	subtitle:
		"Calculate your exact monthly amortization, total interest, and hidden costs for in-house dealer financing (Motortrade, Wheeltek, etc.).",
	inputDetails: "Motorcycle Price & Details",
	cashPriceLabel: "Cash Price (SRP)",
	downPaymentLabel: "Downpayment",
	termMonthsLabel: "Term (Months)",
	interestRateLabel: "Monthly Add-on Interest Rate (%)",
	interestRateHint:
		"PH dealers usually charge 1.5% to 2.5% flat interest per month. This is NOT annual compounding interest.",
	resultsTitle: "Computation Result",
	monthlyAmortizationLabel: "Monthly Amortization",
	amountFinancedLabel: "Amount Financed",
	totalInterestLabel: "Total Interest (Tubo)",
	totalCostLabel: "Total Cost of Motorcycle",
	warningTitle: "Financial Warning",
	warningDesc:
		"In-house dealer financing applies a flat monthly rate which results in an massive Effective Interest Rate (EIR). Consider saving up for a larger downpayment or using a bank personal loan instead.",
	readGuideBtn: "Read the Buying Guide →",
};

tlJson["MotorcycleLoan"] = {
	title: "Motorcycle Loan Calculator (Hulugan)",
	subtitle:
		"Kwentahin ang eksaktong monthly, tubo, at total na babayaran sa motor pag in-house financing (tulad ng Motortrade at Wheeltek).",
	inputDetails: "Detalye ng Kukunin na Motor",
	cashPriceLabel: "Cash Price (SRP)",
	downPaymentLabel: "Downpayment",
	termMonthsLabel: "Ilang Buwan Babayaran?",
	interestRateLabel: "Monthly Interest Rate (%)",
	interestRateHint:
		"Kadalasan ay 1.5% hanggang 2.5% per month ang patong ng dealers. Iba ito sa bank loan.",
	resultsTitle: "Resulta ng Computations",
	monthlyAmortizationLabel: "Hulog Buwan-Buwan",
	amountFinancedLabel: "Inutang na Halaga",
	totalInterestLabel: "Kabuuang Tubo (Interest)",
	totalCostLabel: "Kabuuang Gastos sa Motor",
	warningTitle: "Paalala Bago Kumuha",
	warningDesc:
		"Ang in-house financing ng mga dealer ay gumagamit ng flat rate kaya napakalaki ng epektibong interest. Mas makakatipid kung iipunin ang downpayment o uutang sa banko (Personal Loan) para pambili ng cash.",
	readGuideBtn: "Basahin ang Gabay →",
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\n");
console.log("Motorcycle Loan Translations injected!");
