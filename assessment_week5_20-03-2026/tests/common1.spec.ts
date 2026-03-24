import {test} from "@playwright/test"
import LoginUser from "../PageObjectModel/login.page"

test("Common 1 - Login", async ({page}) => {
    const login = new LoginUser(page)
    await login.loginUser("common1")
})