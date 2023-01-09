import { IRepository } from "../core/respository.interface";
import { PatientDTO } from "../dto/patient.dto";
import { Patient } from "../model/patient.model";
import { PatientMapper } from "../mapper/patient.mapper";

export class PatientRepository implements IRepository<PatientDTO> {

    async findById(id: number): Promise<PatientDTO | null> {
        return Patient.findByPk(id).then(patient => PatientMapper.mapToDto(patient))
    }

    async findAll(): Promise<PatientDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: PatientDTO): Promise<PatientDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}