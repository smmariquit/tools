import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "13th Month Pay Calculator (Philippines 2026) | PHTools",
  description: "Accurately compute your prorated 13th month pay. Automatically excludes overtime and checks the ₱90k TRAIN law tax exemption limit.",
};

export default function ThirteenthMonthPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "13th Month Pay Calculator",
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
