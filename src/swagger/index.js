'use strict'

const env = process.env.NODE_ENV
const swaggerUi = require('swagger-ui-express')

module.exports = {
    init: (app) => {
        const pathToApiDefinition = env === 'stg' || env === 'prod'
            ? './www-definition.json'
            : './local-definition.json'
        const swaggerDocument = require(pathToApiDefinition)
        const options = { customCssUrl: '../public/swagger-ui.css' }

        app.use('/api-docs', swaggerUi.serve)
        app.get('/api-docs', swaggerUi.setup(swaggerDocument, options))
    }
}