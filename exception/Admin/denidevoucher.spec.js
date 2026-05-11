const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test Deny Voucher', async ({ page }) => {
  test.setTimeout(90000);



  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autoManager');
  await page.getByPlaceholder('••••••••').fill('123456');

await Promise.all([
  page.waitForURL('**/manager', { timeout: 15000 }),
  page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click()
]);
await expect(page).toHaveURL(/manager\/dashboard/);
await page.waitForLoadState('networkidle');


// đợi sidebar load
await expect(
  page.getByRole('link', { name: 'Xác nhận đơn hàng' })).toBeVisible({ force: true });

  await page.getByRole('link', { name: 'Xác nhận đơn hàng' }).click({ force: true });
await page.waitForLoadState('networkidle');
await expect(page).toHaveURL(/manager\/quote/);
await expect(page.getByText('Đã xác nhận').first()).toBeVisible();
  
     await page.getByRole('button', { name: 'Quản lý tài chính', exact: true }).click();

  const employLink = page.getByRole('link', { name: 'Quản lý voucher' });
  await expect(employLink).toBeVisible();
  await employLink.click();


  await expect(page).toHaveURL(/.*\/finance\/voucher-requests/);

  await expect(page.getByText('AutoCustomer').first()).toBeVisible();
const rejectBtn = page.getByRole('button', { name: 'Từ chối', exact: true }).nth(1);

await rejectBtn.scrollIntoViewIfNeeded();
await rejectBtn.click();

await page.getByPlaceholder('VD: Chưa đủ điều kiện').fill('Test');

await page.getByRole('button', { name: 'Xác nhận từ chối', exact: true }).last().click();

  await expect(page.getByText('Đã từ chối yêu cầu')).toBeVisible({ timeout: 15000 });
});