'use strict'

const express = require('express')
const router = express.Router()
const userController = require('./controller')
const middlewares = require('../../middlewares')

router.get('/:id/gym', [
    middlewares.auth,
    middlewares.isAdmin
], userController.getAdminGyms)

module.exports = router