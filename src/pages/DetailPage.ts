import { Page } from "@playwright/test";
import { CommonPage } from "@src/common/CommonPage";

export class DetailPage extends CommonPage {

    constructor(page: Page) {
        super(page);
    }
}