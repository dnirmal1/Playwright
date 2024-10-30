const{expect} = require("@playwright/test")
class loginPage {
    constructor(page){
        this.page = page;
        this.username = "#email1";
        this.password = "//*[@type='password']";
        this.loginBtn = ".submit-btn";
        this.header = "//h2[text()='Sign In']";
    }
    async loginToApplication(user,password){
        await this.page.fill(this.username,user);
        await this.page.fill(this.password,password);
        await this.page.click(this.loginBtn);
    }

    async verifySignBtn(){
       await expect(this.page.locator(this.header)).toBeVisible();
    }
}

module.exports = loginPage; 