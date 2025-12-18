import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./common/CommonPage";
import { RegisterPage } from "./RegisterPage";
import { ROUTES } from "@src/config/routes";
type LoginFields = 'account' | 'pwd'

export class LoginPage extends CommonPage {

    protected path = ROUTES.login
    readonly txtAccountLogin = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    readonly txtPasswordLogin = this.page.getByRole('textbox', { name: 'Mật Khẩu' });
    readonly btnLogin = this.page.getByRole('button', { name: 'Đăng nhập' });
    readonly lblLoginMsg = this.page.getByRole('heading', { name: 'Đăng nhập thành công' });
    readonly lblTitle = this.page.getByRole('heading', { name: 'Đăng nhập', exact: true });
    readonly icoHiddenPwd = this.page.getByRole('button').first()
    readonly lnkRegis = this.page.getByRole('link', { name: 'Bạn chưa có tài khoản? Đăng ký' })
    readonly lblAccount = this.page.locator('#taiKhoan-label')
    readonly lblPwd = this.page.locator('#matKhau-label')
    readonly lblUNAlertInfo = this.page.locator('#taiKhoan-helper-text') 
    readonly lblPwdAlertInfo = this.page.locator('#matKhau-helper-text')

    readonly chkRememberMe = this.page.locator("//input[@name='remember']")
    readonly lblAlert = this.page.getByRole('alert')

    constructor(page: Page) {
        super(page);
    }

    getLoginMsgLocator(): Locator {
        return this.lblLoginMsg;
    }

    getTxtPasswordLogin(): Locator {
        return this.txtPasswordLogin
    }

    getLnkRegis(): Locator {
        return this.lnkRegis
    }

    getTxtAccountLogin(): Locator {
        return this.txtAccountLogin
    }

    getLblUNAlertInfo(): Locator {
        return this.lblUNAlertInfo
    }

    getLblPwdAlertInfo(): Locator {
        return this.lblPwdAlertInfo
    }

    getFieldsetBy(locator: Locator): Locator {
        const outline = locator
            .locator('xpath=ancestor::div[contains(@class, "MuiOutlinedInput-root")]')
            .locator('fieldset');
        return outline
    }

    getLblTitle(): Locator {
        return this.lblTitle
    }

    getLblAlert(): Locator {
        return this.lblAlert
    }

    async enterUserName(value: string) {
        await this.fill(this.txtAccountLogin, value);
    }

    async enterPassword(value: string) {
        await this.fill(this.txtPasswordLogin, value)
    }

    async clickLogin() {
        await this.click(this.btnLogin);
    }

    async login(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.click(this.btnLogin);
    }

    async loginByEnter(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.page.keyboard.press('Enter');
    }

    async getLoginMessage(): Promise<string | null> {
        return await this.getText(this.lblLoginMsg)
    }

    async getTxtTitle(): Promise<string | null> {
        return await this.getText(this.lblTitle)
    }

    async togglePassword() {
        await this.icoHiddenPwd.click()
    }

    async rightClick() {
        await this.lnkRegis.click({
            button: 'right'
        })

        return this.lnkRegis
    }

    async directToRegister(): Promise<RegisterPage> {
        await this.click(this.lnkRegis);

        return new RegisterPage(this.page)
    }

    async getLblAccount(): Promise<string | null> {
        return await this.getText(this.lblAccount)
    }

    async getLblPwd(): Promise<string | null> {
        return await this.getText(this.lblPwd)
    }

    async focusInputFields(field: LoginFields): Promise<void> {
        switch (field) {
            case "account":
                await this.focus(this.txtAccountLogin)
            case "pwd":
                await this.focus(this.txtPasswordLogin)
            default:
                break
        }
    }

    getFields(fields: LoginFields): Locator {
        let locator: Locator
        switch (fields) {
            case 'account':
                locator = this.txtAccountLogin
                break
            case 'pwd':
                locator = this.txtPasswordLogin
                break
            default:
                throw new Error('Field Is Not Existed')
        }

        return this.getFieldsetBy(locator)
    }

    async getUNAlertInfo(): Promise<string | null> {
        return await this.getText(this.lblUNAlertInfo)
    }

    async getPwdAlertInfo(): Promise<string | null> {
        return await this.getText(this.lblPwdAlertInfo)
    }

    async toggleRememberMe() {
        await this.click(this.chkRememberMe)
    }

}