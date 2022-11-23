'use strict'

const validator = require('./validator')
const gymModel = require('./model')
const userModel = require('../user/model')

module.exports = {
    create: async (req, res) => {
        try {
            const gymData = req.body
            const validation = validator.validateGym(gymData)

            if (validation) {
                return res.status(422).json({
                    status: false,
                    message: validation
                })
            }

            const gymByEmail = await gymModel.getByEmail(gymData.email)

            if (gymByEmail) {
                return res.status(409).json({
                    status: false,
                    message: 'Gym already exists!'
                })
            }

            const adminUser = await userModel.getById(gymData.adminId)

            if (!adminUser) {
                return res.status(404).json({
                    status: false,
                    message: `Admin user doesn\'t exists with id ${gymData.adminId}`
                })
            }

            if (adminUser && adminUser.role !== 'admin') {
                return res.status(400).json({
                    status: false,
                    message: 'You are sending wrong admin id'
                })
            }

            const newGym = await gymModel.create(gymData)

            if (!newGym) {
                return res.status(500).json({
                    status: false,
                    message: 'We can not store new gym'
                })
            }

            return res.status(201).json({
                status: true,
                data: newGym,
                message: 'Gym has been created!'
            })

        } catch(error) {
            if (error.kind === 'ObjectId') {
                return res.status(404).json({
                    status: false,
                    message: `Admin user doesn\'t exists with id ${error.value}`
                })
            } else {
                console.log(error)
                return res.status(500).json({
                    status: false,
                    message: error
                })
            }
        }
    },
    getById: async (req, res) => {
        try {
            const gymId = req.params.id

            if (!gymId || gymId === '') {
                return res.status(400).json({
                    status: false,
                    message: 'You have to send the id of gym'
                })
            }

            const gym = await gymModel.getById(gymId)

            if (!gym) {
                return res.status(500).json({
                    status: false,
                    message: 'Error while retrieve gym'
                })
            }

            return res.json({
                status: true,
                data: gym,
                message: 'You got the requested gym'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    getAll: async (_, res) => {
        const gyms = await gymModel.getAll()

        return res.json({
            status: true,
            data: gyms,
            message: 'You got all gyms!'
        })
    }
}
