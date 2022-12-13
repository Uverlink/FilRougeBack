import { Request, Response } from "express";
import { ApiException } from "../../types/exception";
import { companyTypes } from "../../types/company";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");
var siretValidate = require("siret")

const { Company, User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

const getAllCompanies = (req: Request, res: Response) => {
    Company.findAll({ include: [User] })
        .then((companies: companyTypes) => {
            res.status(200).json((DTO(companies)));
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
}

const getCompanyById = async (req: Request, res: Response) => {
    Company.findOne({
        where: { user_id: req.params.id },
        include: [User]
    })
        .then((company: companyTypes) => {
            if (company === null) {
                const message = "Aucun recruteur trouvé.";
                return res.status(404).json({ message });
            }

            res.status(200).json(DTO(company));
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
};

const createCompany = async (req: Request, res: Response) => {

    if (!req.body.password)
        return res.status(400).json({
            passwordRequired: true,
            message: "Veuillez renseigner un mot de passe.",
        });


    const { name, siret, password, mail, city, zip_code, address, avatar, description, availabilities, degrees, phone_number, is_active, is_pending } = req.body;

    if (!siretValidate.isSIRET(siret)) return res.status(400).json({ message: 'SIRET invalide' })

    let role = 'entreprise'

    let companyInfo = { name, siret, availabilities, degrees }
    let userInfo = { mail, password, city, zip_code, address, avatar, phone_number, is_active, is_pending, role }
    if (description) Object.assign(userInfo, { description: description })

    let hashedPassword = await bcrypt.hash(userInfo.password, 10);
    try {
        await sequelize.transaction(async (t: any) => {
            const newUser = await User.create(
                { ...userInfo, password: hashedPassword },
                { transaction: t }
            )

            companyInfo = Object.assign(companyInfo, { user_id: newUser.user_id });

            const newCompany = await Company.create(companyInfo, { transaction: t })
            return res.status(200).json(newCompany)
        })
    } catch (error: any) {
        let message = 'ERROR 500'
        if (error.errors[0].path == 'mail') message = 'Email invalide'
        if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
        if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
        return res.status(500).json({ message, error });
    }
}

const updateCompany = async (req: Request, res: Response) => {
    const id = req.params.id;

    const { name, siret, mail, city, zip_code, address, avatar, description, availabilities, phone_number, is_active, is_pending, role } = req.body;

    if (!siretValidate.isSIRET(siret)) return res.status(400).json({ message: 'SIRET invalide' })

    let companyInfo = { name, siret, availabilities };
    let userInfo = { mail, city, zip_code, address, avatar, phone_number, is_active, is_pending, role };

    if (description) Object.assign(userInfo, { description: description })
    if (availabilities) Object.assign(companyInfo, { availabilities: availabilities })

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        userInfo = Object.assign(userInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t: any) => {
            const updatedCompany: any = await Company.update(
                companyInfo,
                {
                    where: { user_id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await User.update(userInfo, {
                where: { user_id: updatedCompany[1].user_id },
                returning: true,
                plain: true,
                transaction: t,
            });
            return res.status(200).json(updatedCompany[1]);
        });
    } catch (error: any) {
        let message = 'ERROR 500'
        if (error.errors[0].path == 'mail') message = 'Email invalide'
        if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
        if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
        return res.status(500).json({ message, error });
    }
}

const deleteCompany = (req: Request, res: Response) => {
    Company.findByPk(req.params.id)
        .then((company: companyTypes) => {
            if (company === null) {
                const message = "Aucun recruteur trouvé.";
                return res.status(404).json({ message: message });
            }

            const deletedCompany = company;
            return Company.destroy({
                where: { user_id: company.user_id },
            }).then(() => {
                const message = `Le recruteur ${deletedCompany.user_id} a bien été supprimé.`;
                res.json({ message, data: deletedCompany });
            });
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
}

export const handlerCompany = {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}