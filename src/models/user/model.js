'use strict'

const userDAO = require('./dao')

const getStdUserObj = (user) => {
    return {
        id:         user._id,
        firstName:  user.firstName,
        lastName:   user.lastName,
        email:      user.email,
        role:       user.role,
        isAccepted: user.isAccepted,
        createdAt:  user.createdAt,
        updatedAt:  user.updatedAt
    }
}

module.exports = {
    create: async (userData) => {
        const user = await userDAO.create(userData)
        return getStdUserObj(user)
    },
    getByEmail: (email) => {
        return userDAO.getByEmail(email)
    },
    getById: (id) => {
        return userDAO.getById(id)
    },
    getUsersByGymId: async (gymId) => {
        const users = await userDAO.getUsersByGymId(gymId)

        return users.map(user => {
            return getStdUserObj(user)
        })
    }
}