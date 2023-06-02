import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.pause();
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  // this is a locator
  const getStartedLink = page.getByRole('link', { name: 'GET STARTED' });

  await expect(getStartedLink).toBeVisible();
  await getStartedLink.click();
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
