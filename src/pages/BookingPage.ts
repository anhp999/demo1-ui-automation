
import { Locator, Page } from "@playwright/test";
import { CommonPage } from "@src/common/CommonPage";
type BookingDetailsEle = 'price' | 'cine' | 'address' | 'screen' | 'showtimes' | 'movie' | 'seats'
export class BookingPage extends CommonPage {

    private readonly bookingDetailsRoot = this.page.locator("//div[contains(@class,'MuiGrid-root')]//div[contains(@class,'jss16')]")
    private readonly btnAvailableSeats = this.page.locator('//button[not(@disabled)]')
    private readonly btnBooking = this.page.getByRole('button', { name: 'ĐẶT VÉ' })
    private readonly btnVipSeats = this.page.locator("//button[contains(@class,'jss27'))]")
    private readonly btnNormalSeats = this.page.locator("//button[not(contains(@class,'jss27')) and not(@disabled)]")
    private readonly txtPrice = this.page.locator("//div[contains(@class,'jss16')]//p[contains(@class,'MuiTypography-body1')]")
    // private readonly txtSeats = this.page.locator("//div[contains(@class,'jss16')]//p[contains(@class,'jss19')]")
    private readonly txtAlertTitle = this.page.locator("#swal2-title")
    private readonly btnClose = this.page.locator(".swal2-close")
    constructor(page: Page) {
        super(page);
    }

    getSeatByNumber(seatNumber: string) {
        return this.page.getByRole('button', { name: seatNumber, exact: true });
    }

    async getTxtTitle() {
        return this.getText(this.txtAlertTitle)
    }
    async clickBtnClose() {
        await this.btnClose.click()
    }

    async getDetailEle(ele: BookingDetailsEle) {
        let index = 0
        switch (ele) {
            case 'price':
                break;
            case 'cine':
                index = 1
                break;
            case 'address':
                index = 2
                break;
            case 'screen':
                index = 3
                break;
            case 'showtimes':
                index = 4
                break;
            case 'movie':
                index = 5
                break;
            case 'seats':
                index = 6
                break;
        }

        const locator = this.bookingDetailsRoot.nth(index)
        return this.getText(locator)
    }


    async clickNormalSeat(numOfSeats: number) {
        let totalPrices = 0
        const availSeats = this.btnNormalSeats
        const count = await availSeats.count();
        if (count === 0) return totalPrices;
        
        const clicked = new Set<number>();
        while (clicked.size < numOfSeats) {
            const idx = Math.floor(Math.random() * count);
            if (!clicked.has(idx)) {
                await availSeats.nth(idx).click();
                clicked.add(idx);
                totalPrices += await this.getPrices()
            }
        }

        return totalPrices
    }

    async totalSeats(): Promise<number> {
        const vipSeats = await this.btnVipSeats.count()
        const normalSeats = await this.btnNormalSeats.count()
        return vipSeats + normalSeats
    }

    async clickBooking() {
        await this.btnBooking.click()
    }

    async getPrices(): Promise<number> {
        return parseInt(await this.txtPrice.innerText())
    }
}