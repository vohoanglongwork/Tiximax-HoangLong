const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test Purchase Mua hàng', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autopurchase');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-purchaser/);
const menu = page.getByRole('link', { 
  name: 'Đơn đấu giá',
  exact: true
});

await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/auction'),
  menu.click()
]);
await expect(menu).toBeVisible();

await expect(page.getByText('AutoCustomer', { exact: true }).first()).toBeVisible();
await page.getByRole('button', { name: 'Hủy' }).first().click();

  await page.getByRole('button', { name: 'Xác nhận' }).last().click();
  const successMsg = page.getByText('Đã hủy link đơn hàng.');
  await expect(successMsg).toBeVisible();
});