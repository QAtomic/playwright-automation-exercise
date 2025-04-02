import * as dotenv from 'dotenv';
dotenv.config();

import { test as fixture } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginFunction } from '../fixtureFunctions/loginFunction';

export { expect } from "@playwright/test";

type TFixture = {
    homePage: HomePage
};

export const asAnAuthenticatedUserOnHomePage = fixture.extend<TFixture>({

    homePage: async ({ page }, use, testInfo) => {
        const loginFunction = new LoginFunction(page);
        await loginFunction.loginWithValidCredentials(testInfo.project.name);

        const homePage = new HomePage(page);
        await use (homePage);
    }
});