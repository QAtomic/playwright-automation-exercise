import { test } from "@playwright/test";
import { LoginPageFunctions } from "../pageFunctions/loginPageFunctions";
import { LoginPage } from "../pages/loginPage";
import { HomePageFunctions } from "../pageFunctions/homePageFunctions";
import { HomePage } from "../pages/homePage";


test.describe("Login Tests", () => {

    test.use({ storageState: 'playwright/.auth/noAuth.json' });
    
    test('Valid Login @PROD', async ({ page }, testInfo) => { 
        const homePageFunctions = new HomePageFunctions(page, testInfo);
        await homePageFunctions.asAnAuthenticatedUserOnHomePage();
    
        const homePage = new HomePage(page, testInfo);
        await homePage.verifyUserIsLoggedIn();
    });
    
    
    test('Invalid Login @PROD', async ({ page }, testInfo) => {
        const loginPageFunctions = new LoginPageFunctions(page, testInfo);
        await loginPageFunctions.asAnUnauthenticatedUserOnLoginPage();

        const loginPage = new LoginPage(page, testInfo);
        await loginPage.enterCredentialsAndSubmit("Drew@Atomic.com","InvalidPassword");
        await loginPage.verifyIncorrectEmailOrPasswordMessageDisplays();

    });


    test('Login Page Required Fields @PROD', async ({ page }, testInfo) => {
        const loginPageFunctions = new LoginPageFunctions(page, testInfo);
        await loginPageFunctions.asAnUnauthenticatedUserOnLoginPage();

        const loginPage = new LoginPage(page, testInfo);
        await loginPage.verifyRequiredFields();
    });


    test('Example New Requirement', {
        annotation : [
            { type : 'Current Sprint', description : 'AUT-212' }
        ]
    }, async ({ page }, testInfo) => {
        const loginPageFunctions = new LoginPageFunctions(page, testInfo);
        await loginPageFunctions.asAnUnauthenticatedUserOnLoginPage();

        testInfo.fail(true, "Development In Progress");
    })
});