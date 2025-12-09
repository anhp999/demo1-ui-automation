import { Locator, Page } from "@playwright/test";
import { CommonPage } from "../common/CommonPage";
import { LoginPage } from "./LoginPage";
export type RegisterForm = {
    username: string
    pwd: string
    confirmPwd: string
    fullname: string
    email: string
}
type RegisterFields = 'account' | 'pwd' | 'confirm_pwd' | 'fullname' | 'email'
export class RegisterPage extends CommonPage {

    private readonly txtAccountRegis = this.page.getByRole('textbox', { name: 'Tài Khoản' });
    private readonly txtPwdRegis = this.page.getByRole('textbox', { name: 'Mật Khẩu', exact: true });
    private readonly txtConfirmPwd = this.page.getByRole('textbox', { name: 'Nhập lại mật khẩu' });
    private readonly txtFullName = this.page.getByRole('textbox', { name: 'Họ Tên' });
    private readonly txtEmail = this.page.getByRole('textbox', { name: 'Email' });
    
    readonly btnRegis = this.page.getByRole('button', { name: 'Đăng ký' });
    readonly btnClose = this.page.getByRole('button', { name: 'Đóng' })
    
    readonly lblRegisMsg = this.page.getByRole('heading', { name: 'Đăng ký thành công' });
    readonly lnkLogin = this.page.getByRole('link', { name: 'Bạn đã có tài khoản? Đăng nhập' });
    readonly lblUNAlertInfo = this.page.locator('#taiKhoan-helper-text') 
    readonly lblFNAlertInfo = this.page.locator('#hoTen-helper-text')
    readonly lblEAlertInfo = this.page.locator('#email-helper-text')
    readonly lblPwdAlertInfo = this.page.locator('#matKhau-helper-text')
    readonly lblConfPwdAlertInfo = this.page.locator('#confirmPassWord-helper-text')
    readonly lnkRegister = this.page.getByRole('link', { name: 'Đăng Ký' })

    readonly icoRegis = this.page.locator('.MuiAvatar-root')
    readonly icoHiddenPwd = this.page.getByRole('button').first()
    readonly icoHiddenConfirmPwd = this.page.getByRole('button').nth(1)
    
    readonly lblTitle = this.page.getByRole('heading', { name: 'Đăng ký', exact: true });
    readonly lblAccount = this.page.locator('#taiKhoan-label')
    readonly lblPwd = this.page.locator('#matKhau-label')
    readonly lblConfirmPwd = this.page.locator('#confirmPassWord-label')
    readonly lblFullName = this.page.locator('#hoTen-label')
    readonly lblEmail = this.page.locator('#email-label')

    //error locator
    readonly lblAlert = this.page.getByRole('alert')
    readonly icoAlert = this.page.getByRole('alert').locator('svg')
    
    readonly taikhoan = this.page.locator('.MuiOutlinedInput-root.Mui-error fieldset')
    constructor(page: Page) {
        super(page);
    }

    getTxtAccountRegis(): Locator {
        return this.txtAccountRegis;
    }

    getRegisMsgLocator(): Locator {
        return this.lblRegisMsg;
    }

    getlnkLogin(): Locator {
        return this.lnkLogin
    }

    getlblUNAlertInfo(): Locator {
        return this.lblUNAlertInfo
    }

    getlblFNAlertInfo(): Locator {
        return this.lblFNAlertInfo
    }

    getlblEAlertInfo(): Locator {
        return this.lblEAlertInfo
    }

    getlblPwdAlertInfo(): Locator {
        return this.lblPwdAlertInfo
    }

    getlblConfPwdAlertInfo(): Locator {
        return this.lblConfPwdAlertInfo
    }


    getlblAlert(): Locator {
        return this.lblAlert
    }

    getIcoAlert(): Locator {
        return this.icoAlert
    }

    getBtnClose(): Locator {
        return this.btnClose
    }

    getFieldsetBy(locator: Locator): Locator {
        const outline = locator
            .locator('xpath=ancestor::div[contains(@class, "MuiOutlinedInput-root")]')
            .locator('fieldset');
        return outline
    }

    getIconHiddenPwd() {
        return this.icoHiddenPwd
    }

    getIconHiddenConfirmPwd() {
        return this.icoHiddenConfirmPwd
    }

    getTxtPwdRegis() {
        return this.txtPwdRegis
    }

    getTxtConfirmPwd() {
        return this.txtConfirmPwd
    }


    getFields (fields: RegisterFields): Locator {
        let locator: Locator
        switch (fields) {
            case 'account':
                locator = this.txtAccountRegis
                break
            case 'pwd':
                locator = this.txtPwdRegis
                break
            case 'confirm_pwd':
                locator = this.txtConfirmPwd
                break
            case 'fullname':
                locator = this.txtFullName
                break
            case 'email':
                locator = this.txtEmail
                break
            default:
                throw new Error('Field Is Not Existed')
        }

        return this.getFieldsetBy(locator)
    }

    async rightClick() {
        await this.lnkLogin.click({
            button: 'right'
        })

        return this.lnkLogin
    }

    async focusInputFields(field: RegisterFields): Promise<void> {
        switch (field) {
            case "account":
                await this.focus(this.txtAccountRegis)
            case "pwd":
                await this.focus(this.txtPwdRegis)
            case "confirm_pwd":
                await this.focus(this.txtConfirmPwd)
            case "fullname":
                await this.focus(this.txtFullName)
            case "email":
                await this.focus(this.txtEmail)
            default:
                break
        }
    }

    async enterAccount(value: string) {
        await this.fill(this.txtAccountRegis, value);
    }

    async enterPassword(value: string) {
        await this.fill(this.txtPwdRegis, value)
    }
    
    async enterConfirmPassword(value: string) {
        await this.fill(this.txtConfirmPwd, value)
    }
    
    async enterFullName(value: string) {
        await this.fill(this.txtFullName, value)
    }

    async enterEmail(value: string) {
        await this.fill(this.txtEmail, value)
    }

    async clickRegister() {
        await this.click(this.btnRegis);
    }

    async directToLogin(): Promise<LoginPage> {
        await this.click(this.lnkLogin);

        return new LoginPage(this.page)
    }

    async directToRegisterPage(): Promise<Locator> {
        await this.click(this.lnkRegister);

        return this.lblTitle
    }

    async register(regisFields: RegisterForm): Promise<LoginPage> {
        const { username, pwd, confirmPwd, email, fullname } = regisFields
        await this.enterAccount(username);
        await this.enterPassword(pwd);
        await this.enterConfirmPassword(confirmPwd);
        await this.enterFullName(fullname);
        await this.enterEmail(email);
        await this.click(this.btnRegis);

        return new LoginPage(this.page)
    }

    async getRegisMessage(): Promise<string | null> {
        return await this.getText(this.lblRegisMsg)
    }

    async getUNAlertInfo(): Promise<string | null> {
        return await this.getText(this.lblUNAlertInfo)
    }

    async getFNAlertInfo(): Promise<string | null> {
        return await this.getText(this.lblFNAlertInfo)
    }

    async getEAlertInfo(): Promise<string | null> {
        return await this.getText(this.lblEAlertInfo)
    }

    async getPwdAlertInfo(): Promise<string | null> {
        return await this.getText(this.lblPwdAlertInfo)
    }
    
    async getConfPwdAlertInfo(): Promise<string | null> {
        return await this.getText(this.lblConfPwdAlertInfo)
    }

    async getTextLblAccount(): Promise<string | null> {
        return await this.getText(this.lblAccount)
    }

    async getTextLblPwd(): Promise<string | null> {
        return await this.getText(this.lblPwd)
    }

    async getTextLblConfirmPwd(): Promise<string | null> {
        return await this.getText(this.lblConfirmPwd)
    }

    async getTextLblFullName(): Promise<string | null> {
        return await this.getText(this.lblFullName)
    }

    async getTextLblEmail(): Promise<string | null> {
        return await this.getText(this.lblEmail)
    }

    async togglePassword() {
        await this.icoHiddenPwd.click()
    }

    async getTxtTitle(): Promise<string | null> {
        return await this.getText(this.lblTitle)
    }
}