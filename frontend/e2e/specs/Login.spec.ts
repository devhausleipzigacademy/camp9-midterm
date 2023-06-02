import { test } from '../fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('that the correct items are displayed', async ({ loginPage }) => {
    await loginPage.validatePageElements();
  });

  test('that clicking on login if no fields are filled, leads to an error', async ({
    loginPage,
  }) => {
    await loginPage.emailInput.fill('');
    await loginPage.passwordInput.fill('');
    await loginPage.loginButton.click();

    await loginPage.validateErrorMessages();
  });
});
