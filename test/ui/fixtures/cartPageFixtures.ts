import { test as fixture } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ProductsPage } from "../pages/productsPage";
import { CartPage } from "../pages/cartPage";
import { LoginFunction } from "../fixtureFunctions/loginFunction";


export { expect } from "@playwright/test";

type TFixture = {
    cartPage: CartPage
};

export const asAnAuthenticatedUserOnCartPageWithProductsInCart = fixture.extend<TFixture>({

    cartPage: async ({ page }, use, testInfo) => {
        const loginFunction = new LoginFunction(page);
        await loginFunction.loginWithValidCredentials(testInfo.project.name);
        
        const homePage = new HomePage(page);
        await homePage.clickProductsLink();

        const productsPage = new ProductsPage(page);
        await productsPage.addFirstAvailableProductToCart();
        await productsPage.clickViewCartLink();
        
        await use(new CartPage(page));
    }
})