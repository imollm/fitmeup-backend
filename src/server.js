'use strict'

const express = require('express')
const config = require('./config')
const MongoDBClient = require('./db')
const middlewares = require('./middlewares')
const routes = require('./routes')
const PORT = config.incomingPort

const app = express()

const mongoClient = new MongoDBClient()
const connect = async () => await mongoClient.connect()
const seedSuperAdmin = async () => await mongoClient.seedSuperAdminUser()
connect()
seedSuperAdmin()

middlewares.init(app)

app.use('/api/v1', routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app
