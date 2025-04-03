import { test, expect } from '@playwright/test';
import { unknownSchema } from '../schema/unknownSchema';
import { schemaValidator } from '../utils/schemaChecker';


test.describe.parallel("API : Unknown", () => {
    const baseURL = "https://reqres.in";


    test("Unknown Schema Validation", async ({ request }) => {
        const schema = unknownSchema;
            
        await schemaValidator(request, 200, `${baseURL}/api/unknown`, schema);
    });


    test("Get Single Resource", async ({ request }) => {
        const response = await request.get(`${baseURL}/api/unknown/2`);

        expect(response.status()).toBe(200);
        
        const responseBody = JSON.parse(await response.text());

        expect(responseBody.data.name).toBe("fuchsia rose");
        expect(responseBody.data.year).toBe(2001);
        expect(responseBody.data.color).toBe("#C74375");
        expect(responseBody.data.pantone_value).toBe("17-2031");
    });

    test("Single Resource Not Found", async ({ request }) => {
        const response = await request.get(`${baseURL}/api/unknown/23`);

        expect(response.status()).toBe(404);
    });

});