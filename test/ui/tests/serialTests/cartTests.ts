import { test, Page, TestInfo } from "@playwright/test";
import { CartPageFunctions } from "../../pageFunctions/cartPageFunctions";
import { CartPage } from "../../pages/cartPage";



export async function productInCart(page: Page, testInfo: TestInfo) {
    const cartPageFunctions = new CartPageFunctions(page, testInfo);
    await cartPageFunctions.asAnAuthenticatedUserOnCartPageWithProductsInCart();
            
    const cartPage = new CartPage(page);
    await cartPage.verifyFirstProductIsDisplayedInCart();
};


export async function verifyCartQuantity(page: Page, testInfo: TestInfo) {
    const cartPageFunctions = new CartPageFunctions(page, testInfo);
    await cartPageFunctions.asAnAuthenticatedUserOnCartPageWithProductsInCart();

    const cartPage = new CartPage(page);
    await cartPage.verifyFirstProductQuantity(1);
};


