import { Request, Response } from "express";
import { ApiException } from "../../types/exception";
import { adminTypes } from "../../types/admin";
import sequelize from "../../database/sequelize";
const bcrypt = require("bcrypt");

const { Admin, User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

const getAllAdmins = (req: Request, res: Response) => {
    Admin.findAll({ include: [User] })
        .then((admins: adminTypes) => {
            res.status(200).json((DTO(admins)));
        })
        .catch((error: ApiException) => {
            res.status(500).json({ message: 'ERROR 500', error });
        });
}

const getAdminById = async (req: Request, res: Response) => {
    Admin.findOne({
        where: { user_id: req.params.id },
        include: [User]
    })
        .then((admin: adminTypes) => {
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
    let userInfo = { mail, password, city, zip_code, address, phone_number, is_active, is_pending, role, avatar }

    if (description) Object.assign(userInfo, { description: description })

    let hashedPassword = await bcrypt.hash(userInfo.password, 10);
    try {
        await sequelize.transaction(async (t: any) => {
            const newUser = await User.create(
                { ...userInfo, password: hashedPassword },
                { transaction: t }
            )

            adminInfo = Object.assign(adminInfo, { user_id: newUser.user_id });

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
    let userInfo = { mail, city, zip_code, address, phone_number, is_active, is_pending, role, avatar };

    if (description) Object.assign(userInfo, { description: description })

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        userInfo = Object.assign(userInfo, { password: hashedPassword });
    }

    try {
        await sequelize.transaction(async (t: any) => {
            const updatedAdmin: any = await Admin.update(
                adminInfo,
                {
                    where: { user_id: id },
                    returning: true,
                    plain: true,
                    transaction: t,
                }
            );

            await User.update(userInfo, {
                where: { user_id: updatedAdmin[1].user_id },
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
        .then((admin: adminTypes) => {
            if (admin === null) {
                const message = "Aucun administrateur trouvé.";
                return res.status(404).json({ message: message });
            }

            const deletedAdmin = admin;
            return Admin.destroy({
                where: { id: admin.user_id },
            }).then(() => {
                const message = `L'administrateur ${deletedAdmin.user_id} a bien été supprimé.`;
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