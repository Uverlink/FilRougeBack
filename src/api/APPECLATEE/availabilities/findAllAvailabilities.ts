import { Application } from "express"
import { Error } from "sequelize"
// import { ApiException } from "../../type/exception"
// import { availabilityTypes } from "../../type/availability"

const { Availability } = require('../../database/connect')

/**
 * @openapi
 * /api/availabilities:
 *   get:
 *      tags: [Availabilities]
 *      description: Welcome to swagger-jsdoc!
 *      responses:
 *        200:
 *          description: Get the list of all availabilities.
 */
module.exports = (app: Application) => {
    app.get('/api/availabilities', (req, res) => {
        Availability.findAll()
            .then((availabilities: any) => {
                res.status(200).json(availabilities)
            })
            .catch((error: any) => {
                res.status(500).json(error)
            })
    })
}