import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Holiday & Overtime Pay Calculator (DOLE Rules) | PHTools",
  description: "Calculate your exact pay for working on Regular Holidays, Special Non-Working Days, and Rest Days based on DOLE Philippine labor rules.",
};

export default function HolidayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Holiday Pay Calculator",
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
