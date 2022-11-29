'use strict'

const router = require('express').Router()

const authRoutes = require('../models/auth/routes')
const gymRoutes = require('../models/gym/routes')
const userRoutes = require('../models/user/routes')
const commentController = require('../models/comment/routes')

router.use('/healthcheck', (_, res) => res.send('OK'))
router.use('/auth', authRoutes)
router.use('/gym', gymRoutes)
router.use('/user', userRoutes)
router.use('/comment', commentController)

module.exports = router