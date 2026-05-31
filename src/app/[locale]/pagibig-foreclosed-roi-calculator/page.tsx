import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import ToolFooter from "../../components/ToolFooter";
import Client from "./Client";

export function generateStaticParams() {
	return [{ locale: "en" }, { locale: "tl" }, { locale: "ceb" }];
}

export const metadata = {
	title: "Pag-IBIG Foreclosed Property ROI Calculator",
	description:
		"Calculate rental yield and flipping ROI for Pag-IBIG Acquired Assets in the Philippines.",
	alternates: {
		canonical: "https://www.phtools.me/en/pagibig-foreclosed-roi-calculator",
		languages: {
			en: "https://www.phtools.me/en/pagibig-foreclosed-roi-calculator",
			tl: "https://www.phtools.me/tl/pagibig-foreclosed-roi-calculator",
			ceb: "https://www.phtools.me/ceb/pagibig-foreclosed-roi-calculator",
		},
	},
};

export default async function PagibigForeclosedRoiPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<Suspense
				fallback={
					<div
						className="tool-grid card"
						style={{ textAlign: "center", padding: "40px" }}
					>
						Loading calculator...
					</div>
				}
			>
				<Client />
			</Suspense>
			<ToolFooter currentPath="/pagibig-foreclosed-roi-calculator" />
		</>
	);
}
