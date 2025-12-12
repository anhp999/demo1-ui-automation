import { test, expect } from '../../src/fixtures/custom-fixtures';
test.describe("Movie Details", () => {
    test("TC0121: Verify movie info in detail page", async ({ detailPage }) => {
        const filmId = '9390'
        const expectTitle = ''
        const expectDate = ''
        const expectShowtimes = ''
        const expectDuration = ''
        const expectScore = ''
        const expectFilledStars = ''
        const expectStars = ''
        await detailPage.navigateTo(`https://demo1.cybersoft.edu.vn/detail/${filmId}`);

    })
})