const path = require('path')
const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5000

connectDB()
console.log("connectDB finished")

const app = express()
console.log("express() started...")
// fix cors-problem globally:
app.use(cors())
// alternatively, per-route
// app.get('/foobar', cors(), (req, res) => res.send('foobar'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/cryptoshops', require('./routes/cryptoshopRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Server Frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../front-end/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'front-end', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set environment to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))