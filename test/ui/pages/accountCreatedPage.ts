import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';


export class AccountCreatedPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }


    async verifyAccountCreatedMessageDisplays() {
        await test.step("Verify Account Created Message Displays", async () => {
            const pageText = await this.page.locator('#form').innerText();
            expect(pageText).toContain('ACCOUNT CREATED!');
        });
    }

    async clickContinueButton() {
        await test.step("Click Continue Button", async () => {
            await this.page.getByRole('link', { name: 'Continue' }).click();
        });   
    }

}