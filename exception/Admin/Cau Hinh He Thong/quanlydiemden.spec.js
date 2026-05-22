const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test quản lý điểm đến', async ({ page }) => {
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
  page.getByRole('link', { name: 'Xác nhận đơn hàng' })).toBeVisible({ force: true });

  await page.getByRole('link', { name: 'Xác nhận đơn hàng' }).click({ force: true });
await page.waitForLoadState('networkidle');
await expect(page).toHaveURL(/manager\/quote/);
await expect(page.getByText('Đã xác nhận').first()).toBeVisible();
  
     await page.getByRole('button', { name: 'Cấu hình hệ thống', exact: true }).click();

  const employLink = page.getByRole('link', { name: 'Điểm đến' });
  await expect(employLink).toBeVisible();
  await employLink.click();


  await expect(page).toHaveURL(/.*\/manager\/transfer/);

  await expect(page.getByText('Quản Lý Điểm Đến').first()).toBeVisible();

await page.getByRole('button', { name: 'Thêm điểm đến', exact: true }).first().click();
await page.getByPlaceholder('VD: Hải Phòng, Đà Nẵng...').fill('Test Destination');

await page.getByRole('button', { name: 'Lưu' }).click();


   await expect(page.getByText('Tạo mới thành công!').first()).toBeVisible();
const row = page.locator('tr', { hasText: 'Test Destination' }).first();
const row2 = page.locator('tr', { hasText: 'Test Destination2' }).first();
await row.scrollIntoViewIfNeeded();
await expect(row).toBeVisible();
await row.getByRole('button', { name: 'Sửa', exact: true }).click();




await page.getByPlaceholder('VD: Hải Phòng, Đà Nẵng...').fill('Test Destination2');

await page.getByRole('button', { name: 'Cập nhật', exact: true }).click();
await expect(page.getByText('Cập nhật thành công!').first()).toBeVisible();
await row2.scrollIntoViewIfNeeded();
await expect(row2).toBeVisible();
await row2.getByRole('button', { name: 'Xóa', exact: true }).first().click({ timeout: 15000 });
await page.getByRole('button', { name: 'Xóa', exact: true }).last().click();
  await expect(page.getByText('Xóa thành công!')).toBeVisible({ timeout: 15000 });
});