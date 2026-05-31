import json

with open("messages/tl.json", "r") as f:
    tl_json = json.load(f)
with open("messages/en.json", "r") as f:
    en_json = json.load(f)

routes = en_json.get("Routes", {})
tl_routes = {}

# Quick basic tagalog translations for some descriptions
tl_translations = {
    "salary-calculator": {"name": "Salary Net Pay Calculator", "desc": "Kwentahin ang take-home pay mo matapos ang kaltas sa SSS, PhilHealth, Pag-IBIG & Tax."},
    "bpo-night-differential-calculator": {"name": "BPO Night Differential Calculator", "desc": "Kwentahin ang 10% night shift differential pay mo base sa oras ng BPO sa Pilipinas."},
    "overtime-pay-calculator": {"name": "Overtime & Holiday Pay Calculator", "desc": "Kwentahin ang DOLE-compliant overtime at premium pay mo para sa rest days at holidays."},
    "budget-calculator": {"name": "Budget & Reverse Salary Calculator", "desc": "I-lista ang mga gastos mo at alamin kung magkanong gross salary ang dapat mong hingin."},
    "sss-contribution-calculator": {"name": "SSS Contribution Calculator", "desc": "Tingnan ang eksaktong SSS breakdown (EE/ER/EC/MPF) base sa 2026 table."},
    "sss-pension-calculator": {"name": "SSS Retirement Pension Calculator", "desc": "I-estimate ang monthly lifetime pension mo base sa AMSC at Credited Years of Service."},
    "13th-month-pay-calculator": {"name": "13th Month Calculator", "desc": "Kwentahin ang prorated 13th month mo at tax exemptions."},
    "backpay-calculator": {"name": "Final Pay (Backpay) Calculator", "desc": "I-estimate ang final pay, prorated 13th month, at leave conversions matapos mag-resign."},
    "freelance-tax-calculator": {"name": "Upwork & Freelance Tax Calculator", "desc": "Kwentahin ang net PHP mo after ng Upwork fees, forex spread, at 8% BIR tax."},
    "electric-bill-calculator": {"name": "Electric Bill Estimator", "desc": "I-estimate ang Meralco bill mo base sa gamit ng appliances at current rates."},
    "car-loan-calculator": {"name": "Car Loan & Amortization Calculator", "desc": "I-compare ang bank vs in-house auto loans, down payment, at monthly amortization."},
    "pagibig-mp2-calculator": {"name": "Pag-IBIG MP2 Dividend Calculator", "desc": "Kwentahin ang tax-free earnings mo sa Pag-IBIG MP2 Savings Program (5 years)."},
    "id-photo-maker": {"name": "ID Photo Maker", "desc": "Gumawa ng 2x2, 1x1, at passport photos gamit ang mga selfies nang libre."}
}

for key, val in routes.items():
    if key in tl_translations:
        tl_routes[key] = tl_translations[key]
    else:
        # Just use english if no quick translation provided
        tl_routes[key] = val

tl_json["Routes"] = tl_routes

with open("messages/tl.json", "w") as f:
    json.dump(tl_json, f, indent=4)

print("Translated tl.json Routes!")
