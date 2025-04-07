import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';


export class DeletedAccountPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    }

    async verifyAccountDeletedMessageDisplays(){
        await test.step("Verify Account Deleted Message Displays", async () => {
            const pageText = await this.page.locator('#form').innerText();
            expect(pageText).toContain('ACCOUNT DELETED!');
        });
    }

    async clickContinueButton() {
        await test.step("Click Continue Button", async () => {
            await this.page.getByRole('link', { name: 'Continue' }).click();
        });
    }
    
    

}