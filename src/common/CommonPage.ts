import { Page } from "@playwright/test";
import { BasePage } from "@src/base/BasePage";
import { TopBarNavigation } from "@src/components/TopBarNavigation";

export class CommonPage extends BasePage {

    readonly topBarNavigation: TopBarNavigation;

    constructor(page: Page) {
        super(page);
        this.topBarNavigation = new TopBarNavigation(page);
    }
}