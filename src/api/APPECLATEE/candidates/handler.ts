import { Request, RequestHandler, Response } from "express";
import { ApiException } from "../../../type/exception";
import { candidateTypes } from "../../../type/";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");

const { Candidate, Person } = require("../../database/connect");

const { DTO } = require("../../dto/DTO")

const getAllCandidates = (req: Request, res: Response) => {
    Candidate.findAll({ include: [Person] })
        .then((candidates: candidateTypes) => {
            res.status(200).json(DTO(candidates));
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
};

const getCandidateById = async (req: Request, res: Response) => {
    Candidate.findOne({
        where: { person_id: req.params.id },
        include: [Person]
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
    let personInfo = { mail, password, city, zip_code, address, avatar, phone_number, is_active, is_pending, role }
    let hashedPassword = await bcrypt.hash(personInfo.password, 10);

    if (description) Object.assign(personInfo, { description: description })

    try {
        await sequelize.transaction(async (t: any) => {
            const newPerson = await Person.create(
                { ...personInfo, password: hashedPassword },
                { transaction: t }
            )

            candidateInfo = Object.assign(candidateInfo, { person_id: newPerson.person_id });

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
    let personInfo = { mail, city, zip_code, address, avatar, phone_number, is_active, is_pending, role };

    if (description) Object.assign(personInfo, { description: description })
    if (availabilities) Object.assign(candidateInfo, { availabilities: availabilities })
    if (degrees) Object.assign(candidateInfo, { degrees: degrees })

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        personInfo = Object.assign(personInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t: any) => {
            const updatedCandidate: any = await Candidate.update(
                candidateInfo,
                {
                    where: { person_id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await Person.update(personInfo, {
                where: { person_id: updatedCandidate[1].person_id },
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
                where: { person_id: candidate.person_id },
            }).then(() => {
                const message = `Le candidat ${deletedCandidate.person_id} a bien été supprimé.`;
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