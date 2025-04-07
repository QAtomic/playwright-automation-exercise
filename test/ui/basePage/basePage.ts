import { Page, TestInfo } from "@playwright/test";

export class BasePage{

    page: Page;
    testInfo: TestInfo;
    
    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }  
    
}