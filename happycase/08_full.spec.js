const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const randomTRACKING = `TESTTRACKING_${Math.random().toString(36).substring(7)}`;
test('Test xuất kho', async ({ page }) => {
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


await expect(
  page.getByText('autosale_3bgvqg', { exact: true }).first()
).toBeVisible();

 await page.locator('input[type="checkbox"]').nth(1).check();
await page.getByText('Xuất và khóa').click();

await page.getByRole('link', { name: 'Xuất kho',exact: true }).click();

await page.waitForURL('**/staff-warehouse-domestic/export-list');


await page.getByRole('button', { name: 'Xuất kho',exact: true }).first().click();

await page.getByPlaceholder('Nhập mã vận chuyển...').fill(randomTRACKING);

await page.getByRole('button', { name: 'Xác nhận' }).last().click();




await expect(page.getByText('Xuất kho thành công')).toBeVisible();
});