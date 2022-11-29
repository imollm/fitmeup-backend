'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GymSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    openHours: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: false
    },
    location: {
        type: [Number],
        required: true
    },
    province: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    adminId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Gym', GymSchema)