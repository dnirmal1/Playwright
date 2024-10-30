const {test,expect} = require("@playwright/test");
//const { stringify } = require("querystring");
//JSON.parse(JSON.stringify(require("../testLogin.json")))
const testData = JSON.parse(JSON.stringify(require("../testLogin.json")));



//describe used for multiple tests

test.describe("Data driven login", function() {
    for(const data of testData){
        test.describe(`login with users ${data.id}`,function(){
            test("Login to Application" , async({page}) => {
                await page.goto("https://freelance-learn-automation.vercel.app/login");
                await page.locator("#email1").fill(data.username);
                await page.locator("#password1").fill(data.password);
            })
        })
    }
})