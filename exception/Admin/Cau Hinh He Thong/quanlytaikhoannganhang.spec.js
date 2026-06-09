const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test quản lý tài khoản ngân hàng', async ({ page }) => {
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

  const employLink = page.getByRole('link', { name: 'Tài khoản ngân hàng' });
  await expect(employLink).toBeVisible();
  await employLink.click({ force: true });


  await expect(page).toHaveURL(/.*\/cost\/paylater/);

  await expect(page.getByText('Sửa').first()).toBeVisible();

await page.getByRole('button', { name: 'Thêm mới', exact: true }).first().click();
await page.getByPlaceholder('VD: Vietcombank, Techcombank...').fill('TestBank');
await page.getByPlaceholder('VD: 0123456789', { exact: true }).fill('1234563439');
await page.getByPlaceholder('VD: NGUYEN VAN A').fill('test account');
await page.getByText('Nhận tiền hàng').click({ force: true });
await page.getByText('Nhận vận chuyển').click({ force: true });

await page.getByRole('button', { name: 'Tạo mới' }).click({ force: true });

await expect(page.getByText('TestBank').first()).toBeVisible();


const row = page.locator('tr', { hasText: 'TestBank' }).first();
const row2 = page.locator('tr', { hasText: 'TestBank2' }).first();
await row.getByRole('button', { name: 'Sửa', exact: true }).click();
await page.getByPlaceholder('VD: Vietcombank, Techcombank...').fill('TestBank2');
await page.getByRole('button', { name: 'Cập nhật', exact: true }).click();
await row2.getByRole('button', { name: 'Xóa', exact: true }).first().click({ timeout: 15000 });
await page.getByRole('button', { name: 'Xóa', exact: true }).last().click();
  await expect(page.getByText('Xóa tài khoản thành công')).toBeVisible({ timeout: 15000 });
});