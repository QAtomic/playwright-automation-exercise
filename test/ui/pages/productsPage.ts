import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';

export class ProductsPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    async addFirstAvailableProductToCart() {
        await test.step("Add First Available Product To Cart", async () => {
            await this.page.locator('.productinfo > .btn').first().click();
        }); 
    }

    async addProductToCart(product: string) {
        await test.step("Add Product To Cart : " + product, async () => {
            await this.page.locator('.single-products', { hasText: product}).locator('.productinfo').locator('a.add-to-cart').click();
        });
    }

    async verifyProductAddedToCartMessageAppears() {
        await test.step("Verify Product Added To Cart Message Appears", async () => {
            await expect(this.page.getByText('Your product has been added to cart. View Cart')).toBeVisible();
        });
    }

    async clickViewCartLink() {
        await test.step("Click View Cart Link", async () => {
            await this.page.getByRole('link', { name: 'View Cart' }).click();
        });
    }

}