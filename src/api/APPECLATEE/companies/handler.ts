import { Request, Response } from "express";
import { ApiException } from "../../type/exception";
import { companyTypes } from "../../type/company";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");
var siretValidate = require("siret")

const { Company, Person } = require("../../database/connect");

const { DTO } = require("../../dto/DTO")

const getAllCompanies = (req: Request, res: Response) => {
    Company.findAll({ include: [Person] })
        .then((companies: companyTypes) => {
            res.status(200).json((DTO(companies)));
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
}

const getCompanyById = async (req: Request, res: Response) => {
    Company.findOne({
        where: { person_id: req.params.id },
        include: [Person]
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
    let personInfo = { mail, password, city, zip_code, address, avatar, phone_number, is_active, is_pending, role }
    if (description) Object.assign(personInfo, { description: description })

    let hashedPassword = await bcrypt.hash(personInfo.password, 10);
    try {
        await sequelize.transaction(async (t: any) => {
            const newPerson = await Person.create(
                { ...personInfo, password: hashedPassword },
                { transaction: t }
            )

            companyInfo = Object.assign(companyInfo, { person_id: newPerson.person_id });

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
    let personInfo = { mail, city, zip_code, address, avatar, phone_number, is_active, is_pending, role };

    if (description) Object.assign(personInfo, { description: description })
    if (availabilities) Object.assign(companyInfo, { availabilities: availabilities })

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        personInfo = Object.assign(personInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t: any) => {
            const updatedCompany: any = await Company.update(
                companyInfo,
                {
                    where: { person_id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await Person.update(personInfo, {
                where: { person_id: updatedCompany[1].person_id },
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
                where: { person_id: company.person_id },
            }).then(() => {
                const message = `Le recruteur ${deletedCompany.person_id} a bien été supprimé.`;
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