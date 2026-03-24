import {expect, Locator, Page} from "@playwright/test";
import path = require("node:path");
import * as fs from "node:fs";

const dataFile = fs.readFileSync(path.join(__dirname, "../testData/data.json"));
// @ts-ignore
const data = JSON.parse(dataFile);

class RegisterUser {
    page: Page
    firstNameTF: Locator
    lastNameTF: Locator
    userNameTF: Locator
    passwordTF: Locator
    registerBtn: Locator
    backToLogin: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameTF = page.getByPlaceholder('First Name')
        this.lastNameTF = page.getByPlaceholder('Last Name')
        this.userNameTF = page.getByPlaceholder('UserName')
        this.passwordTF = page.getByPlaceholder('Password')
        this.registerBtn = page.locator('#register')
        this.backToLogin = page.locator('#gotologin')
    }

    async registerUser(userKey: string) {
        const user = data.users[userKey]
        await this.page.goto(data.url.urlRegister)
        await this.firstNameTF.fill(user.firstName)
        await this.page.waitForTimeout(1000)
        await this.lastNameTF.fill(user.lastName)
        await this.page.waitForTimeout(1000)
        await this.userNameTF.fill(user.userName)
        await this.page.waitForTimeout(1000)
        await this.passwordTF.fill(user.password)
        await this.page.waitForTimeout(1000)
        await this.page.waitForTimeout(4000)
        this.page.once("dialog", async (dialog) => {
            const message = await dialog.message()
            expect(message).toContain("User Registered Successfully.")
            await dialog.accept()
        })
        await this.registerBtn.click()
        await this.backToLogin.click()
    }
}

export default RegisterUser