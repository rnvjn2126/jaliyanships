import { test, expect } from '@playwright/test';
import axe from 'axe-core';
import { mkdirSync } from 'node:fs';

const pages = [
  ['index.html', 'Jaliyan Ships'],
  ['about.html', 'About Us'],
  ['management.html', 'Management'],
  ['certifications.html', 'Certifications'],
  ['gallery.html', 'Gallery'],
  ['contact.html', 'Contact'],
  ['privacy.html', 'Privacy Policy'],
  ['terms.html', 'Terms of Use']
];

test.describe('public pages', () => {
  for (const [path, title] of pages) {
    test(`${path} loads without page errors`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`/${path}`);
      await expect(page).toHaveTitle(new RegExp(title));
      await expect(page.locator('main')).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test('has no horizontal overflow across required viewport widths', async ({ page }) => {
    for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/index.html');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    }
  });

  test('mobile navigation is keyboard-operable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/index.html');
    const toggle = page.locator('.menu-toggle');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.nav')).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await expect(page.locator('.nav')).not.toHaveClass(/open/);
  });

  test('has no automatically detectable serious accessibility violations', async ({ page }) => {
    await page.goto('/contact.html');
    await page.addScriptTag({ content: axe.source });
    const result = await page.evaluate(async () => await axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }
    }));
    const serious = result.violations.filter(issue => ['critical', 'serious'].includes(issue.impact));
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });

  test('uses no application browser storage or cookies locally', async ({ context, page }) => {
    await page.goto('/index.html');
    expect((await context.cookies()).length).toBe(0);
    expect(await page.evaluate(async () => ({
      local: localStorage.length,
      session: sessionStorage.length,
      indexedDb: typeof indexedDB.databases === 'function'
        ? (await indexedDB.databases()).length
        : 0
    }))).toEqual({ local: 0, session: 0, indexedDb: 0 });
  });

  test('gallery video has native controls and local media', async ({ page }) => {
    await page.goto('/gallery.html');
    const video = page.locator('video');
    await expect(video).toHaveAttribute('controls', '');
    await expect(video).toHaveAttribute('preload', 'none');
    await expect(video).toHaveAttribute('poster', /gallery-poster/);
    await expect(video.locator('source')).toHaveAttribute('src', /jaliyan-video/);
  });

  test('captures major-page desktop and mobile screenshots', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'chromium') test.skip();
    mkdirSync('audit/screenshots', { recursive: true });
    for (const [path] of pages) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/${path}`);
      await page.screenshot({ path: `audit/screenshots/${path.replace('.html', '')}-desktop.png`, fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/${path}`);
      await page.screenshot({ path: `audit/screenshots/${path.replace('.html', '')}-mobile.png`, fullPage: true });
    }
  });
});

test.describe('enquiry form with mocked provider', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact.html');
    await page.locator('[name="name"]').fill('Test Person');
    await page.locator('[name="email"]').fill('test@example.com');
    await page.locator('[name="message"]').fill('A test enquiry');
  });

  test('reports provider acceptance without navigation', async ({ page }) => {
    await page.route('https://formsubmit.co/**', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ success: true }) }));
    await page.locator('#enquirySubmit').click();
    await expect(page.locator('.form-feedback')).toContainText('accepted');
    await expect(page).toHaveURL(/contact\.html$/);
  });

  test('retains form entries after a provider failure', async ({ page }) => {
    await page.route('https://formsubmit.co/**', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ success: false }) }));
    await page.locator('#enquirySubmit').click();
    await expect(page.locator('.form-feedback')).toContainText('could not be confirmed');
    await expect(page.locator('[name="message"]')).toHaveValue('A test enquiry');
  });

  test('retains form entries when offline', async ({ page, context }) => {
    await context.setOffline(true);
    await page.locator('#enquirySubmit').click();
    await expect(page.locator('.form-feedback')).toContainText('could not confirm submission');
    await expect(page.locator('[name="name"]')).toHaveValue('Test Person');
  });
});
