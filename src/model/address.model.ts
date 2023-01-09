import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Address extends Model {
    address_id?: number
    address_number!: string
    street_name!: string
    zip_code!: string
}

Address.init({
    address_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    address_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Number') },
            notEmpty: { msg: concatRequiredMessage('Number') }
        }
    },
    street_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Street name') },
            notEmpty: { msg: concatRequiredMessage('Street name') }
        }
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Zip code') },
            notEmpty: { msg: concatRequiredMessage('Zip code') },
            is: /^[0-9]{5}$/g
        }
    },
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "addresses",
        underscored: true
    }
);