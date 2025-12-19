
import { Locator, Page } from "@playwright/test";
import { ROUTES } from "@src/config/routes";
import { CommonPage } from "@src/pages/common/CommonPage";
import { replacePath } from "@src/utils/utils";
type BookingDetailsEle = 'price' | 'cine' | 'address' | 'screen' | 'showtimes' | 'movie' | 'seats'
export class BookingPage extends CommonPage {

    static readonly path = ROUTES.PURCHASEITEM
    private readonly bookingDetailsRoot = this.page.locator("//div[contains(@class,'MuiGrid-root')]//div[contains(@class,'jss16')]")
    private readonly btnNormalSeats = this.page.locator("//button[not(contains(@class,'jss27'))]")
    private readonly btnVipSeats = this.page.locator("//button[contains(@class,'jss27'))]")

    private readonly btnBooking = this.page.getByRole('button', { name: 'ĐẶT VÉ' })
    private readonly btnAvailVipSeats = this.page.locator("//button[contains(@class,'jss27')) and not(@disabled)]")
    private readonly btnAvailNormalSeats = this.page.locator("//button[not(contains(@class,'jss27')) and not(@disabled)]")
    private readonly txtPrice = this.page.locator("//div[contains(@class,'jss16')]//p[contains(@class,'MuiTypography-body1')]")
    private readonly txtAlertTitle = this.page.locator("#swal2-title")
    private readonly txtAlertContent = this.page.locator("#swal2-content")
    private readonly btnClose = this.page.locator(".swal2-close")
    private readonly btnConfirm = this.page.getByRole('button', { name: 'Đồng ý' })
    private readonly btnDeny = this.page.getByRole('button', { name: 'Không' })

    constructor(page: Page) {
        super(page);
    }

    async openPageById(itemId: string): Promise<string> {
        const fullPath = this.getPathByParamId(itemId)
        await this.navigateTo(fullPath)
        return fullPath
    }

    getPathByParamId(id: string) {
        return replacePath(BookingPage.path,':id', id)
    }

    getBtnConfirm() {
        return this.btnConfirm
    }

    getBtnDeny() {
        return this.btnDeny
    }

    async getNumOfVipSeats() {
        const numOfVipS = this.btnVipSeats
        return numOfVipS.count()
    }
    
    async getNumOfNormalSeats() {
        const numOfNormalS = this.btnNormalSeats
        return numOfNormalS.count()
    }

    async getTxtTitle() {
        return this.getText(this.txtAlertTitle)
    }
    
    async getTxtAlertContent() {
        return this.getText(this.txtAlertContent)
    }

    async clickBtnClose() {
        await this.btnClose.click()
    }

    async clickBtnConfirm() {
        await this.btnConfirm.click()
    }

    async clickBtnDeny() {
        await this.btnDeny.click()
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
        const availSeats = this.btnAvailNormalSeats
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
        const vipSeats = await this.getNumOfVipSeats()
        const normalSeats = await this.getNumOfNormalSeats()
        return vipSeats + normalSeats
    }

    async clickBooking() {
        await this.btnBooking.click()
    }

    async getPrices(): Promise<number> {
        return parseInt(await this.txtPrice.innerText())
    }
}