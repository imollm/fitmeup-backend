'use strict'

const express = require('express')
const config = require('./config')
const app = express()
const PORT = config.incomingPort

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app
