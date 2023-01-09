import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Appointement extends Model {
    appointement_date!: Date
    appointement_duration_minutes!: number
    appointement_reason!: string
    doctor_id!: number
    patient_id!: number
}

Appointement.init({
    appointement_date: {
        type: DataTypes.DATE,
        primaryKey: true,
    },
    appointement_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Date') },
            notEmpty: { msg: concatRequiredMessage('Date') }
        }
    },
    appointement_reason: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Reason') },
            notEmpty: { msg: concatRequiredMessage('Reason') }
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "appointements",
        underscored: true
    }
);