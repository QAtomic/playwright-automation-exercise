import { test } from "@playwright/test";
import { LoginPageFunctions } from "../pageFunctions/loginPageFunctions";
import { LoginPage } from "../pages/loginPage";


test.describe("Login Page Tests", () => {

    test('Invalid Login', async ({ page }, testInfo) => {
        const loginPageFunctions = new LoginPageFunctions(page, testInfo);
        await loginPageFunctions.asAnUnauthenticatedUserOnLoginPage();

        const loginPage = new LoginPage(page, testInfo);
        await loginPage.enterCredentialsAndSubmit("Drew@Atomic.com","InvalidPassword");
        await loginPage.verifyIncorrectEmailOrPasswordMessageDisplays();

    });

});