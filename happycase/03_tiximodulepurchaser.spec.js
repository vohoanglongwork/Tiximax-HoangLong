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

const menu = page.getByRole('link', { name: 'Đơn mua hàng' });

await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/orders'),
  menu.click()
]);
await expect(menu).toBeVisible();

await expect(page.getByText('Chọn tất cả').first()).toBeVisible();
await page.getByRole('button', { name: 'Chọn mục' }).first().click();
await page.getByRole('button', { name: 'Tạo đơn mua1' }).click();
 await page.getByPlaceholder('0', { exact: true }).fill('2');
  await page.getByPlaceholder('25000').fill('1');
  await page.getByPlaceholder('SH123').fill(randomMVD);
  await page.getByPlaceholder('Ghi chú thêm...').fill('Test tự động');
  await expect(page.locator('input[type="file"]')).toHaveCount(1);

await page.locator('input[type="file"]').setInputFiles('tests/fixtures/receipt.png');
 await expect(page.getByText('Tải ảnh lên thành công')).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: 'Xác nhận mua hàng' }).last().click();
  const successMsg = page.getByText('Tạo đơn mua thành công.');
  await expect(successMsg).toBeVisible();
});