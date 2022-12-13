
import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `Le champ ${data} est requis`
    }

    return sequelize.define('Company', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Nom') },
                notEmpty: { msg: concatRequiredMessage('Nom') }
            }
        },
        siret: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('SIRET') },
                notEmpty: { msg: concatRequiredMessage('SIRET') }
            }
        },
        availabilities: {
            type: dataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Disponibilités') },
            }
        }
    },
        {
            timestamps: false
        })
}
