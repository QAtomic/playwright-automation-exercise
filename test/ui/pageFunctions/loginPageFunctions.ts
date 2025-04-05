import { test, expect, Locator, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';


export class LoginPageFunctions {
    page: Page;

    homePage: HomePage;
    loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
    }

    async loginWithValidCredentials(projectName : string){
        await this.homePage.navigateToHomePage();
        await this.homePage.clickLogin();

        await this.loginPage.enterValidCredentialsAndSubmit(projectName);
        await this.homePage.verifyUserIsLoggedIn();
    }

    async asAnUnauthenticatedUserOnLoginPage() {
        const homePage = new HomePage(this.page);
        await homePage.navigateToHomePage();
        await homePage.clickLogin();
    };


}