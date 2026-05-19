const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test Accept Voucher', async ({ page }) => {
  test.setTimeout(90000);



  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('xuanloc');
  await page.getByPlaceholder('••••••••').fill('123456');

await Promise.all([
  page.waitForURL('**/manager', { timeout: 15000 }),
  page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click()
]);
await expect(page).toHaveURL(/manager\/dashboard/);
await page.waitForLoadState('networkidle');


// đợi sidebar load
await expect(
  page.getByRole('link', { name: 'Yêu Cầu Hoàn Tiền' })).toBeVisible({ force: true });

  await page.getByRole('link', { name: 'Yêu Cầu Hoàn Tiền' }).click({ force: true });
await page.waitForLoadState('networkidle');
await expect(page).toHaveURL(/finance\/expense-requests/);
await expect(page.getByText('Hoàn tiền KH').first()).toBeVisible();
  
 await page.getByText('Chi tiết').first().click({ force: true });

  const employLink = page.getByRole('button', { name: 'Duyệt' });
  await expect(employLink).toBeVisible();
  await employLink.click();
const fileInput = page.locator('input[type="file"]');

await page
  .locator('input[type="file"]')
  .first()
  .setInputFiles('fixtures/receipt.png');

  const employLink2 = page.getByRole('button', { name: 'Xác nhận duyệt' });
  await expect(employLink2).toBeVisible();
  await employLink2.click();
 
  await expect(page.getByText('Đã duyệt yêu cầu.')).toBeVisible({ timeout: 15000 });
});