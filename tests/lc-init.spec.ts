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
  // await expect(lcStatusComment).toContainText('lifecycle-codefresh-test: update-lc-test')
  // await expect(lcStatusComment).toContainText(' lifecycle-dev-test: update-lc-test')
})
