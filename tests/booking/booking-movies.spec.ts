import { readDataFromSheet } from '@src/utils/utils';
import { test, expect } from '../../src/fixtures/custom-fixtures';
test.describe("Booking Movies Flow", () => {

  test('get prices', async ({ bookingPage }) => {
    await bookingPage.navigateTo(`https://demo1.cybersoft.edu.vn/purchase/45056`)
    const aaa = await bookingPage.getDetailEle('price')
    console.log(aaa)
  })
  test("TC0145: Verify booking movie after login successfully", async ({ homePage, loginPage, detailPage, bookingPage }) => {
    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
    await homePage.topBarNavigation.navigateLoginPage();
    const expectTxtPrices = '0VND'
    const expectTotalPrices = 75000//165000
    const expectTitle = ""

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.login(
      username,
      password
    );
    await expect(loginPage.getLoginMsgLocator()).toBeVisible();

    const movieId = '45056'
    await bookingPage.navigateTo(`https://demo1.cybersoft.edu.vn/purchase/${movieId}`)
    const txtPrices = await bookingPage.getDetailEle('price')
    expect(txtPrices).toStrictEqual(expectTxtPrices)

    const price = await bookingPage.clickNormalSeat(1)
    expect(price).toStrictEqual(expectTotalPrices)

    const selectedSeats = await bookingPage.getDetailEle('seats')
    expect(selectedSeats?.length).toBeGreaterThan(0)

    await bookingPage.clickBooking()
    expect(await bookingPage.getTxtTitle()).toStrictEqual(expectTitle)
  })

    test("TC0146: Verify clicking the Buy Ticket button when logged in without selecting tickets", async ({ homePage, loginPage, detailPage, bookingPage }) => {
    await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
    await homePage.topBarNavigation.navigateLoginPage();
    const expectAlert = "Bạn chưa chọn ghế"
    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.login(
      username,
      password
    );
    await expect(loginPage.getLoginMsgLocator()).toBeVisible();

    const movieId = '45056'
    await bookingPage.navigateTo(`https://demo1.cybersoft.edu.vn/purchase/${movieId}`)
    await bookingPage.clickBooking()
    expect(await bookingPage.getTxtTitle()).toStrictEqual(expectAlert)
  })
})