'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccessTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    revoked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
})

const RefreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    revoked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = {
    AccessTokenCollection: mongoose.model('AccessToken', AccessTokenSchema),
    RefreshTokenCollection: mongoose.model('RefreshToken', RefreshTokenSchema)
}