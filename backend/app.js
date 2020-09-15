const express = require("express")
const app = express()
const CryptoJS = require("crypto-js")
const cors = require("cors")

const port = 3080

let browserList = {}

// set JSON spacing
app.set("json spaces", 4)

// enable CORS
app.use(cors())

app.get("/getToken", (req, res) => {
    var ipAddr = req.header('x-forwarded-for') || req.connection.remoteAddress;

    let d = new Date()
    let thisHour = d.getTime().toString()
    let oneHour = (d.setHours(1) * 2).toString()
    let threeHour = (d.setHours(3) * 5).toString()

    let token = CryptoJS.SHA256(ipAddr + thisHour + oneHour + threeHour).toString()
    browserList[ipAddr] = token

    let response = { token: token }
    res.json(response)
})

app.listen(port, () => {
    console.log(`App started at port ${port}`)
})