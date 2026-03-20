import {expect, Locator, Page} from "@playwright/test";
import path = require("node:path");
import * as fs from "node:fs";

const dataFile = fs.readFileSync(path.join(__dirname, "../testData/data.json"));
// @ts-ignore
const data = JSON.parse(dataFile);

class LoginUser{
    page:Page
    userNameTf:Locator
    passwordTf:Locator
    loginBtn:Locator


    constructor(page:Page){
        this.page = page;
        this.userNameTf=page.getByPlaceholder("UserName")
        this.passwordTf=page.getByPlaceholder("Password")
        this.loginBtn=page.locator('#login')

    }
    async loginUser(){
        await this.userNameTf.fill(data.user.userName)
        await this.passwordTf.fill(data.user.password)
        await this.loginBtn.click()
        await this.page.waitForLoadState("load")

    }
}
export default LoginUser;