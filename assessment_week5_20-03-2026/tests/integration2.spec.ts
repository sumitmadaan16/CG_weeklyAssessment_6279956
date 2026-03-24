import {test} from "@playwright/test"
import RegisterUser from "../PageObjectModel/registerUser.page"
import LoginUser from "../PageObjectModel/login.page"
import AllBooks from "../PageObjectModel/allBooks.page"
import Profile from "../PageObjectModel/profile.page"

test("Integration 2 - Register, Login, Get All Book Names and Add All to Collection", async ({page}) => {
    const register = new RegisterUser(page)
    const login = new LoginUser(page)
    const allBooks = new AllBooks(page)
    const profile = new Profile(page)

    await register.registerUser("integration2")
    await login.loginUser("integration2")
    const allBookNames = await allBooks.getAllBookNames()
    await allBooks.addAllBooksToCollection(allBookNames)
    await allBooks.verifyCollection()
    await profile.deleteAllBooks()
})