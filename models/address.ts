import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Address', {
        address_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        address_number: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Number') },
                notEmpty: { msg: concatRequiredMessage('Number') }
            }
        },
        street_name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Street name') },
                notEmpty: { msg: concatRequiredMessage('Street name') }
            }
        },
        zip_code: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Zip code') },
                notEmpty: { msg: concatRequiredMessage('Zip code') },
                is: /^[0-9]{5}$/g
            }
        },
    },
        // {
        //     timestamps: false
        // }
    )
}

