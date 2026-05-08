const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test full luong sale01', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autopurchase');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-purchaser/);
await page.getByText('Quản lý', { exact: true }).first().click({ force: true });
const menu = page.getByRole('link', { name: 'Quản lý mua hàng' });

await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/inventorystock'),
  menu.click()
]);
await expect(menu).toBeVisible();

await expect(page.getByText('AutoCustomer').first()).toBeVisible();
await page.getByRole('button', { name: 'Sửa' }).first().click();
 await page.getByPlaceholder('Nhập ghi chú...').fill('Test ghi chú thành công');
await page.getByRole('button', { name: 'Lưu thay đổi' }).click();
  


  const successMsg = page.getByText('Cập nhật đơn mua hàng thành công.');
  await expect(successMsg).toBeVisible();
});