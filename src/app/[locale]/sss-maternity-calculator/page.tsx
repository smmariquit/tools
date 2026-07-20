import { permanentRedirect } from "next/navigation";

export default async function RedirectPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	permanentRedirect(`/${locale}/sss-maternity-benefit-calculator`);
}
