import test, { Page, TestInfo } from "@playwright/test";


export async function takeScreenshot(imgDescription: string, page: Page, testInfo: TestInfo) {
    await test.step("Take Screenshot = " + imgDescription, async () => {
        const screenshot = await page.screenshot({fullPage: true});
    
        testInfo.attach(imgDescription, {
            body: screenshot,
            contentType: 'image/png',
        });
    });
}

