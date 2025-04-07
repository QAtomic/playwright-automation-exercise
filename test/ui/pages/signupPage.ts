import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';
import { getRandomDateBetweenDaysAgo } from '../../utils/dateUtils';
import { generateRandomString } from '../../utils/stringUtils';
import { randomNumberBetween } from '../../utils/numberUtils';



export class SignupPage extends BasePage {

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
    };


    async enterAccountInformationAndAddressInformationAndClickCreateAccount() {
        await test.step("Enter Account Information And Address Information And Click Create Account", async () => {
            const randomBirthDate = getRandomDateBetweenDaysAgo(6570,32850);
            const randomFirstName = generateRandomString(8);
            const randomPhoneNumber = randomNumberBetween(1111111111, 9999999999);

            await this.page.getByRole('radio', { name: 'Mr.' }).check();
            await this.page.getByRole('textbox', { name: 'Password *' }).fill('Test@123');
            await this.page.locator('#days').selectOption(randomBirthDate.day.toString());
            await this.page.locator('#months').selectOption(randomBirthDate.month.toString());
            await this.page.locator('#years').selectOption(randomBirthDate.year.toString());
            await this.page.getByRole('textbox', { name: 'First name *' }).fill(randomFirstName);
            await this.page.getByRole('textbox', { name: 'Last name *' }).fill('Playwright');
            await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('85 Whitewood Dr');
            await this.page.getByLabel('Country *').selectOption('United States');
            await this.page.getByRole('textbox', { name: 'State *' }).fill('PA');
            await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Levittown');
            await this.page.locator('#zipcode').fill('19057');
            await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(randomPhoneNumber.toString());
            await this.page.getByRole('button', { name: 'Create Account' }).click();
        });
    }


}