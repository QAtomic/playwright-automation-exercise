import { test, expect, Locator, Page } from '@playwright/test';
import { Header } from '../header/header';


export class HomePage {
    url = "https://www.automationexercise.com/";
    page: Page;

    header: Header;

    logo: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);

        this.logo = this.page.getByAltText('Website for automation practice', {exact: true});
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

    async verifyLogo() {
        await expect(this.logo).toHaveScreenshot('logo.png');
    }


};