const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test chấp nhận yêu cầu hủy đơn', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autopurchase');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-purchaser/);

const menu = page.getByRole('link', { name: 'Yêu cầu hủy đơn' });

await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/cancel-requests'),
  menu.click()
]);
await expect(menu).toBeVisible();

await page.getByRole('button', { name: 'Từ chối yêu cầu' }).first().click();
await page.getByPlaceholder('Nhập lý do từ chối...').fill('test');
await page.getByRole('button', { 
  name: 'Từ chối', 
  exact: true 
}).first().click();



  const successMsg = page.getByText('Đã từ chối yêu cầu hủy đơn');
  await expect(successMsg).toBeVisible();
});