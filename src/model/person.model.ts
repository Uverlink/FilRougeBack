import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../src/database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Person extends Model {
    person_id!: number
    lastname!: string
    firstname!: string
    mail!: string
    password!: string
    birthdate!: string
    phone_number?: string
    description?: string
    avatar?: string
}

Person.init({
    person_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Lastname') },
            notEmpty: { msg: concatRequiredMessage('Lastname') }
        }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Firstname') },
            notEmpty: { msg: concatRequiredMessage('Firstname') }
        }
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Birthdate') },
            notEmpty: { msg: concatRequiredMessage('Birthdate') }
        }
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notNull: { msg: concatRequiredMessage('Mail') },
            notEmpty: { msg: concatRequiredMessage('Mail') }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Password') },
            notEmpty: { msg: concatRequiredMessage('Password') }
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^$|^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "persons",
        underscored: true
    }
);