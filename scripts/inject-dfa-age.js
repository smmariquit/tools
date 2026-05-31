import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["DFAAge"] = {
	title: "Exact Age Calculator (Philippines)",
	subtitle:
		"Calculate your exact age in years, months, and days for DFA Passports, PRC Exams, and Civil Service applications.",
	inputDetails: "Birth Details",
	birthDateLabel: "Date of Birth",
	targetDateLabel: "Target Date (Optional)",
	targetDateHint:
		"Defaults to today. Useful for checking age on a future exam or travel date.",
	resultsTitle: "Exact Age Result",
	exactAgeLabel: "Your Exact Age",
	yearsLabel: "Years",
	monthsLabel: "Months",
	daysLabel: "Days",
	eligibilityTitle: "Age Eligibility Checks",
	statusMinor: "Under 18 (Minor)",
	statusMinorDesc:
		"Requires DSWD clearance for solo travel and parental presence for DFA passport application.",
	statusAdult: "Adult (18+)",
	statusAdultDesc: "Eligible to sign legal contracts and travel independently.",
	statusPRC: "PRC Board Eligible (21+)",
	statusPRCDesc:
		"Many professional boards require you to be exactly 21 years old on the day of the exam.",
	statusSenior: "Senior Citizen (60+)",
	statusSeniorDesc:
		"Eligible for 20% discount and VAT exemption under RA 9994.",
	readGuideBtn: "Read the Full Guide →",
	relatedToolsTitle: "Related Tools",
};

tlJson["DFAAge"] = {
	title: "Exact Age Calculator (Pilipinas)",
	subtitle:
		"Alamin ang iyong eksaktong edad (taon, buwan, araw) para sa DFA Passport, PRC Exam, o Civil Service.",
	inputDetails: "Detalye ng Kapanganakan",
	birthDateLabel: "Araw ng Kapanganakan",
	targetDateLabel: "Target Date (Optional)",
	targetDateHint:
		"Naka-set sa araw na ito by default. Pwede mong palitan para makita ang edad mo sa future date.",
	resultsTitle: "Eksaktong Edad",
	exactAgeLabel: "Ang Iyong Edad",
	yearsLabel: "Taon",
	monthsLabel: "Buwan",
	daysLabel: "Araw",
	eligibilityTitle: "Eligibility Checks",
	statusMinor: "Under 18 (Minor)",
	statusMinorDesc:
		"Kailangan ng DSWD clearance at presensya ng magulang para sa DFA passport.",
	statusAdult: "Adult (18+)",
	statusAdultDesc: "Pwede na pumirma ng kontrata at bumiyahe mag-isa.",
	statusPRC: "PRC Board Eligible (21+)",
	statusPRCDesc:
		"May mga board exam (tulad ng CPA o Engineering) na kailangan eksaktong 21 ka na sa mismong araw ng exam.",
	statusSenior: "Senior Citizen (60+)",
	statusSeniorDesc:
		"Eligible ka na sa 20% discount at VAT exemption base sa RA 9994.",
	readGuideBtn: "Basahin ang Gabay →",
	relatedToolsTitle: "Mga Kaugnay na Tools",
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\n");
console.log("DFA Age Translations injected!");
