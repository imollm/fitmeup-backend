'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

module.exports = {
    init: (app) => {
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(express.json())
        app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200
        }))
    }
}