import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPageFunctions } from '../../pageFunctions/loginPageFunctions';
import { HomePage } from '../../pages/homePage';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, '../../../../playwright/.auth/noAuth.json');

setup('No Auth', async ({ page }, testInfo) => {
  await page.context().storageState({ path: authFile });
});