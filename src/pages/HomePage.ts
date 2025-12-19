import { Page } from "@playwright/test";
import { ROUTES } from "@src/config/routes";
import { CommonPage } from "@src/pages/common/CommonPage";

export class HomePage extends CommonPage {
    static readonly path = ROUTES.HOME
    constructor(page: Page) {
        super(page);
    }

    async open() {
        await this.navigateTo(HomePage.path)
    }
}