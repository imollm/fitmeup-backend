'use strict'

const express = require('express')
const router = express.Router()
const gymController = require('./controller')
const middlewares = require('../../middlewares')

router.post('/', middlewares.isAdmin, gymController.create)
router.get('/:id', gymController.getById)
router.get('/', gymController.getAll)
router.put('/:id', [
    middlewares.auth,
    middlewares.isAdmin,
    middlewares.isOwnerOfGym
], gymController.update)
router.get('/:id/users', gymController.getById)

module.exports = router