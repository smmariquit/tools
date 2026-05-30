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
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "8px", 
          backgroundColor: "rgba(13, 71, 161, 0.08)", 
          color: "var(--primary)", 
          padding: "8px 16px", 
          borderRadius: "6px", 
          fontSize: "14px", 
          fontWeight: 600,
          border: "1px solid rgba(13, 71, 161, 0.15)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
          Works Offline (PWA Supported)
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
