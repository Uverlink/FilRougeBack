import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Vacation', {
        vacation_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vacation_start: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Vacation start') },
                notEmpty: { msg: concatRequiredMessage('Vacation start') }
            }
        },
        vacation_end: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Vacation end') },
                notEmpty: { msg: concatRequiredMessage('Vacation end') }
            }
        }
    })
}