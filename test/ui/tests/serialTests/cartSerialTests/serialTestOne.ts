import { test, expect, Page } from '@playwright/test';


export async function serialTestOne(page: Page) {
    console.log('Start Test One');
    await page.waitForTimeout(3000);
    console.log('End Test One')
}

/*
export class SerialTestOne {

    async serialTestOne(page: Page) {
        console.log('Start Test One');
        await page.waitForTimeout(3000);
        console.log('End Test One')
    }
    

};
*/