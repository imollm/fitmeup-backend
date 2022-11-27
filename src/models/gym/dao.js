'use strict'

const gymCollection = require('./mongoose')

module.exports = {
    create: async (gymData) => {
        return await gymCollection.create(gymData)
    },
    getByEmail: async (email) => {
        return await gymCollection.findOne({ email: email })
    },
    getById: async (id) => {
        return await gymCollection.findById(id)
    },
    getAll: async () => {
        return await gymCollection.find({})
    },
    update: async (id, gymData) => {
        const gymDataObj = {
            name: gymData.name,
            logoUrl: gymData.logoUrl,
            phone: gymData.phone,
            openHours: gymData.openHours,
            description: gymData.description,
            active: gymData.active,
            location: gymData.location,
            province: gymData.province,
            address: gymData.address,
            updatedAt: new Date()
        }

        await gymCollection.findOneAndUpdate({ _id: id }, gymDataObj)
        const gymUpdated = await gymCollection.findById(id)
        return gymUpdated
    },
    getGymsByAdminId: async (adminId) => {
        return await gymCollection.find({ adminId })
    }
}