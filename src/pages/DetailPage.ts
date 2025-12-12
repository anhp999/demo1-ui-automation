import { Page } from "@playwright/test";
import { CommonPage } from "@src/common/CommonPage";

export class DetailPage extends CommonPage {
    private readonly gridParent = this.page.locator("//div[contains(@class,'MuiGrid-container') and contains(@class,'jss24')]");
    private readonly imgEle = this.page.locator('.MuiGrid-root.jss14')
    private readonly gridListCinesEle = this.page.locator('#cinemaList')

    private readonly lblDate = this.gridParent.locator(".//h4[contains(@class,'MuiTypography-h4')]");
    private readonly lblTitle = this.gridParent.locator(".//h1[contains(@class,'MuiTypography-h1')]");
    private readonly lblDuration = this.gridParent.locator(".//h5[contains(@class,'MuiTypography-h5')]");
    private readonly btnBuy = this.gridParent.locator(".//a[normalize-space()='Mua vé']");

    private readonly imgOuterCircle = this.page.locator('circle').first()
    private readonly lblScore = this.gridParent.locator("div.MuiTypography-caption");
    private readonly icoRating = this.gridParent.locator("//span[contains(@class,'MuiRating-root')]");
    private readonly icoStarFilled = this.icoRating.locator(".MuiRating-iconFilled");
    private readonly icoStars = this.icoRating.locator('.MuiRating-icon')

    private readonly lblShowtimes = this.gridListCinesEle.locator(".//a[contains(@class,'jss40')]");


    constructor(page: Page) {
        super(page);
    }

    getLblDate() {
        return this.lblDate
    }

    getLblTitle() {
        return this.lblTitle
    }

    getLblDuration() {
        return this.lblDuration
    }

    getImgEle() {
        return this.imgEle
    }

    
}