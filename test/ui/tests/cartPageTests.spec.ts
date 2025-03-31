import { test } from "@playwright/test";
import { 
    asAnAuthenticatedUserOnCartPageWithProductsInCart 
} from '../fixtures/cartPageFixtures';



test.describe("Cart Page Tests", () => {

    asAnAuthenticatedUserOnCartPageWithProductsInCart('Product In Cart', async ({ cartPage }) => {
        await test.step('As An Authenticated User On Cart Page with Products In Cart', () => true);
        await cartPage.verifyFirstProductIsDisplayedInCart();
    });

    asAnAuthenticatedUserOnCartPageWithProductsInCart('Verify Cart Quantity', async ({ cartPage }) => {
        await test.step('As An Authenticated User On Cart Page with Products In Cart', () => true);
        await cartPage.verifyFirstProductQuantity(1);
    });

    
});