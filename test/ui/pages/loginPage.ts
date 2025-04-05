import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
    page: Page;
    testInfo: TestInfo;

    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    invalidEmailOrPasswordMessage: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;

        this.emailInput = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordInput = this.page.getByRole('textbox', { name: 'password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.invalidEmailOrPasswordMessage = this.page.getByText('Your email or password is');
    };


    async enterCredentialsAndSubmit(email: string, password: string) {
        test.step('Enter Credentials and Submit', async () => {
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        }); 
    }

    async enterValidCredentialsAndSubmit() {
        let email = "";
        let password = "";
        if (this.testInfo.project.name === 'production-validation') {
            email = process.env.PROD_EMAIL as string;
            password = process.env.PROD_PASSWORD as string
        } else if (this.testInfo.project.name === 'qa-chromium') {
            email = process.env.QA_CHROMIUM_EMAIL as string;
            password = process.env.QA_CHROMIUM_PASSWORD as string
        } else if (this.testInfo.project.name === 'qa-firefox') {
            email = process.env.QA_FIREFOX_EMAIL as string;
            password = process.env.QA_FIREFOX_PASSWORD as string
        } else if (this.testInfo.project.name === 'qa-webkit') {
            email = process.env.QA_WEBKIT_EMAIL as string;
            password = process.env.QA_WEBKIT_PASSWORD as string
        } else {
            test.fail(true, "Login Setup Issue");
        }
        
        await this.enterCredentialsAndSubmit(email, password);
    }

    async verifyIncorrectEmailOrPasswordMessageDisplays() {
        await test.step('Verify Incorrect Email Or Password Message Displays', async () => {
            await expect(this.invalidEmailOrPasswordMessage).toBeVisible({ timeout: 10000 });
        });
    };

}