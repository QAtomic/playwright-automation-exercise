import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';


export class DeletedAccountPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    async verifyAccountDeletedMessageDisplays(){
        await expect(this.page.getByText('Account Deleted!')).toBeVisible();
    }

    async clickContinueButton() {
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }
    
    

}