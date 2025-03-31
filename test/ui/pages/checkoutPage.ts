import { expect, Locator, Page } from '@playwright/test';

export class ChckoutPage {
    private page: Page;

    private placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
    }

    async verifyAProductExistsInOrderSummary() {
        await expect(this.page.locator('product-1')).toBeVisible();
    }

    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
    }


}