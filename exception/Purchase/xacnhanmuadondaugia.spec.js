const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test thêm mã vận đơn', async ({ page }) => {
  test.setTimeout(90000);



  
  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autopurchase');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-purchaser/);
const menu = page.getByText('Chờ mua đấu giá', { exact: true });
await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/auction-pending-shipment'),
  menu.click()
]);
await expect(menu).toBeVisible();

await expect(page.getByText('KH26040013').first()).toBeVisible();
await page.getByRole('button', { name: 'Xác nhận mua' }).first().click();

  await page.getByRole('button', { name: 'Xác nhận mua' }).last().click();

  //const successMsg = page.getByText('Đã cập nhật mã vận đơn.');
 // await expect(successMsg).toBeVisible();
});