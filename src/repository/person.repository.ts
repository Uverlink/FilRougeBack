import { IRepository } from "../core/respository.interface";
import { PersonDTO } from "../dto/person.dto";
import { Person } from "../model/person.model";
import { PersonMapper } from "../mapper/person.mapper";

export class PersonRepository implements IRepository<PersonDTO> {

    async findById(id: number): Promise<PersonDTO | null> {
        return Person.findByPk(id).then((person : Person | null ) => PersonMapper.mapToDto(person))
    }

    async findAll(): Promise<PersonDTO[]> {
        return Person.findAll().then((persons: Person[]) => PersonMapper.mapAllToDto(persons))
    }

    create(t: PersonDTO): Promise<PersonDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}