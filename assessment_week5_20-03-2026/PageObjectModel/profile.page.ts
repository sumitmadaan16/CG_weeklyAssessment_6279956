import {expect, Locator, Page} from "@playwright/test";
import path = require("node:path");
import * as fs from "node:fs";

const dataFile = fs.readFileSync(path.join(__dirname, "../testData/data.json"));
// @ts-ignore
const data = JSON.parse(dataFile);

class Profile{
    page:Page
    searchTF:Locator
    deleteBtn:Locator
    deleteAll:Locator
    closeBtn:Locator
    logoutBtn:Locator
    deleteAccount:Locator
    invalidMsg:Locator
    cross:Locator
    constructor(page) {
        this.page = page
        this.searchTF=page.locator('input#searchBox')
        this.deleteBtn=page.locator('span#delete-record-9781593277574')
        this.deleteAll=page.getByRole('button', {name:"Delete All Books"})
        this.closeBtn = page.locator('#closeSmallModal-ok')
        this.logoutBtn=page.getByRole('button', {name:"Logout"})
        this.deleteAccount = page.getByRole('button' , {name : "Delete Account"})
        this.invalidMsg = page.locator('p.mb-1')
        this.cross=page.locator('//button[@class="btn-close"]')
    }
    async deleteFromSearch(){
        await this.searchTF.fill(data.book.title)
        await this.deleteBtn.click()
        this.page.once("dialog" , async(d)=>{
            const msg = d.message()
            console.log(msg)
            await d.accept()
        })
        await this.closeBtn.click()
        await this.searchTF.clear()
    }
    async deleteAllBooks(){
        await this.deleteAll.click()
        this.page.once("dialog" , async(d)=>{
            const msg = d.message()
            console.log(msg)
            expect(msg).toBe("Do you want to delete all books?")
            await d.accept()
        })
        await this.closeBtn.click()
        await this.page.reload()
        await this.page.waitForTimeout(5000)
        await this.logoutBtn.click()
    }
    async deleteUser(){
        await this.deleteAccount.click()
        this.page.once("dialog" , async(d)=>{
            const msg = d.message()
            console.log(msg)
            expect(msg).toBe("User Id not correct!")
            await d.accept()
        })
        await this.closeBtn.click()
        await this.cross.click()
        await this.logoutBtn.click()
    }
    async verifyDelete(){
        const msg = await this.invalidMsg.textContent()
        expect(msg).toBe("Invalid username or password!")
    }
}
export default Profile