const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./Database/database_connection')
const User = require('./Routes/auth')
const Post = require('./Routes/postRoute')

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.use('/auth',User)
app.use('/post',Post)

app.listen(PORT)