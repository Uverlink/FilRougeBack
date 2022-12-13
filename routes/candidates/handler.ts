import { Request, RequestHandler, Response } from "express";
import { ApiException } from "../../types/exception";
import { candidateTypes } from "../../types/candidate";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");

const { Candidate, User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

const getAllCandidates = (req: Request, res: Response) => {
    Candidate.findAll({ include: [User] })
        .then((candidates: candidateTypes) => {
            res.status(200).json(DTO(candidates));
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
};

const getCandidateById = async (req: Request, res: Response) => {
    Candidate.findOne({
        where: { user_id: req.params.id },
        include: [User]
    })
        .then((candidate: candidateTypes) => {
            if (candidate === null) {
                const message = "Aucun candidat trouvé.";
                return res.status(404).json({ message });
            }

            res.status(200).json(DTO(candidate));
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
};

const createCandidate = async (req: Request, res: Response) => {

    if (!req.body.password)
        return res.status(400).json({
            passwordRequired: true,
            message: "Veuillez renseigner un mot de passe.",
        });

    const { lastname, firstname, birthdate, password, mail, city, zip_code, address, avatar, description, availabilities, degrees, phone_number, is_active, is_pending } = req.body;

    let role = 'candidat'

    let candidateInfo = { lastname, firstname, birthdate, availabilities, degrees }
    let userInfo = { mail, password, city, zip_code, address, avatar, phone_number, is_active, is_pending, role }
    let hashedPassword = await bcrypt.hash(userInfo.password, 10);

    if (description) Object.assign(userInfo, { description: description })

    try {
        await sequelize.transaction(async (t: any) => {
            const newUser = await User.create(
                { ...userInfo, password: hashedPassword },
                { transaction: t }
            )

            candidateInfo = Object.assign(candidateInfo, { user_id: newUser.user_id });

            const newCandidate = await Candidate.create(candidateInfo, { transaction: t })
            return res.status(200).json(newCandidate)
        })
    } catch (error: any) {
        let message = 'ERROR 500'
        if (error.errors[0].path == 'mail') message = 'Email invalide'
        if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
        if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
        return res.status(500).json({ message, error });
    }
}

const updateCandidate = async (req: Request, res: Response) => {
    const id = req.params.id;

    const { lastname, firstname, birthdate, mail, city, zip_code, address, avatar, description, availabilities, degrees, phone_number, is_active, is_pending, role } = req.body;

    let candidateInfo = { lastname, firstname, birthdate };
    let userInfo = { mail, city, zip_code, address, avatar, phone_number, is_active, is_pending, role };

    if (description) Object.assign(userInfo, { description: description })
    if (availabilities) Object.assign(candidateInfo, { availabilities: availabilities })
    if (degrees) Object.assign(candidateInfo, { degrees: degrees })

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        userInfo = Object.assign(userInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t: any) => {
            const updatedCandidate: any = await Candidate.update(
                candidateInfo,
                {
                    where: { user_id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await User.update(userInfo, {
                where: { user_id: updatedCandidate[1].user_id },
                returning: true,
                plain: true,
                transaction: t,
            });
            return res.status(200).json(updatedCandidate[1]);

        });
    } catch (error: any) {
        let message = 'ERROR 500'
        if (error.errors[0].path == 'mail') message = 'Email invalide'
        if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
        if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
        return res.status(500).json({ message, error });
    }
}

const deleteCandidate = (req: Request, res: Response) => {
    Candidate.findByPk(req.params.id)
        .then((candidate: candidateTypes) => {
            if (candidate === null) {
                const message = "Aucun candidat trouvé.";
                return res.status(404).json({ message: message });
            }

            const deletedCandidate = candidate;
            return Candidate.destroy({
                where: { user_id: candidate.user_id },
            }).then(() => {
                const message = `Le candidat ${deletedCandidate.user_id} a bien été supprimé.`;
                res.json({ message, data: deletedCandidate });
            });
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
}

export const handlerCandidate = {
    getAllCandidates,
    getCandidateById,
    createCandidate,
    updateCandidate,
    deleteCandidate
}