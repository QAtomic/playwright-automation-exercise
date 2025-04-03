import { test } from "@playwright/test";
import { 
    asAnAuthenticatedUserOnCartPageWithProductsInCart 
} from '../fixtures/cartPageFixtures';
import { CartPage } from "../pages/cartPage";



test.describe.configure({ mode: 'default' });

test.describe("Cart Page Tests", () => {

    asAnAuthenticatedUserOnCartPageWithProductsInCart('Product In Cart', async ({ cartPage }) => {
        await test.step('As An Authenticated User On Cart Page with Products In Cart', () => true);
        await cartPage.verifyFirstProductIsDisplayedInCart();
    });

    asAnAuthenticatedUserOnCartPageWithProductsInCart('Verify Cart Quantity', async ({ cartPage }) => {
        await test.step('As An Authenticated User On Cart Page with Products In Cart', () => true);
        await cartPage.verifyFirstProductQuantity(1);
    });

    test.afterEach( async ({ page }) => {
        let cartPage = new CartPage(page);
        await cartPage.removeAllItemsFromCart();
        await page.waitForTimeout(1000);
    });

    
});