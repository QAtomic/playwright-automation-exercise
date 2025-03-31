import { test as fixture } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

export { expect } from "@playwright/test";

type TFixture = {
    homePage: HomePage
};

export const asAnAuthenticatedUserOnHomePage = fixture.extend<TFixture>({

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.enterCredentialsAndSubmit("Drew@Atomic.com","Aq1!Sw2@");

        await use (homePage);
    }
});