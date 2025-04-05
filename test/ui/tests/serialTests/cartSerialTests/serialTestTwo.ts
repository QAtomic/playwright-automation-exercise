import { Page } from '@playwright/test';

export async function serialTestTwo(page: Page) {
  console.log('Start Test Two');
  await page.waitForTimeout(3000);
  console.log('End Test Two')
}

/*
export class SerialTestTwo {

  async serialTestTwo(page: Page) {
    console.log('Start Test Two');
    await page.waitForTimeout(3000);
    console.log('End Test Two')
  }

}
  */