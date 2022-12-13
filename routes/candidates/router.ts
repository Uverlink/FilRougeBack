const { Router } = require('express')

import { handlerCandidate } from './handler'
import { authenticateToken } from '../../middleware/authenticate'
import { authorization } from '../../middleware/authorizations';

export const candidateRouter = Router();

/**
 * @swagger
 * tags:
 *      name: Candidates
 *      description: Manage candidates
 */


/**
 * @openapi
 * /api/candidates:
 *   get:
 *      tags: [Candidates]
 *      description: Get the list of all candidates.
 *      responses:
 *        200:
 *          description: Get the list of all candidates.
 */
candidateRouter.get('/', 
// authenticateToken, 
handlerCandidate.getAllCandidates)

/**
 * @openapi
 * /api/candidates/{id}:
 *  get:
 *      tags: [Candidates]
 *      description: Get a candidate by id
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Get candidate of given id.
 */
candidateRouter.get('/:id', 
// authenticateToken, 
handlerCandidate.getCandidateById)

/**
 * @openapi
 * /api/candidates:
 *  post:
 *      tags: [Candidates]
 *      description: Add a candidate
 *      consumes:
 *       - application/json
 *      parameters:
 *       - name: JSON
 *         in: body
 *         required: true
 *         type: object
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "0123465789", "role": "string", "lastname": "string", "firstname": "string", "birthdate": "01-01-2000", "description": "description", "avatar" : "Oui", "availabilities" : ['Test'], "degrees" : ['BAC'] }
 *      responses:
 *        200:
 *          description: Create a new candidate.
 */
candidateRouter.post('/', handlerCandidate.createCandidate)

/**
 * @openapi
 * /api/candidates/{id}:
 *  put:
 *      tags: [Candidates]
 *      description: Update an candidate
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
 *         default: { "mail": "email@email.fr","password":"string","is_active": "true","is_pending": "false","zip_code": "string", "city" : "string", "address" : "string", "phone_number" : "0123465789", "role": "string", "lastname": "string", "firstname": "string", "birthdate": "01-01-2000", "description": "description", "avatar" : "Oui", "availabilities" : ['Test'], "degrees" : ['BAC'] }
 *      responses:
 *        200:
 *          description: Update candidate of given id.
 */
candidateRouter.put('/:id', 
// authenticateToken, authorization, 
handlerCandidate.updateCandidate)

/**
 * @openapi
 * /api/candidates/{id}:
 *  delete:
 *      tags: [Candidates]
 *      description: Delete a candidate
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *         default: 1
 *      responses:
 *        200:
 *          description: Delete a candidate.
 */
candidateRouter.delete('/:id', 
// authenticateToken, authorization, 
handlerCandidate.deleteCandidate)