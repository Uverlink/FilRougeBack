const { Router } = require('express')

import { personHandler } from '../handler/person.handler'
import { authenticateToken } from '../middleware/authenticate'
import { authorization } from '../middleware/authorizations';

export const personController = Router();

/**
 * @swagger
 * tags:
 *      name: Persons
 *      description: Manage persons
 */

/**
 * @openapi
 * /api/persons:
 *   get:
 *      tags: [Persons]
 *      description: Get list of persons
 *      responses:
 *        200:
 *          description: Get all.
 */
personController.get('/', personHandler.getPersons)

/**
 * @openapi
 * /api/persons/{id}:
 *   get:
 *      tags: [Persons]
 *      description: Get person by id.
 *      responses:
 *        200:
 *          description: Get by id.
 */
personController.get('/:id',
    // , authenticateToken
    personHandler.getPersonById)