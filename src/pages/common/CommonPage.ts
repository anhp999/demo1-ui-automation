import { Page } from "@playwright/test";
import { BasePage } from "@src/pages/base/BasePage";
import { QuickBookingWidget } from "@src/pages/components/QuickBookingWidget";
import { TopBarNavigation } from "@src/pages/components/TopBarNavigation";

export class CommonPage extends BasePage {

    readonly topBarNavigation: TopBarNavigation;
    readonly quickBookingWidget: QuickBookingWidget

    constructor(page: Page) {
        super(page);
        this.topBarNavigation = new TopBarNavigation(page);
        this.quickBookingWidget = new QuickBookingWidget(page);
    }
}