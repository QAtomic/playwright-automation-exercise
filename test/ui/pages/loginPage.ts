import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import * as dotenv from 'dotenv';
import { BasePage } from '../basePage/basePage';
import { generateRandomString } from '../../utils/stringUtils';
import { verifyElementIsNotRequired, verifyElementIsRequired } from '../../utils/requiredFieldChecker';
dotenv.config();

export class LoginPage extends BasePage {
 
    loginEmailInput: Locator;
    loginPasswordInput: Locator;
    loginButton: Locator;
    invalidEmailOrPasswordMessage: Locator;

    newUserNameInput: Locator;
    newUserEmailInput: Locator;
    signupButton: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);

        this.loginEmailInput = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.loginPasswordInput = this.page.getByRole('textbox', { name: 'password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.invalidEmailOrPasswordMessage = this.page.getByText('Your email or password is');

        this.newUserNameInput = this.page.getByRole('textbox', { name: 'Name' });
        this.newUserEmailInput = this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signupButton = this.page.getByRole('button', { name: 'Signup' });
    };


    async enterCredentialsAndSubmit(email: string, password: string) {
        await test.step('Enter Credentials and Submit', async () => {
            await this.loginEmailInput.fill(email);
            await this.loginPasswordInput.fill(password);
            await this.loginButton.click();
        }); 
    };

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
    };

    async verifyIncorrectEmailOrPasswordMessageDisplays() {
        await test.step('Verify Incorrect Email Or Password Message Displays', async () => {
            await expect(this.invalidEmailOrPasswordMessage).toBeVisible({ timeout: 10000 });
        });
    };

    async enterNewUserInfoAndClickSignup() {
        await test.step("Enter New User Info And Click Signup", async () => {
            const randomString = generateRandomString(10);

            await this.newUserNameInput.fill('Playwright Test');
            await this.newUserEmailInput.fill(randomString + '@Playwright.com');
            await this.signupButton.click();
        });
    };

    async verifyRequiredFields() {
        await test.step("Verify Required Fields", async () => {
            await verifyElementIsRequired(this.loginEmailInput);
            await verifyElementIsRequired(this.loginPasswordInput);
            await verifyElementIsRequired(this.newUserNameInput);
            await verifyElementIsRequired(this.newUserEmailInput);
        })
    }

};