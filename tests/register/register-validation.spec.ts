import { generateFullName, generateUsername, generateUser, gnwDataToFile, generateEmailBy, generateStrongPassword, readDataFromSheet } from '@src/utils/utils';
import { test, expect } from '../../src/fixtures/custom-fixtures';

test.describe("Register Validation", () => {
    test("TC-012: Verify entering valid values into the input fields.", async ({ registerPage }) => {

        await registerPage.open()
        const { username, pwd, confirmPwd, email, fullname } = await gnwDataToFile("TC-012")

        const loginPage = await registerPage.register({ username, pwd, confirmPwd, fullname, email })
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")

    });

    test("TC-014: Verify register with empty values", async ({ registerPage }) => {

        await registerPage.open()
        await registerPage.clickRegister()
        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getFields('confirm_pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getUNAlertInfo()).toStrictEqual(actualLblAlert)
        expect(await registerPage.getFNAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblUNAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-015: Verify username with special characters", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('spec-char', 0)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        const actualLblAlert = 'Tài khoản chứa ký tự không hợp lệ !'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-016: Verify username with length = 2", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('len', 2)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        const actualLblAlert = 'Độ dài ký tự không hợp lệ!'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-017: Verify username with length = 3", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('len', 3)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()
    });

    test("TC-018: Verify username with length = 4", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('len', 4)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()
    });

    test("TC-019: Verify username with length = 15", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('len', 15)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()
    });

    test("TC-020: Verify username with length = 14", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('len', 14)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()
    });

    test("TC-021: Verify username with length = 16", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('len', 16)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        const actualLblAlert = 'Độ dài ký tự không hợp lệ!'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-022: “Verify if the username contains bad words.", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('badwords', 0)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        const actualLblAlert = 'Tài khoản chứa ký tự không hợp lệ !'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-023: Verify if the username contains emoji", async ({ registerPage }) => {
        await registerPage.open()

        const invalidUsername = generateUsername('emoji', 0)
        const userInvalidUsername = generateUser({
            username: invalidUsername,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })
        await registerPage.register(userInvalidUsername)
        const actualLblAlert = 'Tài khoản chứa ký tự không hợp lệ !'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-024: Verify if the username is empty", async ({ registerPage }) => {
        await registerPage.open()

        const userInvalidUsername = generateUser()
        await registerPage.register({ ...userInvalidUsername, username: '' })

        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getUNAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblUNAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });
    test("TC-025: Verify if the username contains spaces", async ({ registerPage }) => {
        await registerPage.open()

        const userInvalidUsername = generateUser()
        await registerPage.register({ ...userInvalidUsername, username: '                                              ' })

        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getFields('account')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getUNAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblUNAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-026: Verify if the fullname contains special characters", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('spec-char', 0)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        await registerPage.register(userFNInvalid)
        const actualLblAlert = 'Tài khoản chứa ký tự không hợp lệ !'
        expect(await registerPage.getRegisMessage()).not.toContainEqual("Đăng ký thành công")
        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-027: Verify if the fullname contains special characters", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('digits', 0)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        await registerPage.register(userFNInvalid)
        const actualLblAlert = 'Họ tên chứa ký tự không hợp lệ !'

        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblEAlertInfo()).toHaveText(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    });

    test("TC-028: Verify if the fullname has length = 1", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('len', 1)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        await registerPage.register(userFNInvalid)
        const actualLblAlert = 'Độ dài ký tự không hợp lệ!'

        expect(await registerPage.getRegisMessage()).not.toContainEqual("Đăng ký thành công")
        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblEAlertInfo()).toHaveText(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    });

    test("TC-029: Verify if the fullname has length = 2 and direct to login page", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('len', 2)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        const loginPage = await registerPage.register(userFNInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-030: Verify if the fullname has length = 3 and direct to login page", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('len', 3)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        const loginPage = await registerPage.register(userFNInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-031: Verify if the fullname has length = 50 and direct to login page", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('len', 50)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        const loginPage = await registerPage.register(userFNInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-032: Verify if the fullname has length = 49 and direct to login page", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('len', 49)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        const loginPage = await registerPage.register(userFNInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-033: Verify if the fullname has length = 51 and direct to login page", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('len', 51)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        await registerPage.register(userFNInvalid)

        const actualLblAlert = 'Độ dài ký tự không hợp lệ!'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblEAlertInfo()).toHaveText(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('border-color', 'rgb(244, 67, 54)')
    });

    test("TC-034: Verify if the fullname contains bad words", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('badwords', 0)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        await registerPage.register(userFNInvalid)

        const actualLblAlert = 'Tài khoản chứa ký tự không hợp lệ !'

        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-035: Verify if the fullname contains emoji", async ({ registerPage }) => {
        await registerPage.open()

        const invalidFN = generateFullName('emoji', 0)
        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: invalidFN,
            email: ''
        })

        await registerPage.register(userFNInvalid)

        const actualLblAlert = 'Tài khoản chứa ký tự không hợp lệ !'

        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-036: Verify if the fullname is empty", async ({ registerPage }) => {
        await registerPage.open()

        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userFNInvalid, fullname: '' })

        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getFNAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblFNAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-037: Verify if the fullname contains spaces", async ({ registerPage }) => {
        await registerPage.open()

        const userFNInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userFNInvalid, fullname: '             ' })

        const actualLblAlert = 'Họ tên chứa ký tự không hợp lệ !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('fullname')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-038: Verify if the Email contains emoji", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: '🤫🤫🤫🤫🤫🤫@test.com'
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Email chứa ký tự không hợp lệ !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-039: Verify if the Email has wrong format", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: 'catar045poesd.com'
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Email sai định dạng !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-040: Verify if the Email has length = 4", async ({ registerPage }) => {
        await registerPage.open()

        const email = generateEmailBy(4)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Độ dài ký tự không hợp lệ'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-041: Verify if the Email has length = 5", async ({ registerPage }) => {
        await registerPage.open()

        const email = generateEmailBy(5)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email
        })

        const loginPage = await registerPage.register(userEmailInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });
    test("TC-042: Verify if the Email has length = 6", async ({ registerPage }) => {
        await registerPage.open()

        const email = generateEmailBy(6)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email
        })

        const loginPage = await registerPage.register(userEmailInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-043: Verify if the Email has length = 149", async ({ registerPage }) => {
        await registerPage.open()

        const email = generateEmailBy(149)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email
        })

        const loginPage = await registerPage.register(userEmailInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-044: Verify if the Email has length = 150", async ({ registerPage }) => {
        await registerPage.open()

        const email = generateEmailBy(150)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email
        })

        const loginPage = await registerPage.register(userEmailInvalid)

        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-045: Verify if the Email has length = 151", async ({ registerPage }) => {
        await registerPage.open()

        const email = generateEmailBy(150)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Dữ liệu không hợp lệ!'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toBeVisible()
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
    });

    test("TC-046: Verify if the Email is empty", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userEmailInvalid, email: '' })
        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getEAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-047: Verify if the Email contains only spaces", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userEmailInvalid, email: '                   ' })
        const actualLblAlert = 'Dữ liệu không hợp lệ!'

        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getEAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-048: Verify if the Email contains spaces and characters", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: 'catar  045@poesd.com'
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Dữ liệu không hợp lệ!'

        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getEAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });
    test("TC-049: Verify if the email contains consecutive dots.", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: 'catar..045@poesd.com'
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Dữ liệu không hợp lệ!'

        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getEAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });
    test("TC-050: Verify if the email starts with consecutive dots.", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: '.catar045@poesd.com'
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Dữ liệu không hợp lệ!'

        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getEAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });
    test("TC-051: Verify if the email without top-level domain", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: 'fatimatest015@poesd'
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Dữ liệu không hợp lệ!'

        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getEAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });
    test("TC-052: Verify when the email address contains consecutive dots after the domain", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: 'fatimatest016@poesd..com'
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Dữ liệu không hợp lệ!'

        expect(registerPage.getFields('email')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getEAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblEAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-053: Verify when the password valid", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        const loginPage = await registerPage.register(userEmailInvalid)
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-054: Verify if password's length = 7", async ({ registerPage }) => {
        await registerPage.open()

        const password = generateStrongPassword(7)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Độ dài ký tự không hợp lệ'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-058: Verify if password's length = 33", async ({ registerPage }) => {
        await registerPage.open()

        const password = generateStrongPassword(33)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Độ dài ký tự không hợp lệ'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-056: Verify if password's length = 31", async ({ registerPage }) => {
        await registerPage.open()

        const password = generateStrongPassword(31)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        const loginPage = await registerPage.register(userEmailInvalid)
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-057: Verify if password's length = 32", async ({ registerPage }) => {
        await registerPage.open()

        const password = generateStrongPassword(32)
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        const loginPage = await registerPage.register(userEmailInvalid)
        expect(await registerPage.getRegisMessage()).toStrictEqual("Đăng ký thành công")
        expect(registerPage.getBtnClose()).toBeVisible()

        expect(registerPage.getTxtAccountRegis()).toBeEmpty()
        expect(await loginPage.getTxtTitle()).toStrictEqual("Đăng nhập")
    });

    test("TC-059: Verify if password without Upper letter", async ({ registerPage }) => {
        await registerPage.open()

        const password = 'abcdef1!'
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Mật khẩu không hợp lệ'
        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-060: Verify if password without Lower letter", async ({ registerPage }) => {
        await registerPage.open()

        const password = 'ABCDEF1!'
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Mật khẩu không hợp lệ'
        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-061: Verify if password without digits", async ({ registerPage }) => {
        await registerPage.open()

        const password = 'Abcdefgh!'
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Mật khẩu không hợp lệ'
        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-062: Verify if password without special characters", async ({ registerPage }) => {
        await registerPage.open()

        const password = 'Abcdef12'
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: password,
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Mật khẩu không hợp lệ'
        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-063: Verify if password different from confirm password", async ({ registerPage }) => {
        await registerPage.open()

        const password = generateStrongPassword()
        const userEmailInvalid = generateUser({
            username: '',
            pwd: password,
            confirmPwd: 'different',
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Mật khẩu không khớp !'
        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-064: Verify if password and confirm password are empty", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userEmailInvalid, pwd: '', confirmPwd: '' })

        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()

        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')


        expect(registerPage.getFields('confirm_pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getConfPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblConfPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-065: Verify if only confirm password is empty", async ({ registerPage }) => {
        await registerPage.open()

        const pwd = generateStrongPassword()
        const userEmailInvalid = generateUser({
            username: '',
            pwd,
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userEmailInvalid, confirmPwd: '' })

        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()

        expect(registerPage.getFields('confirm_pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getConfPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblConfPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-066: Verify if only password is empty", async ({ registerPage }) => {
        await registerPage.open()

        const pwd = generateStrongPassword()
        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: pwd,
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userEmailInvalid, pwd: '' })

        const actualLblAlert = 'Đây là trường bắt buộc !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()

        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-067: Verify if password and confirm password contain only spaces", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register({ ...userEmailInvalid, pwd: '       ', confirmPwd: '       ' })

        const actualLblAlert = 'Mật khẩu không hợp lệ !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()

        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')


        expect(registerPage.getFields('confirm_pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getConfPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblConfPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-068: Verify if password and confirm password contain emoji", async ({ registerPage }) => {
        await registerPage.open()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '🤫🤫🤫🤫🤫🤫',
            confirmPwd: '🤫🤫🤫🤫🤫🤫',
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Mật khẩu không hợp lệ !'

        expect(registerPage.getRegisMsgLocator()).not.toBeVisible()

        expect(registerPage.getFields('pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')


        expect(registerPage.getFields('confirm_pwd')).toHaveCSS('border-color', 'rgb(244, 67, 54)')
        expect(await registerPage.getConfPwdAlertInfo()).toStrictEqual(actualLblAlert)
        expect(registerPage.getlblConfPwdAlertInfo()).toHaveCSS('color', 'rgb(244, 67, 54)')
    });

    test("TC-069a: Verify if register account that is existed", async ({ registerPage }) => {
        await registerPage.open()

        const data = await readDataFromSheet()

        const userEmailInvalid = generateUser({
            username: data[0].Username,
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: ''
        })

        await registerPage.register(userEmailInvalid)

        const actualLblAlert = 'Tài khoản đã tồn tại!'
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(97, 26, 21)')
    });

    test("TC-069b: Verify if register email that is existed", async ({ registerPage }) => {
        await registerPage.open()

        const data = await readDataFromSheet()

        const userEmailInvalid = generateUser({
            username: '',
            pwd: '',
            confirmPwd: '',
            fullname: '',
            email: data[0].Email
        })

        await registerPage.register(userEmailInvalid)
        const actualLblAlert = 'Email đã tồn tại!'
        expect(registerPage.getlblAlert()).toHaveText(actualLblAlert)
        expect(registerPage.getlblAlert()).toHaveCSS('color', 'rgb(97, 26, 21)')
    });
});
