const {test, expect} = require("@playwright/test");
const { Ajv } = require("ajv");

test.describe("Reqres.in API test", ()=>{
    const ajv = new Ajv();

    test('TC-1 GET Object', async({request})=>{
        const response = await request.get("https://reqres.in/api/users?page=2");
        const responseJson = await response.json();

        const valid = ajv.validate(require("../json-schema/get-user/schema.json"), responseJson);
        if (!valid){
            console.error("AJV Validation error: ", ajv.errorsText());
        }

        expect(valid).toBe(true);
    });

    test('TC-2 POST Object', async({request})=>{
        const body = {
            
                "name": "morpheus",
                "job": "leader",
                "id": "968",
                "createdAt": "2024-10-19T03:09:06.637Z"
        };
        
        const header = {
            Accept: "application/json"
        }

        const response = await request.post("https://reqres.in/api/users", {
            headers: header,
            data: body
        });
        const responseJson = await response.json();

        const validatePost = ajv.validate(require("../json-schema/post-user/post_schema.json"), responseJson)
        if (!validatePost){
            console.error("AJV Validation error: ", ajv.errorsText());
        }

        expect(validatePost).toBe(true)
    });
    test('TC-3 DELETE Object', async ({ request }) => {
        const response = await request.delete('https://reqres.in/api/users/2');
      
        
        expect(response.status()).toBe(204);  
    });

    test("TC-4 PUT Object", async({request})=>{
        const body = {
            
                "name": "morpheus",
                "job": "zion resident",
                "updatedAt": "2024-10-19T03:40:30.735Z"
            
        };
        const header = {
            Accept: "application/json",
        };
        
        const response = await request.put("https://reqres.in/api/users/2", {
            headers: header,
            data: body
        })
        const responseJson = await response.json();
        const validatePut = ajv.validate(require("../json-schema/put-user/put_schema.json"), responseJson);
        if(!validatePut){
            console.error("AJV Validatation error: ", ajv.errorsText());
        }
        expect(validatePut).toBe(true)
    })
})
