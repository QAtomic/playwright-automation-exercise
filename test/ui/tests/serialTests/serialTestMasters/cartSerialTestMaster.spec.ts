import { test } from '@playwright/test';
import { serialTestOne } from '../cartSerialTests/serialTestOne';
import { serialTestTwo } from '../cartSerialTests/serialTestTwo';
import { productInCart, verifyCartQuantity } from '../cartSerialTests/cartPageSerialTests';

test.describe.configure({ mode: 'default' });

test('Serial Test One', async ({ page }) => { 
    await serialTestOne(page);
});

test('Serial Test Two', async ({ page }) => { 
    await serialTestTwo(page);
});

test('Product In Cart', async ({ page }, testInfo) => {
    await productInCart(page, testInfo);
});

test('verifyCartQuantity', async ({ page }, testInfo) => {
    await verifyCartQuantity(page, testInfo)
});

