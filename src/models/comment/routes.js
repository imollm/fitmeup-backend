'use strict'

const express = require('express')
const router = express.Router()
const middlewares = require('../../middlewares')
const commentController = require('./controller')

router.post('/:gymId', middlewares.auth, commentController.create)
router.get('/:gymId', middlewares.auth, commentController.list)

module.exports = router