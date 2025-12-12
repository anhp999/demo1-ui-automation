import { test, expect } from '../../src/fixtures/custom-fixtures';
test.describe("Booking Widget", () => {
    test("TC0103: Verify list of cinemas based on movie", async ({ homePage }) => {
        await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
        const film = '9387'
        const expectCount = 2
        await homePage.quickBookingWidget.selectFilm(film)
        const option = homePage.quickBookingWidget.getCinemaOptions()
        await expect(option).toHaveCount(expectCount)
    })

    test("TC0104: Verify available date based on cinema and movie", async ({ homePage }) => {
        await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
        const film = '9387'
        const cinema = 'cns-quoc-thanh'
        const expectCount = 1
        await homePage.quickBookingWidget.selectFilm(film)
        await homePage.quickBookingWidget.selectCinema(cinema)
        const option = homePage.quickBookingWidget.getDateOptions()
        await expect(option).toHaveCount(expectCount)
    })

    test("TC0110: Verify booking widget", async ({ homePage }) => {
        await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
        const film = '9387'
        const cinema = 'cns-quoc-thanh'
        const date = '45052'
        const url = `https://demo1.cybersoft.edu.vn/purchase/${date}`
        await homePage.quickBookingWidget.bookingMoive(film, cinema, date)
        expect(homePage.page).toHaveURL(url)
    })

    test("TC0111: Verify if select only film", async ({ homePage }) => {
        await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
        const film = '9387'
        await homePage.quickBookingWidget.selectFilm(film)
        await homePage.quickBookingWidget.buyTickets()
        
        const actualTitle = 'Bạn chưa chọn rạp'
        expect(homePage.quickBookingWidget.getTxtAlert()).toHaveText(actualTitle)
    })

    test("TC0112: Verify if not select date", async ({ homePage }) => {
        await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
        const film = '9387'
        const cinema = 'cns-quoc-thanh'
        await homePage.quickBookingWidget.selectFilm(film)
        await homePage.quickBookingWidget.selectCinema(cinema)
        await homePage.quickBookingWidget.buyTickets()
        
        const actualTitle = 'Bạn chưa chọn ngày giờ chiếu'
        expect(homePage.quickBookingWidget.getTxtAlert()).toHaveText(actualTitle)
    })

    test("TC0113: Verify if select nothing", async ({ homePage }) => {
        await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
        await homePage.quickBookingWidget.buyTickets()
        
        const actualTitle = 'Bạn chưa chọn phim'
        expect(homePage.quickBookingWidget.getTxtAlert()).toHaveText(actualTitle)
    })

    test("TC0114: Verify if showtime is current date", async ({ homePage }) => {
        await homePage.navigateTo("https://demo1.cybersoft.edu.vn/");
        
        const film = '9387'
        const cinema = 'cns-quoc-thanh'
        await homePage.quickBookingWidget.selectFilm(film)
        await homePage.quickBookingWidget.selectCinema(cinema)

        const today = new Date();
        const todayStr = today.toLocaleDateString('en-GB');

        const options = homePage.quickBookingWidget.getSelDate().locator("option:not([disabled])");
        const count = await options.count();
        expect(count).toBeGreaterThan(0)
        
        for (let i = 0; i < count; i++) {
            const text = await options.nth(i).innerText();
            const datePart = text.split('~')[0].trim();
            expect(datePart).toBe(todayStr);
        }
    })
})