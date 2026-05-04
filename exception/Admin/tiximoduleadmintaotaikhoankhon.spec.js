const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { FORMERR } = require('node:dns');

test('Test full luong sale01', async ({ page }) => {
  test.setTimeout(90000);
const randomUsername = `autokhovn${Math.random().toString(36).substring(7)}`;
function generateRandomPhone() {
  const suffix = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `0${suffix}`;
}
function generateRandomEmail() {
  const timestamp = Date.now();
  return `test.khovn_${timestamp}@gmail.com`;
}

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
  
     await page.getByRole('button', { name: 'Quản lý nhân viên', exact: true }).click();

  const employLink = page.getByRole('link', { name: 'Tạo tài khoản' });
  await expect(employLink).toBeVisible();
  await employLink.click();


  await expect(page).toHaveURL(/.*\/staffs\/create-staff/);

  await expect(page.getByText('Chọn vai trò nhân viên')).toBeVisible();
await page.getByRole('button', { name: 'Nhân viên kho nội' }).click();


await page.getByPlaceholder('username').fill(randomUsername);
await page.getByPlaceholder('••••••••').nth(0).fill('123456');
await page.getByPlaceholder('••••••••').nth(1).fill('123456');
await page.getByPlaceholder('Nguyễn Văn A').fill('Test Khovn');
await page.getByPlaceholder('email@example.com').fill(generateRandomEmail());
await page.getByPlaceholder('0123456789').fill(generateRandomPhone());
await page.getByPlaceholder('Phòng kinh doanh').fill('SALE');
await page.getByPlaceholder('Chi nhánh Hà Nội').fill('HN');

const requiredFieldText = page.getByText('Trường bắt buộc');

// kéo tới
await requiredFieldText.scrollIntoViewIfNeeded();

// đảm bảo nó đã hiện
await expect(requiredFieldText).toBeVisible();

await requiredFieldText.scrollIntoViewIfNeeded();

await page.locator('select[name="warehouseLocationId"]').selectOption('1');

await page.getByText('Duyệt chi phí', { exact: true }).click({ force: true });
await page.getByText('Yêu cầu chi phí', { exact: true }).click({ force: true });
await page.getByText('IDR', { exact: true }).click({ force: true });

await page.getByRole('button', { name: 'Tạo tài khoản', exact: true }).nth(0).click();
await page.getByRole('button', { name: 'Tạo tài khoản', exact: true }).nth(1).click();


  await expect(page.getByText('Tạo tài khoản thành công')).toBeVisible({ timeout: 15000 });
});
