import { test, expect } from '@playwright/test';

const pullRequest = process.env.PR_NUMBER || undefined
const initialURL = 'https://github.com/yowainwright/lifecycle-dev-test/'

test('basic PR test', async ({ page }) => {
  const url = `${initialURL}/pull/${pullRequest}`
  await page.goto(url);
  await expect(page).toHaveURL(url);
  const firstHeader = page.getByText('Lifecycle Dev Test PR');
  await expect(firstHeader).toBeDefined();
})

test('LC Status Comment', async ({ page }) => {
  const url = `${initialURL}/pull/${pullRequest}`
  await page.goto(url);
  const lcStatusComment = page.locator('.comment-body.markdown-body', { has: page.getByText('You can use this comment to build, update, and track, a Lifecycle environment for this pull request.') })
  await expect(lcStatusComment).toBeDefined();
  const lcCFListItem = page.getByText('lifecycle-codefresh-test: init-lc-init-tests')
  await expect(lcCFListItem).toBeDefined();
  const lcDevListItem = page.getByText('lifecycle-dev-test: init-lc-init-tests')
  await expect(lcDevListItem).toBeDefined();
})

test('LC Pending Comment', async ({ page }) => {
  const url = `${initialURL}/pull/${pullRequest}`
  await page.goto(url);
  const lcPendingComment = page.locator('.comment-body.markdown-body', { has: page.getByText('Lifecycle Environment either has been torned down or does not exist.') })
  await expect(lcPendingComment).toBeDefined();
})

test('LC Console Comment', async ({ page }) => {
  const url = `${initialURL}/pull/${pullRequest}`
  await page.goto(url);
  const lcConsoleComment = page.locator('.comment-body.markdown-body', { has: page.getByText('Console Output') })
  await expect(lcConsoleComment).toBeDefined();
});
