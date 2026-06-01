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
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autocustomer');
  await page.getByPlaceholder('••••••••').fill('123456');

  await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click({ timeout: 7000 });

  await expect(page).toHaveURL(/customer\/create-order/);

  await expect(page.getByText('Tạo đơn hàng mới')).toBeVisible();


await page
  .getByText(
    'TIXIMAX thay bạn mua hàng từ các website nước ngoài và vận chuyển về Việt Nam.',
    { exact: true }
  )
  .click({ force: true });
// Sau đó click vào nó





await page.getByText('Chọn tuyến hàng...', {
  exact: true
}).click({ force: true });

const option = page.getByText('IDR - VND', {
  exact: true
});

await expect(option).toBeVisible();
await option.click();




await page.getByText('Chọn địa chỉ nhận hàng...', { exact: true }).click({ force: true });

await page.getByText('AUTO TEST HCM, Phường Ba Đình, Thành phố Hà Nội', { exact: true }).click({ force: true });
 await page.getByPlaceholder('Dán link sản phẩm tại đây...').fill('https://fe-new-staging.tiximax.net/customer/create-order');

await page.getByText('Website (Nguồn sản phẩm)').click({ force: true });
const lazada = page.getByText('Lazada', { exact: true });

await expect(lazada).toBeVisible();
await lazada.click({ force: true });

await page.getByText('Chọn loại hàng').click({ force: true });
const loai = page.getByText('Gia Dụng', { exact: true });
await expect(loai).toBeVisible();
await loai.click({ force: true });
 await page.getByPlaceholder('Nhập tên sản phẩm...').fill(randomUsername);
   await page.getByPlaceholder('Phân loại (Màu, Size, v.v)').fill('Auto Của Long');
 await page.getByRole('button', { name: 'TẠO ĐƠN HÀNG' }).click({ force: true });





const successMessage = page.getByText('Đã tạo tài khoản khách hàng thành công.', { exact: true });

await expect(successMessage).toBeVisible();
});