'use strict'

const Joi = require('joi')

const schemaRegister = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).required().email(),
    logoUrl: Joi.string().empty(''),
    phone: Joi.string().required().max(25),
    openHours: Joi.string().required().max(255),
    description: Joi.string().max(1024).empty(),
    active: Joi.boolean().default(false).empty(),
    location: Joi.array().length(2).ordered(Joi.number().min(-90).max(90), Joi.number().min(-180).max(180)),
    province: Joi.string().required().max(255),
    address: Joi.string().required().max(255),
    adminId: Joi.string().required()
})

module.exports = {
    validateGym: (gymData) => {
        const { error } = schemaRegister.validate(gymData)
        return error
    }
}