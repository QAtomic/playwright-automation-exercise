import test from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { DeletedAccountPage } from "../pages/deletedAccountPage";


test.describe("Customer Registration Tests", () => {


    test('New Customer Registration', async ({ page }, testInfo) => {
        const homePage = new HomePage(page, testInfo);
        await homePage.navigateToHomePage();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page, testInfo);
        await loginPage.enterNewUserInfoAndClickSignup();

        const signupPage = new SignupPage(page, testInfo);
        await signupPage.enterAccountInformationAndAddressInformationAndClickCreateAccount();

        const accountCreatedPage = new AccountCreatedPage(page, testInfo);
        await accountCreatedPage.verifyAccountCreatedMessageDisplays;
        await accountCreatedPage.clickContinueButton();

        await homePage.verifyLoggedInUsername("Playwright");
        await homePage.clickDeleteAccount();

        const deletedAccountPage = new DeletedAccountPage(page, testInfo);
        await deletedAccountPage.verifyAccountDeletedMessageDisplays();
        await deletedAccountPage.clickContinueButton();

        await homePage.verifyPageTitle();
    });

});