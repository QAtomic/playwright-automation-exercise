import { test, expect, Locator, Page } from '@playwright/test';
import { count } from 'console';

export class CartPage {
    url = "https://www.automationexercise.com/view_cart";
    page: Page;

    proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
    }


    async verifyFirstProductIsDisplayedInCart() {
        await test.step('Verify Product Is Displayed In Cart', async () => {
            await expect(this.page.locator('#product-1')).toBeVisible();
        });
    };

    async clickProceedToCheckoutButton() {
        await this.proceedToCheckoutButton.click();
    }

    async verifyFirstProductQuantity(num: number) {
        await test.step('Verify First Product Quantity = ' + num, async () => {
            let cartQuantity = await this.page.locator('#product-1').locator('.cart_quantity').innerText();
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