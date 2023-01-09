require('dotenv').config()

const cors = require('cors')
const express = require("express")

const app = express()

app.use(cors())
const sequelize = require('./src/database/connect')

import { Response, Request } from 'express'
import { apiRouter } from './src/api/api.router'

app.use(express.json())
app.disable('x-powered-by')
app.use(apiRouter)

// To reset database, comment otherwise.
sequelize.initDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})

app.get("/", (req: Request, res: Response) => {
    res.send("SWAGGER : /api/docs")
})

// truc