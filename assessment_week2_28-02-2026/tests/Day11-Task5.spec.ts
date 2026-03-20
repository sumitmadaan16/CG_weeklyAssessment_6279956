import { test } from "@playwright/test"

test("shoe_price" ,async({page})=>{
    await page.goto("https://www.amazon.in")
    await page.locator('//input[@id="twotabsearchtextbox"]').fill("shoes")
    await page.locator('//input[@type="submit"]').click()
    await page.locator('(//i[@class="a-icon a-icon-checkbox"])[1]').click()
    await page.waitForSelector('(//h2[contains(@class,"a-size-base")])[5]/span');
    const name = await page.locator('(//h2[contains(@class,"a-size-base")])[5]/span').textContent();
    let price = await page.locator('(//span[@class="a-price-whole"])[4]').textContent()
    console.log(`Price of ${name} is: ${price} `);
    let date_and_time = new Date().getTime();
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})