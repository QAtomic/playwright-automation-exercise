import { test, expect, Locator, Page, TestInfo } from '@playwright/test';
import { BasePage } from '../basePage/basePage';
import { getRandomDateBetweenDaysAgo } from '../../utils/dateUtils';
import { generateRandomString } from '../../utils/stringUtils';
import { randomNumberBetween } from '../../utils/numberUtils';
import { verifyElementIsNotRequired, verifyElementIsRequired } from '../../utils/requiredFieldChecker';



export class SignupPage extends BasePage {

    nameInput: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    dobDayDropdown: Locator;
    dobMonthDropdown: Locator;
    dobYearDropdown: Locator;

    firstNameInput: Locator;
    lastNameInput: Locator;
    companyInput: Locator;

    addressInput: Locator;
    address2Input: Locator;
    countryDropdown: Locator;
    stateInput: Locator;
    cityInput: Locator;
    zipcodeInput: Locator;
    mobileNumberInput: Locator;

    createAccountButton: Locator;


    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);

        this.nameInput = this.page.getByRole('textbox', { name: 'Name *', exact: true });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email *' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
        this.dobDayDropdown = this.page.locator('#days');
        this.dobMonthDropdown = this.page.locator('#months');
        this.dobYearDropdown = this.page.locator('#years');

        this.firstNameInput = this.page.getByRole('textbox', { name: 'First name *' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name *' });
        this.companyInput = this.page.getByRole('textbox', { name: 'Company', exact: true });

        this.addressInput = this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
        this.countryDropdown = this.page.getByLabel('Country *');
        this.stateInput = this.page.getByRole('textbox', { name: 'State *' });
        this.cityInput = this.page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.zipcodeInput = this.page.locator('#zipcode');
        this.mobileNumberInput = this.page.getByRole('textbox', { name: 'Mobile Number *' });

        this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
    };


    async enterAccountInformationAndAddressInformationAndClickCreateAccount() {
        await test.step("Enter Account Information And Address Information And Click Create Account", async () => {
            const randomBirthDate = getRandomDateBetweenDaysAgo(6570,32850);
            const randomFirstName = generateRandomString(8);
            const randomPhoneNumber = randomNumberBetween(1111111111, 9999999999);

            await this.page.getByRole('radio', { name: 'Mr.' }).check();
            await this.passwordInput.fill('Test@123');
            await this.dobDayDropdown.selectOption(randomBirthDate.day.toString());
            await this.dobMonthDropdown.selectOption(randomBirthDate.month.toString());
            await this.dobYearDropdown.selectOption(randomBirthDate.year.toString());
            await this.firstNameInput.fill(randomFirstName);
            await this.lastNameInput.fill('Playwright');
            await this.addressInput.fill('85 Whitewood Dr');
            await this.countryDropdown.selectOption('United States');
            await this.stateInput.fill('PA');
            await this.cityInput.fill('Levittown');
            await this.zipcodeInput.fill('19057');
            await this.mobileNumberInput.fill(randomPhoneNumber.toString());
            await this.createAccountButton.click();
        });
    }

    

    async verifyRequiredFields() {
        await test.step("Verify Required Fields", async () => {
            await verifyElementIsRequired(this.nameInput);
            await verifyElementIsRequired(this.emailInput);
            await verifyElementIsRequired(this.passwordInput);

            await verifyElementIsNotRequired(this.dobDayDropdown);
            await verifyElementIsNotRequired(this.dobMonthDropdown);
            await verifyElementIsNotRequired(this.dobYearDropdown);

            await verifyElementIsRequired(this.firstNameInput);
            await verifyElementIsRequired(this.lastNameInput);

            await verifyElementIsNotRequired(this.companyInput);

            await verifyElementIsRequired(this.addressInput);

            await verifyElementIsNotRequired(this.address2Input);

            await verifyElementIsRequired(this.countryDropdown);

            await verifyElementIsRequired(this.stateInput);
            await verifyElementIsRequired(this.cityInput);
            await verifyElementIsRequired(this.zipcodeInput);
            await verifyElementIsRequired(this.mobileNumberInput);
        });
    }


}