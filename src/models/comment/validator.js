'use strict'

const Joi = require('joi')

const schemaCreate = Joi.object({
    comment: Joi.string().min(0).max(400).required(),
    gymId: Joi.string().required()
})
module.exports = {
    validateCreation: (commentData) => {
        const { error } = schemaCreate.validate(commentData)
        return error
    }
}