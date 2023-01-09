const { Router } = require('express')

import { handlerAuthentification } from '../handler/authentification.handler'

export const authentificationRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Authentification
 *      description: Manage authentification
 */

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags: [Authentification]
 *      description: Login
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"mail": "remy@c.fr", "password": "1234"}
 *      responses:
 *        200:
 *          description: Login. Returns tokens if successful login.
 */
authentificationRouter.post('/login', handlerAuthentification.login)

/**
 * @openapi
 * /api/auth/refresh:
 *  post:
 *      tags: [Authentification]
 *      description: Token
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: {"token": "string"}
 *      responses:
 *        200:
 *          description: Token. Refresh tokens.
 */
authentificationRouter.post('/refresh', handlerAuthentification.refreshToken)