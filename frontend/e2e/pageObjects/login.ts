import { MainPage } from './main';
import { type Page, type Locator, expect } from '@playwright/test';

export class Login extends MainPage {
  readonly heading: Locator;
  readonly description: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = this.page.getByRole('heading', {
      name: 'Welcome to Cine-Scape',
    });
    this.description = this.page.getByText(
      'You need to log in to be able to make reservations and add movies to you watchlist'
    );
    this.emailInput = this.page.getByPlaceholder('E-mail');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Log In' });
  }

  async validatePageElements() {
    await expect(this.heading).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
