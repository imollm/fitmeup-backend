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
router.delete('/:id', [
    middlewares.auth,
    middlewares.isAdmin,
    middlewares.isOwnerOfGym
], gymController.delete)
router.get('/:id/comments', middlewares.auth, gymController.getAllComments)
router.post('/comments', middlewares.auth, gymController.createComment)

module.exports = router