import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { Header } from '../header/header';
import { BasePage } from '../basePage/basePage';


export class HomePage extends BasePage {

    header: Header;

    logo: Locator;
    

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);

        this.header = new Header(this.page, this.testInfo);

        this.logo = this.page.getByAltText('Website for automation practice', {exact: true});
    };

    async navigateToHomePage() {
        await this.page.goto('/');
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

    async verifyLoggedInUsername(name: string) {
        await expect(this.page.getByText('Logged in as')).toContainText(name);
    }

    async clickDeleteAccount() {
        await this.header.clickDeleteAccountLink();
    }

    async verifyPageTitle() {
        const title = await this.page.title();
        expect(await this.page.title()).toBe("Automation Exercise");
    }
};