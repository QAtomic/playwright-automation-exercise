import { test, expect, Locator, Page } from '@playwright/test';

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

    async verifyIncorrectEmailOrPasswordMessageDisplays() {
        await test.step('Verify Incorrect Email Or Password Message Displays', async () => {
            await expect(this.invalidEmailOrPasswordMessage).toBeVisible();
        });
    };

}