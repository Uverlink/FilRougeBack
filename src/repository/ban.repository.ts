import { IRepository } from "../core/respository.interface";
import { BanDTO } from "../dto/ban.dto";
import { Ban } from "../model/ban.model";
import { BanMapper } from "../mapper/ban.mapper";

export class BanRepository implements IRepository<BanDTO> {

    async findById(id: number): Promise<BanDTO | null> {
        return Ban.findByPk(id).then(ban => BanMapper.mapToDto(ban))
    }

    async findAll(): Promise<BanDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: BanDTO): Promise<BanDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}