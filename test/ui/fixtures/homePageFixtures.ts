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

        let username;
        let password;
        if (testInfo.project.name === 'production-validation') {
            username = process.env.PROD_EMAIL as string;
            password = process.env.PROD_PASSWORD as string;
        } else {
            username = process.env.QA_EMAIL as string;
            password = process.env.QA_PASSWORD as string;
        }
        const loginPage = new LoginPage(page);
        console.log(username);
        console.log(password);
        await loginPage.enterCredentialsAndSubmit(username,password);

        await use (homePage);
    }
});