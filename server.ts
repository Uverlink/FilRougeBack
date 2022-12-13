require('dotenv').config()

const cors = require('cors')
const express = require("express")

const app = express()
const router = express.Router()

app.use(cors())

import { ApiException } from './types/exception'
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./database/connect')

import { Response, Request } from 'express'

app.use(express.json())
app.use('/api', router)

import { candidateRouter } from './routes/candidates/router'
import { userRouter } from './routes/users/router'
import { companyRouter } from './routes/companies/router'
import { adminRouter } from './routes/admins/router'
import { authentificationRouter } from './routes/authentification/router'
import { authenticateToken } from './middleware/authenticate'
import { authorization } from './middleware/authorizations'

// To reset database, comment otherwise.
sequelize.initDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})

app.get("/", (req: Request, res: Response) => {
    res.send("SWAGGER : /api/docs")
})
const swaggerOptions = {
    openapi: "3.0.1",
    swaggerDefinition: {
        info: {
            title: 'API TOP DOC',
            description: 'SWAGGER',
            contact: {
                name: ''
            },
            servers: [{
                url: `http://localhost:${port}`,
                description: 'localhost'
            },],
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
    apis: [`./routes/*/router.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

router.use('/users', userRouter)
router.use('/candidates', candidateRouter)
router.use('/companies', companyRouter)
router.use('/admins', 
// authenticateToken, authorization, 
adminRouter)
router.use('/auth', authentificationRouter)


import { tokenTypes } from "./types/token"
const { Token } = require("./database/connect")
app.get('/api/tokens', (req: any, res: any) => {
    Token.findAll()
        .then((tokens: tokenTypes) => {
            res.status(200).json(tokens)
        })
        .catch((error: ApiException) => {
            res.status(500).json(error)
        })
})

require('./routes/availabilities/findAllAvailabilities')(app)

// require('./routes/auth/login')(app)
// require('./routes/auth/test')(app)

app.use(({ res: ApiException }: any) => {
    const message = 'Ressource not found.'
    return ApiException.status(404).json({ message })
})