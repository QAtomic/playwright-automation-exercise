import { test } from '@playwright/test';
import { productInCart, verifyCartQuantity } from './serialTests/cartTests';
import { CartPage } from '../pages/cartPage';

test.describe.configure({ mode: 'default' });

test('Product In Cart', async ({ page }, testInfo) => {
    await productInCart(page, testInfo);
});

test('verifyCartQuantity', async ({ page }, testInfo) => {
    await verifyCartQuantity(page, testInfo)
});


test.afterEach( async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeAllItemsFromCart();
    await page.waitForTimeout(1000);
});