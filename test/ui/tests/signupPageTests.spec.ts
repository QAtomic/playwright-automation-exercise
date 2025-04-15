import { test } from "@playwright/test";
import { SignupPageFunctions } from "../pageFunctions/signupPageFunctions";
import { SignupPage } from "../pages/signupPage";


test.describe("Signup Page Tests", () => {

    test.use({ storageState: 'playwright/.auth/noAuth.json' });
    
    test('Signup Page Required Fields @PROD', async ({ page }, testInfo) => { 
        const signupPageFunctions = new SignupPageFunctions(page, testInfo);
        await signupPageFunctions.asANewUserOnTheSignupPage();

        const signupPage = new SignupPage(page, testInfo);
        await signupPage.verifyRequiredFields();
    });

})