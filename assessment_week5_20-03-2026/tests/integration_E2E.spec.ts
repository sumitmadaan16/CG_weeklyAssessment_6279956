import {test} from "@playwright/test"
import RegisterUser from "../PageObjectModel/registerUser.page"
import LoginUser from "../PageObjectModel/login.page"
import BookStore from "../PageObjectModel/bookStore.page"
import Profile from "../PageObjectModel/profile.page"

test("end to end 1", async ({page}) => {
    const register = new RegisterUser(page)
    const login = new LoginUser(page)
    const bookStore = new BookStore(page)
    const profile = new Profile(page)

    await register.registerUser("integrationE2E")
    await login.loginUser("integrationE2E")
    await bookStore.addBooktoCollection()
    await bookStore.addBookFromSearch()
    await profile.deleteFromSearch()
    await profile.deleteAllBooks()
    await login.loginUser("integrationE2E")
    await profile.deleteUser()
    await login.loginUser("integrationE2E")
    await profile.verifyDelete()
})