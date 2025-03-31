import { test as fixture } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

export { expect } from "@playwright/test";

type TFixture = {
    loginPage: LoginPage,
    homePage: HomePage
};

export const asAnUnauthenticatedUserOnLoginPage = fixture.extend<TFixture>({

    loginPage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await homePage.clickLogin();

        await use (new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use (new HomePage(page));
    }
});