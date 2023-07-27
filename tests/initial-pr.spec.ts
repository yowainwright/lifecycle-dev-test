import { test, expect } from '@playwright/test';

const pullRequest = process.env.PR_NUMBER || undefined
const initialURL = 'https://github.com/yowainwright/lifecycle-dev-test/'

test('basic repository test', async ({ page }) => {
  await page.goto(initialURL);
  const readmeTitle = page.locator('.markdown-body h1').first();
  await expect(readmeTitle).toContainText('Lifecycle Dev Test');
});

test('basic PR test', async ({ page }) => {
  const url = pullRequest ? `${initialURL}/pull/${pullRequest}` : `${initialURL}/pulls`
  await page.goto(url);
  await expect(page).toHaveURL(url);
  const firstHeader = page.getByText('Lifecycle Dev Test');
  await expect(firstHeader).toBeDefined();
})