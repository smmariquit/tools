import fs from "fs";
import path from "path";

const enPath = path.resolve("messages/en.json");
const tlPath = path.resolve("messages/tl.json");

const enJson = JSON.parse(fs.readFileSync(enPath, "utf8"));
const tlJson = JSON.parse(fs.readFileSync(tlPath, "utf8"));

enJson["SalaryCalculator"]["payrollPeriodLabel"] = "Payroll Period";
enJson["SalaryCalculator"]["periodMonthly"] = "Monthly";
enJson["SalaryCalculator"]["periodSemiMonthly"] = "Semi-Monthly (15th & 30th)";
enJson["SalaryCalculator"]["periodWeekly"] = "Weekly";
enJson["SalaryCalculator"]["periodDaily"] = "Daily";
enJson["SalaryCalculator"]["periodAnnually"] = "Annually";

tlJson["SalaryCalculator"]["payrollPeriodLabel"] = "Payroll Period";
tlJson["SalaryCalculator"]["periodMonthly"] = "Monthly (Buwanan)";
tlJson["SalaryCalculator"]["periodSemiMonthly"] =
	"Semi-Monthly (Kinsenas/Katapusan)";
tlJson["SalaryCalculator"]["periodWeekly"] = "Weekly (Lingguhan)";
tlJson["SalaryCalculator"]["periodDaily"] = "Daily (Arawan)";
tlJson["SalaryCalculator"]["periodAnnually"] = "Annually (Taunan)";

fs.writeFileSync(enPath, JSON.stringify(enJson, null, "\t") + "\n");
fs.writeFileSync(tlPath, JSON.stringify(tlJson, null, "\t") + "\n");
console.log("Injected payroll period translations!");
