import { IRepository } from "../core/respository.interface";
import { AddressDTO } from "../dto/address.dto";
import { Address } from "../model/address.model";
import { AddressMapper } from "../mapper/address.mapper";

export class AddressRepository implements IRepository<AddressDTO> {

    async findById(id: number): Promise<AddressDTO | null> {
        return Address.findByPk(id).then(address => AddressMapper.mapToDto(address))
    }

    async findAll(): Promise<AddressDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: AddressDTO): Promise<AddressDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}