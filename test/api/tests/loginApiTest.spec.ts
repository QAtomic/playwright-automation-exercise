import { test, expect } from '@playwright/test';


test.describe.parallel("API : Login", () => {
    const baseURL = "https://reqres.in";


    test("Valid Login", async ({ request }) => {
        const response = await request.post(`${baseURL}/api/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());

        //console.log(responseBody);

        expect(responseBody).toBeTruthy();
    });


    test("Invalid Login", async ({ request }) => {
        const response = await request.post(`${baseURL}/api/login`, {
            data: {
                email: "peter@klaven"
            }
        });

        expect(response.status()).toBe(400);

        const responseBody = JSON.parse(await response.text());

        //console.log(responseBody);

        expect(responseBody.error).toBe("Missing password");
    });


});