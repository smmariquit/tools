import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "PhilHealth Contribution Calculator 2026 | PHTools",
  description: "Calculate your exact PhilHealth monthly premium deduction based on the latest 5% contribution table mandated by the Universal Health Care Law.",
};

export default function PhilHealthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PhilHealth Contribution Calculator",
    "applicationCategory": "FinanceApplication",
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
