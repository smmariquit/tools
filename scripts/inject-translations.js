import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["ToolFooter"] = {
	readGuideTitle: "Read the Full Guide",
	readGuideDesc:
		"Want to know the exact formula behind this calculator? Check out our comprehensive, human-written guide that explains the law, computations, and exact rules.",
	readGuideBtn: "Read the Guide \u2192",
	relatedToolsTitle: "Related Tools",
};

tlJson["ToolFooter"] = {
	readGuideTitle: "Basahin ang Buong Guide",
	readGuideDesc:
		"Gusto mo malaman ang exact formula behind this calculator? I-check ang aming comprehensive na guide na nag-eexplain ng batas, computations, at exact rules.",
	readGuideBtn: "Basahin ang Guide \u2192",
	relatedToolsTitle: "Related Tools",
};

enJson["SalaryCalculator"]["seoTitle"] =
	"How to Compute Your Net Salary in the Philippines";
enJson["SalaryCalculator"]["seoDesc"] =
	"Calculating your take-home pay involves deducting your mandatory government contributions (SSS, PhilHealth, Pag-IBIG) and withholding tax from your gross basic salary.";
enJson["SalaryCalculator"]["seoGovtTitle"] =
	"1. Government Contributions (2026 Rates)";
enJson["SalaryCalculator"]["seoGovtSSS"] =
	"<strong>SSS:</strong> The employee share is <strong>5%</strong> of the Monthly Salary Credit (MSC). The maximum MSC is ₱35,000, meaning the maximum employee deduction is ₱1,750.";
enJson["SalaryCalculator"]["seoGovtPhilHealth"] =
	"<strong>PhilHealth:</strong> The premium rate is <strong>5%</strong> of your basic salary, split equally between you and your employer (<strong>2.5% each</strong>). The salary floor is ₱10,000 and the ceiling is ₱100,000.";
enJson["SalaryCalculator"]["seoGovtPagibig"] =
	"<strong>Pag-IBIG:</strong> The standard employee contribution is <strong>₱200</strong> per month (2% of the ₱10,000 maximum fund salary).";
enJson["SalaryCalculator"]["seoTaxTitle"] =
	"2. Taxable Income & Withholding Tax";
enJson["SalaryCalculator"]["seoTaxDesc"] =
	"To find your taxable income, subtract your total contributions from your gross salary. Then, apply the TRAIN Law tax brackets to compute your withholding tax. If your taxable income is below ₱20,833 per month (₱250,000 annually), you are exempt from income tax.";

tlJson["SalaryCalculator"]["seoTitle"] =
	"Paano I-compute ang Iyong Net Salary sa Pilipinas";
tlJson["SalaryCalculator"]["seoDesc"] =
	"Ang pag-calculate ng iyong take-home pay ay kinabibilangan ng pag-deduct ng iyong mandatory government contributions (SSS, PhilHealth, Pag-IBIG) at withholding tax mula sa iyong gross basic salary.";
tlJson["SalaryCalculator"]["seoGovtTitle"] =
	"1. Government Contributions (2026 Rates)";
tlJson["SalaryCalculator"]["seoGovtSSS"] =
	"<strong>SSS:</strong> Ang employee share ay <strong>5%</strong> ng Monthly Salary Credit (MSC). Ang maximum MSC ay ₱35,000, kaya ang maximum employee deduction ay ₱1,750.";
tlJson["SalaryCalculator"]["seoGovtPhilHealth"] =
	"<strong>PhilHealth:</strong> Ang premium rate ay <strong>5%</strong> ng iyong basic salary, split equally between you and your employer (<strong>2.5% each</strong>). Ang salary floor ay ₱10,000 at ang ceiling ay ₱100,000.";
tlJson["SalaryCalculator"]["seoGovtPagibig"] =
	"<strong>Pag-IBIG:</strong> Ang standard employee contribution ay <strong>₱200</strong> per month (2% of the ₱10,000 maximum fund salary).";
tlJson["SalaryCalculator"]["seoTaxTitle"] =
	"2. Taxable Income & Withholding Tax";
tlJson["SalaryCalculator"]["seoTaxDesc"] =
	"Para makuha ang iyong taxable income, i-subtract ang total contributions sa iyong gross salary. Tapos, i-apply ang TRAIN Law tax brackets para ma-compute ang iyong withholding tax. Kapag ang taxable income mo ay below ₱20,833 per month (₱250,000 annually), exempt ka na sa income tax.";

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\\n");
console.log("Translations injected!");
