const {test,expect} =require("@playwright/test");

test("go to Google Website", async({page}) => {
    await page.goto("https://www.google.com/");
    const url = await page.url();
    const title = await page.title();
    console.log("Title : " + title);
    await expect(page).toHaveTitle("Google");
})