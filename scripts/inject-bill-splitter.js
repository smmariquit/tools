import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["BillSplitter"] = {
	title: "GCash & Maya Bill Splitter",
	subtitle:
		"Easily split restaurant bills for your group. Includes options for tips and calculates the exact GCash/Maya transfer amount per person.",
	inputDetails: "Receipt Details",
	receiptAmountLabel: "Total Receipt Amount (PHP)",
	tipAmountLabel: "Tip Amount (PHP)",
	paxLabel: "Number of People (Pax)",
	resultsTitle: "Ambagan Breakdown",
	perPersonLabel: "Amount Per Person",
	totalPayLabel: "Total Group Payment",
	sendViaLabel: "Send via GCash / Maya",
	sendViaDesc: "Ask each person to send this exact amount to the payer.",
	readGuideBtn: "Read the Full Guide →",
};

tlJson["BillSplitter"] = {
	title: "GCash & Maya Bill Splitter (Ambagan)",
	subtitle:
		"Hatiin ang bill sa restaurant ng walang sakit sa ulo. Kasama na ang tip at exact computation para sa GCash o Maya transfer.",
	inputDetails: "Detalye ng Resibo",
	receiptAmountLabel: "Total sa Resibo (PHP)",
	tipAmountLabel: "Tip / Dagdag (PHP)",
	paxLabel: "Ilang Tao Kayo? (Pax)",
	resultsTitle: "Ambagan Breakdown",
	perPersonLabel: "Ambag Bawat Isa",
	totalPayLabel: "Total na Babayaran",
	sendViaLabel: "I-send via GCash / Maya",
	sendViaDesc:
		"Sabihin sa mga kasama mo na i-send ang eksaktong halagang ito sa magbabayad.",
	readGuideBtn: "Basahin ang Gabay →",
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\n");
console.log("Bill Splitter Translations injected!");
