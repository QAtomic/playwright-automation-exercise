import { expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';

export class CheckoutPage extends BasePage {

    placeOrderButton: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
    }

    async verifyAProductExistsInOrderSummary() {
        await expect(this.page.locator('product-1')).toBeVisible();
    }

    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
    }


}