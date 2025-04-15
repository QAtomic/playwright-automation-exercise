import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPageFunctions } from '../../pageFunctions/loginPageFunctions';
import { HomePage } from '../../pages/homePage';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, '../../../../playwright/.auth/chromeUser.json');

setup('Chrome User', async ({ page }, testInfo) => {
  const loginPageFunctions = new LoginPageFunctions(page, testInfo);
  await loginPageFunctions.loginWithUserCredentials("qa-chromium");

  const homePage = new HomePage(page, testInfo);
  await homePage.verifyUserIsLoggedIn();

  await page.context().storageState({ path: authFile });
});