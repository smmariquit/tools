import { describe, expect, it } from "vitest";
import {
	getHolidayByDate,
	getHolidays,
	HOLIDAYS_YEAR,
	payCategoryForHoliday,
	PH_HOLIDAYS_2026,
} from "../src/data/holidays";

describe("PH Holidays 2026 (Proclamation No. 1006)", () => {
	it("targets year 2026 and dates are all within 2026", () => {
		expect(HOLIDAYS_YEAR).toBe(2026);
		for (const h of PH_HOLIDAYS_2026) {
			expect(h.date).toMatch(/^2026-\d{2}-\d{2}$/);
		}
	});

	it("has the verified count of each holiday type", () => {
		const fixedRegular = PH_HOLIDAYS_2026.filter(
			(h) => h.type === "regular" && !h.approximate,
		);
		const movableRegular = PH_HOLIDAYS_2026.filter(
			(h) => h.type === "regular" && h.approximate,
		);
		const specialNonWorking = PH_HOLIDAYS_2026.filter(
			(h) => h.type === "special-non-working",
		);
		const specialWorking = PH_HOLIDAYS_2026.filter(
			(h) => h.type === "special-working",
		);

		expect(fixedRegular).toHaveLength(10);
		expect(movableRegular).toHaveLength(2); // Eid'l Fitr + Eid'l Adha
		expect(specialNonWorking).toHaveLength(8);
		expect(specialWorking).toHaveLength(1); // EDSA anniversary
	});

	it("flags only the movable Islamic holidays as approximate", () => {
		const approx = PH_HOLIDAYS_2026.filter((h) => h.approximate).map(
			(h) => h.key,
		);
		expect(approx.sort()).toEqual(["eidlAdha", "eidlFitr"]);
	});

	it("has no duplicate dates and unique keys", () => {
		const dates = PH_HOLIDAYS_2026.map((h) => h.date);
		const keys = PH_HOLIDAYS_2026.map((h) => h.key);
		expect(new Set(dates).size).toBe(dates.length);
		expect(new Set(keys).size).toBe(keys.length);
	});

	it("getHolidays returns the list sorted ascending by date", () => {
		const sorted = getHolidays();
		const dates = sorted.map((h) => h.date);
		expect(dates).toEqual([...dates].sort());
	});

	it("getHolidayByDate finds known dates and returns undefined otherwise", () => {
		expect(getHolidayByDate("2026-12-25")?.key).toBe("christmasDay");
		expect(getHolidayByDate("2026-06-12")?.key).toBe("independenceDay");
		expect(getHolidayByDate("2026-07-04")).toBeUndefined();
	});

	it("maps holiday types to the correct DOLE pay category", () => {
		const christmas = getHolidayByDate("2026-12-25");
		const ninoy = getHolidayByDate("2026-08-21");
		const edsa = getHolidayByDate("2026-02-25");
		expect(christmas && payCategoryForHoliday(christmas)).toBe(
			"regular-holiday",
		);
		expect(ninoy && payCategoryForHoliday(ninoy)).toBe("special-non-working");
		// EDSA is a special WORKING day → no premium → ordinary pay.
		expect(edsa && payCategoryForHoliday(edsa)).toBe("ordinary");
	});
});
