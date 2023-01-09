import { IRepository } from "../core/respository.interface";
import { TokenDTO } from "../dto/token.dto";
import { Token } from "../model/token.model";
import { TokenMapper } from "../mapper/token.mapper";

export class TokenRepository implements IRepository<TokenDTO> {

    async findById(id: number): Promise<TokenDTO | null> {
        return Token.findByPk(id).then(token => TokenMapper.mapToDto(token))
    }

    async findAll(): Promise<TokenDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: TokenDTO): Promise<TokenDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}