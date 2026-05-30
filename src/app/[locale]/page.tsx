import Link from "next/link";

import { toolCategories } from "../../lib/routes";

export default function Home() {
  return (
    <>
      <div className="page-header" style={{ textAlign: "center", borderBottom: "none", marginBottom: "48px" }}>
        <h1 className="page-title" style={{ fontSize: "36px", marginBottom: "16px" }}>Free Online Tools for Filipinos</h1>
        <p className="page-subtitle" style={{ maxWidth: "600px", margin: "0 auto", fontSize: "18px", marginBottom: "24px" }}>
          Accurate calculators, generators, and utilities designed specifically for the Philippines.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#e3f2fd", color: "var(--primary)", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: 600 }}>
          <span style={{ fontSize: "18px" }}>⚡</span>
          100% Offline Capable — Install as an app to calculate anywhere without WiFi!
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {toolCategories.map((section) => (
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
