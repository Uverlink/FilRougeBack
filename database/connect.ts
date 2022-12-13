import { DataTypes } from "sequelize"
const { Sequelize } = require('sequelize')

import { userTypes } from "../types/user"
import { users } from "../database/mocks/mock-user"
const UserModel = require('../models/user')

import { tokenTypes } from "../types/token"
import { tokens } from "../database/mocks/mock-token"
const TokenModel = require('../models/token')

import { banTypes } from "../types/ban"
import { bans } from "../database/mocks/mock-ban"
const BanModel = require('../models/ban')

import { addressTypes } from "../types/address"
import { addresses } from "../database/mocks/mock-address"
const AddressModel = require('../models/address')

import { practitioneerTypes } from "../types/practitioneer"
import { practitioneers } from "../database/mocks/mock-practitioneer"
const PractitioneerModel = require('../models/practitioneer')

import { patientTypes } from "../types/patient"
import { patients } from "../database/mocks/mock-patient"
const PatientModel = require('../models/patient')

import { backgroundTypes } from "../types/background"
import { backgrounds } from "../database/mocks/mock-background"
const BackgroundModel = require('../models/background')

import { planningTypes } from "../types/planning"
import { plannings } from "../database/mocks/mock-planning"
const PlanningModel = require('../models/planning')

import { vacationTypes } from "../types/vacation"
import { vacations } from "../database/mocks/mock-vacation"
const VacationModel = require('../models/vacation')

import { appointementTypes } from "../types/appointement"
import { appointements } from "../database/mocks/mock-appointement"
const AppointementModel = require('../models/appointement')

import { workdayTypes } from "../types/workday"
import { workdays } from "../database/mocks/mock-workday"
const WorkdayModel = require('../models/workday')

import sequelize from './sequelize'

sequelize.authenticate()
    .then(() => console.log('Successfully connected to database.'))
    .catch((error: Error) => console.error(`Could not connect to database: ${error}`)
    )

const User = UserModel(sequelize, DataTypes)
const Token = TokenModel(sequelize, DataTypes)
const Ban = BanModel(sequelize, DataTypes)
const Address = AddressModel(sequelize, DataTypes)
const Practitioneer = PractitioneerModel(sequelize, DataTypes)
const Patient = PatientModel(sequelize, DataTypes)
const Background = BackgroundModel(sequelize, DataTypes)
const Appointement = AppointementModel(sequelize, DataTypes)
const Vacation = VacationModel(sequelize, DataTypes)
const Planning = PlanningModel(sequelize, DataTypes)
const Workday = WorkdayModel(sequelize, DataTypes)

User.hasOne(Practitioneer, { foreignKey: 'user_id' })
Practitioneer.belongsTo(User, { foreignKey: 'user_id' })

User.hasOne(Patient, { foreignKey: 'user_id' })
Patient.belongsTo(User, { foreignKey: 'user_id' })

// User.hasOne(Admin, { foreignKey: 'user_id' })
// Admin.belongsTo(User, { foreignKey: 'user_id' })

// User.hasOne(Token, { foreignKey: 'user_id' })
// Token.belongsTo(User, { foreignKey: 'user_id' })

const initDb = () => {

    return sequelize.sync({ force: true }).then(() => {

        users.map((user: userTypes) => {
            User.create({
                user_id: user.user_id,
                lastname: user.lastname,
                firstname: user.firstname,
                mail: user.mail,
                password: user.password,
                birthdate: user.birthdate,
                phone_number: user.phone_number,
                description: user.description,
                avatar: user.avatar
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        tokens.map((token: tokenTypes) => {
            Token.create({
                token_id: token.token_id,
                token: token.token
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        bans.map((ban: banTypes) => {
            Ban.create({
                ban_id: ban.ban_id,
                ban_reason: ban.ban_reason,
                ban_date: ban.ban_date
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        addresses.map((address: addressTypes) => {
            Address.create({
                address_id: address.address_id,
                address_number: address.address_number,
                street_name: address.street_name,
                zip_code: address.zip_code
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        practitioneers.map((practitioneer: practitioneerTypes) => {
            Practitioneer.create({
                user_id: practitioneer.user_id,
                activity: practitioneer.activity,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        patients.map((patient: patientTypes) => {
            Patient.create({
                user_id: patient.user_id,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        backgrounds.map((background: backgroundTypes) => {
            Background.create({
                background_id: background.background_id,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        plannings.map((planning: planningTypes) => {
            Planning.create({
                planning_id: planning.planning_id,
                planning_name: planning.planning_name,
                planning_start: planning.planning_start,
                planning_end: planning.planning_end,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        vacations.map((vacation: vacationTypes) => {
            Vacation.create({
                vacation_id: vacation.vacation_id,
                vacation_start: vacation.vacation_start,
                vacation_end: vacation.vacation_end,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        appointements.map((appointement: appointementTypes) => {
            Appointement.create({
                appointement_date: appointement.appointement_date,
                appointement_duration_minutes: appointement.appointement_duration_minutes,
                appointement_reason: appointement.appointement_reason,
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        workdays.map((workday: workdayTypes) => {
            Workday.create({
                workday_id: workday.workday_id,
                workday_number: workday.workday_number,
                workday_start: workday.workday_start,
                workday_end: workday.workday_end,
                slot_duration_minutes: workday.slot_duration_minutes
            }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        })
        console.log('Database successfully initialized.')
    })
}

module.exports = {
    initDb,
    User,
    Address,
    Token,
    Ban,
    Practitioneer,
    Patient,
    Background,
    Appointement,
    Vacation,
    Planning,
    Workday
}