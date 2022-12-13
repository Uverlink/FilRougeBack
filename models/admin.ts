
import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `Le champ ${data} est requis`
    }

    return sequelize.define('Admin', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        lastname: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Nom') },
                notEmpty: { msg: concatRequiredMessage('Nom') }
            }
        },
        firstname: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Prénom') },
                notEmpty: { msg: concatRequiredMessage('Prénom') }
            }
        },
    })
}
