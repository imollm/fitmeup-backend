'use strict'

const commentCollection = require('./mongoose')

module.exports = {
    create: async (commentData) => {
        return await commentCollection.create(commentData)
    },
    getComments: async (gymId) => {
        return await commentCollection.find({ gymId: gymId })
    }
}