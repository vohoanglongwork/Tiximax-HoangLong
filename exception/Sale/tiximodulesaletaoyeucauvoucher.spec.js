const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');
const randomKH = `AUTOKH_${Math.random().toString(36).substring(7)}`;
function generateRandomPhone() {
  const suffix = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `0${suffix}`;
}
function generateRandomEmail() {
  const timestamp = Date.now();
  return `test.user_${timestamp}@gmail.com`;
}


const email = generateRandomEmail();

// Cách dùng trong test:
const phoneNumber = generateRandomPhone();

test('Test full luong sale01', async ({ page }) => {
  // Increase timeout for this specific test
  test.setTimeout(120000);

  const randomUsername = `autosale_${Math.random().toString(36).substring(7)}`;

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



const voucherLink = page.getByRole('link', { name: 'Quản lý voucher' });

await expect(voucherLink).toBeVisible();
await voucherLink.click();
  const menu = page.getByRole('button', { name: 'Tạo yêu cầu' });
  await expect(menu).toBeVisible();


  await Promise.all([
    page.waitForURL('**/staff-sale/voucher-requests'),
    menu.click()
  ]);


  await expect(page).toHaveURL(/staff-sale\/voucher-requests/);


 const searchInput = page.getByPlaceholder('Tìm theo tên hoặc số điện thoại...');
  await searchInput.fill('KH26040013 - AutoCustomer');
await searchInput.press('Enter');
  const customerOption = page.getByText('KH26040013 - AutoCustomer');
  await expect(customerOption).toBeVisible();
  await customerOption.click();

  await page.locator('#voucherType').click();

// chọn theo nội dung text
await page.locator('text=Option 2').click();
 await page.getByPlaceholder('VD: 10').fill('1');
await page.getByPlaceholder('VD: 500000').fill(email);
await page.getByPlaceholder('VD: Khách hàng đạt KPI tháng 4').fill('testvoucherequest');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const formatted = tomorrow.toLocaleDateString('vi-VN'); // vd: 30/04/2026

await page.locator('#endDate').fill(formatted);
await page.locator('#endDate').press('Enter');
await page.getByRole('button', { name: /Gửi yêu cầu/ }).click();

const successMessage = page.getByText('Đã gửi yêu cầu cấp voucher', { exact: true });

await expect(successMessage).toBeVisible();
});