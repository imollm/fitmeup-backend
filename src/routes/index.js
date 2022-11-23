'use strict'

const router = require('express').Router()

const authRoutes = require('../models/auth/routes')
const gymRoutes = require('../models/gym/routes')

router.use('/healthcheck', (_, res) => res.send('OK'))
router.use('/auth', authRoutes)
router.use('/gym', gymRoutes)

module.exports = router