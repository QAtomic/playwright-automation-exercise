import { test } from '@playwright/test';
import { productInCart, verifyCartQuantity } from './serialTests/cartTests';

test.describe.configure({ mode: 'default' });

test('Product In Cart', async ({ page }, testInfo) => {
    await productInCart(page, testInfo);
});

test('verifyCartQuantity', async ({ page }, testInfo) => {
    await verifyCartQuantity(page, testInfo)
});

