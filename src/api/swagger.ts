const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const express = require("express")

export const swaggerRouter = express.Router()

const swaggerOptions = {
    openapi: "3.0.1",
    swaggerDefinition: {
        info: {
            title: 'API TOP DOC',
            description: 'SWAGGER',
            contact: {
                name: ''
            }
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis: [`./src/controller/*.controller.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))