import { type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
