import { PersonDTO } from "../dto/person.dto"
import { Person } from "../model/person.model";

export class PersonMapper {
    static mapToDto(person: Person | null): PersonDTO | null {
        if (person === null) return null;
        return {
            lastname: person.lastname,
            firstname: person.firstname
        }
    }

    static mapAllToDto(persons: Person[]): PersonDTO[] {
        return persons.map(person => {
            return  {
                lastname: person.lastname,
                firstname: person.firstname
            }
        })
    }

}