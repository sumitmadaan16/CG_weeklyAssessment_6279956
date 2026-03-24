import {expect, Locator, Page} from "@playwright/test";

class AllBooks {
    page: Page
    bookTitles: Locator
    addToCollectionBtn: Locator
    backToStore: Locator
    profileBtn: Locator
    goToStoreBtn: Locator
    collectionBooks: Locator

    constructor(page: Page) {
        this.page = page
        this.bookTitles = page.locator('//span[@class="mr-2"]/a')
        this.addToCollectionBtn = page.getByRole('button', { name: "Add To Your Collection" })
        this.backToStore = page.locator('#addNewRecordButton').first()
        this.profileBtn = page.locator('//div[@class="element-list accordion-collapse collapse show"]/ul/li[@id="item-3"]')
        this.goToStoreBtn = page.getByRole('button', { name: "Go To Book Store" })
        this.collectionBooks = page.locator('//span[@class="mr-2"]/a')
    }
    async getAllBookNames(): Promise<string[]> {
        await this.goToStoreBtn.click()
        await this.page.waitForLoadState("load")
        await expect(this.bookTitles.first()).toBeVisible()
        const allBookNames = await this.bookTitles.allTextContents()
        console.log(`Found ${allBookNames.length} books in the store:`)
        allBookNames.forEach((name, index) => {
            console.log(`  ${index + 1}. ${name}`)
        })
        return allBookNames
    }
    async addAllBooksToCollection(allBookNames: string[]) {
        for (let i = 0; i < allBookNames.length; i++) {
            const bookName = allBookNames[i]
            console.log(`\nAdding book: "${bookName}"`)
            await this.page.locator('//span[@class="mr-2"]/a', { hasText: bookName }).click()
            await this.page.waitForLoadState("load")
            this.page.once("dialog", async (dialog) => {
                const message = dialog.message()
                console.log(`Dialog for "${bookName}": ${message}`)
                expect(
                    message === "Book added to your collection." ||
                    message === "Book already present in the your collection!"
                ).toBeTruthy()
                await dialog.accept()
            })
            await this.addToCollectionBtn.click()
            await this.page.waitForTimeout(2000)
            await this.backToStore.click()
            await this.page.waitForLoadState("load")
        }
    }
    async verifyCollection(): Promise<string[]> {
        await this.profileBtn.click()
        await this.page.waitForLoadState("load")
        await expect(this.collectionBooks.first()).toBeVisible()
        const collectedBookNames = await this.collectionBooks.allTextContents()
        console.log(`\nBooks in collection (${collectedBookNames.length}):`)
        collectedBookNames.forEach((name, index) => {
            console.log(`  ${index + 1}. ${name}`)
        })
        expect(collectedBookNames.length).toBeGreaterThan(0)
        return collectedBookNames
    }
}

export default AllBooks