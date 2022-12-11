'use strict'

const validator = require('./validator')
const gymModel = require('./model')
const userModel = require('../user/model')
const commentModel = require('../comment/model')
const validatorComment = require('../comment/validator')

module.exports = {
    create: async (req, res) => {
        try {
            const gymData = req.body
            const validation = validator.validateGym(gymData)

            if (validation) {
                return res.status(422).json({
                    status: false,
                    message: 'Some data of gym is wrong'
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
                return res.status(404).json({
                    status: false,
                    message: `Gym with id ${gymId} does not exists`
                })
            }

            if (req.originalUrl.indexOf('/users') !== -1) {
                gym.users = await gymModel.getUsers(gymId)
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
    },
    update: async (req, res) => {
        try {
            const gymId = req.params.id
            const gymData = req.body
            const validation = validator.validateGym(gymData)

            if (validation) {
                return res.status(422).json({
                    status: false,
                    message: 'Some data of gym is wrong'
                })
            }

            const gym = await gymModel.getById(gymId)

            if (!gym) {
                return res.status(404).json({
                    status: false,
                    message: 'The gym with given id doesn\'t exists'
                })
            }

            const gymUpdated = await gymModel.update(gymId, gymData)

            if (!gymUpdated) {
                return res.status(500).json({
                    status: false,
                    message: 'There was a problem while updating gym'
                })
            }

            return res.status(200).json({
                status: true,
                data: gymUpdated,
                message: 'Gym has been updated succesfully!'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    delete: async (req, res) => {
        try {
            const gymId = req.params.id
            const gym = await gymModel.getById(gymId)

            if (!gym) {
                return res.status(404).json({
                    status: false,
                    message: `Gym with id ${gymId} does not exists`
                })
            }

            const isDeleted = await gymModel.delete(gymId)
            const statusCode = isDeleted ? 200 : 500
            const msg = isDeleted
                ? `Gym with id ${gymId} has been deleted`
                : `An error ocurred while deleting gym with id ${gymId}`

            return res.status(statusCode).json({
                status: statusCode === 200,
                message: msg
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    getAllComments: async (req, res) => {
        try {
            const gymId = req.params.id
            const gym = await gymModel.getById(gymId)

            if (!gym) {
                return res.status(404).json({
                    stauts: false,
                    message: `Gym with id ${gymId} does not exists`
                })
            }
        
            const comments = await commentModel.getComments(gymId)
            return res.status(200).json({
                status: true,
                data: comments,
                message: `Comments from gym ${gymId}`
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
    createComment: async (req, res) => {
        try {
            const comment = req.body
            const user = req.user
            const { gymId } = await userModel.getById(user.id)
            const gym = await gymModel.getById(gymId)

            if (gymId !== comment.gymId) {
                return res.status(403).json({
                    status: false,
                    message: 'You cannot add a comment in a gym where you are not registered!'
                })
            }

            if (!gym) {
                return res.status(404).json({
                    status: false,
                    message: `The gym with id ${gymId} does not exists`
                })
            }
      
            if (validatorComment.validateCreation(comment)) {
                return res.status(422).json({
                    status: false,
                    message: 'Some comment data is wrong!'
                })
            }
      
            comment.userId = user.id
            const newComment = await commentModel.create(comment)
            return res.status(201).json({
                status: true,
                data: newComment,
                message: 'Comment has been created!'
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    },
}
