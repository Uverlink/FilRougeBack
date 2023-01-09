import { Request, Response } from "express";
// import { ApiException } from "../../../type/exception";
// import { adminTypes } from "../../../type/";
import { sequelize } from "../../../database/sequelize";
const bcrypt = require("bcrypt");

const { Admin, Person } = require("../../database/connect");

const { DTO } = require("../../dto/DTO")

const getAllAdmins = (req: Request, res: Response) => {
    Admin.findAll({ include: [Person] })
        .then((admins: any) => {
            res.status(200).json((DTO(admins)));
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
}

const getAdminById = async (req: Request, res: Response) => {
    Admin.findOne({
        where: { person_id: req.params.id },
        include: [Person]
    })
        .then((admin: any) => {
            if (admin === null) {
                const message = "Aucun administrateur trouvé.";
                return res.status(404).json({ message });
            }

            res.status(200).json(DTO(admin));
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
};

const createAdmin = async (req: Request, res: Response) => {

    if (!req.body.password)
        return res.status(400).json({
            passwordRequired: true,
            message: "Veuillez renseigner un mot de passe.",
        });

    const { lastname, firstname, password, mail, city, zip_code, address, phone_number, is_active, is_pending, avatar, description } = req.body;

    let role = 'admin'

    let adminInfo = { lastname, firstname }
    let personInfo = { mail, password, city, zip_code, address, phone_number, is_active, is_pending, role, avatar }

    if (description) Object.assign(personInfo, { description: description })

    let hashedPassword = await bcrypt.hash(personInfo.password, 10);
    try {
        await sequelize.transaction(async (t: any) => {
            const newPerson = await Person.create(
                { ...personInfo, password: hashedPassword },
                { transaction: t }
            )

            adminInfo = Object.assign(adminInfo, { person_id: newPerson.person_id });

            const newAdmin = await Admin.create(adminInfo, { transaction: t })
            return res.status(200).json(newAdmin)
        })
    } catch (error) {
        res.status(500).json({ message: 'ERROR 500', error })
    }
}

const updateAdmin = async (req: Request, res: Response) => {
    const id = req.params.id;

    const { lastname, firstname, mail, city, zip_code, address, phone_number, is_active, is_pending, description, avatar } = req.body;

    let role = 'admin'

    let adminInfo = { lastname, firstname };
    let personInfo = { mail, city, zip_code, address, phone_number, is_active, is_pending, role, avatar };

    if (description) Object.assign(personInfo, { description: description })

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        personInfo = Object.assign(personInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t: any) => {
            const updatedAdmin: any = await Admin.update(
                adminInfo,
                {
                    where: { person_id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await Person.update(personInfo, {
                where: { person_id: updatedAdmin[1].person_id },
                returning: true,
                plain: true,
                transaction: t,
            });
            return res.status(200).json(updatedAdmin[1]);
        });
    } catch (error) {
        return res.status(500).json({ message: "ERROR 500", error });
    }
}

const deleteAdmin = (req: Request, res: Response) => {
    Admin.findByPk(req.params.id)
        .then((admin: any) => {
            if (admin === null) {
                const message = "Aucun administrateur trouvé.";
                return res.status(404).json({ message: message });
            }

            const deletedAdmin = admin;
            return Admin.destroy({
                where: { id: admin.person_id },
            }).then(() => {
                const message = `L'administrateur ${deletedAdmin.person_id} a bien été supprimé.`;
                res.json({ message: message, data: deletedAdmin });
            });
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
}


export const handlerAdmin = {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
}