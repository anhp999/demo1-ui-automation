import { readDataFromSheet } from '@src/utils/utils';
import { test, expect } from '../../src/fixtures/custom-fixtures';
test.describe("Booking Movies Flow", () => {
    test("TC0103: Verify booking movie after login successfully", async ({ homePage, loginPage, detailPage }) => {
            await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
            await homePage.topBarNavigation.navigateLoginPage();
        
            const data = await readDataFromSheet()
            const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
            const password = data[0]?.Password || "Test123456@"
            await loginPage.login(
              username,
              password
            );
            await expect(loginPage.getLoginMsgLocator()).toBeVisible();

            const movieId = '45056'
            await detailPage.navigateTo(`https://demo1.cybersoft.edu.vn/purchase/${movieId}`)
    })
})