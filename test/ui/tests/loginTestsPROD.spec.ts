import { test } from "@playwright/test";
import { LoginPageFunctions } from "../pageFunctions/loginPageFunctions";
import { LoginPage } from "../pages/loginPage";
import { HomePageFunctions } from "../pageFunctions/homePageFunctions";
import { HomePage } from "../pages/homePage";


test.describe("Login Tests", () => {

    
    test('Valid Login', async ({ page }, testInfo) => { 
        const homePageFunctions = new HomePageFunctions(page, testInfo);
        await homePageFunctions.asAnAuthenticatedUserOnHomePage();
    
        const homePage = new HomePage(page, testInfo);
        await homePage.verifyUserIsLoggedIn();
    });
    
    
    test('Invalid Login', async ({ page }, testInfo) => {
        const loginPageFunctions = new LoginPageFunctions(page, testInfo);
        await loginPageFunctions.asAnUnauthenticatedUserOnLoginPage();

        const loginPage = new LoginPage(page, testInfo);
        await loginPage.enterCredentialsAndSubmit("Drew@Atomic.com","InvalidPassword");
        await loginPage.verifyIncorrectEmailOrPasswordMessageDisplays();

    });


    test('Login Page Required Fields', async ({ page }, testInfo) => {
        const loginPageFunctions = new LoginPageFunctions(page, testInfo);
        await loginPageFunctions.asAnUnauthenticatedUserOnLoginPage();

        const loginPage = new LoginPage(page, testInfo);
        await loginPage.verifyRequiredFields();
    });

});