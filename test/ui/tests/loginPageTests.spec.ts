import { test } from "@playwright/test";
import { asAnUnauthenticatedUserOnLoginPage } from "../fixtures/loginPageFixtures";


test.describe("Login Page Tests", () => {
    
    asAnUnauthenticatedUserOnLoginPage('Invalid Login', async ({ loginPage }) => {
        await test.step('As An Unauthenticated User On Login Page', async () => true);
        await test.step('Enter Valid Email and Invalid Password and Submit', async () => {
            await loginPage.enterCredentialsAndSubmit("Drew@Atomic.com","InvalidPassword");
        })
        await loginPage.verifyIncorrectEmailOrPasswordMessageDisplays();
    });

});