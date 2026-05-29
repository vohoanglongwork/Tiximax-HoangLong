const { test, expect } = require('@playwright/test');
const { time } = require('node:console');
  const randomMVD = `TESTMVD_${Math.random().toString(36).substring(7)}`;
  const randomMVD2 = `TESTMVD_${Math.random().toString(36).substring(7)}`;
test('Test Purchase Mua hàng', async ({ page }) => {
  test.setTimeout(90000);




  await page.goto('https://fe-new-staging.tiximax.net/auth/login');

  await page.getByRole('button', { name: 'Tiếng Việt' }).click();
  await page.getByRole('button', { name: 'Xác nhận' }).click();
await page.getByRole('button', { name: 'Đăng nhập bằng mật khẩu' }).click();
  await page.getByPlaceholder('Nhập tên đăng nhập').fill('autopurchase');
  await page.getByPlaceholder('••••••••').fill('123456');
await page.getByRole('button', { name: 'Đăng nhập hệ thống' }).click();

await expect(page).toHaveURL(/staff-purchaser/);

const menu = page.getByRole('link', {
  name: 'Đơn mua hàng',
  exact: true
});


await expect(menu).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/orders'),
  menu.click()
]);
await expect(menu).toBeVisible();

await expect(page.getByText('Đơn mua hộ (Links)', { exact: true }).first()).toBeVisible();
const firstMH = await page
  .getByText(/MH-/)
  .first()
  .innerText();

  const menu2 = page.getByRole('link', {
  name: 'Tách số lượng',
  exact: true
});


await expect(menu2).toBeVisible();

await Promise.all([
  page.waitForURL('**/staff-purchaser/split-link'),
  menu2.click()
]);
await expect(menu2).toBeVisible();

await page.getByPlaceholder('VD: MH-FAA7E2').fill(firstMH);
await page.getByRole('button', { name: 'Tìm' }).click({ force: true });

const splitBtn = page.getByRole('button', {
  name: 'Chọn để tách',
  exact: true
}).first();

await splitBtn.scrollIntoViewIfNeeded();
await splitBtn.click({ force: true });
await page.getByText('Thêm dòng tách').click({ force: true });
await page.getByPlaceholder('VD: JP-006-A').first().fill(randomMVD);
await page.getByPlaceholder('VD: JP-006-A').last().fill(randomMVD2);
await page.getByRole('button', { name: 'Tách số lượng của order link' }).click({ force: true });
  const successMsg = page.getByText('Tách số lượng của order link thành công!').first();
  await expect(successMsg).toBeVisible();
});