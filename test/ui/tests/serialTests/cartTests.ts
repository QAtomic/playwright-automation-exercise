import { test, Page, TestInfo } from "@playwright/test";
import { CartPageFunctions } from "../../pageFunctions/cartPageFunctions";
import { CartPage } from "../../pages/cartPage";
import { ProductsPage } from "../../pages/productsPage";
import { HomePage } from "../../pages/homePage";



export async function firstProductInCart(page: Page, testInfo: TestInfo) {
    const productsPage = new ProductsPage(page, testInfo);
    await productsPage.navigateToProductsPage();
    await productsPage.addFirstAvailableProductToCart();
    await productsPage.clickViewCartLink();
            
    const cartPage = new CartPage(page, testInfo);
    await cartPage.verifyFirstProductIsDisplayedInCart();
};


export async function verifyCartQuantity(page: Page, testInfo: TestInfo) {
    const productsPage = new ProductsPage(page, testInfo);
    await productsPage.navigateToProductsPage();
    await productsPage.addFirstAvailableProductToCart();
    await productsPage.clickViewCartLink();

    const cartPage = new CartPage(page, testInfo);
    await cartPage.verifyFirstProductQuantity(1);
};


export async function verifyProductInCart(page: Page, testInfo: TestInfo, product: string) {
    const productsPage = new ProductsPage(page, testInfo);
    await productsPage.navigateToProductsPage();
    await productsPage.addProductToCart(product);
    await productsPage.clickViewCartLink();

    const cartPage = new CartPage(page, testInfo);
    await cartPage.verifyFirstProductQuantity(1);
};


