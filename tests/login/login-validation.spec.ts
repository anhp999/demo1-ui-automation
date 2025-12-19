import { readDataFromSheet } from '@src/utils/utils';
import { test, expect } from '../../src/fixtures/custom-fixtures';
import { HomePage } from '@src/pages/HomePage';

test.describe("Login Validation", () => {
  test("TC088: Valid Login Test", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    const fullname = data[0]?.FullName || "John Kenny"
    await loginPage.login(
      username,
      password
    );

    await expect(loginPage.getLoginMsgLocator()).toBeVisible();
    await expect(
      homePage.topBarNavigation.getUserProfileLocator(fullname)
    ).toBeVisible();
    await expect(homePage.page).toHaveURL(HomePage.path)
  });

  test("TC089: Verify logout", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.login(
      username,
      password
    );

    await loginPage.topBarNavigation.logout()
    expect(loginPage.topBarNavigation.getLnkLogin()).toBeVisible()
    await expect(homePage.page).toHaveURL(HomePage.path)
  });

  test("TC090: Verify remember account", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.toggleRememberMe()
    await loginPage.login(
      username,
      password
    );
    await loginPage.topBarNavigation.logout()
    await homePage.topBarNavigation.navigateLoginPage();
    await expect(loginPage.getTxtAccountLogin()).not.toBeEmpty();
    await expect(loginPage.getTxtPasswordLogin()).not.toBeEmpty()
  });

  test("TC091: Verify without remembering account", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.login(
      username,
      password
    );
    await loginPage.topBarNavigation.logout()
    await homePage.topBarNavigation.navigateLoginPage();
    await expect(loginPage.getTxtAccountLogin()).toBeEmpty();
    await expect(loginPage.getTxtPasswordLogin()).toBeEmpty()
  });

  test("TC092: Login with invalid account", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const username = "notexistedaccount0"
    const password = "pwTest@0123"
    await loginPage.login(
      username,
      password
    );
    const actualAlertMsg = "Tài khoản hoặc mật khẩu không đúng!"
    expect(loginPage.getLblAlert()).toBeVisible()
    expect(loginPage.getLblAlert()).toHaveCSS('color', 'rgb(97, 26, 21)')
    expect(loginPage.getLblAlert()).toHaveText(actualAlertMsg)
  });
  test("TC093: Login with empty account", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const username = ""
    const password = "pwTest@0123"
    await loginPage.login(
      username,
      password
    );

    const actualLblAlert = 'Đây là trường bắt buộc !'
    expect(loginPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    expect(await loginPage.getUNAlertInfo()).toStrictEqual(actualLblAlert)

  });

  test("TC094: Login with empty password", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const username = "notexistedaccount0"
    const password = ""
    await loginPage.login(
      username,
      password
    );

    const actualLblAlert = 'Đây là trường bắt buộc !'
    expect(loginPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    expect(await loginPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)

  });

  test("TC095: Login with account contains spaces", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.login(
      `       ${username}`,
      password
    );

    const actualAlertMsg = "Tài khoản hoặc mật khẩu không đúng!"
    expect(loginPage.getLblAlert()).toBeVisible()
    expect(loginPage.getLblAlert()).toHaveCSS('color', 'rgb(97, 26, 21)')
    expect(loginPage.getLblAlert()).toHaveText(actualAlertMsg)

  });

  test("TC096: Login by pressing Enter", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.loginByEnter(
      username,
      password
    );

    await expect(loginPage.getLoginMsgLocator()).toBeVisible();
    await expect(homePage.page).toHaveURL(HomePage.path)

  });

  test("TC097: Login failed 4 times", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();
    const n = 4
    const username = "notexistedaccount0"
    const password = "pwTest@0123"
    for (let i = 1; i <= n; i++) {
      await loginPage.login(
        username,
        password
      );
    }

    const actualAlertMsg = "Tài khoản hoặc mật khẩu không đúng!"
    expect(loginPage.getLblAlert()).toBeVisible()
    expect(loginPage.getLblAlert()).toHaveCSS('color', 'rgb(97, 26, 21)')
    expect(loginPage.getLblAlert()).toHaveText(actualAlertMsg)
  });
  test("TC0100: Login failed 6 times", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();
    const n = 6
    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    const fullname = data[0]?.FullName || "John Kenny"

    for (let i = 1; i <= n; i++) {
      await loginPage.login(
        username,
        'invalidpassword'
      );
    }

    await loginPage.login(
      username,
      password
    );

    await expect(loginPage.getLoginMsgLocator()).toBeVisible();
    await expect(
      homePage.topBarNavigation.getUserProfileLocator(fullname)
    ).toBeVisible();
    await expect(homePage.page).toHaveURL(HomePage.path)
  });

  test("TC0101: Access login page after login successfully", async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();
    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"

    await loginPage.login(
      username,
      password
    );
    await expect(loginPage.getLoginMsgLocator()).toBeVisible();

    await loginPage.open()
    await expect(homePage.page).toHaveURL(HomePage.path)

  });

  test("TC0102: Access register page after login successfully", async ({ homePage, loginPage, registerPage }) => {
    await homePage.open();
    await homePage.topBarNavigation.navigateLoginPage();
    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"

    await loginPage.login(
      username,
      password
    );
    await expect(loginPage.getLoginMsgLocator()).toBeVisible();

    await registerPage.open()
    await expect(homePage.page).toHaveURL(HomePage.path)
  });
});
