const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test Admin chuyển trạng thái TT', async ({ page }) => {
  test.setTimeout(90000);

  const randomUsername = `autosale_${Math.random().toString(36).substring(7)}`;


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
  const statusSelect = page.getByRole('combobox').first();
  await expect(statusSelect).toBeVisible();
await statusSelect.click();

const dropdown = page.locator('.ant-select-dropdown');
await expect(dropdown).toBeVisible();

const option = dropdown.getByText('Chờ thanh toán', { exact: true });
await expect(option).toBeVisible();
await option.click();

  await page.getByPlaceholder('Mã khách hàng...').fill('KH26040013');

  await page.getByRole('button', { name: 'Tìm kiếm' }).click();


  await expect(
    page.getByRole('button', { name: 'Xác nhận', exact: true }).first()
  ).toBeVisible({ timeout: 15000 });


  await page.getByRole('button', { name: 'Xác nhận', exact: true }).first().click({ timeout: 5000 });
  await page.getByRole('button', { name: 'Xác nhận', exact: true }).last().click();








 
  await expect(page.getByText('Xác nhận thanh toán thành công cho đơn')).toBeVisible({ timeout: 15000 });
});