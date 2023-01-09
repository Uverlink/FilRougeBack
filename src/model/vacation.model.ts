import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Vacation extends Model {
    vacation_id!: number
    vacation_start!: Date
    vacation_end!: Date
}

Vacation.init({
    vacation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vacation_start: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Vacation start') },
            notEmpty: { msg: concatRequiredMessage('Vacation start') }
        }
    },
    vacation_end: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Vacation end') },
            notEmpty: { msg: concatRequiredMessage('Vacation end') }
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "vacations",
        underscored: true
    }
);