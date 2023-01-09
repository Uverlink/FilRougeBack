import { IRepository } from "../core/respository.interface";
import { WorkdayDTO } from "../dto/workday.dto";
import { Workday } from "../model/workday.model";
import { WorkdayMapper } from "../mapper/workday.mapper";

export class WorkdayRepository implements IRepository<WorkdayDTO> {

    async findById(id: number): Promise<WorkdayDTO | null> {
        return Workday.findByPk(id).then(workday => WorkdayMapper.mapToDto(workday))
    }

    async findAll(): Promise<WorkdayDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: WorkdayDTO): Promise<WorkdayDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}