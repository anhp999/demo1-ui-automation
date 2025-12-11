import { Page } from "@playwright/test";
import { BasePage } from "@src/base/BasePage";
import { QuickBookingWidget } from "@src/components/QuickBookingWidget";
import { TopBarNavigation } from "@src/components/TopBarNavigation";

export class CommonPage extends BasePage {

    readonly topBarNavigation: TopBarNavigation;
    readonly quickBookingWidget: QuickBookingWidget

    constructor(page: Page) {
        super(page);
        this.topBarNavigation = new TopBarNavigation(page);
        this.quickBookingWidget = new QuickBookingWidget(page);
    }
}