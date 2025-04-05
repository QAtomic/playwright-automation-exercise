import { test } from "@playwright/test";
import { LoginPageFunctions } from "../pageFunctions/loginPageFunctions";
import { LoginPage } from "../pages/loginPage";


test.describe("Login Page Tests", () => {

    test('Invalid Login', async ({ page }) => {
        const loginPageFunctions = new LoginPageFunctions(page);
        loginPageFunctions.asAnUnauthenticatedUserOnLoginPage();

        const loginPage = new LoginPage(page);
        await loginPage.enterCredentialsAndSubmit("Drew@Atomic.com","InvalidPassword");
        await loginPage.verifyIncorrectEmailOrPasswordMessageDisplays();

    });

});