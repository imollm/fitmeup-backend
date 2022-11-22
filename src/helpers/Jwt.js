const config = require('../config')
const jwt = require('jsonwebtoken')
const jwtModel = require('../models/auth/model')

class Jwt {

    constructor() {
        this.accessTokenSecret = config.tokenSecret
        this.refreshTokenSecret = config.refreshTokenSecret
        this.accessTokenExpTime = config.tokenExpTime
        this.refreshTokenExpTime = config.refreshTokenExpTime

        if (typeof Jwt.instance === 'object') {
            return Jwt.instance
        }

        Jwt.instance = this
        return this
    }

    generateToken(user) {
        const accessToken = this.signAccessToken(user)
        const refreshToken = this.signRefreshToken(user)
        user.accessToken = accessToken
        user.refreshToken = refreshToken
    
        return {
            accessToken,
            refreshToken
        }
    }
    
    signAccessToken(user) {
        const expirationTime = { expiresIn: config.tokenExpTime }
        
        return jwt.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }, config.tokenSecret, expirationTime)
    }
    
    signRefreshToken(user) {
        const expirationTime = { expiresIn: config.refreshTokenExpTime }
    
        return jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
        }, config.refreshTokenSecret, expirationTime)
    }
    
    decodeToken(token) {
        return jwt.decode(token)
    }

    async isAccessTokenValid(accessToken) {
        try {
            jwt.verify(accessToken, config.tokenSecret)
            const accessTokenObj = await jwtModel.getAccessToken(accessToken)
            return true && !accessTokenObj.revoked
        } catch (error) {
            return false
        }
    }

    async isRefreshTokenValid(refreshToken) {
        try {
            jwt.verify(refreshToken, config.refreshTokenSecret)
            const refreshTokenObj = await jwtModel.getRefreshToken(refreshToken)
            return true && !refreshTokenObj.revoked
        } catch (error) {
            return false
        }
    }

    invalidateAccessToken(accessToken) {
        const accessTokenObj = {
            token: accessToken,
            revoked: true
        }

        jwtModel.updateAccessToken(accessTokenObj)
    }

    invalidateRefreshToken(refreshToken) {
        const refreshTokenObj = {
            token: refreshToken,
            revoked: true
        }

        jwtModel.updateRefreshToken(refreshTokenObj)
    }

    invalidateAllAccessTokens(userId) {
        jwtModel.revokeAllAccessTokensByUserId(userId)
    }

    invalidateAllRefreshTokens(userId) {
        jwtModel.revokeAllRefreshTokensByUserId(userId)
    }
}

module.exports = Jwt
