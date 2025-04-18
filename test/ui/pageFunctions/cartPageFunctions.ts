import { Page, TestInfo, test } from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { ProductsPage } from "../pages/productsPage";
import { LoginPage } from '../pages/loginPage';
import { LoginPageFunctions } from './loginPageFunctions';
import { takeScreenshot } from '../../utils/screenshotUtils';


export class CartPageFunctions {
    page: Page;
    testInfo: TestInfo;
    
    homePage: HomePage;
    loginPage: LoginPage;
    productsPage: ProductsPage;

    loginPageFunctions: LoginPageFunctions;
    
    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;

        this.homePage = new HomePage(this.page, this.testInfo);
        this.loginPage = new LoginPage(this.page, this.testInfo);
        this.productsPage = new ProductsPage(this.page, this.testInfo);
        
        this.loginPageFunctions = new LoginPageFunctions(this.page, this.testInfo);
    }


    async asAnAuthenticatedUserOnCartPageWithFirstProductInCart() {
        await test.step("As An Authenticated User On Cart Page With Products In Cart", async () => {
            await this.loginPageFunctions.loginWithValidCredentials();
        
            await this.homePage.clickProductsLink();

            await this.productsPage.addFirstAvailableProductToCart();
            await this.productsPage.clickViewCartLink();
            
            await takeScreenshot("Authenticated User On Cart Page With Products In Cart", this.page, this.testInfo);
        });
    }

    async asAnAuthenticatedUserOnCartPageWithProductInCart(product: string) {
        await test.step("As An Authenticated User On Cart Page With Products In Cart", async () => {
            await this.loginPageFunctions.loginWithValidCredentials();
        
            await this.homePage.clickProductsLink();

            await this.productsPage.addProductToCart(product);
            await this.productsPage.clickViewCartLink();

            await takeScreenshot("Authenticated User On Cart Page With Products In Cart", this.page, this.testInfo);
        });
    }
}
        