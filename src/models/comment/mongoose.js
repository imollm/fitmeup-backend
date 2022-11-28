'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    },
    gymId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', CommentSchema)