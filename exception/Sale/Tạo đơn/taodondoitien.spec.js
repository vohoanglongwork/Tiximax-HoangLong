const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');
const { link } = require('node:fs');

test('Test tạo đơn đổi tiền', async ({ page }) => {
  test.setTimeout(120000);

  const randomUsername = `autosale_${Math.random().toString(36).substring(7)}`;
const dkgName = `DKG${Date.now()}`;
const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`; 

 await page.goto('https://fe-new-staging.tiximax.net/auth/login');
  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autosale');
  await page.getByPlaceholder('••••••••').fill('123456');

  await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click({ timeout: 7000 });

 
  await expect(page).toHaveURL(/create-orders\/purchase/);
  await expect(page.getByText('Đang tải dữ liệu nền')).toBeHidden();
await expect(page.getByText('Tạo đơn mua hộ')).toBeVisible();

await page.getByRole('link', { name: 'Đổi tiền', exact: true }).click();

  const searchInput = page.getByPlaceholder('Tìm theo tên, số điện thoại, email');
  await searchInput.fill('autosale');

  const customerOption = page.getByText('C02168');
  await expect(customerOption).toBeVisible();
  await customerOption.click();

  
  await page.getByText('Chọn tuyến đường').click({ force: true });
  await page.getByText('IDR - VND', { exact: true }).click();


  await page.getByPlaceholder('Số tiền (vd: 1,000) *').fill('1000');
  await page.getByPlaceholder('Phí đổi tiền (nếu có)').fill('1000');

await expect(page.locator('input[type="file"]')).toHaveCount(1);

await page
  .locator('input[type="file"]')
  .setInputFiles('fixtures/receipt.png');
await page.getByPlaceholder('Ghi chú chi tiết. Ví dụ: Chuyển khoản cho Nguyen Van A - STK: 123456789').fill('test');






  // CREATE ORDER
  await page.getByRole('button', { name: 'Hoàn thành tạo đơn' }).click();
  await page.getByRole('button', { name: 'Tạo đơn chuyển tiền' }).click();
 
    const successMsg = page.getByText(' Đã tạo đơn đổi tiền thành công');
  await expect(successMsg).toBeVisible();
});