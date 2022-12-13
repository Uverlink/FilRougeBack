const { Router } = require('express')

import { handlerUser } from './handler'
import { authenticateToken } from '../../middleware/authenticate'
import { authorization } from '../../middleware/authorizations';

export const userRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Users
 *      description: Manage users
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *      tags: [Users]
 *      description: Get the list of all users.
 *      responses:
 *        200:
 *          description: Get the list of all users.
 */
userRouter.get('/', handlerUser.getAllUsers)

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *      tags: [Users]
 *      description: Get an template by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get user of given id.
 */
userRouter.get('/:id'
// , authenticateToken
, handlerUser.getUserById)

/**
 * @openapi
 * /api/users:
 *  post:
 *      tags: [Users]
 *      description: Add an user
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "string", "role": "string" }
 *      responses:
 *        200:
 *          description: Create a new user.
 */
userRouter.post('/', handlerUser.createUser)

/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *      tags: [Users]
 *      description: Update an user
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "false", "is_pending": "true", "zip_code": "string", "city" : "string", "phone_number" : "string", "role" : "string" }
 *      responses:
 *        200:
 *          description: Update user of given id.
 */
userRouter.put('/:id', 
// authenticateToken, authorization, 
handlerUser.updateUser)

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *      tags: [Users]
 *      description: Delete an user.
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *      responses:
 *        200:
 *          description: Delete an user.
 */
userRouter.delete('/:id', 
// authenticateToken, authorization, 
handlerUser.deleteUser)