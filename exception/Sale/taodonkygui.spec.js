const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');
const { link } = require('node:fs');

test('Test tạo đơn ký gửi', async ({ page }) => {
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

await page.getByRole('link', { name: 'Ký gửi', exact: true }).click();

  const searchInput = page.getByPlaceholder('Tìm theo tên, số điện thoại, email');
  await searchInput.fill('Au');

  const customerOption = page.getByText('AutoCustomer');
  await expect(customerOption).toBeVisible();
  await customerOption.click();

  
  await page.getByText('Chọn tuyến đường').click({ force: true });
  await page.getByText('IDR', { exact: true }).click();

 
  await page.getByText('Chọn địa chỉ', { exact: true }).click({ force: true });
  await page.getByRole('button', { name: 'autotest home hcm' }).click();


await page.getByText('Chọn điểm đến').click({ force: true });

await page.getByText('Hà Nội', { exact: true }).click();



await page.keyboard.press('Home');
await expect(page.getByPlaceholder('Nhập tên kiện hàng')).toBeVisible();


const linkInput = page.getByPlaceholder('Nhập tên kiện hàng');

await expect(linkInput).toBeVisible();

await linkInput.fill(dkgName);



await page.keyboard.press('Home');

await page.getByPlaceholder('Nhập mã vận đơn').fill(randomMVD);



await page.getByText('Chọn loại hàng').click({ force: true });
const loai = page.getByText('06. Thể Thao', { exact: true });
await expect(loai).toBeVisible();
await loai.click({ force: true });

  // PRICE + SHIPPING
  await page.getByPlaceholder('Nhập phí khác').fill('41128');
  await page.getByPlaceholder('Nhập phụ phí').fill('41128');

    await expect(page.locator('input[type="file"]')).toHaveCount(1);
await page.locator('input[type="file"]').setInputFiles('D:\\File Công Việc\\AMAZING TECH\\TEST PLAYWRIGHT\\tests\\fixtures\\receipt.png');
 await expect(page.getByText('Tải ảnh lên thành công')).toBeVisible({ timeout: 5000 });



  // CREATE ORDER
  await page.getByRole('button', { name: 'Hoàn thành tạo đơn' }).click();
  await page.getByRole('button', { name: 'Tạo đơn ký gửi' }).click();

  const successMsg = page.getByText('Đã tạo đơn ký gửi thành công');
  await expect(successMsg).toBeVisible();
});