import {expect, Locator, Page} from "@playwright/test";
import path = require("node:path");
import * as fs from "node:fs";

const dataFile = fs.readFileSync(path.join(__dirname, "../testData/data.json"));
// @ts-ignore
const data = JSON.parse(dataFile);

class BookStore {
    page:Page;
    bookLink :Locator
    ISBN:Locator
    addToCollectionBtn:Locator
    backToStore:Locator
    searchTF:Locator
    author:Locator
    bookFromSearch:Locator
    profileBtn:Locator
    goToStoreBtn:Locator

    constructor(page) {
        this.page = page
        this.bookLink = page.locator(`//span[@class="mr-2"]/a[@text = \`${data.book.title}\`]`)
        this.ISBN=page.locator('//div[@id="ISBN-wrapper"]/div/label[@id="userName-value"]')
        this.addToCollectionBtn = page.getByRole('button', {name:"Add To Your Collection"})
        this.backToStore=page.locator('#addNewRecordButton').first()
        this.searchTF=page.locator('input#searchBox')
        this.bookLink = page.locator(`//span[@class="mr-2"]/a[text()="${data.book.title}"]`);
        this.author = page.locator('//span[@class="mr-2"]/parent::div/parent::td/following-sibling::td', { hasText: data.book.author });
        this.bookFromSearch = page.locator('//span[@class="mr-2"]/a', { hasText: data.book.title2 });
        this.profileBtn=page.locator(('//div[@class="element-list accordion-collapse collapse show"]/ul/li[@id="item-3"]'))
        this.goToStoreBtn=page.getByRole('button' , {name:"Go To Book Store"})
    }
    async addBooktoCollection(){
        await this.goToStoreBtn.click()
        await this.bookLink.click()
        const isbn = await this.ISBN.textContent()
        expect(isbn).toEqual("9781593277574")
        this.page.once("dialog", async(d) =>{
            const message = d.message()
            console.log(message)
            expect(message).toBe("Book added to your collection.")
            await d.accept()
        })
        await this.addToCollectionBtn.click()
        await this.page.waitForTimeout(4000)
        this.page.once("dialog", async(d) =>{
            const message = d.message()
            console.log(message)
            expect(message).toBe("Book already present in the your collection!")
            await d.accept()
        })
        await this.addToCollectionBtn.click()
        await this.backToStore.click()
    }
    async addBookFromSearch(){
        await this.searchTF.fill(data.book.search)
        const author = await this.author.textContent()
        expect(author).toBe("Eric Elliott")
        console.log(author)
        const bookName = await this.bookFromSearch.textContent()
        expect(bookName).toEqual('Programming JavaScript Applications')
        console.log(bookName)
        await this.bookFromSearch.click()
        this.page.once("dialog", async(d) =>{
            const message = d.message()
            console.log(message)
            expect(message).toBe("Book added to your collection.")
            await d.accept()
        })
        await this.addToCollectionBtn.click()
        await this.profileBtn.click()
    }

}
export default BookStore;
