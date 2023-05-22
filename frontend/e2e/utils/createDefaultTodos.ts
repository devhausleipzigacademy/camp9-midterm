import { type Page } from '@playwright/test';
import { TODO_ITEMS } from '../specs/demos/DemoTodoApp.spec';

export async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}
