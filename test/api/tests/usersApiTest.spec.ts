import { test, expect } from '@playwright/test';
import { usersSchema } from '../schema/usersSchema';
import { schemaValidator } from '../utils/schemaChecker';

test.describe.parallel("API : Users", () => {
    const baseURL = "https://reqres.in";


    test("Users Schema Validation", async ({ request }) => {
        const schema = usersSchema;
        
        await schemaValidator(request, 200, `${baseURL}/api/users`, schema);
    });


    test("Get User Two", async ({ request }) => {
        const response = await request.get(`${baseURL}/api/users/2`);

        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());

        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.first_name).toBe("Janet");
        expect(responseBody.data.last_name).toBe("Weaver");

        expect(responseBody.support.url).toContain("contentcaddy");
    });
    

    test("User Not Found", async ({ request }) => {
        const response = await request.get(`${baseURL}/api/users/23`);

        expect(response.status()).toBe(404);
    });


    test("Create User", async ({ request }) => {
        const response = await request.post(`${baseURL}/api/users`, {
            data: {
                name: "Mike", 
                job: "QA Engineer"
            }
        });

        expect(response.status()).toBe(201);

        const responseBody = JSON.parse(await response.text());

        //console.log(responseBody);

        expect(responseBody.name).toBe("Mike");
        expect(responseBody.job).toBe("QA Engineer");
        expect(responseBody.id).toBeTruthy();
        expect(responseBody.createdAt).toBeTruthy();
    });

    test("Update User Name", async ({ request }) => {
        const response = await request.put(`${baseURL}/api/users/3`, {
            data: {
                name: "Ralph"     
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());

        //console.log(responseBody);

        expect(responseBody.name).toBe("Ralph");
        expect(responseBody.updatedAt).toBeTruthy();
    });


    test("Update User Job", async ({ request }) => {
        const response = await request.put(`${baseURL}/api/users/3`, {
            data: {
                job: "QA Automation Engineer"      
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());

        //console.log(responseBody);

        expect(responseBody.job).toBe("QA Automation Engineer");
        expect(responseBody.updatedAt).toBeTruthy();
    });


    test("Delete User", async ({ request }) => {
        const response = await request.delete(`${baseURL}/api/users/5`);

        expect(response.status()).toBe(204);
    });

});