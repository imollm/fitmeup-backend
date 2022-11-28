'use strict'

const gymDAO = require('./dao')
const userModel = require('../user/model')

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
        const gym = await gymDAO.getByEmail(email)
        return gym ? getStdGymObj(gym) : null
    },
    getById: async (id) => {
        const gym = await gymDAO.getById(id)
        return gym ? getStdGymObj(gym) : null
    },
    getAll: async () => {
        const gyms = await gymDAO.getAll()

        return gyms.map((gym) => {
            return getStdGymObj(gym)
        })
    },
    update: async (id, gymData) => {
        const gymUpdated = await gymDAO.update(id, gymData)
        return gymUpdated ? getStdGymObj(gymUpdated) : null
    },
    getUsers: (gymId) => {
        return userModel.getUsersByGymId(gymId)
    },
    getAdmin: async (gymId) => {
        const gym = await gymDAO.getById(gymId)
        if(!gym) return null;
        return userModel.getById(gym.adminId)
    },
    getGymsByAdminId: async (adminId) => {
        const gyms = await gymDAO.getGymsByAdminId(adminId)

        return gyms.map(gym => {
            return getStdGymObj(gym)
        })
    },
    delete: async (gymId) => {
        const isDeleted = await gymDAO.delete(gymId)
        // TODO: Remove comments and ratings
        return isDeleted
    }
}