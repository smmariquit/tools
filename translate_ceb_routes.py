import json

with open("messages/ceb.json", "r") as f:
    ceb_json = json.load(f)
with open("messages/en.json", "r") as f:
    en_json = json.load(f)

routes = en_json.get("Routes", {})
ceb_routes = {}

ceb_translations = {
    "salary-calculator": {"name": "Salary Net Pay Calculator", "desc": "Kwenthaha imong take-home pay human sa kaltas sa SSS, PhilHealth, Pag-IBIG, ug Tax."},
    "bpo-night-differential-calculator": {"name": "BPO Night Differential Calculator", "desc": "Kwentaha ang 10% night shift differential pay base sa BPO hours."},
    "overtime-pay-calculator": {"name": "Overtime & Holiday Pay Calculator", "desc": "Kwentaha imong DOLE-compliant overtime ug premium pay para sa rest days ug holidays."},
    "budget-calculator": {"name": "Budget & Reverse Salary Calculator", "desc": "I-lista imong mga gastos para mahibaw-an pila nga gross salary dapat nimo pangayuon."},
    "sss-contribution-calculator": {"name": "SSS Contribution Calculator", "desc": "Tan-awa ang exact SSS breakdown (EE/ER/EC/MPF) base sa 2026 table."},
    "sss-pension-calculator": {"name": "SSS Retirement Pension Calculator", "desc": "I-estimate imong monthly lifetime pension base sa imong AMSC ug Credited Years of Service."},
    "13th-month-pay-calculator": {"name": "13th Month Calculator", "desc": "Kwentaha imong prorated 13th month ug tax exemptions."},
    "backpay-calculator": {"name": "Final Pay (Backpay) Calculator", "desc": "I-estimate imong final pay, prorated 13th month, ug leave conversions human mag-resign."},
    "freelance-tax-calculator": {"name": "Upwork & Freelance Tax Calculator", "desc": "Kwentaha imong net PHP after sa Upwork fees, forex spread, ug 8% BIR tax."},
    "electric-bill-calculator": {"name": "Electric Bill Estimator", "desc": "I-estimate imong Meralco bill base sa gamit sa appliances ug current rates."},
    "car-loan-calculator": {"name": "Car Loan & Amortization Calculator", "desc": "I-compare ang bank vs in-house auto loans, down payment, ug monthly amortization."},
    "pagibig-mp2-calculator": {"name": "Pag-IBIG MP2 Dividend Calculator", "desc": "Kwentaha imong tax-free earnings gikan sa Pag-IBIG MP2 Savings Program sulod sa 5 ka tuig."},
    "id-photo-maker": {"name": "ID Photo Maker", "desc": "Paghimo og 2x2, 1x1, ug passport photos gikan sa imong mga selfies, libre lang."}
}

for key, val in routes.items():
    if key in ceb_translations:
        ceb_routes[key] = ceb_translations[key]
    else:
        ceb_routes[key] = val

ceb_json["Routes"] = ceb_routes

with open("messages/ceb.json", "w") as f:
    json.dump(ceb_json, f, indent=4)

print("Translated ceb.json Routes!")
