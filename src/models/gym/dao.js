'use strict'

const gymCollection = require('./mongoose')

module.exports = {
    create: async (gymData) => {
        return await gymCollection.create(gymData)
    },
    getByEmail: async (email) => {
        return await gymCollection.findOne({ email: email })
    }
}