import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDataFolderPath = path.join(__dirname, "../testData");

const users = parse(fs.readFileSync(path.join(testDataFolderPath, 'userData.csv')), {
  columns: true,
  skip_empty_lines: true
});

for (const user of users) {
  test(`${user.testCase}`, async ({ page }) => {
    console.log(user.testCase + " = " + user.firstName + " " + user.lastName);
  });
}
