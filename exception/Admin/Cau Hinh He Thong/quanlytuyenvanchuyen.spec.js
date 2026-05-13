const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test quản lý khuyến mãi', async ({ page }) => {
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

  const employLink = page.getByRole('link', { name: 'Tuyến vận chuyển' });
  await expect(employLink).toBeVisible();
  await employLink.click();


  await expect(page).toHaveURL(/.*\/manager\/routes/);

  await expect(page.getByText('HCM').first()).toBeVisible();

await page.getByRole('button', { name: 'Thêm tuyến', exact: true }).first().click();
await page.getByPlaceholder('VD: IND, CNY...').fill('Test');
await page.getByPlaceholder('VD: 7-10 ngày', { exact: true }).fill('10-15 ngày');
await page.getByPlaceholder('0').nth(0).fill('1');
await page.getByPlaceholder('0').nth(1).fill('1');
await page.getByPlaceholder('0').nth(2).fill('1');
await page.getByPlaceholder('0').nth(3).fill('1');
await page.getByPlaceholder('Thông tin thêm...').fill('TEST');
await page.getByText('Tự động cập nhật tỷ giá').click({ force: true });


await page.getByRole('button', { name: 'Lưu tuyến' }).click({ force: true });

await expect(page.getByText('Tạo mới thành công!').first()).toBeVisible();


const row = page.locator('tr', { hasText: 'Test' }).first();
const row2 = page.locator('tr', { hasText: 'Test2' }).first();
await row.getByRole('button', { name: 'Sửa', exact: true }).click();
await page.getByPlaceholder('VD: IND, CNY...').fill('Test2');
await page.getByText('Thêm nấc cân').click({ force: true });
const inputs = page.locator('input[type="number"]');

await inputs.nth(0).fill('1');
await inputs.nth(1).fill('1');
await inputs.nth(2).fill('1');
await page.getByRole('button', { name: 'Cập nhật', exact: true }).click();
await row2.getByRole('button', { name: 'Xóa', exact: true }).first().click({ timeout: 15000 });
await page.getByRole('button', { name: 'Xóa', exact: true }).last().click();
  await expect(page.getByText('Xóa thành công!')).toBeVisible({ timeout: 15000 });
});