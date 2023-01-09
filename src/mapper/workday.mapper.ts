import { WorkdayDTO } from "../dto/workday.dto"
import { Workday } from "../model/workday.model";

export class WorkdayMapper {
    static mapToDto(workday: Workday | null): WorkdayDTO | null {
        if (workday === null) return null;
        return {
            workday_number: workday.workday_number,
            workday_start: workday.workday_start,
            workday_end: workday.workday_end,
            slot_duration_minutes: workday.slot_duration_minutes,
        }
    }

    static mapAllToDto(workdays: Workday[]): WorkdayDTO[] {
        return workdays.map(workday => {
            return  {
                workday_number: workday.workday_number,
                workday_start: workday.workday_start,
                workday_end: workday.workday_end,
                slot_duration_minutes: workday.slot_duration_minutes,
            }
        })
    }

}