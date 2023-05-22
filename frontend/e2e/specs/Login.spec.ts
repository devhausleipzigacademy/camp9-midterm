import { test } from '../fixtures';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('that the correct items are displayed', async ({ loginPage }) => {
    await loginPage.validatePageElements();
  });

  test('happy path login', async ({}) => {});

  test('that clicking on login if no fields are filled', async ({}) => {});

  test('unhappy path login', async ({}) => {});
});
