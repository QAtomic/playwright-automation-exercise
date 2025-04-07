import { expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';

export class Header extends BasePage {

    homeLink: Locator;
    productsLink: Locator;
    cartLink: Locator;
    loginLink: Locator;
    logoutLink: Locator;
    deleteAccountLink: Locator;
    

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);

        this.homeLink = this.page.getByRole('link', { name: 'Home' });
        this.productsLink = this.page.getByRole('link', { name: 'Products' });
        this.cartLink = this.page.getByRole('link', { name: 'Cart' });
        this.loginLink = this.page.getByRole('link', { name: 'Signup / Login' });
        this.logoutLink = this.page.getByRole('link', { name: 'Logout' }); 
        this.deleteAccountLink = this.page.getByRole('link', { name: 'Delete Account' });
    };

    async clickHomeLink() {
        await this.homeLink.click();
    }

    async clickProductsLink() {
        await this.productsLink.click();
    }

    async clickCartLink() {
        await this.cartLink.click();
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async verifyLogoutLinkDisplays() {
        await expect(this.logoutLink).toBeVisible({ timeout: 15000 });
    }

    async clickDeleteAccountLink() {
        await this.deleteAccountLink.click();
    }
};