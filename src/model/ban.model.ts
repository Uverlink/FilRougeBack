import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Ban extends Model {
    ban_id!: number
    ban_date!: Date
    ban_reason!: string
}

Ban.init({
    ban_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ban_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Ban date') },
            notEmpty: { msg: concatRequiredMessage('Ban date') }
        }
    },
    ban_reason: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Ban reason') },
            notEmpty: { msg: concatRequiredMessage('Ban reason') }
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "bans",
        underscored: true
    }
);