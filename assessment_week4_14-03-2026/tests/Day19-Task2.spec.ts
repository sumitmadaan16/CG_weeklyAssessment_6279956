import {test} from '@playwright/test'
import * as fs from "node:fs";
import path = require("node:path");


let dataFile=fs.readFileSync(path.join(__dirname, '/testData/Day19-Task2.json'))
//@ts-ignore
let data=JSON.parse(dataFile)

test("task-2", async ({page})=>{
    for(let d of data){
        await page.goto("https://demoqa.com/automation-practice-form")
        await page.getByPlaceholder("First Name").fill(d.firstName)
        await page.getByPlaceholder("Last Name").fill(d.lastName)
        await page.getByPlaceholder("name@example.com").fill(d.email)
        await page.getByPlaceholder("Mobile Number").fill(d.phoneNumber)
        await page.locator(`//label[text()='${d.gender}']`).click()
        await page.locator('#dateOfBirthInput').fill(d.dob)
        await page.locator('body').click()
        await page.locator('//input[@class="subjects-auto-complete__input"]').fill(d.subject)
        await page.locator('#react-select-2-option-0').click()
        await page.getByLabel(`${d.hobbies}`).click()
        await page.locator('#uploadPicture').setInputFiles(
            "/Users/sumitmadaan/Downloads/Safari_download/bg.jpg"
        )
        await page.getByPlaceholder("Current Address").fill(d.address)
        await page.locator('(//div[@class="css-1wy0on6"])[1]').click()
        await page.locator('#react-select-3-input').click();
        await page.getByRole('option', { name: 'NCR' }).click();
        await page.locator("#react-select-4-input").click()
        await page.getByRole('option', { name: 'Delhi' }).click();
        await page.locator('//button[@id="submit"]').click()

    }
})