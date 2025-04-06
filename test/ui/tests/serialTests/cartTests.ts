import { test, Page, TestInfo } from "@playwright/test";
import { CartPageFunctions } from "../../pageFunctions/cartPageFunctions";
import { CartPage } from "../../pages/cartPage";



export async function firstProductInCart(page: Page, testInfo: TestInfo) {
    const cartPageFunctions = new CartPageFunctions(page, testInfo);
    await cartPageFunctions.asAnAuthenticatedUserOnCartPageWithFirstProductInCart();
            
    const cartPage = new CartPage(page, testInfo);
    await cartPage.verifyFirstProductIsDisplayedInCart();
};


export async function verifyCartQuantity(page: Page, testInfo: TestInfo) {
    const cartPageFunctions = new CartPageFunctions(page, testInfo);
    await cartPageFunctions.asAnAuthenticatedUserOnCartPageWithFirstProductInCart();

    const cartPage = new CartPage(page, testInfo);
    await cartPage.verifyFirstProductQuantity(1);
};


export async function verifyProductInCart(page: Page, testInfo: TestInfo, product: string) {
    const cartPageFunctions = new CartPageFunctions(page, testInfo);
    await cartPageFunctions.asAnAuthenticatedUserOnCartPageWithProductInCart(product);

    const cartPage = new CartPage(page, testInfo);
    await cartPage.verifyFirstProductQuantity(1);
};


