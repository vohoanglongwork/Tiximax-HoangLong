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
  await searchInput2.pressSequentially('autosale', { delay: 100 });

  const customerOption2 = page.getByText('C02168');
  await expect(customerOption2).toBeVisible();
  await customerOption2.click();

  await expect(page.getByText('Đang tải danh sách đơn hàng')).toBeHidden();
const muaHo = page.getByText('MUA HỘ').first();

await expect(muaHo).toBeVisible();
const row = page.getByRole('row', { name: /Mua hộ/ }).first();

const checkbox = row.locator('div.h-5.w-5');

// nếu chưa checked thì click
if (!(await checkbox.getAttribute('class'))?.includes('bg-blue-600')) {
  await checkbox.click();
}
  // CREATE PAYMENT SESSION
  await page.getByRole('button', { name: 'TẠO PHIÊN THANH TOÁN' }).click();

  await page.getByText('Chọn tài khoản').click({ force: true });
  await page.getByText('Le Trung Dung • 6780111818888 (MB)', { exact: true }).click();

  const createSessionBtn = page.getByRole('button', { name: 'Tạo phiên thanh toán · ' });
  await expect(createSessionBtn).toBeVisible();
  await createSessionBtn.click();

  await page.getByRole('button', { name: 'Xác nhận tạo phiên' }).click();

  // SUCCESS
  const successMsg = page.getByText('Đã tạo phiên thanh toán.');
  await expect(successMsg).toBeVisible();
});