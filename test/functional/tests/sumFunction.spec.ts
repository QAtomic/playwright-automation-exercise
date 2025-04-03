import { test, expect } from '@playwright/test';
import { sum } from "../../../src/functions/sum.js";
import { sumData } from "../data/sumData.js";

test.describe("Test Sum Function", () => {
    let sumTestData = sumData;
    
    sumTestData.forEach(sumTest => {
        test(sumTest.testName, () => {
            expect(sum(sumTest.a, sumTest.b)).toBe(sumTest.result);
        });
    });

});