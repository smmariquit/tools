export const toolCategories = [
  {
    category: "Finance & Salary",
    items: [
      { name: "Salary Net Pay Calculator", path: "/salary-calculator", desc: "Compute your take-home pay after SSS, PhilHealth, Pag-IBIG & Tax.", priority: 0.9 },
      { name: "SSS Contribution Calculator", path: "/sss-contribution-calculator", desc: "See your exact SSS breakdown (EE/ER/EC/MPF) based on the 2026 table.", priority: 0.9 },
      { name: "PhilHealth Premium Calculator", path: "/philhealth-calculator", desc: "Calculate your exact monthly PhilHealth premium based on the latest 5% UHC rate.", priority: 0.9 },
      { name: "Income Tax Calculator (BIR)", path: "/income-tax-calculator", desc: "Calculate your annual and monthly income tax using TRAIN law brackets.", priority: 0.9 },
      { name: "13th Month & Final Pay Calculator", path: "/13th-month-pay-calculator", desc: "Compute your prorated 13th month, separation pay, and final back pay.", priority: 0.8 },
      { name: "Freelance 8% Tax Calculator", path: "/freelance-tax-calculator", desc: "Calculate your net take-home pay under the BIR 8% flat income tax rate.", priority: 0.8 },
      { name: "Shopee & Lazada Fee Calculator", path: "/shopee-lazada-fee-calculator", desc: "Calculate exact seller deductions (Commission, FSS, CCB) and net payout.", priority: 0.8 },
      { name: "Electric Bill Estimator", path: "/electric-bill-calculator", desc: "Estimate your Meralco bill based on appliance usage and current rates.", priority: 0.7 }
    ]
  },
  {
    category: "Real Estate & Housing",
    items: [
      { name: "Amilyar (Property Tax) Calculator", path: "/amilyar-calculator", desc: "Estimate your annual Philippine Real Property Tax (RPT) and SEF.", priority: 0.7 },
      { name: "Pag-IBIG / MP2 Calculator", path: "/pagibig-calculator", desc: "Estimate your MP2 savings dividends and standard housing loan amortization.", priority: 0.8 }
    ]
  },
  {
    category: "Creative & Media",
    items: [
      { name: "ID Photo Maker", path: "/id-photo-maker", desc: "Create 2x2, 1x1, and passport photos from your selfies for free.", priority: 0.6 }
    ]
  },
  {
    category: "Utilities",
    items: [
      { name: "Fuel Cost Calculator", path: "/fuel-cost-calculator", desc: "Estimate your road trip gas expenses and easily divide costs for ambagan.", priority: 0.6 },
      { name: "LTO Penalty Calculator", path: "/lto-penalty-calculator", desc: "Check exactly how much your MVUC fine is for late vehicle registration.", priority: 0.7 },
      { name: "Expressway Toll Calculator", path: "/toll-calculator", desc: "Lookup TRB-approved toll fees for Skyway, SLEX, NLEX, and TPLEX.", priority: 0.8 },
      { name: "Holiday & Overtime Pay", path: "/holiday-calculator", desc: "See the 2026 calendar and calculate your special/regular holiday pay.", priority: 0.7 }
    ]
  }
];

// Flattened list of all tool paths for easy iteration
export const allToolPaths = toolCategories.flatMap(category => category.items.map(item => item.path));
