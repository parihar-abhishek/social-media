const express = require('express')
require('dotenv').config()
require('./Database/database_connection')
const User = require('./Routes/auth')

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/auth',User)

app.listen(PORT)