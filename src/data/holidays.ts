/**
 * Official Philippine holidays for 2026.
 *
 * Primary source: Presidential Proclamation No. 1006 (s. 2025), signed
 * 3 September 2025, "Declaring the Regular Holidays and Special (Non-Working)
 * Days for the Year 2026."
 *   - Official Gazette: https://www.officialgazette.gov.ph/
 *   - Philippine News Agency: https://www.pna.gov.ph/articles/1258046
 *
 * Pay MULTIPLIERS (regular holiday 200%, special non-working +30%, etc.) come
 * from PD 442 / the Labor Code and DO NOT change year to year — they live in the
 * individual calculators. Only this DATE LIST is annual.
 *
 * ANNUAL REFRESH: when the next year's proclamation is published, bump
 * `HOLIDAYS_YEAR`, `HOLIDAYS_SOURCE`, `HOLIDAYS_AS_OF`, replace the entries
 * below, and update the movable Islamic dates once NCMF/Malacañang fix them.
 * This is a verified STATIC list (not a runtime API) by design, per the
 * project's official-sources + zero-infra rules.
 *
 * Islamic holidays (Eid'l Fitr, Eid'l Adha) are movable and are declared by a
 * SEPARATE later proclamation on the recommendation of the National Commission
 * on Muslim Filipinos (NCMF); they are NOT in Proclamation No. 1006. The dates
 * below are astronomical estimates and are flagged `approximate: true`.
 */

export type HolidayType =
	| "regular"
	| "special-non-working"
	| "special-working";

/**
 * Pay treatment buckets shared across calculators. The day-type enums differ
 * per calculator, so each calculator maps this category onto its own option.
 */
export type PayCategory =
	| "regular-holiday"
	| "special-non-working"
	| "ordinary";

export interface Holiday {
	/** ISO date, YYYY-MM-DD. */
	date: string;
	/** Canonical English name (fallback when a locale string is missing). */
	name: string;
	/** Stable slug used as the i18n key under `holidayNames.<key>`. */
	key: string;
	type: HolidayType;
	/** True when the date is an estimate not yet fixed by official proclamation. */
	approximate?: boolean;
}

export const HOLIDAYS_YEAR = 2026;
export const HOLIDAYS_SOURCE =
	"Presidential Proclamation No. 1006 (s. 2025)";
export const HOLIDAYS_SOURCE_URL =
	"https://www.pna.gov.ph/articles/1258046";
/** Date the source proclamation was signed/published. */
export const HOLIDAYS_AS_OF = "2025-09-03";

export const PH_HOLIDAYS_2026: Holiday[] = [
	// --- Regular Holidays (Proclamation No. 1006, Sec. 1.A) ---
	{ date: "2026-01-01", name: "New Year's Day", key: "newYear", type: "regular" },
	{ date: "2026-04-02", name: "Maundy Thursday", key: "maundyThursday", type: "regular" },
	{ date: "2026-04-03", name: "Good Friday", key: "goodFriday", type: "regular" },
	{ date: "2026-04-09", name: "Araw ng Kagitingan", key: "arawNgKagitingan", type: "regular" },
	{ date: "2026-05-01", name: "Labor Day", key: "laborDay", type: "regular" },
	{ date: "2026-06-12", name: "Independence Day", key: "independenceDay", type: "regular" },
	{ date: "2026-08-31", name: "National Heroes' Day", key: "nationalHeroes", type: "regular" },
	{ date: "2026-11-30", name: "Bonifacio Day", key: "bonifacioDay", type: "regular" },
	{ date: "2026-12-25", name: "Christmas Day", key: "christmasDay", type: "regular" },
	{ date: "2026-12-30", name: "Rizal Day", key: "rizalDay", type: "regular" },

	// --- Movable Islamic regular holidays (separate NCMF proclamation; estimates) ---
	{ date: "2026-03-20", name: "Eid'l Fitr (estimated)", key: "eidlFitr", type: "regular", approximate: true },
	{ date: "2026-05-27", name: "Eid'l Adha (estimated)", key: "eidlAdha", type: "regular", approximate: true },

	// --- Special (Non-Working) Days (Proclamation No. 1006, Sec. 1.B & 1.D) ---
	{ date: "2026-02-17", name: "Chinese New Year", key: "chineseNewYear", type: "special-non-working" },
	{ date: "2026-04-04", name: "Black Saturday", key: "blackSaturday", type: "special-non-working" },
	{ date: "2026-08-21", name: "Ninoy Aquino Day", key: "ninoyAquinoDay", type: "special-non-working" },
	{ date: "2026-11-01", name: "All Saints' Day", key: "allSaintsDay", type: "special-non-working" },
	{ date: "2026-11-02", name: "All Souls' Day", key: "allSoulsDay", type: "special-non-working" },
	{ date: "2026-12-08", name: "Feast of the Immaculate Conception of Mary", key: "immaculateConception", type: "special-non-working" },
	{ date: "2026-12-24", name: "Christmas Eve", key: "christmasEve", type: "special-non-working" },
	{ date: "2026-12-31", name: "Last Day of the Year", key: "lastDayOfYear", type: "special-non-working" },

	// --- Special (Working) Day (Proclamation No. 1006, Sec. 1.C) ---
	{ date: "2026-02-25", name: "EDSA People Power Revolution Anniversary", key: "edsaAnniversary", type: "special-working" },
];

/** Holidays sorted ascending by date. */
export function getHolidays(): Holiday[] {
	return [...PH_HOLIDAYS_2026].sort((a, b) => a.date.localeCompare(b.date));
}

/** Lookup a holiday by ISO date, or undefined if it is an ordinary day. */
export function getHolidayByDate(isoDate: string): Holiday | undefined {
	return PH_HOLIDAYS_2026.find((h) => h.date === isoDate);
}

/**
 * Map a holiday onto its DOLE pay treatment. Special (working) days carry no
 * premium, so they are treated as an ordinary day for pay purposes.
 */
export function payCategoryForHoliday(holiday: Holiday): PayCategory {
	switch (holiday.type) {
		case "regular":
			return "regular-holiday";
		case "special-non-working":
			return "special-non-working";
		case "special-working":
			return "ordinary";
	}
}
