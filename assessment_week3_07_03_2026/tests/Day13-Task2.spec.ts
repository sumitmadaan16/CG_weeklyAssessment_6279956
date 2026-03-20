import {test} from "@playwright/test"

test("olympic-task", async({page})=>{
    await page.goto("https://www.olympics.com/en/")
    await page.locator('//div[@class="sc-780ccd9c-2 ejyPot"]/descendant::section[@class="sc-fe434144-4 fCOCaX"]').click()
    await page.locator('//div[@class="input-group"]/input[@type="search"]').fill("Emma McKeon");
    await page.locator('//div[@class="input-group"]/button[@type="button"]').click();
    await page.waitForSelector('//div[@class="search--results pb-5"]/descendant::a[@class="article--wrapper"]');
    await page.locator('//div[@class="search--results pb-5"]/descendant::a[@class="article--wrapper"]').first().click();
    let s_medal=await page.locator('//div[@class="sc-ce26874d-10 fOoPCV"]/descendant::span[@class="Medal-styles__Medal-sc-645148e1-1 fqHqIZ"]/span').innerText()
    console.log(s_medal)
    let date_and_time=new Date().getTime()
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})