import { test, expect } from '@playwright/test';

test('has title and tools rendered', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/PH Tools/);

  // Expect the page to have the specific heading.
  await expect(page.getByRole('heading', { name: 'Free Online Tools for Filipinos' })).toBeVisible();

  // Click the Salary Calculator link.
  await page.getByRole('link', { name: 'Salary Net Pay Calculator' }).click();

  // Expects page to have a heading with the name of the calculator.
  await expect(page.getByRole('heading', { name: 'Salary Net Pay Calculator' })).toBeVisible();
});
