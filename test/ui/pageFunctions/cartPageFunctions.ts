import { Page, TestInfo } from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { ProductsPage } from "../pages/productsPage";
import { LoginPage } from '../pages/loginPage';
import { LoginPageFunctions } from './loginPageFunctions';


export class CartPageFunctions {
    page: Page;
    
    homePage: HomePage;
    loginPage: LoginPage;
    
    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.loginPage = new LoginPage(this.page);
    }


    async asAnAuthenticatedUserOnCartPageWithProductsInCart(page: Page, testInfo: TestInfo) {
        const loginPageFunctions = new LoginPageFunctions(page);
        await loginPageFunctions.loginWithValidCredentials(testInfo.project.name);
        
        const homePage = new HomePage(page);
        await homePage.clickProductsLink();

        const productsPage = new ProductsPage(page);
        await productsPage.addFirstAvailableProductToCart();
        await productsPage.clickViewCartLink();
    }
}
        