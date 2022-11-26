'use strict'

const userCollection = require('./mongoose')

module.exports = {
    create: async (userData) => {
        return await userCollection.create(userData)
    },
    getByEmail: (email) => {
        return userCollection.findOne({ email: email })
    },
    getById: async (id) => {
        return await userCollection.findById(id)
    },
    getUsersByGymId: async (gymId) => {
        return await userCollection.find({ gymId: gymId })
    }
}