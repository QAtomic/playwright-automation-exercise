import { Page, TestInfo, test } from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { ProductsPage } from "../pages/productsPage";
import { LoginPage } from '../pages/loginPage';
import { LoginPageFunctions } from './loginPageFunctions';


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

        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page, this.testInfo);
        this.productsPage = new ProductsPage(this.page);
        

        this.loginPageFunctions = new LoginPageFunctions(this.page, this.testInfo);
    }


    async asAnAuthenticatedUserOnCartPageWithFirstProductInCart() {
        test.step("As An Authenticated User On Cart Page With Products In Cart", async () => {
            await this.loginPageFunctions.loginWithValidCredentials();
        
            await this.homePage.clickProductsLink();

            await this.productsPage.addFirstAvailableProductToCart();
            await this.productsPage.clickViewCartLink();
        });
    }

    async asAnAuthenticatedUserOnCartPageWithProductInCart(product: string) {
        test.step("As An Authenticated User On Cart Page With Products In Cart", async () => {
            await this.loginPageFunctions.loginWithValidCredentials();
        
            await this.homePage.clickProductsLink();

            await this.productsPage.addProductToCart(product);
            await this.productsPage.clickViewCartLink();
        });
    }
}
        