const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { TIMEOUT } = require('node:dns');
const { link } = require('node:fs');

test('Test hủy đơn đã xác nhận', async ({ page }) => {
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

await page.getByRole('link', { name: 'Quản lý đơn hàng', exact: true }).click();
const searchInput = page.getByPlaceholder('Tìm khách hàng');
await searchInput.fill('Au');

// scope vào vùng dropdown thay vì toàn page
const dropdown = page.locator('div').filter({ has: searchInput });

const customerOption = dropdown.getByRole('button', {
  name: /AutoCustomer/
});

await expect(customerOption).toBeVisible();
await customerOption.click();
await page.getByRole('button', { name: 'Tìm kiếm' }).click();
const daXacNhanBtn = page.getByRole('button', { name: /Đã xác nhận/ });

await expect(daXacNhanBtn).toBeVisible();
await daXacNhanBtn.click();
await page.getByRole('button', { name: 'Xem' }).first().click({ timeout: 5000 });
await expect(page.getByText('Đang tải chi tiết đơn hàng')).toBeHidden({ timeout: 10000 });
const cancelBtn = page.getByRole('button', { name: 'Hủy đơn' });

await expect(cancelBtn).toBeEnabled();
await cancelBtn.click();
await page.getByRole('button', { name: 'Xác nhận hủy' }).click();


const successMsg = page.getByText(' Đã hủy đơn hàng thành công.');
  await expect(successMsg).toBeVisible();
});