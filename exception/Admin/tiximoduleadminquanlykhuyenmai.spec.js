const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test Accept Voucher', async ({ page }) => {
  test.setTimeout(90000);



  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autoManager');
  await page.getByPlaceholder('••••••••').fill('123456');

await Promise.all([
  page.waitForURL('**/manager', { timeout: 15000 }),
  page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click()
]);
await expect(page).toHaveURL(/manager\/dashboard/);
await page.waitForLoadState('networkidle');


// đợi sidebar load
await expect(
  page.getByRole('link', { name: 'Xác nhận đơn hàng' })).toBeVisible({ force: true });

  await page.getByRole('link', { name: 'Xác nhận đơn hàng' }).click({ force: true });
await page.waitForLoadState('networkidle');
await expect(page).toHaveURL(/manager\/quote/);
await expect(page.getByText('Đã xác nhận').first()).toBeVisible();
  
     await page.getByRole('button', { name: 'Cấu hình hệ thống', exact: true }).click();

  const employLink = page.getByRole('link', { name: 'Khuyến mãi' });
  await expect(employLink).toBeVisible();
  await employLink.click();


  await expect(page).toHaveURL(/.*\/manager\/promotion/);

  await expect(page.getByText('Quản Lý Khuyến Mãi').first()).toBeVisible();

await page.getByRole('button', { name: 'Tạo voucher', exact: true }).first().click();
await page.getByPlaceholder('VD: SUMMER2024').fill('Test Voucher');

await page.getByPlaceholder('VD: 10', { exact: true }).fill('100');
const todayDate = new Date().getDate();
const tomorrowDate = todayDate + 1;

// START DATE
await page.getByPlaceholder('Chọn ngày bắt đầu').click();

const calendar = page.locator('.ant-picker-dropdown:visible');

await calendar.locator('.ant-picker-cell-inner', {
  hasText: String(todayDate)
}).first().click();

await page.getByRole('button', { name: 'OK' }).click();
await page.getByPlaceholder('VD: 100,000', { exact: true }).fill('1');
await page.getByPlaceholder('Mô tả chi tiết về voucher...').fill('test voucher');



await page.getByPlaceholder('Chọn ngày kết thúc').click();

const tomorrowDateStr = String(tomorrowDate);

// scope to visible dropdown first
const calendar2 = page.locator('.ant-picker-dropdown:visible').last();

await calendar2
  .locator('.ant-picker-cell-in-view .ant-picker-cell-inner')
  .filter({ hasText: new RegExp(`^${tomorrowDateStr}$`) })
  .click();
  await page.getByRole('button', { name: 'OK' }).click();
  const idr = page.getByText('IDR', { exact: true });

// scroll xuống để element nằm trong viewport
await idr.scrollIntoViewIfNeeded();

// đợi visible (đúng ý bạn)
await expect(idr).toBeVisible();

// click với force
await idr.click({ force: true });
await page.getByRole('button', { name: 'Tạo Voucher mới', exact: true }).click();
   await expect(page.getByText('Tạo voucher thành công!').first()).toBeVisible();
const row = page.locator('tr', { hasText: 'Test Voucher' }).first();
const row2 = page.locator('tr', { hasText: 'Test Voucher2' }).first();
await row.getByRole('button', { name: 'Sửa', exact: true }).click();
await page.getByPlaceholder('VD: SUMMER2024').fill('Test Voucher2');
await page.getByRole('button', { name: 'Cập nhật Voucher', exact: true }).click();
await row2.getByRole('button', { name: 'Xóa', exact: true }).first().click({ timeout: 15000 });
await page.getByRole('button', { name: 'Xóa', exact: true }).last().click();
  await expect(page.getByText('Xóa voucher thành công!')).toBeVisible({ timeout: 15000 });
});