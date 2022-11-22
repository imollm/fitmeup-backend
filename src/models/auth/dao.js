'use strict'

const { AccessTokenCollection, RefreshTokenCollection } = require('./mongoose')

module.exports = {
    saveAccessToken: async (userId, accessToken) => {
        return await AccessTokenCollection.create({
            userId,
            token: accessToken
        })
    },
    saveRefreshToken: async (userId, refreshToken) => {
        return await RefreshTokenCollection.create({
            userId,
            token: refreshToken
        })
    },
    getAccessToken: async (accessToken) => {
        return await AccessTokenCollection.findOne({ token: accessToken }) 
    },
    getRefreshToken: async (refreshToken) => {
        return await RefreshTokenCollection.findOne({ token: refreshToken })
    },
    updateAccessToken: async (accessTokenObj) => {
        return await AccessTokenCollection.findOneAndUpdate({ token: accessTokenObj.token }, accessTokenObj)
    },
    updateRefreshToken: async (refreshTokenObj) => {
        return await RefreshTokenCollection.findOneAndUpdate({ token: refreshTokenObj.token }, refreshTokenObj)
    },
    revokeAllAccessTokensByUserId: async (userId) => {
        return await AccessTokenCollection.updateMany({ userId: userId, revoked: false }, { revoked: true })
    },
    revokeAllRefreshTokensByUserId: async (userId) => {
        return await RefreshTokenCollection.updateMany({ userId: userId, revoked: false }, { revoked: true })
    }
}
