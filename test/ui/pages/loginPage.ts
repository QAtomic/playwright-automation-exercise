import { test, expect, Locator, Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
    page: Page;

    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    invalidEmailOrPasswordMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.invalidEmailOrPasswordMessage = this.page.getByText('Your email or password is');
    };


    async enterCredentialsAndSubmit(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async enterValidCredentialsAndSubmit(testEnv: string) {
        let email = "";
        let password = "";
        if (testEnv === 'production-validation') {
            email = process.env.PROD_EMAIL as string;
            password = process.env.PROD_PASSWORD as string
        } else if (testEnv === 'qa-chromium') {
            email = process.env.QA_CHROMIUM_EMAIL as string;
            password = process.env.QA_CHROMIUM_PASSWORD as string
        } else if (testEnv === 'qa-firefox') {
            email = process.env.QA_FIREFOX_EMAIL as string;
            password = process.env.QA_FIREFOX_PASSWORD as string
        } else if (testEnv === 'qa-webkit') {
            email = process.env.QA_WEBKIT_EMAIL as string;
            password = process.env.QA_WEBKIT_PASSWORD as string
        } else {
            test.fail(true, "Login Setup Issue");
        }
        
        await this.emailInput.fill(email);   
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyIncorrectEmailOrPasswordMessageDisplays() {
        await test.step('Verify Incorrect Email Or Password Message Displays', async () => {
            await expect(this.invalidEmailOrPasswordMessage).toBeVisible();
        });
    };

}