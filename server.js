const { request, response } = require('express')
const express = require('express') // create variable to allow express to be accessed
const app = express()

//routes
app.get('/', (req,res) => {
    res.send('Hello Node API')
}) // request is what clients send, respond is what you respond back to the client

app.listen(3000, ()=> {
    console.log("API app is running on port 3000")
})
