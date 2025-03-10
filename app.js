const express = require("express")
const endpoints = require("./endpoints.json")

const app = express()

app.get("/api", (req, res) => {
    console.log(endpoints)
    res.status(200).send({ endpoints })
});



module.exports = app
