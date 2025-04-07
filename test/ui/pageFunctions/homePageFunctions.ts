import { test, Page, TestInfo } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { LoginPageFunctions } from "./loginPageFunctions";
import { takeScreenshot } from "../../utils/screenshotUtils";



export class HomePageFunctions {
    page: Page;
    testInfo: TestInfo;

    homePage: HomePage;
    loginPage: LoginPage;
    loginPageFunctions: LoginPageFunctions;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.homePage = new HomePage(this.page, this.testInfo);
        this.loginPage = new LoginPage(this.page, this.testInfo);
        this.loginPageFunctions = new LoginPageFunctions(this.page, this.testInfo);
    }


    async asAnAuthenticatedUserOnHomePage() {
        await test.step("As An Authenticated User On HomePage", async () => {
            await this.loginPageFunctions.loginWithValidCredentials();
            await takeScreenshot("Authenticated User On HomePage", this.page, this.testInfo);
        });
    }

}