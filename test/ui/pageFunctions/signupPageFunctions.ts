import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';


export class SignupPageFunctions {
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


    async asANewUserOnTheSignupPage() {
        await test.step("As A New User On The Signup Page", async () => {
            await this.homePage.navigateToHomePage();
            await this.homePage.clickLogin();
            await this.loginPage.enterNewUserInfoAndClickSignup();
        })  
    }
}