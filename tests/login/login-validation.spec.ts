import { readDataFromSheet } from '@src/utils/utils';
import { test, expect } from '../../src/fixtures/custom-fixtures';

test.describe("Login Functional Test", () => {
  test("Valid Login Test", async ({ homePage, loginPage }) => {

    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
    await homePage.topBarNavigation.navigateLoginPage();

    const data = await readDataFromSheet()
    const username = data[0].Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0].Password || "Test123456@"
    await loginPage.login(
      username,
      password
    );
    
    await expect(loginPage.getLoginMsgLocator()).toBeVisible();

    //VP2: User profile displays
    await expect(
      homePage.topBarNavigation.getUserProfileLocator("John Kenny")
    ).toBeVisible();
  });

  test("Invalid Login Test", async ({ page }) => {
    //Implement invalid login test cases
  });
});
