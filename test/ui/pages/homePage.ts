import { test, expect, Locator, Page } from '@playwright/test';
import { Header } from '../header/header';


export class HomePage {
    url = "https://www.automationexercise.com/";
    page: Page;

    header: Header;
    

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);
    };

    async navigateToHomePage() {
        await this.page.goto(this.url);
    }

    async clickLogin() {
        await this.header.clickLogin();
    }

    async verifyUserIsLoggedIn() {
        await test.step('Verify User Is Logged In', async () => {
            await this.header.verifyLogoutLinkDisplays();
        })
    }

    async clickProductsLink() {
        await this.header.clickProductsLink();
    }


};