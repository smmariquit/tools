import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function RedirectPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	setRequestLocale((await params).locale);
	const { locale } = await params;
	permanentRedirect(`/${locale}/sss-maternity-benefit-calculator`);
}
