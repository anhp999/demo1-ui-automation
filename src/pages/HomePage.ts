import { Page } from "@playwright/test";
import { CommonPage } from "@src/common/CommonPage";

export class HomePage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }
}