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

test('Test tạo khách hàng', async ({ page }) => {
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



await expect(page.getByRole('button', { name: /Quản lý khách hàng/ })).toBeVisible();

// Sau đó click vào nó
await page.getByRole('button', { name: /Quản lý khách hàng/ }).click();
  const menu = page.getByRole('link', { name: 'Tạo KH' });
  await expect(menu).toBeVisible();


  await Promise.all([
    page.waitForURL('**/staff-sale/management/customers/create'),
    menu.click()
  ]);


  await expect(page).toHaveURL(/customers\/create/);

 await page.getByPlaceholder('Ví dụ: Nguyễn Văn A').fill(randomUsername);
 await page.getByPlaceholder('09xxx...').fill(phoneNumber);
await page.getByPlaceholder('email@example.com').fill(email);



// Chọn Tỉnh
await page.locator('#province').click();
await page.locator('.ant-select-item-option >> visible=true').first().click();
await page.waitForTimeout(500); 
// Chọn Phường/Xã
await page.locator('#ward').click();
await page.locator('.ant-select-item-option >> visible=true').first().click();
await page.waitForTimeout(500); 
// Chọn Nguồn (Source)
await page.locator('#source').click();
await page.locator('.ant-select-item-option >> visible=true').first().click();


await page.getByPlaceholder('Ví dụ: 123 Đường Láng, Tòa nhà ABC').fill('autotest home hcm');
await page.getByText('Chọn giới tính').click({ force: true });

const lazada = page.getByText('Nam', { exact: true });
await expect(lazada).toBeVisible();
await lazada.click({ force: true });

await page.getByRole('button', { name: 'TẠO TÀI KHOẢN' }).click();

const successMessage = page.getByText('Đã tạo tài khoản khách hàng thành công.', { exact: true });

await expect(successMessage).toBeVisible();
});