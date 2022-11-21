'use strict'

const express = require('express')
const config = require('./config')
const MongoDBClient = require('./db')
const middlewares = require('./middlewares')
const PORT = config.incomingPort

const app = express()

const connect = async () => await new MongoDBClient().connect()
connect()

middlewares.init(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app
