import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["PRCBoardExamRating"] = {
	title: "PRC Board Exam Rating Calculator",
	subtitle:
		"Calculate your General Weighted Average for NLE, CE, MTLE, and CPALE. Know exactly what scores you need to pass.",
	inputDetails: "Enter Your Scores",
	examTypeLabel: "Select Board Exam",
	examNLE: "Nursing (NLE)",
	examCE: "Civil Engineering (CE)",
	examMTLE: "Medical Technology (MTLE)",
	examCPA: "Accountancy (CPALE)",
	resultsTitle: "Board Exam Result",
	averageLabel: "General Average",
	statusLabel: "Status",
	passed: "PASSED! 🎉",
	failed: "FAILED",
	conditioned: "CONDITIONED (Subject below minimum)",
	failingSubjectsTitle: "Subjects below passing grade:",
	readGuideBtn: "Read PRC Passing Guidelines →",
};

tlJson["PRCBoardExamRating"] = {
	title: "PRC Board Exam Rating Calculator",
	subtitle:
		"Kwentahin ang iyong General Average para sa NLE, CE, MTLE, at CPALE board exams.",
	inputDetails: "I-enter ang Scores",
	examTypeLabel: "Piliin ang Board Exam",
	examNLE: "Nursing (NLE)",
	examCE: "Civil Engineering (CE)",
	examMTLE: "Medical Technology (MTLE)",
	examCPA: "Accountancy (CPALE)",
	resultsTitle: "Resulta ng Board Exam",
	averageLabel: "General Average",
	statusLabel: "Status",
	passed: "PASSED! 🎉",
	failed: "FAILED",
	conditioned: "CONDITIONED (May bumagsak na subject)",
	failingSubjectsTitle: "Mga subject na mababa sa minimum:",
	readGuideBtn: "Basahin ang PRC Guidelines →",
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\n");
console.log("PRC Translations injected!");
