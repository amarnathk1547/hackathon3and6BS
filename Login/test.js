const { expect, test } = require('@playwright/test');

let page;
const baseUrl = 'https://medistack.vercel.app/';

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();

  await page.goto(baseUrl);

  await page.waitForTimeout(3000);

  await expect(page).toHaveTitle('Healthcare Appointment Booking Website');

});

test('login test', { tag: ['@regression'] }, async () => {
  // Click on Sign In button
  await page.click('#login');

  // Wait for login form (adjust selector if needed)
  await page.waitForSelector('#contact');

  // Fill email
  await page.fill('#contact', 'mail2kolla1547@gmail.com');

  // Fill password
  await page.fill('#password', 'Medistack');

  // Click login button
  await page.click('button[data-slot="button"]:has-text("Sign In")');

  // Wait for network idle
  await page.waitForLoadState('networkidle');

  // ✅ Wait for Logout button (this confirms login success)
  const logoutButton = page.getByRole('button', { name: 'Logout' });

  await logoutButton.waitFor({ state: 'visible', timeout: 10000 });

  // ✅ Assertion
  await expect(logoutButton).toBeVisible();
});
