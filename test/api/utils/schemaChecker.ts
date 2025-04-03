import { APIRequestContext, expect } from '@playwright/test';
import { Ajv } from 'ajv';

export async function schemaValidator(request: APIRequestContext, responseStatus: number, url: string, schema: {}) {
    const response = await request.get(url);
    
    expect(response.status()).toBe(responseStatus);
    
    const responseBody = JSON.parse(await response.text());
    
    const ajv = new Ajv();
    
    const ajvCompile = ajv.compile(schema);
    
    expect(ajvCompile(responseBody)).toBeTruthy();
}