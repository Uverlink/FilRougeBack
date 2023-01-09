import { VacationDTO } from "../dto/vacation.dto"
import { Vacation } from "../model/vacation.model";

export class VacationMapper {
    static mapToDto(vacation: Vacation | null): VacationDTO | null {
        if (vacation === null) return null;
        return {
            vacation_start: vacation.vacation_start,
            vacation_end: vacation.vacation_end,
        }
    }

    static mapAllToDto(vacations: Vacation[]): VacationDTO[] {
        return vacations.map(vacation => {
            return  {
                vacation_start: vacation.vacation_start,
                vacation_end: vacation.vacation_end,
            }
        })
    }

}