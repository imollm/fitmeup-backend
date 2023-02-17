'use strict'

const jwtDAO = require('./dao')

module.exports = {
    saveAccessToken: async (userId, accessToken) => {
        return await jwtDAO.saveAccessToken(userId, accessToken)
    },
    saveRefreshToken: async (userId, refreshToken) => {
        return await jwtDAO.saveRefreshToken(userId, refreshToken)
    },
    getAccessToken: async (accessToken) => {
        return await jwtDAO.getAccessToken(accessToken)
    },
    getRefreshToken: async (refreshToken) => {
        return await jwtDAO.getRefreshToken(refreshToken)
    },
    updateAccessToken: async (accessTokenObj) => {
        return await jwtDAO.updateAccessToken(accessTokenObj)
    },
    updateRefreshToken: async (refreshTokenObj) => {
        return await jwtDAO.updateRefreshToken(refreshTokenObj)
    },
    revokeAllAccessTokensByUserId: async (userId) => {
        return await jwtDAO.revokeAllAccessTokensByUserId(userId)
    },
    revokeAllRefreshTokensByUserId: async (userId) => {
        return await jwtDAO.revokeAllRefreshTokensByUserId(userId)
    }
}
