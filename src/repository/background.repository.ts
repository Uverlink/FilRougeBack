import { IRepository } from "../core/respository.interface";
import { BackgroundDTO } from "../dto/background.dto";
import { Background } from "../model/background.model";
import { BackgroundMapper } from "../mapper/background.mapper";

export class BackgroundRepository implements IRepository<BackgroundDTO> {

    async findById(id: number): Promise<BackgroundDTO | null> {
        return Background.findByPk(id).then(background => BackgroundMapper.mapToDto(background))
    }

    async findAll(): Promise<BackgroundDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: BackgroundDTO): Promise<BackgroundDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}