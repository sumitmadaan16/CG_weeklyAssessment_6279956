import { expect, test } from "@playwright/test";
import * as fs from "fs";
import * as trace_events from "node:trace_events";

const filePath = "tests/testData/testData-restful.json";

const readData = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeData = (data: object) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

test("CreateToken" , async({request})=>{
    let data = readData()
    console.log("fetching Token")
    const tokenFetch = await request.post("https://restful-booker.herokuapp.com/auth" , {
        data:{
            username : "admin",
            password : "password123"
        },
        headers: {
            contentType: "application/json"
        },
        ignoreHTTPSErrors:true
    })
    expect(tokenFetch.status()).toBe(200);
    // console.log(await tokenFetch.json())
    const loginBody = await tokenFetch.json();
    data.token = loginBody.token;
    writeData(data)
    console.log("token saved in json")
});
test("Create booking" , async({request})=>{
    let data = readData()
    console.log("Creating Booking")
    const createBooking = await request.post("https://restful-booker.herokuapp.com/booking" , {
        data:{
            firstname : "Tim",
            lastname : "Bradford",
            totalprice : 205,
            depositpaid : true,
            bookingdates : {
                checkin : "2026-04-01",
                checkout : "2026-04-05"
            },
            additionalneeds : "Breakfast"
        },
        headers: {
            contentType: "application/json"
        },
        ignoreHTTPSErrors:true
    })
    expect(createBooking.status()).toBe(200);
    console.log(await createBooking.json())
    const bookingData = await createBooking.json()
    data.bookingId = bookingData.bookingid
    writeData(data)
    console.log("Booking Created")
});
test("fetching booking id's" , async({request})=>{
    let data = readData()
    console.log("fetching Booking Id's")
    const fetchingBookingIds = await request.get("https://restful-booker.herokuapp.com/booking" , {
        headers: {
            contentType: "application/json"
        },
        ignoreHTTPSErrors:true
    })
    expect(fetchingBookingIds.status()).toBe(200);
    console.log(await fetchingBookingIds.json())
    console.log("Booking Id's fetched")
});
test("fetching booking from id" , async({request})=>{
    let data = readData()
    console.log("fetching Booking from id")
    const fetchingBookingIds = await request.get(`https://restful-booker.herokuapp.com/booking/${data.bookingId}` , {
        headers: {
            contentType: "application/json"
        },
        ignoreHTTPSErrors:true
    })
    expect(fetchingBookingIds.status()).toBe(200);
    console.log(await fetchingBookingIds.json())
    console.log("Booking fetched")
});
test("updating booking from id" , async({request})=>{
    let data = readData()
    console.log("updating Booking from id")
    const fetchingBookingIds = await request.put(`https://restful-booker.herokuapp.com/booking/${data.bookingId}` , {
        headers: {
            Cookie: `token=${data.token}`
        },
        data:{
            firstname : "Tim",
            lastname : "Bradford",
            totalprice : 242,
            depositpaid : true,
            bookingdates : {
                checkin : "2026-04-01",
                checkout : "2026-04-07"
            },
            additionalneeds : "Breakfast"
        },
        ignoreHTTPSErrors:true
    })
    expect(fetchingBookingIds.status()).toBe(200);
    console.log(await fetchingBookingIds.json())
    console.log("Booking updated")
});
test("Deleting Booking" , async({request})=>{
    let data = readData()
    console.log("Deleting Booking")
    const fetchingBookingIds = await request.delete(`https://restful-booker.herokuapp.com/booking/${data.bookingId}` , {
        headers: {
            Cookie: `token=${data.token}`
        },
        ignoreHTTPSErrors:true
    })

    expect(fetchingBookingIds.status()).toBe(201);
    console.log(await fetchingBookingIds.text())
    console.log("Booking Deleted")
});
