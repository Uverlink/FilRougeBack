import { IRepository } from "../core/respository.interface";
import { DoctorDTO } from "../dto/doctor.dto";
import { Doctor } from "../model/doctor.model";
import { Person } from "../model/person.model";
import { DoctorMapper } from "../mapper/doctor.mapper";

export class DoctorRepository implements IRepository<DoctorDTO> {

    async findById(id: number): Promise<DoctorDTO | null> {
        return Doctor.findByPk(id, { include: [Person] }).then(doctor => DoctorMapper.mapToDto(doctor))
    }

    async findAll(): Promise<DoctorDTO[]> {
        // return Doctor.findAll({ include: [Person] }).then((doctors: Doctor[]) => doctors.map(doctor => DoctorMapper.mapToDtoTEST(doctor)))
        return Doctor.findAll({ include: [Person] }).then((doctors: Doctor[]) => DoctorMapper.mapAllToDto(doctors))
    }

    async create(t: DoctorDTO): Promise<DoctorDTO> {

        //TOOOOOOODO
        // if (!req.body.password)
        //     return res.status(400).json({
        //         message: "Password is required.",
        //     });

        // const { activity, lastname, firstname, mail, password, birthdate, phone_number, description, avatar } = req.body;

        // let hashedPassword = await bcrypt.hash(password, 10);

        // let doctorInfo = { activity }
        // let personInfo = { lastname, firstname, mail, hashedPassword, birthdate, phone_number }

        // if (description) Object.assign(personInfo, { description: description })
        // if (avatar) Object.assign(personInfo, { avatar: avatar })

        // try {
        //     await sequelize.transaction(async (t: any) => {
        //         const newUser = await Person.create(
        //             { ...personInfo, password: hashedPassword },
        //             { transaction: t }
        //         )

        //         companyInfo = Object.assign(companyInfo, { user_id: newUser.user_id });

        //         const newCompany = await Company.create(companyInfo, { transaction: t })
        //         return res.status(200).json(newCompany)
        //     })
        // } catch (error: any) {
        //     let message = 'ERROR 500'
        //     if (error.errors[0].path == 'mail') message = 'Email invalide'
        //     if (error.errors[0].path == 'phone_number') message = 'Numéro de téléphone invalide'
        //     if (error.errors[0].path == 'zip_code') message = 'Code postal invalide'
        //     return res.status(500).json({ message, error });
        // }



        return Doctor.create().then((doctor: Doctor) => DoctorMapper.mapToDtoTEST(doctor))
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}