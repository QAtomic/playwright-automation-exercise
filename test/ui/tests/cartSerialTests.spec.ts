import { test } from '@playwright/test';
import { firstProductInCart, verifyCartQuantity, verifyProductInCart } from './serialTests/cartTests';
import { CartPage } from '../pages/cartPage';

test.describe.configure({ mode: 'default' });

test('First Product In Cart', async ({ page }, testInfo) => {
    await firstProductInCart(page, testInfo);
});

test('Verify Cart Quantity', async ({ page }, testInfo) => {
    await verifyCartQuantity(page, testInfo)
});

const products = ['Men Tshirt', 'Sleeveless Dress', 'Stylish Dress', 'Winter Top'];

for (const product of products) {
    test(`Verify ${product} in Cart`, async ({ page }, testInfo) => {
    await verifyProductInCart(page, testInfo, product)
});
}



test.afterEach( async ({ page }, testInfo) => {
    const cartPage = new CartPage(page, testInfo);
    await cartPage.removeAllItemsFromCart();
    await page.waitForTimeout(1000);
});