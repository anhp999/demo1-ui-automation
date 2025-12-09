import { test, expect } from '../../src/fixtures/custom-fixtures';

test.describe("Login Functional Test", () => {
  test('TC-078: Ensure that the password characters are hidden when typing', async ({ homePage, loginPage }) => {
    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
    await homePage.topBarNavigation.navigateLoginPage();

    await loginPage.enterPassword('Test@1234');

    await expect(loginPage.getTxtPasswordLogin()).toHaveAttribute('type', 'password');
  });

  test('TC-079: Toggle show/hide password', async ({ homePage, loginPage }) => {
    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
    await homePage.topBarNavigation.navigateLoginPage();

    await loginPage.enterPassword('Test@1234');

    await expect(loginPage.getTxtPasswordLogin()).toHaveAttribute('type', 'password');

    await loginPage.togglePassword()
    await expect(loginPage.getTxtPasswordLogin()).toHaveAttribute('type', 'text');

    await loginPage.togglePassword()
    await expect(loginPage.getTxtPasswordLogin()).toHaveAttribute('type', 'password');
  });

    test("TC-080: Verify Register Link In Login Form", async ({ loginPage }) => {
    await loginPage.navigateTo("https://demo1.cybersoft.edu.vn/sign-in");
    const link = loginPage.getLnkRegis()
    expect(link).toHaveCSS('color', 'rgb(0, 0, 238)')

    const activeLink = await loginPage.rightClick()
    expect(activeLink).toHaveCSS('color', 'rgb(255, 0, 0)')

    const titleLogin = await (await loginPage.directToLogin()).getTxtTitle()
    expect(titleLogin).toStrictEqual('Đăng ký')
  });

    test("TC-081: Verify Register Link In Login Form", async ({ loginPage }) => {
    await loginPage.navigateTo("https://demo1.cybersoft.edu.vn/sign-in");
    const txtPhAccount = await loginPage.getLblAccount()
    const actualAccount = 'Tài Khoản *'

    const txtPhPwd = await loginPage.getLblPwd()
    const actualPwd = 'Mật Khẩu *'

    expect(txtPhAccount).toStrictEqual(actualAccount)
    expect(txtPhPwd).toStrictEqual(actualPwd)
  });

    test("TC-085: Verify Register Input When Focus On Each One", async ({ loginPage }) => {

    await loginPage.navigateTo("https://demo1.cybersoft.edu.vn/sign-in");
    const actualLblAlert = 'Đây là trường bắt buộc !'

    await loginPage.focusInputFields('account')
    await loginPage.focusInputFields('pwd')
    await loginPage.clickLogin()

    expect(loginPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    expect(loginPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')

    expect(await loginPage.getUNAlertInfo()).toStrictEqual(actualLblAlert)
    expect(loginPage.getLblUNAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    expect(await loginPage.getUNAlertInfo()).toStrictEqual(actualLblAlert)
    expect(loginPage.getLblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')

  });

    test("TC-087: Verify access the login page by login button", async ({ homePage, loginPage }) => {

    await homePage.navigateTo("https://demo1.cybersoft.edu.vn");
    await homePage.topBarNavigation.navigateLoginPage();
    expect(loginPage.getLblTitle()).toBeVisible()
  });
});
