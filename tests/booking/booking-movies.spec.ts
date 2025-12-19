import { readDataFromSheet } from '@src/utils/utils';
import { test, expect } from '../../src/fixtures/custom-fixtures';
import { LoginPage } from '@src/pages/LoginPage';
test.describe("Booking Movies Flow", () => {

  test('TC0130: Verify number of seats', async ({ bookingPage }) => {
    const id = '45056'
    await bookingPage.openPageById(id)
    const expectTotalSeats = 160
    const expectNumOfVipS = 72
    const expectNumOfNormalS = 88


    expect(await bookingPage.totalSeats()).toEqual(expectTotalSeats)
    expect(await bookingPage.getNumOfVipSeats()).toEqual(expectNumOfVipS)
    expect(await bookingPage.getNumOfNormalSeats()).toEqual(expectNumOfNormalS)
  })

  test("TC0144: Verify booking movie by confirm to login", async ({ homePage, loginPage, bookingPage }) => {
    await homePage.open()
    const expectTitle = "Bạn chưa đăng nhập"
    const expectContent = "Bạn có muốn đăng nhập không ?"

    const movieId = '45056'
    const path = await bookingPage.openPageById(movieId)
    const selectedSeats = await bookingPage.getDetailEle('seats')
    expect(selectedSeats?.length).toBeGreaterThan(0)

    await bookingPage.clickBooking()
    expect(await bookingPage.getTxtTitle()).toStrictEqual(expectTitle)
    expect(await bookingPage.getTxtAlertContent()).toStrictEqual(expectContent)

    await bookingPage.clickBtnConfirm()
    expect(loginPage.page).toHaveURL(LoginPage.path)

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.login(
      username,
      password
    );
    await expect(loginPage.getLoginMsgLocator()).toBeVisible();
    expect(bookingPage.page).toHaveURL(path)
  })

    test("TC0145: Verify booking movie by deny to login", async ({ homePage, bookingPage }) => {
    await homePage.open()
    const expectTitle = "Bạn chưa đăng nhập"
    const expectContent = "Bạn có muốn đăng nhập không ?"

    const movieId = '45056'
    await bookingPage.openPageById(movieId)
    const selectedSeats = await bookingPage.getDetailEle('seats')
    expect(selectedSeats?.length).toBeGreaterThan(0)

    await bookingPage.clickBooking()
    expect(await bookingPage.getTxtTitle()).toStrictEqual(expectTitle)
    expect(await bookingPage.getTxtAlertContent()).toStrictEqual(expectContent)

    await bookingPage.clickBtnDeny()
    expect(bookingPage.getBtnDeny()).not.toBeVisible()
  })

  test("TC0146: Verify booking movie after login successfully", async ({ homePage, loginPage, bookingPage }) => {
    await homePage.open()
    await homePage.topBarNavigation.navigateLoginPage();
    const expectTxtPrices = '0VND'
    const expectTotalPrices = 75000
    const expectTitle = "Đặt vé thành công"
    const expectContent = "Kiểm tra trong lịch sử đặt vé"

    const data = await readDataFromSheet()
    const username = data[0]?.Username || "Testaefad88de3ff4ca2b9d3679f1199415c"
    const password = data[0]?.Password || "Test123456@"
    await loginPage.login(
      username,
      password
    );
    await expect(loginPage.getLoginMsgLocator()).toBeVisible();

    const movieId = '45056'
    const path = await bookingPage.openPageById(movieId)
    const txtPrices = await bookingPage.getDetailEle('price')
    expect(txtPrices).toStrictEqual(expectTxtPrices)

    const price = await bookingPage.clickNormalSeat(1)
    expect(price).toStrictEqual(expectTotalPrices)

    const selectedSeats = await bookingPage.getDetailEle('seats')
    expect(selectedSeats?.length).toBeGreaterThan(0)

    await bookingPage.clickBooking()
    expect(await bookingPage.getTxtTitle()).toStrictEqual(expectTitle)
    expect(await bookingPage.getTxtAlertContent()).toStrictEqual(expectContent)

    await bookingPage.clickBtnConfirm()
    expect(bookingPage.page).toHaveURL(path)
  })

    test("TC0147: Verify clicking the Buy Ticket button when logged in without selecting tickets", async ({ homePage, loginPage, detailPage, bookingPage }) => {
    await homePage.open()
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
    await bookingPage.openPageById(movieId)
    await bookingPage.clickBooking()
    expect(await bookingPage.getTxtTitle()).toStrictEqual(expectAlert)
  })
})