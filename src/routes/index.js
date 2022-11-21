'use strict'

const router = require('express').Router()

const authRoutes = require('../models/auth/routes')

router.use('/healthcheck', (_, res) => res.send('OK'))
router.use('/auth', authRoutes)

module.exports = router