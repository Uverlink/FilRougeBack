import { IRepository } from "../core/respository.interface";
import { VacationDTO } from "../dto/vacation.dto";
import { Vacation } from "../model/vacation.model";
import { VacationMapper } from "../mapper/vacation.mapper";

export class VacationRepository implements IRepository<VacationDTO> {

    async findById(id: number): Promise<VacationDTO | null> {
        return Vacation.findByPk(id).then(vacation => VacationMapper.mapToDto(vacation))
    }

    async findAll(): Promise<VacationDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: VacationDTO): Promise<VacationDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}