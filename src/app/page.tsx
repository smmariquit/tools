import Link from "next/link";

const tools = [
  {
    category: "Finance & Salary",
    items: [
      { name: "Salary Net Pay Calculator", path: "/salary-calculator", desc: "Compute your take-home pay after SSS, PhilHealth, Pag-IBIG & Tax." },
      { name: "SSS Contribution Calculator", path: "/sss-contribution-calculator", desc: "See your exact SSS breakdown (EE/ER/EC/MPF) based on the 2026 table." },
      { name: "Income Tax Calculator (BIR)", path: "/income-tax-calculator", desc: "Calculate your annual and monthly income tax using TRAIN law brackets." },
      { name: "13th Month & Final Pay Calculator", path: "/13th-month-pay-calculator", desc: "Compute your prorated 13th month, separation pay, and final back pay." },
      { name: "Pag-IBIG / MP2 Calculator", path: "/pagibig-calculator", desc: "Estimate your MP2 savings dividends and standard housing loan amortization." },
      { name: "Electric Bill Estimator", path: "/electric-bill-calculator", desc: "Estimate your Meralco bill based on appliance usage and current rates." }
    ]
  },
  {
    category: "Creative & Media",
    items: [
      { name: "ID Photo Maker", path: "/id-photo-maker", desc: "Create 2x2, 1x1, and passport photos from your selfies for free." },
      { name: "Event Photobooth", path: "/photobooth", desc: "Browser-based photobooth with Filipino-themed frames for your events." }
    ]
  },
  {
    category: "Utilities",
    items: [
      { name: "PH Zip Code Finder", path: "/zip-code-finder", desc: "Search the official PHLPost database for barangay and city zip codes." },
      { name: "Holiday & Overtime Pay", path: "/holiday-calculator", desc: "See the 2026 calendar and calculate your special/regular holiday pay." }
    ]
  }
];

export default function Home() {
  return (
    <>
      <div className="page-header" style={{ textAlign: "center", borderBottom: "none", marginBottom: "48px" }}>
        <h1 className="page-title" style={{ fontSize: "36px", marginBottom: "16px" }}>Free Online Tools for Filipinos</h1>
        <p className="page-subtitle" style={{ maxWidth: "600px", margin: "0 auto", fontSize: "18px" }}>
          Accurate calculators, generators, and utilities designed specifically for the Philippines.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {tools.map((section) => (
          <div key={section.category}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px", paddingBottom: "8px", borderBottom: "1px solid var(--border-color)" }}>
              {section.category}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {section.items.map((tool) => (
                <Link href={tool.path} key={tool.name} style={{ textDecoration: "none" }}>
                  <div className="card tool-card" style={{ height: "100%" }}>
                    <h3 style={{ fontSize: "16px", color: "var(--primary)", marginBottom: "8px" }}>{tool.name}</h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>{tool.desc}</p>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        ))}
      </div>
    </>
  );
}
