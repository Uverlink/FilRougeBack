
import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required.`
    }

    return sequelize.define('User', {

        user_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        lastname: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Lastname') },
                notEmpty: { msg: concatRequiredMessage('Lastname') }
            }
        },
        firstname: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Firstname') },
                notEmpty: { msg: concatRequiredMessage('Firstname') }
            }
        },
        birthdate: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Birthdate') },
                notEmpty: { msg: concatRequiredMessage('Birthdate') }
            }
        },
        mail: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notNull: { msg: concatRequiredMessage('Mail') },
                notEmpty: { msg: concatRequiredMessage('Mail') }
            }
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Password') },
                notEmpty: { msg: concatRequiredMessage('Password') }
            }
        },
        phone_number: {
            type: dataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^$|^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/g
            },
        },



        description: {
            type: dataTypes.STRING,
            allowNull: true,
        },
        avatar: {
            type: dataTypes.STRING,
            allowNull: true,
        },
    })
}
