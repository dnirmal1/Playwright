const {test,expect} =require("@playwright/test");
const exp = require("constants");

/*
 To run this file using console terminal 
    npx playwright test ./tests/myntraPaga.spec.js   
    npx playwright test ./tests/myntraPaga.spec.js --headed
    npx playwright test -g "Amazon page" --headed
    npx playwright test --reporter=allure-playwright
    npx playwright test --reporter=line
*/

test("Amazon page", async({page}) => {
    await page.goto("https://www.amazon.in/");
    const url = await page.url();
    const title = await page.title();
    console.log("Title : " + title);
    await page.getByAltText("Great Indian Festival");
    await page.getByPlaceholder("Search Amazon.in").fill("iphone",{delay : 200});
    await page.locator("//*[@value='Go']").click();
    await expect(page).toHaveURL(/iphone/);
})

test("Select Dropdown vaue", async({page}) => {
    await page.goto("https://freelance-learn-automation.vercel.app/signup");
    await page.locator("#state").selectOption({label:"Maharashtra"});
    await page.waitForTimeout(10000);
    await page.locator("#state").selectOption({value:"Goa"});
    await page.waitForTimeout(3000);
    await page.locator("#state").selectOption({index:4});
    await page.waitForTimeout(1000);
    const dropDownItem = await page.locator("#state").textContent();
    console.log("All the dropdown items : " + dropDownItem);
    await expect(dropDownItem.includes("West Bengal")).toBeTruthy();
    // run a loop in playwright 
    let ddStatus = false;
    let state = await page.$("#state");
    let allEle = await state.$$("option");
    for(let i = 0 ; i < allEle.length; i++){
        let ele = allEle[i];
        let val = await ele.textContent();
        if(val.includes("Puducherry")){
            ddStatus = true;
            break;
        }
        
        console.log("value from dropdown using for loop : "+val);
    }
    await expect(ddStatus).toBeTruthy();
    await page.locator("#hobbies").selectOption(["Playing","Dancing"]);
    await page.waitForTimeout(1000);

})

test("ebay hover functionality", async({page}) => {
    await page.goto("https://www.ebay.com/");
    //await page.getByRole("button",{name: "Sign in"}).click();
    //await page.getByRole("button" , {name : "Expand: Motors"}).hover();
    await page.locator("//*[@data-currenttabindex='1']").hover();
})

test("upload the file" , async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    //await page.locator("#file-upload").setInputFiles("/Users/aishwarya.gawande/Desktop/One.png");
    //await page.waitForTimeout(1000);
    //await page.locator("#file-submit").click();
    //expect(await page.locator("#content")).toHaveText("File Uploaded!");
    await page.locator("#file-upload").setInputFiles("./Upload/One.png");
    await page.waitForTimeout(1000);
    await page.locator("#file-submit").click();
    expect(await page.locator("#content")).toContainText("File Uploaded!");
})

test("Keyword actions Activity" , async({page}) =>{
    await page.goto("https://www.google.com/");
    //await page.locator("//textarea[@name='q']").fill("mukesh ambani");
    //await page.keyboard.press("Enter");
    // await page.keyboard.press("Meta+A");
    // await page.keyboard.press("Meta+C");
    // await page.keyboard.press("Backspace");
    // await page.keyboard.press("Meta+V");
    await page.locator("//textarea[@name='q']").focus();
    await page.keyboard.type("mukesh ambani");
    await page.keyboard.press("ArrowLeft");
    //await page.keyboard.down("shift");
    for(let i = 0 ; i < 'ambani'.length ; i++){
        await page.keyboard.press("ArrowLeft");
    }
    await page.keyboard.up("shift");
    await page.keyboard.press("Backspace");
})

test("Handle autocomplete" , async({page}) =>{
    await page.locator("https://www.google.com/");
    await page.locator("textarea[name='q']").fill("playwright")
    await page.waitForSelector("//li[@role='presentation']")
    // await page.keyboard.press("ArrowDown");
    // await page.keyboard.press("ArrowDown");
    // await page.keyboard.press("Enter");
    const ele = await page.$$("//li[@role='presentation']")
    for(let i = 0 ; i < ele.length ; i++){
        const text = await ele[i].textContent()
        if(text.includes('automation tool')){
            await ele[i].click();
            break;
        }
    }
    
})

test("Handle alert" , async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on('dialog', async(d) => {
        expect(d.type()).toContain("alert");
        expect(d.message().toContain("I am a JS Alert"));
        await d.accept();
    })
    await page.locator("//button[text()='Click for JS Alert']").click();

})

test("Handle confirm alert" , async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on('dialog' , async(dialogWindow) =>{
        expect(dialogWindow.type().toContain("confirm"));
        expect(dialogWindow.message().toContain("I am a JS Confirm"));
        await dialogWindow.dismiss();
    })
    await page.locator("//button[text()='Click for JS Confirm']").click();

})

test("Handle prompt alert" ,async({page}) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on('dialog' ,async(dialogWindow1) => {
        expect(dialogWindow1.type().toContain("prompt"));
        expect(dialogWindow1.message().toContain("I am a JS prompt"));
        await dialogWindow1.accept("Aishwarya");
    })
    await page.locator("//button[text()='Click for JS Prompt']");
    await page.waitForTimeout(5000);
    const pre = await page.locator("#result").textContent();
    console.log(pre);
})


test("Handle Frames" , async({page}) => {
    await page.goto("https://www.redbus.in/");
    const iframe = await page.frameLocator(".modalIframe");
    await iframe.locator("//*[@type='number']").click();
    await page.pause();
})

test('Working with multiple tabs' , async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://freelance-learn-automation.vercel.app/login");
    const [newPage] = await Promise.all
    (
        [
        context.waitForEvent("page"),
        page.locator("(//a[contains(@href,'youtube')])[1]").click()
       ]
   )
   await newPage.waitForTimeout(5000);
    await newPage.locator("//*[@name='search_query']").fill("Playwright");
    await newPage.waitForTimeout(5000);
    await newPage.close();
    await page.locator("#email1").fill("aishwarya");
})

test("Working with load state" , async({page}) =>{
    await page.goto("https://freelance-learn-automation.vercel.app/login");
    await page.locator("//a[text()='New user? Signup']").click();
    await page.waitForLoadState("networkidle");
    const resCount = await page.locator("//input[@type='checkbox']").count();
    expect(resCount).toBe(13);
})


test('Login to Application',async({page}) => {    
     await page.goto("https://freelance-learn-automation.vercel.app/login");
     await page.locator("#email1").fill(testData.username);
     await page.locator("#password1").fill(testData.password);
 })