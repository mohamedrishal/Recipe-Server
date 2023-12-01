// Loads .env contents into process.env by default.
require('dotenv').config()

const express = require('express')
const cors = require('cors')

// router
const router = require('./Routes/router')

// connection import
 require('./DB/connection')

// create an express application
const rbServer = express()

rbServer.use(cors())

// this is middleware to convert json file to object
rbServer.use(express.json())
// router use
rbServer.use(router)

const PORT = 4000 || process.env.PORT

rbServer.listen(PORT,()=>{
    console.log(`Recipe Book Server started at Port: ${PORT} and Waiting for Client Requests!!!!`);
})

// http get request resolving to http://localhost:4000/
rbServer.get('/',(req,res)=>{
    res.send(`<h1>Recipe Book Server Started and Waiting For client requests..!!!!</h1>`)
})


