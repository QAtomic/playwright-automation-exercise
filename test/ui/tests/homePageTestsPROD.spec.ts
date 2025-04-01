import * as dotenv from 'dotenv';
dotenv.config();

import { asAnAuthenticatedUserOnHomePage } from '../fixtures/homePageFixtures';

import { test } from '@playwright/test';
test.describe("Home Page Tests", () => {

    test("PROD POC", ({page}, testInfo) => {
        console.log(testInfo.project.name);
        if (testInfo.project.name === 'production-validation') {
            console.log("PROD Test");
            console.log("Name = " + process.env.PROD_NAME);
        } else {
            console.log("Non-Prod Test");
            console.log("Name = " + process.env.QA_NAME);
        }
        
    });


    asAnAuthenticatedUserOnHomePage('Valid Login', async ({ homePage }) => {
        await test.step('As An Authenticated User On Home Page', async () => true);
        await homePage.verifyUserIsLoggedIn();  
    });


});