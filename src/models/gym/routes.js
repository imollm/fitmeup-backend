'use strict'

const express = require('express')
const router = express.Router()
const gymController = require('./controller')
const middlewares = require('../../middlewares')

router.post('/', middlewares.isAdmin, gymController.create)
router.get('/:id', gymController.getById)

module.exports = router