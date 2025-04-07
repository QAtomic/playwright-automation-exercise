import { test } from "@playwright/test";
import { SignupPageFunctions } from "../pageFunctions/signupPageFunctions";
import { SignupPage } from "../pages/signupPage";


test.describe("Signup Page Tests", () => {

    
    test('Signup Page Required Fields', async ({ page }, testInfo) => { 
        const signupPageFunctions = new SignupPageFunctions(page, testInfo);
        await signupPageFunctions.asANewUserOnTheSignupPage();

        const signupPage = new SignupPage(page, testInfo);
        await signupPage.verifyRequiredFields();
    });

})