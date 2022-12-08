'use strict'

const env = process.env.NODE_ENV
const swaggerUi = require('swagger-ui-express')

module.exports = {
    init: (app) => {
        const pathToApiDefinition = env === 'stg' || env === 'prod'
            ? './www-definition.json'
            : './local-definition.json'
        
        const swaggerDocument = require(pathToApiDefinition)
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }
}