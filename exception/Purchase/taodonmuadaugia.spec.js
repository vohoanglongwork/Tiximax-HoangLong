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
const menu = page.getByRole('link', { name: 'Đơn đấu giá', exact: true  });
await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/auction'),
  menu.click()
]);
await expect(menu).toBeVisible();

await expect(page.getByText('Hiển thị').first()).toBeVisible();
await page.getByRole('button', { name: 'Chọn mục' }).first().click();
await page.getByRole('button', { name: 'Tạo đơn mua1' }).click();
 await page.getByPlaceholder('0').nth(0).fill('2');
  await page.getByPlaceholder('0').nth(1).fill('2');
   await page.getByPlaceholder('0').nth(2).fill('2');
  await page.getByPlaceholder('SH123').fill(randomMVD);

  await page.getByPlaceholder('Ghi chú thêm...').fill('Test tự động');
const fileInput = page.locator('input[type="file"]');

await fileInput.setInputFiles('fixtures/receipt.png');
 await expect(page.getByText('Tải ảnh lên thành công')).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: 'Xác nhận mua hàng' }).last().click();

await page.getByText('Quản lý', { exact: true }).click({ force: true });
const menu2 = page.getByRole('link', { name: 'Quản lý mua hàng', exact: true  });
await expect(menu2).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/inventorystock'),
  menu2.click()
]);
await expect(menu2).toBeVisible();

await page.getByRole('button', { name: 'Confirm Auction' }).first().click({ force: true });
await page.getByRole('button', { name: 'Confirm Auction' }).last().click({ force: true });
  //const successMsg = page.getByText('Đã cập nhật mã vận đơn.');
 // await expect(successMsg).toBeVisible();
});