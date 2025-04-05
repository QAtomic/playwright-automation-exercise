import * as dotenv from 'dotenv';
dotenv.config();

import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { HomePageFunctions } from '../pageFunctions/homePageFunctions';


test.describe("Home Page Tests", () => {

    test("Environment Data Switching POC", ({page}, testInfo) => {
        if (testInfo.project.name === 'production-validation') {
            console.log("PROD Test");
            console.log("Name = " + process.env.PROD_NAME);
        } else {
            console.log("Non-Prod Test");
            console.log("Name = " + process.env.QA_NAME);
        }
        
    });

    test('Valid Login', async ({ page }, testInfo) => { 
        const homePageFunctions = new HomePageFunctions(page);
        await homePageFunctions.asAnAuthenticatedUserOnHomePage(page, testInfo);

        const homePage = new HomePage(page);
        await homePage.verifyUserIsLoggedIn();
    });


});