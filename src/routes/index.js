'use strict'

const app = require('../server')
const router = require('express').Router()

const authRoutes = require('../models/auth/routes')
const gymRoutes = require('../models/gym/routes')
const userRoutes = require('../models/user/routes')

router.get('/healthcheck', (_, res) => res.send('OK'))
router.use('/auth', authRoutes)
router.use('/gym', gymRoutes)
router.use('/user', userRoutes)

module.exports = router