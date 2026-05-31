import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["GSISPension"] = {
	title: "GSIS Pension Calculator",
	subtitle: "Calculate your GSIS Basic Monthly Pension (BMP) based on RA 8291.",
	inputDetails: "Your Details",
	resultsTitle: "Computation Results",
	amcLabel: "Average Monthly Compensation (AMC)",
	amcDesc: "Your average salary for the last 36 months of service.",
	cvsLabel: "Creditable Years of Service (CVS)",
	cvsDesc: "Must be at least 15 years to qualify for a regular pension.",
	bmpLabel: "Basic Monthly Pension (BMP)",
	minServiceWarn: "* Must have at least 15 years of service.",
	capWarn: "* Capped at 90% of AMC.",
};

tlJson["GSISPension"] = {
	title: "GSIS Pension Calculator",
	subtitle:
		"Kalkulahin ang iyong GSIS Basic Monthly Pension (BMP) base sa RA 8291.",
	inputDetails: "Ang Iyong Detalye",
	resultsTitle: "Resulta ng Komputasyon",
	amcLabel: "Average Monthly Compensation (AMC)",
	amcDesc: "Ang average na sweldo mo for the last 36 months of service.",
	cvsLabel: "Creditable Years of Service (CVS)",
	cvsDesc:
		"Dapat at least 15 years of service para mag-qualify sa regular pension.",
	bmpLabel: "Basic Monthly Pension (BMP)",
	minServiceWarn: "* Dapat may at least 15 years of service.",
	capWarn: "* Capped at 90% ng AMC.",
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\n");
console.log("GSIS Translations injected!");
