import { Login } from './pageObjects/login';
import { test as base } from '@playwright/test';

interface CineAppFixtures {
  loginPage: Login;
}

export const test = base.extend<CineAppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new Login(page));
  },
});
