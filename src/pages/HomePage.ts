import { Page } from "@playwright/test";
import { CommonPage } from "@src/pages/common/CommonPage";

export class HomePage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }
}