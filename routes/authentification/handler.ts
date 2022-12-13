import { Request, RequestHandler, Response } from "express";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";
import { tokenTypes } from "../../types/token";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Token } = require("../../database/connect");

const { DTO_login } = require("../../services/DTO/DTO")

const login = async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { mail: req.body.mail } })

    let message: string = "";

    if (user == null) {
        message = "Aucun utilisateur ne correspond à ce mail.";
        return res.status(400).json({ userFound: false, message: message });
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        message = "Identifiants incorrects.";
        return res.status(401).json({ successfullLogin: false, message: message });
    } else {
        const accessToken = jwt.sign(
            { id: user.user_id, name: user.mail },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600s" }
        );
        const refreshToken = jwt.sign(
            { id: user.user_id, name: user.mail },
            process.env.REFRESH_TOKEN_SECRET
        );

        const token = await Token.findOne({ where: { user_id: user.user_id } })

        if (token !== null) Token.destroy({ where: { user_id: user.user_id } })

        Token.create({
            user_id: user.user_id,
            token: token
        })

        return res.status(200).json(DTO_login({ accessToken: accessToken, token: token, user: user }))
    }
};

const refreshToken = async (req: Request, res: Response) => {

    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(400)

    const tokens = await Token.findAll()

    let refreshTokens: any = []

    tokens.map((token: tokenTypes) => {
        refreshTokens.push(token.token)
    })

    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: Error, user: userTypes) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwt.sign(
            { id: user.user_id, name: user.mail },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3600s" })
        res.json({ accessToken: accessToken })
    })
};

export const handlerAuthentification = {
    login,
    refreshToken
}