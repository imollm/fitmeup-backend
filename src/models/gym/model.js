'use strict'

const gymDAO = require('./dao')

module.exports = {
    create: async (gymData) => {
        const gym = await gymDAO.create(gymData)
        return {
            id: gym._id,
            name: gym.name,
            email: gym.email,
            logoUrl: gym.logoUrl,
            phone: gym.phone,
            openHours: gym.openHours,
            description: gym.description,
            active: gym.active,
            location: gym.location,
            province: gym.province,
            address: gym.address,
            createdAt: gym.createdAt,
            updatedAt: gym.updatedAt,
            adminId: gym.adminId
        }
    },
    getByEmail: async (email) => {
        return await gymDAO.getByEmail(email)
    }
}