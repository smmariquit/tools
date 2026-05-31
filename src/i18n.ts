import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "tl", "ceb"];

export default getRequestConfig(async ({ locale }) => {
	const validLocale = locales.includes(locale as string) ? locale : "en";

	return {
		locale: validLocale as string,
		messages: (await import(`../messages/${validLocale}.json`)).default,
	};
});
