import { Locator, Page } from "@playwright/test";

type PlaywrightLocator = string | Locator;

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async click(locator: PlaywrightLocator) {
        if(typeof locator === 'string')
            await this.page.locator(locator).click()
        else
            await locator.click();
    }

    async fill(locator: PlaywrightLocator, value: string) {
        if(typeof locator === 'string')
            await this.page.locator(locator).fill(value);
        else
            await locator.fill(value);
    }

    async focus(locator: PlaywrightLocator) {
        if(typeof locator === 'string')
            await this.page.locator(locator).focus();
        else
            await locator.focus();
    }

    async hover(locator: PlaywrightLocator) {
        if(typeof locator === 'string')
            await this.page.locator(locator).hover();
        else
            await locator.hover();
    }

    async getText(locator: PlaywrightLocator): Promise<string | null> {
        if(typeof locator === 'string')
            return await this.page.locator(locator).textContent({timeout: 10000});
        else
            return await locator.textContent({timeout: 10000});
    }
}