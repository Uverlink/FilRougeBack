import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Planning extends Model {
    planning_id!: number
    planning_name!: string
    planning_start!: Date
    planning_end!: Date
}

Planning.init({
    planning_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    planning_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Planning name') },
            notEmpty: { msg: concatRequiredMessage('Planning name') }
        }
    },
    planning_start: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Planning start') },
            notEmpty: { msg: concatRequiredMessage('Planning start') }
        }
    },
    planning_end: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Planning end') },
            notEmpty: { msg: concatRequiredMessage('Planning end') }
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "plannings",
        underscored: true
    }
);