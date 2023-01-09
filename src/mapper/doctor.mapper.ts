import { DoctorDTO } from "../dto/doctor.dto"
import { Doctor } from "../model/doctor.model";

export class DoctorMapper {
    static mapToDto(doctor: Doctor | null): DoctorDTO | null {
        if (doctor === null) return null;
        console.log(doctor.get({ plain: true }))
        return {
            activity: doctor.activity,
            lastname: doctor.get({ plain: true }).Person.lastname,
            firstname: doctor.get({ plain: true }).Person.firstname,
            birthdate: doctor.get({ plain: true }).Person.birthdate,
            mail: doctor.get({ plain: true }).Person.mail,
            phone_number: doctor.get({ plain: true }).Person.phone_number,
            description: doctor.get({ plain: true }).Person.description,
            avatar: doctor.get({ plain: true }).Person.avatar,
        }
    }

    static mapToDtoTEST(doctor: Doctor): DoctorDTO {
        return {
            activity: doctor.activity,
            lastname: doctor.get({ plain: true }).Person.lastname,
            firstname: doctor.get({ plain: true }).Person.firstname,
            birthdate: doctor.get({ plain: true }).Person.birthdate,
            mail: doctor.get({ plain: true }).Person.mail,
            phone_number: doctor.get({ plain: true }).Person.phone_number,
            description: doctor.get({ plain: true }).Person.description,
            avatar: doctor.get({ plain: true }).Person.avatar,
        }
    }

    static mapAllToDto(doctors: Doctor[]): DoctorDTO[] {
        return doctors.map(doctor => {
            return  {
                activity: doctor.activity,
                lastname: doctor.get({ plain: true }).Person.lastname,
                firstname: doctor.get({ plain: true }).Person.firstname,
                birthdate: doctor.get({ plain: true }).Person.birthdate,
                mail: doctor.get({ plain: true }).Person.mail,
                phone_number: doctor.get({ plain: true }).Person.phone_number,
                description: doctor.get({ plain: true }).Person.description,
                avatar: doctor.get({ plain: true }).Person.avatar,
            }
        })
    }

}