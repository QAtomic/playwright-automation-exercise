import { test, Page, TestInfo } from "@playwright/test";
import { CartPageFunctions } from "../../pageFunctions/cartPageFunctions";
import { CartPage } from "../../pages/cartPage";



export async function productInCart(page: Page, testInfo: TestInfo) {
    const cartPageFunctions = new CartPageFunctions(page);
    await cartPageFunctions.asAnAuthenticatedUserOnCartPageWithProductsInCart(page, testInfo);
            
    const cartPage = new CartPage(page);
    await cartPage.verifyFirstProductIsDisplayedInCart();

    await cartPage.removeAllItemsFromCart();
    await page.waitForTimeout(1000);
};


export async function verifyCartQuantity(page: Page, testInfo: TestInfo) {
    const cartPageFunctions = new CartPageFunctions(page);
    await cartPageFunctions.asAnAuthenticatedUserOnCartPageWithProductsInCart(page, testInfo);

    const cartPage = new CartPage(page);
    await cartPage.verifyFirstProductQuantity(1);

    await cartPage.removeAllItemsFromCart();
    await page.waitForTimeout(1000);
};


