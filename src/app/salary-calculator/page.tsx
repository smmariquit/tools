import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Free 2026 Salary Net Pay Calculator | Philippines",
  description: "Compute your exact 2026 net take-home pay in the Philippines. Accurately deducts SSS (with WISP), PhilHealth, Pag-IBIG, and TRAIN Law income tax.",
};

export default function SalaryCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Salary Net Pay Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "description": metadata.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "PHP"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Client />
    </>
  );
}
