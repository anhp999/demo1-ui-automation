import { Locator, Page } from "@playwright/test";
import { CommonPage } from "@src/pages/common/CommonPage";
import { BookingPage } from "./BookingPage";

export class DetailPage extends CommonPage {
    private readonly gridParent = this.page.locator("//div[contains(@class,'MuiGrid-container') and contains(@class,'jss24')]");

    private readonly lblDate = this.gridParent.locator("//h4[contains(@class,'MuiTypography-h4')]");
    private readonly lblTitle = this.page.locator("//h1[contains(@class,'MuiTypography-h1')]");
    private readonly lblDuration = this.page.locator("//h5[contains(@class,'MuiTypography-h5')]");
    private readonly btnBuyTicket = this.page.locator("//a[normalize-space()='Mua vé']");

    private readonly imgOuterCircle = this.page.locator('circle').first()
    private readonly lblScore = this.page.locator("div.MuiTypography-caption");
    private readonly icoRating = this.gridParent.locator("//span[contains(@class,'MuiRating-root')]");
    private readonly icoStarFilled = this.icoRating.locator(".MuiRating-iconFilled");
    private readonly icoStars = this.icoRating.locator('.MuiRating-icon')

    private readonly lblShowtimes = this.page.locator("//a[contains(@class,'jss40')]");
    private readonly banner = this.page.locator('.jss19')
    private readonly btnPlay = this.page.locator('button.MuiFab-root')
    private readonly icoPlay = this.page.locator('img[alt="video-button"]')
    private readonly modalVideo = this.page.locator('[role="dialog"]')

    constructor(page: Page) {
        super(page);
    }

    getBanner(): Locator {
        return this.banner
    }

    getBtnPlay() {
        return this.btnPlay
    }

    getIcoPlay() {
        return this.icoPlay
    }

    getModalTrailer() {
        return this.modalVideo
    }

    async getFirstShowtimes() {
        return this.getText(this.lblShowtimes.nth(0))
    }

    async pickFirstShowtimes(): Promise<BookingPage> {
        await this.lblShowtimes.nth(0).click()

        return new BookingPage(this.page)
    }

    async clickPlay() {
        await this.btnPlay.click()
    }

    async clickBuy() {
        await this.btnBuyTicket.click()
    }

    async getTotalStars() {
        const stars = await this.icoStars.count()
        return stars
    }
    
    async getFilledStars() {
        const stars = await this.icoStarFilled.count()
        return stars
    }

    async getScore() {
        return await this.getText(this.lblScore)
    }

    async getTitle() {
        return await this.getText(this.lblTitle)
    }

    async getDate() {
        return await this.getText(this.lblDate)
    }

    async getDuration() {
        return await this.getText(this.lblDuration)
    }
}