'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Jwt = require('../helpers/Jwt')

module.exports = {
    init: (app) => {
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(express.json())
        app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200
        }))
    },
    auth: async (req, res, next) => {
        try {
            const token = req.header('Authorization')
            const JwtManager = new Jwt()

            if (req.path === '/refresh-token') {
                const headers = req.headers
                const hasContentTypeHeader = headers.hasOwnProperty('content-type')
                const hasAuthorizationHeader = headers.hasOwnProperty('authorization')
                const contentTypeHeader = req.header('Content-Type')
                const { grant_type, refresh_token } = req.body
                const isRefreshTokenValid = await JwtManager.isRefreshTokenValid(refresh_token)

                if (
                    !hasContentTypeHeader ||
                    !hasAuthorizationHeader ||
                    contentTypeHeader !== 'application/x-www-form-urlencoded' ||
                    !grant_type ||
                    grant_type !== 'refresh_token' ||
                    !isRefreshTokenValid
                ) {
                    return res.status(400).json({
                        status: false,
                        message: 'Bad Request'
                    })
                }

                return next()
            } else {
                if (token.indexOf('Bearer') === -1) {
                    return res.status(400).json({
                        status: false,
                        message: 'Invalid header'
                    })
                }

                if (!token) {
                    return res.status(401).json({
                        status: false,
                        message: 'Not authorized'
                    })
                }

                const isValid = await JwtManager.isAccessTokenValid(token.split(' ')[1])
                if (isValid) {
                    const decoded = jwt.decode(token.split(' ')[1])
                    delete decoded.iat
                    delete decoded.exp
                    req.user = decoded
                    return next()
                }


                return res.status(400).json({
                    status: false,
                    message: 'Invalid token'
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: false,
                message: error
            })
        }
    }
}