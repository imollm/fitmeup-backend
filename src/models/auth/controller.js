'use strict'

const validator = require('./validator')
const userModel = require('../user/model')
const helpers = require('../../helpers')

module.exports = {
    register: async (req, res) => {
        try {
            const userData = req.body

            if (validator.validateRegister(userData)) {
                return res.status(422).json({
                    status: false,
                    message: 'Some user data is wrong!'
                })
            }

            const userByEmail = await userModel.getByEmail(userData.email)

            if (userByEmail) {
                return res.status(409).json({
                    status: false,
                    message: 'User already exists!'
                })
            }

            userData.password = await helpers.encryptPass(userData.password)
            const newUser = await userModel.create(userData)

            return res.status(201).json({
                status: true,
                data: newUser,
                message: 'User has been created!'
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