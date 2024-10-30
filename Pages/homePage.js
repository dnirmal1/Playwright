const {expect} = require("@playwright/test")
class HomePage {
    constructor(page){
        this.page = page;
        this.icon = "//img[@alt='menu']";
        this.signOut = "//button[text()='Sign out']";
        this.cartOpt = ".cartBtn";
    }

    async logOutFromApplication(){
        await this.page.click(this.icon);
        await this.page.click(this.signOut);

    }

    async verifyCartOption(){
       await expect(this.page.locator(this.cartOpt)).toBeVisible();
    }
}

module.exports = HomePage;