import test, { Page, TestInfo, expect} from "@playwright/test";
import * as dotenv from 'dotenv';
import { stringContainsAnyFromArray } from "./stringUtils";

dotenv.config();


export async function checkForBrokenLinks(page: Page, testInfo: TestInfo, ...omits: string[]) {
    await test.step("Check For Broken Links", async () => {
        const baseURL = testInfo.project.use.baseURL;

        const links = page.locator("a");

        const allLinks = await Promise.all(await links.all()).then(links => {
            return links;
        });

        const allLinksAndText = [];
        for (let i = 0; i < allLinks.length; i++) {
            let linkText = await allLinks[i].innerText()
            let linkHref = await allLinks[i].getAttribute("href");
            allLinksAndText.push({
                innerText : linkText,
                href : linkHref
            });
        };

        const allValidHrefs = [];
        for (let i=0; i < allLinksAndText.length; i++) {
            let loopHref = allLinksAndText[i].href;
            let loopInnerText = allLinksAndText[i].innerText;

            if (stringContainsAnyFromArray(loopInnerText, omits)) {
                console.log("Link with Inner Text Omitted : " + loopInnerText);
                continue;
            }

            if (loopInnerText.replaceAll(" ","").toUpperCase().includes("LOGOUT")) {
                console.log(loopInnerText + " link was skipped because it's Logout functionality");
                continue;
            };
            expect.soft(loopHref, `${loopInnerText} has a null href`).toBeTruthy();
            if (!loopHref) continue;

            if (loopHref?.includes("tel:")) {
                console.log(loopInnerText + " link was skipped because it's a phone number");
                continue;
            }

            if (loopHref.startsWith("mailto")) continue;

            if (loopHref.charAt(0) === "/" || loopHref?.charAt(0) === "#") loopHref = baseURL + loopHref;
        
            //if (!loopHref?.includes(baseURL)) continue;

            if (stringContainsAnyFromArray(loopHref, omits)) {
                console.log("URL Omitted : " + loopHref);
                continue;
            }

            allValidHrefs.push({
                innerText : loopInnerText,
                href : loopHref
            });
        };

        for (let valid of allValidHrefs) {
            try {
                console.log("Test : " + valid.href);
                const response = await page.request.get(valid.href);
                expect.soft(response.ok(), `Link ${valid.innerText} with href ${valid.href} is not valid`).toBeTruthy();
                console.log("Response Status : " + response.status().toString());
            } catch(err) {
                expect.soft(null, `Link ${valid.innerText} with href ${valid.href} is not valid`).toBeTruthy();
                expect.soft(null, "" + err).toBeTruthy();
            }
        };
    })
    
    
};