'use strict'

const config = require('../config')
const mongoose = require('mongoose')

class MongoDBClient {

    constructor() {
        this.client = undefined
        this.url = config.mongoUrl
        mongoose.Promise = global.Promise
    }

    async connect() {
        try {
            this.client = await mongoose.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
            console.log('Database connection do it fine!!!')
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async disconnect() {
        try {
            if (this.client !== undefined)
                await this.client.disconnect()
            console.log('Database disconnect do it fine!!!')
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}

module.exports = MongoDBClient