import {test} from "@playwright/test"
import LoginUser from "../PageObjectModel/login.page"
import BookStore from "../PageObjectModel/bookStore.page"
import Profile from "../PageObjectModel/profile.page"

test("E2E 2 - Login, Search and Add Book, Delete All and Logout", async ({page}) => {
    const login = new LoginUser(page)
    const bookStore = new BookStore(page)
    const profile = new Profile(page)

    await login.loginUser()
    await bookStore.addBookFromSearch()
    await profile.deleteFromSearch()
    await profile.deleteAllBooks()
})