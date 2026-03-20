import {test} from "@playwright/test"
import RegisterUser from "../PageObjectModel/registerUser.page"
import LoginUser from "../PageObjectModel/login.page"

test("Common 2 - Register and Login", async ({page}) => {
    const register = new RegisterUser(page)
    const login = new LoginUser(page)
    await register.registerUser()
    await login.loginUser()
})