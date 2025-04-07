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
        await test.step("Navigate to Home Page", async () => {
            await this.page.goto('/');
        });
    }

    async clickLogin() {
        await test.step("Click Login", async () => {
            await this.header.clickLogin();
        });
    }

    async verifyUserIsLoggedIn() {
        await test.step('Verify User Is Logged In', async () => {
            await this.header.verifyLogoutLinkDisplays();
        })
    }

    async clickProductsLink() {
        await test.step('Click Products Link', async () => {
            await this.header.clickProductsLink();
        });
    }

    async verifyLogo() {
        await test.step('Verify Logo', async () => {
            await expect(this.logo).toHaveScreenshot('logo.png');
        });
    }

    async verifyLoggedInUsername(name: string) {
        await test.step("Verify Logged In Username = " + name, async () => {
            const loggedInName = await this.page.getByText('Logged in as').innerText();
            expect(loggedInName).toContain(name);
        });
    }

    async clickDeleteAccount() {
        await test.step("Click Delete Account", async () => {
            await this.header.clickDeleteAccountLink();
        });
    }

    async verifyPageTitle() {
        await test.step("Verify Page Title", async () => {
            const pageTitle = await this.page.title();
            expect(pageTitle).toBe("Automation Exercise");
        });
    }

}