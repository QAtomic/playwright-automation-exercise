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
        let email;
        let password;
        if (testEnv === 'production-validation') {
            email = process.env.PROD_EMAIL as string;
            password = process.env.PROD_PASSWORD as string
        } else {
            email = process.env.QA_EMAIL as string;
            password = process.env.QA_PASSWORD as string
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