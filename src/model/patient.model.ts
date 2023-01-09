import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Patient extends Model {
    patient_id!: number
}

Patient.init({
    patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "patients",
        underscored: true
    }
);