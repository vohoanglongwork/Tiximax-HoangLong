const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test quản lý website', async ({ page }) => {
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
  
     await page.getByRole('button', { name: 'Cấu hình hệ thống', exact: true }).click();

  const employLink = page.getByRole('link', { name: 'Quản lý website' });
  await expect(employLink).toBeVisible();
  await employLink.click();


  await expect(page).toHaveURL(/.*\/manager\/website/);

  await expect(page.getByText('Shopee').first()).toBeVisible();

await page.getByRole('button', { name: 'Thêm website', exact: true }).first().click();
await page.getByPlaceholder('VD: 1688, Taobao...').fill('Test Website');
await page.getByRole('button', { name: 'Lưu', exact: true }).click();
const row = page.locator('tr', { hasText: 'Test Website' }).first();
const row2 = page.locator('tr', { hasText: 'Test Website2' }).first();
await row.getByRole('button', { name: 'Sửa', exact: true }).click();
await page.getByPlaceholder('VD: 1688, Taobao...').fill('Test Website2');
await page.getByRole('button', { name: 'Cập nhật', exact: true }).click();
await row2.getByRole('button', { name: 'Xóa', exact: true }).first().click({ timeout: 15000 });
await page.getByRole('button', { name: 'Xóa', exact: true }).last().click();
  await expect(page.getByText('Xóa thành công!')).toBeVisible({ timeout: 15000 });
});