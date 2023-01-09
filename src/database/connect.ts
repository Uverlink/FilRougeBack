import { sequelize } from "./sequelize"

import { persons } from "../database/mocks/mock-person"
import { tokens } from "../database/mocks/mock-token"
import { bans } from "../database/mocks/mock-ban"
import { addresses } from "../database/mocks/mock-address"
import { doctors } from "../database/mocks/mock-doctor"
import { patients } from "../database/mocks/mock-patient"
import { backgrounds } from "../database/mocks/mock-background"
import { plannings } from "../database/mocks/mock-planning"
import { vacations } from "../database/mocks/mock-vacation"
import { appointements } from "../database/mocks/mock-appointement"
import { workdays } from "../database/mocks/mock-workday"

import { Person } from "../model/person.model"
import { Token } from "../model/token.model"
import { Ban } from "../model/ban.model"
import { Address } from "../model/address.model"
import { Doctor } from "../model/doctor.model"
import { Patient } from "../model/patient.model"
import { Background } from "../model/background.model"
import { Appointement } from "../model/appointement.model"
import { Vacation } from "../model/vacation.model"
import { Planning } from "../model/planning.model"
import { Workday } from "../model/workday.model"

sequelize.authenticate()
    .then(() => console.log('Successfully connected to database.'))
    .catch((error: Error) => console.error(`Could not connect to database: ${error}`)
    )

Person.hasOne(Doctor, { foreignKey: 'doctor_id' })
Doctor.belongsTo(Person, { foreignKey: 'doctor_id' })

Person.hasOne(Patient, { foreignKey: 'patient_id' })
Patient.belongsTo(Person, { foreignKey: 'patient_id' })

Doctor.hasMany(Appointement, { foreignKey: 'doctor_id' })
Appointement.belongsTo(Doctor, { foreignKey: 'doctor_id' })

Patient.hasMany(Appointement, { foreignKey: 'patient_id' })
Appointement.belongsTo(Patient, { foreignKey: 'patient_id' })

export const initDb = () => {

    return sequelize.sync({ force: true }).then(() => {

        persons.map(person => {
            Person.create({
                person_id: person.person_id,
                lastname: person.lastname,
                firstname: person.firstname,
                mail: person.mail,
                password: person.password,
                birthdate: person.birthdate,
                phone_number: person.phone_number,
                description: person.description,
                avatar: person.avatar
            }).then((response: { toJSON: () => string }) => {
                console.log('Person', response.toJSON())

                // TODO : Cadencement ?
                patients.map(patient => {
                    if (patient.patient_id == person.person_id) {
                        Patient.create({
                            patient_id: patient.patient_id,
                        }).then((response: { toJSON: () => string }) => console.log('Patient', response.toJSON()))
                    }
                })
                doctors.map(doctor => {
                    if (doctor.doctor_id == person.person_id) {
                        Doctor.create({
                            doctor_id: doctor.doctor_id,
                            activity: doctor.activity,
                        }).then((response: { toJSON: () => string }) => {
                            console.log('Doctor', response.toJSON())

                            appointements.map((appointement) => {
                                
                                // TODO : Cadencement ?
                                if (doctor.doctor_id == appointement.doctor_id) {
                                    Appointement.create({
                                        appointement_date: appointement.appointement_date,
                                        appointement_duration_minutes: appointement.appointement_duration_minutes,
                                        appointement_reason: appointement.appointement_reason,
                                        doctor_id: appointement.doctor_id,
                                        patient_id: appointement.patient_id,
                                    }).then((response: { toJSON: () => string }) => console.log('Appointement', response.toJSON()))
                                }
                            })
                        })
                    }
                })
            })
        })

        tokens.map(token => {
            Token.create({
                token_id: token.token_id,
                token: token.token
            }).then((response: { toJSON: () => string }) => console.log('Token', response.toJSON()))
        })
        bans.map(ban => {
            Ban.create({
                ban_id: ban.ban_id,
                ban_date: ban.ban_date,
                ban_reason: ban.ban_reason
            }).then((response: { toJSON: () => string }) => console.log('Ban', response.toJSON()))
        })

        addresses.map(address => {
            Address.create({
                address_id: address.address_id,
                address_number: address.address_number,
                street_name: address.street_name,
                zip_code: address.zip_code
            }).then((response: { toJSON: () => string }) => console.log('Address', response.toJSON()))
        })

        backgrounds.map(background => {
            Background.create({
                background_id: background.background_id,
            }).then((response: { toJSON: () => string }) => console.log('Background', response.toJSON()))
        })

        plannings.map(planning => {
            Planning.create({
                planning_id: planning.planning_id,
                planning_name: planning.planning_name,
                planning_start: planning.planning_start,
                planning_end: planning.planning_end,
            }).then((response: { toJSON: () => string }) => console.log('Planning', response.toJSON()))
        })

        vacations.map(vacation => {
            Vacation.create({
                vacation_id: vacation.vacation_id,
                vacation_start: vacation.vacation_start,
                vacation_end: vacation.vacation_end,
            }).then((response: { toJSON: () => string }) => console.log('Vacation', response.toJSON()))
        })

        workdays.map(workday => {
            Workday.create({
                workday_id: workday.workday_id,
                workday_number: workday.workday_number,
                workday_start: workday.workday_start,
                workday_end: workday.workday_end,
                slot_duration_minutes: workday.slot_duration_minutes
            }).then((response: { toJSON: () => string }) => console.log('Workday', response.toJSON()))
        })

        console.log('Database successfully initialized.')
    })
}