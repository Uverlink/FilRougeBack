import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Doctor extends Model {
    doctor_id!: number
    activity!: string
}

Doctor.init({
    doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    activity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Activity') },
            notEmpty: { msg: concatRequiredMessage('Activity') }
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "doctors",
        underscored: true
    }
);