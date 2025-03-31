import { expect, Locator, Page } from '@playwright/test';

export class Header {
    private page: Page;

    private homeLink: Locator;
    private productsLink: Locator;
    private cartLink: Locator;
    private loginLink: Locator;
    private logoutLink: Locator;
    

    constructor(page: Page) {
        this.page = page;

        this.homeLink = this.page.getByRole('link', { name: ' Home' });
        this.productsLink = this.page.getByRole('link', { name: ' Products' });
        this.cartLink = this.page.getByRole('link', { name: ' Cart' });
        this.loginLink = this.page.getByRole('link', { name: ' Signup / Login' });
        this.logoutLink = this.page.getByRole('link', { name: ' Logout' }); 
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
        await expect(this.logoutLink).toBeVisible();
    }
};