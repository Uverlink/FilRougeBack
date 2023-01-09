import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Workday extends Model {
    workday_id!: number
    workday_number!: number
    workday_start!: Date
    workday_end!: Date
    slot_duration_minutes!: number
}

Workday.init({
    workday_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    workday_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Day') },
            notEmpty: { msg: concatRequiredMessage('Day') }
        }
    },
    workday_start: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Day start') },
            notEmpty: { msg: concatRequiredMessage('Day start') }
        }
    },
    workday_end: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Day end') },
            notEmpty: { msg: concatRequiredMessage('Day end') }
        }
    },
    slot_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Slot duration') },
            notEmpty: { msg: concatRequiredMessage('Slot duration') }
        }
    },
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "workdays",
        underscored: true
    }
);