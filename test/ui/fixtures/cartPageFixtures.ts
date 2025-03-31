import { test as fixture } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import { CartPage } from "../pages/cartPage";


export { expect } from "@playwright/test";

type TFixture = {
    cartPage: CartPage
};

export const asAnAuthenticatedUserOnCartPageWithProductsInCart = fixture.extend<TFixture>({

    cartPage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.enterCredentialsAndSubmit("Drew@Atomic.com","Aq1!Sw2@");

        await homePage.verifyUserIsLoggedIn();
        await homePage.clickProductsLink();

        const productsPage = new ProductsPage(page);
        await productsPage.addFirstAvailableProductToCart();
        await productsPage.clickViewCartLink();
        
        await use(new CartPage(page));
    }
})