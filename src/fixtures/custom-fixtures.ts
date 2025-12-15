import { RegisterPage } from "@src/pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { test as base } from '@playwright/test';
import { DetailPage } from "@src/pages/DetailPage";
import { BookingPage } from "@src/pages/BookingPage";

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  detailPage: DetailPage;
  bookingPage: BookingPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page);

    // Use the fixture value in the test.
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },
  detailPage: async ({ page }, use) => {
    const detailPage = new DetailPage(page);

    await use(detailPage);
  },
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);

    await use(bookingPage);
  },
});
export { expect } from '@playwright/test';