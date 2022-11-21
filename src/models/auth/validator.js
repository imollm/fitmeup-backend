'use strict'

const Joi = require('joi')

const schemaRegister = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string().required().valid('user','admin'),
    gymId: Joi.string().required()
})

module.exports = {
    validateRegister: (userData) => {
        const { error } = schemaRegister.validate(userData)
        return error
    }
}