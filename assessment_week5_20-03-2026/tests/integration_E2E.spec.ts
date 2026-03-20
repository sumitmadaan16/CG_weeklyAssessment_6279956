import {test} from "@playwright/test"
import registerUserPage from "../PageObjectModel/registerUser.page"
import LoginUser from "../PageObjectModel/login.page"
import BookStore from "../PageObjectModel/bookStore.page"
import Profile from "../PageObjectModel/profile.page"

test("end to end 1", async ({page}) => {
    let register = new registerUserPage(page)
    let login = new LoginUser(page)
    let bookStore = new BookStore(page)
    let profile = new Profile(page)
    await register.registerUser()
    await login.loginUser()
    await bookStore.addBooktoCollection()
    await bookStore.addBookFromSearch()
    await profile.deleteFromSearch()
    await profile.deleteAllBooks()
    await login.loginUser()
    await profile.deleteUser()
    await login.loginUser()
    await profile.verifyDelete()
})