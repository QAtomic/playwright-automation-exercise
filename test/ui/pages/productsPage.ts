import { expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';

export class ProductsPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    async addFirstAvailableProductToCart() {
        await this.page.locator('.productinfo > .btn').first().click();
    }

    async addProductToCart(product: string) {
        await this.page.locator('.single-products', { hasText: product}).locator('.productinfo').locator('a.add-to-cart').click();
    }

    async verifyProductAddedToCartMessageAppears() {
        await expect(this.page.getByText('Your product has been added to cart. View Cart')).toBeVisible();
    }

    async clickViewCartLink() {
        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }

}