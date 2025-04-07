import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';


export class AccountCreatedPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }


    async verifyAccountCreatedMessageDisplays() {
        await expect(this.page.getByText('Account Created!')).toBeVisible();
    }

    async clickContinueButton() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }

}