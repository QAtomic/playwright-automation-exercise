import * as dotenv from 'dotenv';
dotenv.config();

import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';


test.describe("Home Page Tests", () => {


    test('Company Logo', async ({ page }, testInfo) => {
        const homePage = new HomePage(page, testInfo);
        await homePage.navigateToHomePage();
        await homePage.verifyLogo();
    });


});