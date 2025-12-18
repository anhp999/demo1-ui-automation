import { Locator, Page } from "@playwright/test";
import { BasePage } from "@src/pages/base/BasePage";

export class TopBarNavigation extends BasePage {

    readonly lnkLogin = this.page.locator("//h3[text()='Đăng Nhập']");
    readonly lnkRegister = this.page.locator("//a[@href='/sign-up']");
    readonly lnkLogout = this.page.getByRole('link', { name: 'Đăng xuất' })
    readonly menuItem = "//div[@text='%s']"; //xpath string dynamic
    readonly userProfile = "Avatar %s";

    readonly lblLogoutMsg = this.page.locator("#swal2-title")
    readonly btnConfirmLogout = this.page.getByRole('button', { name: 'Đồng ý' })
    readonly btnCancelLogout = this.page.getByRole('button', { name: 'Hủy' })

    constructor(page: Page) {
        super(page);
    }

    getLnkLogin():Locator {
        return this.lnkLogin
    }

    getUserProfileLocator(userName: string): Locator {
        let expectedUserProfile = this.userProfile.replace('%s', userName);
        return this.page.getByRole('link', { name: `${expectedUserProfile}` })
    }

    async navigateLoginPage() {
        await this.click(this.lnkLogin);
    }

    async navigateRegisterPage() {
        await this.click(this.lnkRegister);
    }

    async logout() {
        await this.click(this.lnkLogout);
        await this.click(this.btnConfirmLogout);
    }

    async openMenuItem(item: string) {
        // String menuItemXpath = String.format(menuItem, item); // Java
        let menuItemXpath: string = this.menuItem.replace('%s', item); // String locator
        // this.page.locator(menuItemXpath).click(); // Locator tuong ung voi WebElement
        this.click(menuItemXpath); //goi click cua BasePage
    }
}