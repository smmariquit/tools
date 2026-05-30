import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Expressway Toll Calculator (Skyway, SLEX) | PHTools",
  description: "Calculate toll fees for Philippine expressways including Skyway Stage 3, SLEX, and NLEX. Check TRB-approved rates for Class 1, 2, and 3 vehicles.",
};

export default function TollCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Philippine Toll Calculator",
    "applicationCategory": "TravelApplication",
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
