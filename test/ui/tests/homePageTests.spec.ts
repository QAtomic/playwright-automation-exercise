import { test } from '@playwright/test';
import { asAnAuthenticatedUserOnHomePage } from '../fixtures/homePageFixtures';

test.describe("Home Page Tests", () => {

    asAnAuthenticatedUserOnHomePage('Valid Login', async ({ homePage }) => {
        await test.step('As An Authenticated User On Home Page', async () => true);
        await homePage.verifyUserIsLoggedIn();  
    });


});