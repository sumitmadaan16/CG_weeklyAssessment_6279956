import {test} from "@playwright/test";

test("icc-ranking-women-task", async({page})=>{
    await page.goto("https://www.icc-cricket.com/rankings")
    let icc_rank=await page.locator('//section[@id="womens-batting-rankings"]/descendant::table[@class="w-full border-collapse"][1]/descendant::span[@class="text-xs font-extrabold uppercase text-primary pr-2"][2]').innerText()
    console.log(icc_rank)
    let date_and_time=new Date().getTime()
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})