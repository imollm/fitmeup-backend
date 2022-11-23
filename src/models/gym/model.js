'use strict'

const gymDAO = require('./dao')

const getStdGymObj = (gym) => {
    return {
        id:             gym._id,
        name:           gym.name,
        email:          gym.email,
        logoUrl:        gym.logoUrl,
        phone:          gym.phone,
        openHours:      gym.openHours,
        description:    gym.description,
        active:         gym.active,
        location:       gym.location,
        province:       gym.province,
        address:        gym.address,
        createdAt:      gym.createdAt,
        updatedAt:      gym.updatedAt,
        adminId:        gym.adminId
    }
}

module.exports = {
    create: async (gymData) => {
        const gym = await gymDAO.create(gymData)
        return getStdGymObj(gym)
    },
    getByEmail: async (email) => {
        return await gymDAO.getByEmail(email)
    },
    getById: async (gymId) => {
        const gym = await gymDAO.getById(gymId)
        return getStdGymObj(gym)
    }
}