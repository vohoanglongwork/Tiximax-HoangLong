const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
test('Test full luong sale01', async ({ page }) => {
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









await page.getByRole('link', { name: 'Đang vận chuyển' }).click();

await page.waitForURL('**/staff-warehouse-domestic/flying');




  await page.locator('input[type="checkbox"]').nth(1).check();
  const firstMVD = await page
   .getByText(/TESTMVD_/)
    .first() 
     .innerText();
  await page.getByRole('button', { name: 'Nhập kho (1)' }).click();
await expect(page.getByText('Ghi chú (tuỳ chọn)')).toBeVisible();

await page.getByRole('button', { name: 'Xác nhận nhập kho' }).click();

await expect(page.getByText('Nhập kho 1 kiện thành công.')).toBeVisible();


await Promise.all([
  page.waitForURL('**/staff-warehouse-domestic/scan-import'),
  page.getByRole('link', { name: 'Nhập kho (scan)' }).click(),
]);
await page.waitForLoadState('networkidle');
await expect(page.getByText('Quét mã vận đơn').first()).toBeVisible();
await page.waitForURL('**/staff-warehouse-domestic/scan-import');



await page.getByPlaceholder('Nhập hoặc quét mã...').fill(firstMVD);
await page.getByRole('button', { name: 'TRA CỨU' }).click();
await page.getByRole('button', { name: 'Nhập kho' }).click();
const successMessage = page.getByText('Nhập kho thành công!', { exact: true });

await expect(successMessage).toBeVisible();

});