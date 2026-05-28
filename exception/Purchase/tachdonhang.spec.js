const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test Purchase Mua hàng', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autopurchase');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-purchaser/);

const menu2 = page.getByRole('link', {
  name: 'Đơn mua hàng',
  exact: true
});


await expect(menu2).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/orders'),
  menu2.click()
]);
await expect(menu2).toBeVisible();

await expect(page.getByText('Đơn mua hộ (Links)', { exact: true }).first()).toBeVisible();
await page.getByRole('button', { name: 'Chọn mục' }).nth(0).click();
await page.getByRole('button', { name: 'Chọn mục' }).nth(1).click();
await page.getByRole('button', { name: 'Tạo đơn mua' }).first().click();
 await page.getByPlaceholder('0', { exact: true }).fill('2');
  await page.getByPlaceholder('25000').fill('1');
  await page.getByPlaceholder('SH123').fill(randomMVD);
  await page.getByPlaceholder('Ghi chú thêm...').fill('Test tự động');
const fileInput2 = page.locator('input[type="file"]');

await fileInput2.setInputFiles('fixtures/receipt.png');
await expect(
  page.getByText('Tải ảnh lên thành công')
).toBeVisible();

  await page.getByRole('button', { name: 'Xác nhận mua hàng' }).last().click();
  const successMsg2 = page.getByText('Tạo đơn mua thành công.');
  await expect(successMsg2).toBeVisible();
const menu = page.getByRole('link', {
  name: 'Tách đơn mua hàng',
  exact: true
});


await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/split-purchase'),
  menu.click()
]);
await expect(menu).toBeVisible();

await expect(page.getByText('Đi đến danh sách purchase', { exact: true }).first()).toBeVisible();
await page.getByText('Đi đến danh sách purchase').click({ force: true });
 await expect(page.getByText('Quản lý đơn mua hàng')).toBeVisible();
const customerOption2 = page.getByText('C02168').first();

await expect(customerOption2).toBeVisible();

await page.getByText('Tách đơn mua', { exact: true })
  .first()
  .click({ force: true });
await page.getByText('Thêm đơn mua mới').click({ force: true });
const orderSelect = page.getByRole('combobox').nth(1);

await expect(orderSelect).toBeVisible();

await orderSelect.selectOption({ index: 1 });
 await page.getByPlaceholder('VD: JPVN2026001', { exact: true }).nth(1).fill(randomMVD);
await page.getByPlaceholder('42.128', { exact: true }).nth(1).fill('1');


  await page.getByRole('button', { name: 'Xác nhận tách' }).last().click();
  const successMsg = page.getByText('Tách đơn mua thành công!');
  await expect(successMsg).toBeVisible();
});