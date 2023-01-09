import { Request, Response, NextFunction } from "express"
const jwt = require('jsonwebtoken')

export function authenticateToken(req : Request, res : Response, next : NextFunction) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json('Veuillez vous connecter.')
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err : Error) => {
        if (err) return res.status(401).json(err)
        next()
    })
}