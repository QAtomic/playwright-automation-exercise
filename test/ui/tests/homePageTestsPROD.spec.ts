import * as dotenv from 'dotenv';
dotenv.config();

import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { HomePageFunctions } from '../pageFunctions/homePageFunctions';


test.describe("Home Page Tests", () => {

    test('Valid Login', async ({ page }, testInfo) => { 
        const homePageFunctions = new HomePageFunctions(page, testInfo);
        await homePageFunctions.asAnAuthenticatedUserOnHomePage();

        const homePage = new HomePage(page);
        await homePage.verifyUserIsLoggedIn();
    });


});