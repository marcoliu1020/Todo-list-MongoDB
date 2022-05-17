const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors') 

// port
const PORT = process.env.PORT || 3000

// import routes
const TodoItemRoute = require('./routes/todoItems')

// express app
const app = express()

// use express.json() to get data into json format
app.use(express.json())

// localhost:3000 interactive localhost:5500
app.use(cors())

// routes
app.use('/', TodoItemRoute)


// connect DB
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log('Database connected'))
.catch(err => console.log(err))

// listen for request
app.listen(PORT, () => console.log(`Listen to port ${PORT}`))