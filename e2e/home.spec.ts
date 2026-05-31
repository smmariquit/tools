import { expect, test } from "@playwright/test";

test("root redirects to locale and tools render", async ({ page }) => {
	// Go to root, should redirect to /en
	await page.goto("http://localhost:3000/");
	await expect(page).toHaveURL(/.*\/en.*/);

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/PH Tools/);

	// Expect the page to have the specific heading.
	await expect(
		page.getByRole("heading", { name: "Free Online Tools for Filipinos" }),
	).toBeVisible();

	// Click the Salary Calculator link.
	await page.getByRole("link", { name: "Salary Net Pay Calculator" }).click();

	// Expects page to have a heading with the name of the calculator.
	await expect(
		page.getByRole("heading", { name: "Salary Net Pay Calculator" }),
	).toBeVisible();
});

test("skip to content button works", async ({ page }) => {
	await page.goto("http://localhost:3000/en");
	const skipLink = page.locator('a[href="#main-content"]');
	await expect(skipLink).toBeAttached();
	// Press tab to make it visible
	await page.keyboard.press("Tab");
	await expect(skipLink).toBeVisible();
});
