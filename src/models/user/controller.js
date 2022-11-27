'use strict'

const userModel = require('../user/model')
const gymModel = require('../gym/model')

module.exports = {
    getAdminGyms: async (req, res) => {
        try {
            const adminId = req.params.id
            const admin = await userModel.getById(adminId)

            if (!admin) {
                return res.status(404).json({
                    status: false,
                    message: `User with id ${adminId} not found`
                })
            }

            const gyms = await gymModel.getGymsByAdminId(adminId)

            return res.json({
                status: true,
                data: gyms,
                message: `All assigned gyms of admin with id ${adminId}`
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    }
}