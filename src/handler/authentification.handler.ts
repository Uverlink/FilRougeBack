import { Request, RequestHandler, Response } from "express";
// import { ApiException } from "../../type/exception";
// import { personTypes } from "../../type/person";
// import { tokenTypes } from "../../type/token";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Person, Token } = require("../../../database/connect");

const { DTO_login } = require("../../../dto/DTO")

const login = async (req: Request, res: Response) => {
    const person = await Person.findOne({ where: { mail: req.body.mail } })

    let message: string = "";

    if (person == null) {
        message = "Aucun utilisateur ne correspond à ce mail.";
        return res.status(400).json({ personFound: false, message: message });
    }

    if (!await bcrypt.compare(req.body.password, person.password)) {
        message = "Identifiants incorrects.";
        return res.status(401).json({ successfullLogin: false, message: message });
    } else {
        const accessToken = jwt.sign(
            { id: person.person_id, name: person.mail },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600s" }
        );
        const refreshToken = jwt.sign(
            { id: person.person_id, name: person.mail },
            process.env.REFRESH_TOKEN_SECRET
        );

        const token = await Token.findOne({ where: { person_id: person.person_id } })

        if (token !== null) Token.destroy({ where: { person_id: person.person_id } })

        Token.create({
            person_id: person.person_id,
            token: token
        })

        return res.status(200).json(DTO_login({ accessToken: accessToken, token: token, person: person }))
    }
};

const refreshToken = async (req: Request, res: Response) => {

    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(400)

    const tokens = await Token.findAll()

    let refreshTokens: any = []

    tokens.map((token: any) => {
        refreshTokens.push(token.token)
    })

    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: Error, person: any) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwt.sign(
            { id: person.person_id, name: person.mail },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600s" })
        res.json({ accessToken: accessToken })
    })
};

export const handlerAuthentification = {
    login,
    refreshToken
}