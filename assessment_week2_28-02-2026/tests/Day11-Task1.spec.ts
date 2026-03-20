import { test } from "@playwright/test"

test("shoe_price" ,async({page})=>{
    await page.goto("https://www.amazon.in")
    await page.locator('//input[@id="twotabsearchtextbox"]').fill("shoes")
    await page.locator('//input[@type="submit"]').click()
    let name = await page.locator('(//span[@class="a-truncate-cut"])[3]').textContent()
    let price = await page.locator('(//span[@class="a-price-whole"])[1]').textContent()
    console.log(`Price of ${name} is: ${price} `);
    let date_and_time = new Date().getTime();
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})