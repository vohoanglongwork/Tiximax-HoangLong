const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
const { TIMEOUT } = require('node:dns');
const { link } = require('node:fs');

test('Test hủy đơn chờ mua', async ({ page }) => {
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

await page.getByText('Yêu cầu hoàn hủy', { exact: true }).click({ force: true });
await page.getByText('Yêu cầu hoàn', { exact: true }).click({ force: true });

const daXacNhanBtn = page
  .getByRole('button', { name: /Gửi yêu cầu hoàn/ })
  .first();

await expect(daXacNhanBtn).toBeVisible();
await daXacNhanBtn.click();
await page.getByRole('button', { name: 'Gửi yêu cầu' }).last().click({ timeout: 5000 });
const daXacNhanBtn2 = page
  .getByRole('button', { name: /Hủy yêu cầu/ })
  .first();

await expect(daXacNhanBtn2).toBeVisible();
await daXacNhanBtn2.click();

  await page.getByPlaceholder('Nhập lý do hủy (tối thiểu 5 ký tự)...').fill('autotest');
  await page.getByRole('button', { name: 'Xác nhận hủy' }).last().click({ timeout: 5000 });

const daXacNhanBtn3 = page
  .getByRole('button', { name: /Tạo lại yêu cầu hoàn/ })
  .first();

await expect(daXacNhanBtn3).toBeVisible();
await daXacNhanBtn3.click();
await page.getByRole('button', { name: 'Gửi yêu cầu' }).last().click({ timeout: 5000 });
const successMsg = page.getByText('Đã gửi yêu cầu hoàn tiền thành công');
  await expect(successMsg).toBeVisible();
});