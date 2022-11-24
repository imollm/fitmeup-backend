'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Jwt = require('../helpers/Jwt')
const config = require('../config')
const gymModel = require('../models/gym/model')

module.exports = {
    init: (app) => {
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(express.json({limit: config.limitBody}))
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
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    registerAdmin: (req, res, next) => {
        try {
            const hasRoleBodyAttr = req.body && req.body.hasOwnProperty('role')
            
            if (hasRoleBodyAttr && req.body.role === 'user') {
                return next()
            }

            const hasAuthorizationHeader = req.headers.hasOwnProperty('authorization')
            const authHeader = req.header('Authorization')
            const accessToken = authHeader ? authHeader.split(' ')[1] : null

            if (hasRoleBodyAttr && req.body.role === 'admin') {
                if (hasAuthorizationHeader && authHeader.indexOf('Bearer') !== -1) {
                    if (accessToken) {
                        const JwtManager = new Jwt()
    
                        if (JwtManager.isSuperAdmin(accessToken)) {
                            return next()
                        }
        
                        return res.status(401).json({
                            status: false,
                            message: 'You are not a superadmin'
                        })
                    }
                }
            }

            return res.status(400).json({
                status: false,
                message: 'Bad Request'
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    isAdmin: (req, res, next) => {
        try {
            const hasAuthorizationHeader = req.headers.hasOwnProperty('authorization')
            const authHeader = req.header('Authorization')
            const accessToken = authHeader ? authHeader.split(' ')[1] : null

            if (hasAuthorizationHeader && authHeader.indexOf('Bearer') !== -1) {
                if (accessToken) {
                    const JwtManager = new Jwt()
    
                    if (JwtManager.isAdmin(accessToken)) {
                        return next()
                    }
    
                    return res.status(401).json({
                        status: false,
                        message: 'You are not an admin'
                    })
                }
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    isOwnerOfGym: async (req, res, next) => {
        try {
            const gymId = req.params.id
            const adminId = req.body.adminId
            const accessToken = req.header('authorization').split(' ')[1]

            if (gymId && accessToken && adminId) {
                const JwtManager = new Jwt()
                const tokenDecoded = JwtManager.decodeToken(accessToken)
                const adminIdFromToken = tokenDecoded._id
                const gym = await gymModel.getById(gymId)

                if (gym.adminId === adminIdFromToken && gym.adminId === adminId) {
                    return next()
                }
            }

            return res.status(400).json({
                status: false,
                message: 'Check your request, you have some wrong info'
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    }
}