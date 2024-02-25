import { test } from '@playwright/test';

test('test browser', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.pause();
});
