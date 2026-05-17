const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');
const { link } = require('node:fs');

test('Sale tạo đơn mua hộ', async ({ page }) => {
  test.setTimeout(120000);

  const randomUsername = `autosale_${Math.random().toString(36).substring(7)}`;


  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Xác nhận' }).waitFor({ state: 'hidden' });
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autosale');
  await page.getByPlaceholder('••••••••').fill('123456');

  await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click({ timeout: 7000 });

 
  await expect(page).toHaveURL(/create-orders\/purchase/);
  await expect(page.getByText('Đang tải dữ liệu nền')).toBeHidden();
await expect(page.getByText('Tạo đơn mua hộ')).toBeVisible();

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
await expect(page.getByPlaceholder('Tìm theo tên, số điện thoại, email')).toBeVisible();


const linkInput = page.getByPlaceholder('https://...');

await expect(linkInput).toBeVisible();

await linkInput.fill('https://fe-hotfix.tiximax.net/staff-sale/create-orders/purchase');
await page.getByText('Close', { exact: true }).click();

await page.keyboard.press('Home');





await page.getByText('Taobao, 1688, Tmall...').click({ force: true });

const lazada = page.getByText('Lazada', { exact: true });

await expect(lazada).toBeVisible();
await lazada.click({ force: true });


  await page.getByPlaceholder('Nhập giá').fill('41128');

  // ORDER INFO
  await page.getByPlaceholder('Tên hoặc mô tả ngắn gọn').fill(randomUsername);
await page.keyboard.press('Escape');

await page.getByText('Chọn loại hàng').click({ force: true });
const loai = page.getByText('06. Gia Dụng', { exact: true });
await expect(loai).toBeVisible();
await loai.click({ force: true });



  // PRICE + SHIPPING


  const productSection = page.locator('section').filter({ hasText: 'Danh sách sản phẩm' });
  await productSection.getByPlaceholder('Nhập phí ship').fill('1000');

  await page.getByPlaceholder('Ví dụ: Tmall Shop A').fill('Auto Của Long');

  // CREATE ORDER
  await page.getByRole('button', { name: 'Hoàn thành tạo đơn' }).click();
  await page.getByRole('button', { name: 'Tạo đơn mua hộ' }).click();

});