const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test full luong sale01', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('warehouseforeign');
  await page.getByPlaceholder('••••••••').fill('123456');

  await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click({ timeout: 10000 });

 
  await expect(page.getByText('Hàng chờ nhập kho nước ngoài').first()).toBeVisible();


  await Promise.all([
    page.waitForURL('**/staff-warehouse-foreign/dashboard'),
    page.getByRole('link', { name: 'Tổng quan' }).click()
  ]);



  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
  await page.getByPlaceholder('KH001', { exact: true }).fill('KH26040003');
  const firstMVD = await page
   .getByText(/TESTMVD_/)
    .first() 
     .innerText();

     page.getByRole('link', { name: 'Nhận hàng' }).first().click({ force: true });
      await page.getByPlaceholder('VÍ DỤ: SPX12345678', { exact: true }).fill(firstMVD);
      const target = page.getByText('Xác nhận nhập kho', { exact: true });
await target.scrollIntoViewIfNeeded();
await expect(target).toBeVisible();
      await page.getByPlaceholder('Dài (cm)', { exact: true }).fill('1');
      await page.getByPlaceholder('Rộng (cm)', { exact: true }).fill('1');
      await page.getByPlaceholder('Cao (cm)', { exact: true }).fill('1');
      await page.getByPlaceholder('vd. 1.500', { exact: true }).fill('1');

const filePath = 'tests/fixtures/receipt.png';

// Ảnh chính
await page
  .locator('div[aria-label="Tải lên Ảnh chính"]')
  .locator('input[type="file"]')
  .setInputFiles(filePath);

// Ảnh kiểm tra
await page
  .locator('div[aria-label="Tải lên Ảnh kiểm tra"]')
  .locator('input[type="file"]')
  .setInputFiles(filePath);
  await expect(page.getByText('Đã tải lên ảnh kiện hàng')).toBeVisible({ timeout: 15000 });
  await target.scrollIntoViewIfNeeded();
await expect(target).toBeVisible();
  await page.getByRole('button', { name: 'Xác nhận nhập kho' }).last().click();

await page.getByText('Nhập kho thành công!');
  await expect(page.getByText('Nhập kho thành công!')).toBeVisible();

  page.getByRole('link', { name: 'Đóng gói (scan)' }).first().click({ force: true });
  

await page.getByPlaceholder('QUÉT HOẶC NHẬP ĐẦY ĐỦ MÃ VẬN ĐƠN', { exact: true }).fill(firstMVD);

await page.getByRole('button', { name: 'Thêm mã', exact: true }).click();
await expect(page.getByPlaceholder('MÃ 2')).toBeVisible();
await page.getByRole('button', { name: 'Tạo đóng gói' }).first().click();
await page.getByRole('button', { name: 'Tạo đóng gói' }).last().click();

await expect(page.getByText('Đóng gói tạo thành công')).toBeVisible();

await page.getByRole('link', { name: 'Chờ bay' }).click();

await page.waitForURL('**/staff-warehouse-foreign/outbound/packingawaiting');



  await page.locator('input[type="checkbox"]').nth(1).check();
await page.getByRole('button', { name: 'Gán mã bay (1)' }).click();
await expect(page.getByText('đóng gói đã chọn')).toBeVisible();

await page.getByLabel('Điểm đến *').selectOption({ label: 'Hà Nội' });

await page.getByPlaceholder('0.00', { exact: true }).fill('1');
await page.getByPlaceholder('0', { exact: true }).first().fill('1');
await page.getByPlaceholder('0', { exact: true }).last().fill('1');
const today = new Date().toISOString().split('T')[0];

await page.locator('input[type="date"]').fill(today);

await page.getByRole('button', { name: 'Xác nhận' }).click();

await expect(page.getByText('Gán mã chuyến bay thành công.')).toBeVisible();

  });