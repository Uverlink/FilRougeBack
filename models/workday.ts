import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Workday', {
        workday_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        workday_number: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Day') },
                notEmpty: { msg: concatRequiredMessage('Day') }
            }
        },
        workday_start: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Day start') },
                notEmpty: { msg: concatRequiredMessage('Day start') }
            }
        },
        workday_end: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Day end') },
                notEmpty: { msg: concatRequiredMessage('Day end') }
            }
        },
        slot_duration_minutes: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Slot duration') },
                notEmpty: { msg: concatRequiredMessage('Slot duration') }
            }
        },
    })
}