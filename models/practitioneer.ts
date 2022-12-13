import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Practitioneer', {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        activity: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Street name') },
                notEmpty: { msg: concatRequiredMessage('Street name') }
            }
        }
    },
    )
}
