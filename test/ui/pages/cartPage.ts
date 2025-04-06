import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();


export class CartPage {
    url = "/view_cart";
    page: Page;
    testInfo: TestInfo;

    proceedToCheckoutButton: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;

        this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
    }


    async verifyFirstProductIsDisplayedInCart() {
        await test.step('Verify Product Is Displayed In Cart', async () => {
            await expect(this.page.getByRole('table').getByRole('row').nth(1).getByRole('link', { name: 'Product Image' })).toBeVisible({ timeout: 20000 });
        });
    };

    async clickProceedToCheckoutButton() {
        await this.proceedToCheckoutButton.click();
    }

    async verifyFirstProductQuantity(num: number) {
        await test.step('Verify First Product Quantity = ' + num, async () => {
            let cartQuantity = await this.page.getByRole('table').getByRole('row').nth(1).locator('td.cart_quantity').innerText();
            expect(parseInt(cartQuantity)).toBe(num);
        });
    };
    
    async removeAllItemsFromCart() {
        await this.page.goto(this.url);
        const removeItemButtons = await this.page.getByRole('cell', { name: '' }).locator('a').all();
        for (const removeItemButton of removeItemButtons) {
            await removeItemButton.click();
        }
    }

}