import * as dotenv from 'dotenv';
dotenv.config();

import { test as fixture } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";

export { expect } from "@playwright/test";

type TFixture = {
    homePage: HomePage
};

export const asAnAuthenticatedUserOnHomePage = fixture.extend<TFixture>({

    homePage: async ({ page }, use, testInfo) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.enterValidCredentialsAndSubmit(testInfo.project.name);

        await use (homePage);
    }
});