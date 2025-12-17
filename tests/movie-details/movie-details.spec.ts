import { test, expect } from '../../src/fixtures/custom-fixtures';
test.describe("Movie Details", () => {
    test("TC0121: Verify movie info in detail page", async ({ detailPage }) => {
        const filmId = '9390'
        const expectTitle = 'AVATAR 2'
        const expectDate = '16.12.2021'
        const expectDuration = '120phút'
        const expectScore = '10'
        const expectFilledStars = 5
        const expectStars = 5
        const expectImg = 'url(\"http://movie0706.cybersoft.edu.vn/hinhanh/avatar-2_gp09.jpg\"), url(\"https://tix.vn/app/assets/img/default-film.webp\")'
        await detailPage.navigateTo(`https://demo1.cybersoft.edu.vn/detail/${filmId}`);

        const banner = detailPage.getBanner()
        await expect(banner).toBeVisible()
        await expect(banner).toHaveCSS('background-image', expectImg)

        expect(await detailPage.getTotalStars()).toStrictEqual(expectStars)
        expect(await detailPage.getFilledStars()).toStrictEqual(expectFilledStars)
        expect(await detailPage.getScore()).toStrictEqual(expectScore)
        expect(await detailPage.getTitle()).toStrictEqual(expectTitle)
        expect(await detailPage.getDate()).toStrictEqual(expectDate)
        expect(await detailPage.getDuration()).toStrictEqual(expectDuration)

        expect(detailPage.getIcoPlay()).not.toBeVisible()
        await banner.hover()
        expect(detailPage.getIcoPlay()).toBeVisible()

        expect(detailPage.getBtnPlay()).toBeVisible()
        expect(detailPage.getBtnPlay()).toBeEnabled()

    })

    test("TC0148: Verify interact with trailer", async ({ detailPage }) => {
        const filmId = '9390'
        await detailPage.navigateTo(`https://demo1.cybersoft.edu.vn/detail/${filmId}`);
        await detailPage.clickPlay()

        expect(detailPage.getModalTrailer()).toBeVisible()

    })

    test("TC0126: Verify the ‘Buy Ticket’ button when cinema information is available", async ({ detailPage }) => {
        const expectShowtimes = "17-10-2021 ~ 08:43"
        const filmId = '9390'
        await detailPage.navigateTo(`https://demo1.cybersoft.edu.vn/detail/${filmId}`);
        
        await detailPage.clickBuy()
        expect(await detailPage.getFirstShowtimes()).toMatch(/17-10-2021\s*~\s*08:43/)

        const bookingPage = await detailPage.pickFirstShowtimes()
        expect(bookingPage.page).toHaveURL(`https://demo1.cybersoft.edu.vn/purchase/45056`)

    })
})