import { test, expect } from '../../src/fixtures/custom-fixtures';

test.describe("Register Form", () => {
  test("TC-003: Verify Placeholder Text ", async ({ registerPage }) => {

    await registerPage.open()
    const txtPhAccount = await registerPage.getTextLblAccount()
    const actualAccount = 'Tài Khoản *'

    const txtPhPwd = await registerPage.getTextLblPwd()
    const actualPwd = 'Mật Khẩu *'

    const txtPhConfirmPwd = await registerPage.getTextLblConfirmPwd()
    const actualConfirmPwd = 'Nhập lại mật khẩu *'

    const txtPhFullName = await registerPage.getTextLblFullName()
    const actualFullName = 'Họ Tên *'

    const txtPhEmail = await registerPage.getTextLblEmail()
    const actualEmail = 'Email *'

    expect(txtPhAccount).toStrictEqual(actualAccount)
    expect(txtPhPwd).toStrictEqual(actualPwd)
    expect(txtPhConfirmPwd).toStrictEqual(actualConfirmPwd)
    expect(txtPhFullName).toStrictEqual(actualFullName)
    expect(txtPhEmail).toStrictEqual(actualEmail)
  });

  test("TC-005: Verify Login Link In Register Form", async ({ registerPage }) => {

    await registerPage.open()
    const link = registerPage.getlnkLogin()
    expect(link).toHaveCSS('color', 'rgb(0, 0, 238)')

    const activeLink = await registerPage.rightClick()
    expect(activeLink).toHaveCSS('color', 'rgb(255, 0, 0)')

    const titleLogin = await (await registerPage.directToLogin()).getTxtTitle()
    expect(titleLogin).toStrictEqual('Đăng nhập')
  });

  test("TC-008: Verify Register Input When Focus On Each One", async ({ registerPage }) => {

    await registerPage.open()
    const actualLblAlert = 'Đây là trường bắt buộc !'

    await registerPage.focusInputFields('account')
    await registerPage.focusInputFields('pwd')
    await registerPage.focusInputFields('confirm_pwd')
    await registerPage.focusInputFields('fullname')
    await registerPage.focusInputFields('email')

    expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    expect(registerPage.getFields('confirm_pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')

    expect(await registerPage.getUNAlertInfo()).toStrictEqual(actualLblAlert)
    expect(registerPage.getlblUNAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')

  });
  test("TC-010: Verify the presence of password visibility toggle", async ({ registerPage }) => {

    await registerPage.open()

    expect(registerPage.getIconHiddenPwd()).toBeVisible()
    expect(registerPage.getIconHiddenConfirmPwd()).toBeVisible()

  });

  test("TC-011: Verify access the register page by register button", async ({ homePage, registerPage }) => {

    await homePage.open();
    const title = await registerPage.directToRegisterPage()
    expect(title).toBeVisible()
  });

  test('TC-070: Ensure that the password characters are hidden when typing', async ({ registerPage }) => {
    await registerPage.open()
    await registerPage.enterPassword('Test@1234');
    await registerPage.enterConfirmPassword('Test@1234');

    await expect(registerPage.getTxtPwdRegis()).toHaveAttribute('type', 'password');
    await expect(registerPage.getTxtConfirmPwd()).toHaveAttribute('type', 'password');
  });



  test('TC-071: Toggle show/hide password', async ({ registerPage }) => {
    await registerPage.open()
    await registerPage.enterPassword('Test@1234');
    await registerPage.enterConfirmPassword('Test@1234');

    await registerPage.togglePassword()
    await expect(registerPage.getTxtPwdRegis()).toHaveAttribute('type', 'text');

    await registerPage.togglePassword()
    await expect(registerPage.getTxtPwdRegis()).toHaveAttribute('type', 'password');
  });
});
