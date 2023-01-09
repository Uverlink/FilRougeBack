import { Request, Response, NextFunction } from "express"
const jwt = require('jsonwebtoken')
import jwt_decode from "jwt-decode";

export function authorization(req : Request, res : Response, next : NextFunction) {
    const id = req.params.id && req.params.id
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded : any = token && jwt_decode(token)

    if (decoded.id != id) {
        if (decoded.role != 'admin') return res.status(403).json('Vous ne possédez pas les droits.')
    }

    next()
}