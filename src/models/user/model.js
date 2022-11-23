'use strict'

const userDAO = require('./dao')

module.exports = {
    create: async (userData) => {
        const user = await userDAO.create(userData)
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isAccepted: user.isAccepted,
            createdAt: user.createdAt
        }
    },
    getByEmail: (email) => {
        return userDAO.getByEmail(email)
    },
    getById: (id) => {
        return userDAO.getById(id)
    }
}