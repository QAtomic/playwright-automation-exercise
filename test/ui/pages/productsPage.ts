import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addFirstAvailableProductToCart() {
        await this.page.locator('.productinfo > .btn').first().click();
    }

    async verifyProductAddedToCartMessageAppears() {
        await expect(this.page.getByText('Your product has been added to cart. View Cart')).toBeVisible();
    }

    async clickViewCartLink() {
        
        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }

}