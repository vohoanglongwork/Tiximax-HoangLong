const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test nhập kho nước ngoài', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('warehouseforeign');
  await page.getByPlaceholder('••••••••').fill('123456');

  await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click({ timeout: 10000 });

 
  await expect(page.getByText('Hàng chờ nhập kho nước ngoài').first()).toBeVisible();


  await Promise.all([
    page.waitForURL('**/staff-warehouse-foreign/dashboard'),
    page.getByRole('link', { name: 'Chờ bay' }).click({ force: true })
  ]);




  await page.locator('input[type="checkbox"]').nth(1).check();
 
  await page.getByRole('button', { name: 'Xuất Excel (1)' }).click();


const successMessage = page.getByText('Đã xuất 1 đóng gói ra Excel.', { exact: true });

await expect(successMessage).toBeVisible();

  });