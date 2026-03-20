import { test } from '@playwright/test';

test("crickbuzz-runs", async({page})=>{
    await page.goto("https://www.cricbuzz.com/")
    await page.getByText("MATCHES").first().click();
    await page.locator("//a[@href='/live-cricket-scores/148720/mly-vs-bhr-1st-t20i-bahrain-tour-of-malaysia-2026']").nth(1).click();
    await page.getByText("Scorecard").click();
    const live_runs= await page.locator("(//div[@class='grid scorecard-bat-grid p-2 border-b border-solid border-cbBorderGrey tb:scorecard-bat-grid-web wb:text-sm wb:scorecard-bat-grid-web'])[4]/child::div[2]").textContent();
    console.log(live_runs);
    let date_and_time=new Date().getTime()
    await page.screenshot({path:`Screenshots/${date_and_time}.png`})
})
