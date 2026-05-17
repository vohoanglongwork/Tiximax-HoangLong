const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
test('Test nhập kho nội địa', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('warehousedomestic');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-warehouse-domestic\/inventory/);

const menu = page.getByRole('link', { name: 'Tồn kho' });

await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-warehouse-domestic/inventory'),
  menu.click()
]);


await expect(page.getByText('Dim').first()).toBeVisible();









await page.getByRole('link', { name: 'In mã vận đơn' }).click();

await page.waitForURL('**/staff-warehouse-domestic/vnpost-invoicing');




  await page.locator('input[type="checkbox"]').nth(1).check();
 
  await page.getByRole('button', { name: 'Xuất Excel (1)' }).click();


const successMessage = page.getByText('Xuất Excel 1 kiện thành công.', { exact: true });

await expect(successMessage).toBeVisible();

});