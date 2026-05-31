import { describe, expect, it } from "vitest";
import { calculateLatinHonors } from "../src/core/calculators/latinHonors";

describe("Latin Honors Logic", () => {
	it("should return Summa for UP GWA of 1.15", () => {
		const res = calculateLatinHonors("up", 1.15);
		expect(res.honor).toBe("Summa Cum Laude");
		expect(res.nextHonor).toBeNull();
	});

	it("should return Magna for UP GWA of 1.40", () => {
		const res = calculateLatinHonors("up", 1.40);
		expect(res.honor).toBe("Magna Cum Laude");
	});

	it("should return Cum Laude for UP GWA of 1.70", () => {
		const res = calculateLatinHonors("up", 1.70);
		expect(res.honor).toBe("Cum Laude");
	});

	it("should return No Honor for UP GWA of 2.0 with gap to Cum Laude", () => {
		const res = calculateLatinHonors("up", 2.0);
		expect(res.honor).toBe("No Honor");
		expect(res.nextHonor).toBe("Cum Laude");
		expect(res.gap).toBe(0.25);
	});

	it("should handle Ateneo 4.0 scale (higher is better)", () => {
		const res = calculateLatinHonors("ateneo", 3.9);
		expect(res.honor).toBe("Summa Cum Laude");
	});

	it("should handle Ateneo Magna correctly", () => {
		const res = calculateLatinHonors("ateneo", 3.55);
		expect(res.honor).toBe("Magna Cum Laude");
	});
});
