const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test đổi mật khẩu', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autopurchase');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-purchaser/);

const menu = page
  .getByText('S00104', { exact: true })
  .first();

await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/profile'),
  menu.click()
]);

await expect(page).toHaveURL(/staff-purchaser\/profile/);

await expect(page.getByText('Thông tin liên hệ').first()).toBeVisible();
await page.getByRole('button', { name: 'Đổi mật khẩu' }).first().click();
await page.getByPlaceholder('Mật khẩu cũ').fill('123456');
await page.getByPlaceholder('Mật khẩu mới', { exact: true }).fill('1234567');
await page.getByPlaceholder('Xác nhận mật khẩu mới', { exact: true }).fill('1234567');
await page.getByRole('button', { name: 'Xác nhận' }).first().click();
await expect(page.getByText('Đổi mật khẩu thành công.')).toBeVisible();
await page.getByRole('button', { name: 'Đổi mật khẩu' }).first().click();
await page.getByPlaceholder('Mật khẩu cũ').fill('1234567');
await page.getByPlaceholder('Mật khẩu mới', { exact: true }).fill('123456');
await page.getByPlaceholder('Xác nhận mật khẩu mới', { exact: true }).fill('123456');
await page.getByRole('button', { name: 'Xác nhận' }).first().click();
  const successMsg = page.getByText('Đổi mật khẩu thành công.');
  await expect(successMsg).toBeVisible();
});