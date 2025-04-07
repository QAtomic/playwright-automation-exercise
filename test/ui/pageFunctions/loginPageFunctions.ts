import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';


export class LoginPageFunctions {
    page: Page;
    testInfo: TestInfo;

    homePage: HomePage;
    loginPage: LoginPage;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.homePage = new HomePage(this.page, this.testInfo);
        this.loginPage = new LoginPage(this.page, this.testInfo);   
    }

    async loginWithValidCredentials(){
        await this.homePage.navigateToHomePage();
        await this.homePage.clickLogin();

        await this.loginPage.enterValidCredentialsAndSubmit();
        await this.homePage.verifyUserIsLoggedIn();
    }

    async asAnUnauthenticatedUserOnLoginPage() {
        await test.step("As An Unauthenticated User On LoginPage", async () => {
            await this.homePage.navigateToHomePage();
            await this.homePage.clickLogin();
        });
    };


}