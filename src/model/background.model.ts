import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Background extends Model {
    background_id!: number
}

Background.init({
    background_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "backgrounds",
        underscored: true
    }
);