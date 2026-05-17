const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('node:dns');
const { link } = require('node:fs');

test('Test Sale xác nhận địa chỉ giao', async ({ page }) => {
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




await expect(page.getByRole('button', { name: /Theo dõi kho hàng/ })).toBeVisible();

// Sau đó click vào nó
await page.getByRole('button', { name: /Theo dõi kho hàng/ }).click();
  const menu = page.getByRole('link', { name: 'Xác nhận địa chỉ giao' });
  await expect(menu).toBeVisible();


  await Promise.all([
    page.waitForURL('**/staff-sale/management/warehouse/confirm'),
    menu.click()
  ]);


await expect(page.getByText('Danh sách địa chỉ giao chờ xác nhận')).toBeVisible();

  // CUSTOMER SEARCH (payment page)
  const searchInput2 = page.getByPlaceholder('Tìm theo tên, số điện thoại, email');

  await searchInput2.click();
  await searchInput2.pressSequentially('AutoCustomer', { delay: 100 });

  const customerOption2 = page.getByText('AutoCustomer').first();
  await expect(customerOption2).toBeVisible();
  await customerOption2.click();



 await page.getByRole('button', { name: 'Xác nhận', exact: true }).first().click();
  await page.getByRole('button', { name: 'Xác nhận xuất kho', exact: true }).click();

    await page.getByRole('button', { name: 'Thanh toán', exact: true }).click();

  const paymentLink = page.getByRole('link', { name: 'Thanh toán vận chuyển' });
  await expect(paymentLink).toBeVisible();
  await paymentLink.click();

  await expect(page).toHaveURL(/.*\/payments\/shipping/);

const row = page.getByRole('row', { name: /AutoCustomer/ }).first();
const payBtn = row.getByRole('button', { name: 'Thanh toán' });

await payBtn.scrollIntoViewIfNeeded();
await expect(payBtn).toBeVisible();
await expect(payBtn).toBeEnabled();

await payBtn.click();

  const feeInput = page.getByPlaceholder('Nhập phí ship');

await expect(feeInput).toBeVisible(); // auto-wait đúng chuẩn
await feeInput.fill('1');
await page.getByText('Chọn tài khoản').click({ force: true });

await page.locator('.ant-select-item-option', {
  hasText: 'Le Trung Dung'
}).click();
  await page.getByRole('button', { name: 'Tạo phiên thanh toán', exact: true }).click();
  // SUCCESS
  const successMsg = page.getByText('Đã tạo phiên thanh toán cho mã ship.');
  await expect(successMsg).toBeVisible();
});