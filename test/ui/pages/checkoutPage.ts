import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';

export class CheckoutPage extends BasePage {

    placeOrderButton: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
    }

    async verifyAProductExistsInOrderSummary() {
        await test.step("Verify A Product Exists In Order Summary", async () => {
            await expect(this.page.locator('product-1')).toBeVisible();
        });
    }

    async clickPlaceOrderButton() {
        await test.step("Click Place Order Button", async () => {
            await this.placeOrderButton.click();
        });
    }


}