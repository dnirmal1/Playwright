const {test,expect} = require("@playwright/test");
const LoginPage = require("../Pages/loginPage")
const HomePage = require("../Pages/homePage");
const loginPage = require("../Pages/loginPage");

test('Application Login Page' , async({page}) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login");
    const logIn =  new LoginPage(page);
    await logIn.loginToApplication("aishwarya.gawande2@paysense.in","Testing@123");
    const homePage = new HomePage(page);
    await homePage.logOutFromApplication();
    await homePage.verifyCartOption();
    await logIn.verifySignBtn();
})