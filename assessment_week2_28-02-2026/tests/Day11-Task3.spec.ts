import { test } from "@playwright/test"

test("demo_qspider" ,async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1")
    await page.locator('input#name').fill("user1")
    await page.locator('input#email').fill("user1@gmail.com")
    await page.locator('input#password').fill("user1@123")
    await page.locator('//button[@type="submit"]').click()
    await page.locator('input#email').fill("user1@gmail.com")
    await page.locator('input#password').fill("user1@123")
    await page.locator('//button[@type="submit"]').click()
    let date_and_time = new Date().getTime();
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})