const express = require('express')
require('dotenv').config()
// require('./Database/database_connection')

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(PORT)