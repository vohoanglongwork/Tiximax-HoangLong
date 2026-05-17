const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');
const { link } = require('node:fs');

test('Test tạo đơn đấu giá', async ({ page }) => {
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

await page.getByRole('link', { name: 'Đấu giá', exact: true }).click();

  const searchInput = page.getByPlaceholder('Tìm theo tên, số điện thoại, email');
  await searchInput.fill('Au');

  const customerOption = page.getByText('AutoCustomer');
  await expect(customerOption).toBeVisible();
  await customerOption.click();

  
  await page.getByText('Chọn tuyến đường').click({ force: true });
  await page.getByText('IDR - VND', { exact: true }).click();

 
  await page.getByText('Chọn địa chỉ', { exact: true }).click({ force: true });
  await page.getByRole('button', { name: 'autotest home hcm' }).click();


await page.getByText('Chọn điểm đến').click({ force: true });

await page.getByText('Hà Nội', { exact: true }).click();



await page.keyboard.press('Home');  

const linkInput = page.getByPlaceholder('https://...');

await expect(linkInput).toBeVisible();

await linkInput.fill('https://fe-hotfix.tiximax.net/staff-sale/create-orders/purchase');
await page.getByText('Close', { exact: true }).click();

await page.keyboard.press('Home');





await page.getByText('Taobao, 1688, Tmall...').click({ force: true });

const lazada = page.getByText('Lazada', { exact: true });

await expect(lazada).toBeVisible();
await lazada.click({ force: true });




  // ORDER INFO
  await page.getByPlaceholder('Tên hoặc mô tả ngắn gọn').fill(randomUsername);

  // CATEGORY
await page.getByText('Chọn loại hàng').click({ force: true });
const loai = page.getByText('06. Gia Dụng', { exact: true });
await expect(loai).toBeVisible();
await loai.click({ force: true });

  // PRICE + SHIPPING
  await page.getByPlaceholder('Nhập giá').fill('41128');

  await page.getByPlaceholder('Phụ phí mua').fill('41128');

  await page.getByPlaceholder('Ví dụ: Size M, Màu Đen').fill('Auto Của Long');

  // CREATE ORDER
  await page.getByRole('button', { name: 'Hoàn thành tạo đơn' }).click();
  await page.getByRole('button', { name: 'Tạo đơn đấu giá' }).click();

  // PAYMENT FLOW
  await page.getByRole('button', { name: 'Thanh toán', exact: true }).click();

  const paymentLink = page.getByRole('link', { name: 'Thanh toán đơn hàng' });
  await expect(paymentLink).toBeVisible();
  await paymentLink.click();

  await expect(page).toHaveURL(/.*\/payments\/order/);

  await expect(page.getByText('Chưa chọn khách hàng')).toBeVisible();

  // CUSTOMER SEARCH (payment page)
  const searchInput2 = page.getByPlaceholder('Tìm theo tên, số điện thoại, email');

  await searchInput2.click();
  await searchInput2.pressSequentially('AutoCustomer', { delay: 100 });

  const customerOption2 = page.getByText('AutoCustomer');
  await expect(customerOption2).toBeVisible();
  await customerOption2.click();

  await expect(page.getByText('Đang tải danh sách đơn hàng')).toBeHidden();
const muaHo = page.getByText('Đã xác nhận').first();

await expect(muaHo).toBeVisible();
const row = page.getByRole('row', { name: /Đã xác nhận/ }).first();

const checkbox = row.locator('div.h-5.w-5');

// nếu chưa checked thì click
if (!(await checkbox.getAttribute('class'))?.includes('bg-blue-600')) {
  await checkbox.click();
}
  // CREATE PAYMENT SESSION
  await page.getByRole('button', { name: 'TẠO PHIÊN THANH TOÁN' }).click();

  await page.getByText('Chọn tài khoản').click({ force: true });
  await page.getByText('Le Trung Dung • 6780111818888 (MB)', { exact: true }).click();

  const createSessionBtn = page.getByRole('button', { name: 'Tạo phiên thanh toán (1)' });
  await expect(createSessionBtn).toBeVisible();
  await createSessionBtn.click();

  await page.getByRole('button', { name: 'Xác nhận tạo phiên' }).click();

  // SUCCESS
  const successMsg = page.getByText('Đã tạo phiên thanh toán.');
  await expect(successMsg).toBeVisible();
});