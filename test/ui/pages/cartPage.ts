import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import * as dotenv from 'dotenv';
import { BasePage } from '../basePage/basePage';
dotenv.config();


export class CartPage extends BasePage {
    url = "/view_cart";

    proceedToCheckoutButton: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);

        this.proceedToCheckoutButton = this.page.getByRole('button', { name: 'Proceed To Checkout'});
    }


    async verifyFirstProductIsDisplayedInCart() {
        await test.step('Verify Product Is Displayed In Cart', async () => {
            await expect(this.page.getByRole('table').getByRole('row').nth(1).getByRole('link', { name: 'Product Image' })).toBeVisible({ timeout: 20000 });
        });
    };

    async clickProceedToCheckoutButton() {
        await test.step('Click Proceed To Checkout Button', async () => {
            await this.proceedToCheckoutButton.click();
        });
    }

    async verifyFirstProductQuantity(num: number) {
        await test.step('Verify First Product Quantity = ' + num, async () => {
            let cartQuantity = await this.page.getByRole('table').getByRole('row').nth(1).locator('td.cart_quantity').innerText();
            expect(parseInt(cartQuantity)).toBe(num);
        });
    };
    
    async removeAllItemsFromCart() {
        await test.step('Remove All Items From Cart', async () => {
            await this.page.goto(this.url);
            const removeItemButtons = await this.page.getByRole('cell', { name: '' }).locator('a').all();
            for (const removeItemButton of removeItemButtons) {
                await removeItemButton.click();
            }
        });
    }

}