import { Locator, expect } from "@playwright/test";


export async function verifyElementIsRequired(locator: Locator) {
    await expect(locator).toHaveAttribute('required');
}


export async function verifyElementIsNotRequired(locator: Locator) {
    await expect(locator).not.toHaveAttribute('required');
}