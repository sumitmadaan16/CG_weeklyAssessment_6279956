import {test} from "@playwright/test"
import RegisterUser from "../PageObjectModel/registerUser.page"
import LoginUser from "../PageObjectModel/login.page"
import BookStore from "../PageObjectModel/bookStore.page"

test("E2E 1 - Register, Login and Add Book to Collection", async ({page}) => {
    const register = new RegisterUser(page)
    const login = new LoginUser(page)
    const bookStore = new BookStore(page)

    await register.registerUser()
    await login.loginUser()
    await bookStore.addBooktoCollection()
})