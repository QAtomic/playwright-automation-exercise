import * as dotenv from 'dotenv';
dotenv.config();

import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';


test.describe("Home Page Tests", () => {


    test('Company Logo @PROD', async ({ page }, testInfo) => {
        const homePage = new HomePage(page, testInfo);
        await homePage.navigateToHomePage();
        await homePage.verifyLogo();
    });

    test("Check For Broken Links @PROD", async ({ page }, testInfo) => {
        test.setTimeout(300000);
        const homePage = new HomePage(page, testInfo);
        await homePage.navigateToHomePage();
        await homePage.checkForBrokenLinks();
    }); 


});