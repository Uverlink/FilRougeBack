import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Appointement', {
        appointement_date: {
            type: dataTypes.DATE,
            primaryKey: true,
        },
        appointement_duration_minutes: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Date') },
                notEmpty: { msg: concatRequiredMessage('Date') }
            }
        },
        appointement_reason: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Reason') },
                notEmpty: { msg: concatRequiredMessage('Reason') }
            }
        }
    })
}