import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Planning', {
        planning_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        planning_name: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Planning name') },
                notEmpty: { msg: concatRequiredMessage('Planning name') }
            }
        },
        planning_start: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Planning start') },
                notEmpty: { msg: concatRequiredMessage('Planning start') }
            }
        },
        planning_end: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Planning end') },
                notEmpty: { msg: concatRequiredMessage('Planning end') }
            }
        }
    })
}