import { Request, Response } from "express";
import { ApiException } from "../../types/exception";
import { userTypes } from "../../types/user";
import { ValidationError } from "sequelize";
const bcrypt = require("bcrypt");

const { User } = require("../../database/connect");

const { DTO } = require("../../services/DTO/DTO")

const getAllUsers = (req: Request, res: Response) => {
    User.findAll({
        order: ['user_id'],
        attributes: ['user_id', 'mail', 'city', 'zip_code', 'address', 'phone_number', 'is_active', 'is_pending', 'is_to_be_completed', 'role', 'createdAt', 'updatedAt']
    })
        .then((users: userTypes) => {
            res.status(200).json((users));
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
}

const getUserById = (req: Request, res: Response) => {
    User.findOne({
        where: { user_id: req.params.id },
        attributes: ['user_id', 'mail', 'city', 'zip_code', 'address', 'phone_number', 'is_active', 'is_pending', 'is_to_be_completed', 'role', 'createdAt', 'updatedAt']
    })
        .then((user: userTypes) => {
            if (user === null) {
                const message = "Requested user does not exist.";
                return res.status(404).json({ message });
            }

            res.json(user);
        })
        .catch((error: ApiException) => {
            res.status(500).json(error);
        });
};

const createUser = async (req: Request, res: Response) => {
    if (!req.body.password)
        return res.status(400).json({
            passwordRequired: true,
            message: "Password is required.",
        });

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.create({ ...req.body, password: hashedPassword })
        .then((user: userTypes) => {
            res.json(user);
        })
        .catch((error: ApiException) => {
            if (error instanceof ValidationError) {
                return res
                    .status(400)
                    .json({ message: error.message, data: error });
            }
            res.status(500).json(error);
        });
};
const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (req.body.password) {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body = { ...req.body, password: hashedPassword }
    }

    User.update(req.body, { where: { user_id: id } }
    )
        .then(() => {
            return User.findByPk(id).then((user: userTypes) => {
                if (user === null) {
                    const message = "Requested user does not exist.";
                    return res.status(404).json({ message });
                }
                const message = `User ${user.user_id} successfully updated`;
                res.json({ message, data: user });
            });
        })
        .catch((error: ApiException) => {
            if (error instanceof ValidationError) {
                return res
                    .status(400)
                    .json({ message: error.message, data: error });
            }
            const message = `Could not update the user.`;
            res.status(500).json({ message, data: error });
        });
};

const deleteUser = (req: Request, res: Response) => {
    User.findByPk(req.params.id)
        .then((user: userTypes) => {
            if (user === null) {
                const message = "Requested user does not exist.";
                return res.status(404).json({ message: message });
            }

            const deletedUser = user;
            return User.destroy({
                where: { user_id: user.user_id },
            }).then(() => {
                const message = `User ${deletedUser.user_id} successfully deleted.`;
                res.json({ message, data: deletedUser });
            });
        })
        .catch((error: ApiException) => {
            const message = `Could not delete user.`;
            res.status(500).json({ message, data: error });
        });
};

export const handlerUser = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}