import { Page, TestInfo } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { LoginPageFunctions } from "./loginPageFunctions";



export class HomePageFunctions {
    page: Page;

    homePage: HomePage;
    loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
    }


    async asAnAuthenticatedUserOnHomePage(page: Page, testInfo: TestInfo) {
        const loginFunction = new LoginPageFunctions(page);
        await loginFunction.loginWithValidCredentials(testInfo.project.name);
    }
   




}