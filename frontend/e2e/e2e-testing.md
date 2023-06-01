---
title: "End-to-End Testing: An Overview & Introduction to Playwright"
author: "Vera Scheunert"
date: "2023-05-22"
---

Introduction to

## <span style="color:#F79A5E">End-to-End (E2E) Testing</span>

--

End-to-End (E2E) Testing is a type of software testing where the <span style="color:#2D8B91">**complete flow of an application** </span>is tested. This is done to validate the system's coordination with other systems.

---

### <span style="color:#F79A5E">Why e2e testing?</span>

1. To ensure all the integrated pieces of an application function as expected together
2. To simulate a real user scenario and validate the system behavior

---

## Common Tools

1. Selenium
2. Puppeteer
3. Cypress
4. <span style="color:#2D8B91">Playwright (our focus)</span>

---

## Introduction to Playwright

Node.js library \* automate Chromium, WebKit, and Firefox browsers \* cross-browser web automation

---

## Advantages

1. supports all modern JavaScript features
2. headless (without a UI) and headed (with a UI) modes
3. emulate mobile devices, geolocation, intercept network activity

---

## Playwright features

--

1. Browser automation

2. Headless and Headed mode

3. Network activity interception

4. Multi-page, multi-context, and multi-browser support

5. Mobile emulation

6. Timeout-free automation

7. Authentication

---

## Installing & Configuring playwright

```bash
npm npm i @playwright/test --save-dev
```

```
"e2e": "pnpm playwright test"
```

---

## Basic example of playwright

```javascript
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.\*intro/);
});
```

---

### Most common features

#### <span style="color:#F79A5E">Just a very small part of the features</span>

--

Frequently occuring <span style="color:#F79A5E">selectors</span>:

- page.getByRole()
- page.getByText()
- page.getByLabel()
- page.getByPlaceholder()
- page.getByAltText()
- page.getByTitle()
- page.getByTestId()

--

Frequently occuring <span style="color:#2D8B91">element handles</span>:

- element.fill()
- element.focus()
- element.getAttribute()
- element.click()
- element.isChecked() / element.isDisabled()

--

Frequently occuring <span style="color:#F79A5E">page/locator assertions</span>:

- expect(locator).toBeVisible()
- expect(locator).toHaveText()
- expect(locator).toHaveClass()
- expect(locator).toBeHidden()

- expect(page).toHaveURL()
- expect(page).toHaveTitle()
