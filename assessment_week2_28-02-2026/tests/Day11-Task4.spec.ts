import { test } from "@playwright/test"

test("olympic_silver_medal" ,async({page})=>{
    await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020")
    await page.locator('button#onetrust-pc-btn-handler').click()
    await page.locator('button.ot-pc-refuse-all-handler').click()
    await page.locator('//a[@class="Button-styles__Button-sc-37ebb3b-0 eEVWbV cta cta-button"]').click()
    let medal_count = await page.locator('(//div[@class="Medal-styles__Wrapper-sc-645148e1-0 fEoULw"])[6]').textContent()
    console.log(medal_count);
    let date_and_time = new Date().getTime();
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})