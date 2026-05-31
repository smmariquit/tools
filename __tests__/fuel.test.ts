import { describe, expect, it } from "vitest";

describe("Fuel Cost Logic", () => {
	it("should correctly calculate total fuel cost", () => {
		const distance = 250;
		const efficiency = 10; // 10 km/L
		const fuelPrice = 60; // 60 PHP/L

		const litersNeeded = distance / efficiency; // 25 Liters
		const totalCost = litersNeeded * fuelPrice; // 25 * 60 = 1500

		expect(litersNeeded).toBe(25);
		expect(totalCost).toBe(1500);
	});

	it("should correctly divide cost among passengers", () => {
		const totalCost = 1500;
		const passengers = 3;
		const costPerPerson = totalCost / passengers;

		expect(costPerPerson).toBe(500);
	});
});
