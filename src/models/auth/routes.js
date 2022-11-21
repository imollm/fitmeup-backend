'use strict'

const express = require('express')
const router = express.Router()
const authController = require('./controller')
const middlewares = require('../../middlewares')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/me', middlewares.auth, authController.me)
router.post('/refresh-token', middlewares.auth, authController.refreshToken)
router.post('/invalidate-token', middlewares.auth, authController.invalidateToken)
router.post('/logout', middlewares.auth, authController.logout)

module.exports = router