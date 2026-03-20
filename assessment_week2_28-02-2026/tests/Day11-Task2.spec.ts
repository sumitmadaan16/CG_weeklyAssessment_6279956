import { test } from "@playwright/test"

test("3rd_phone_price" ,async({page})=>{
    await page.goto("https://www.flipkart.com")
    await page.locator('(//span[@class="b3wTlE"])[1]').click()
    await page.locator('(//input[@class="nw1UBF v1zwn25"])[1]').fill("phones")
    await page.locator('(//button[@class="XFwMiH"])[1]').click()
    await page.locator('(//div[@class="ybaCDx"])[1]').click()
    let price = await page.locator('(//div[@class="hZ3P6w DeU9vF"])[3]').textContent()
    console.log(`Price is: ${price} `);
    let date_and_time = new Date().getTime();
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})