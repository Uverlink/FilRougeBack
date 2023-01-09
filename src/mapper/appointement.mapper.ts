import { AppointementDTO } from "../dto/appointement.dto"
import { Appointement } from "../model/appointement.model";

export class AppointementMapper {
    static mapToDto(appointement: Appointement | null): AppointementDTO | null {
        if (appointement === null) return null;
        return {
            appointement_date: appointement.appointement_date,
            appointement_duration_minutes: appointement.appointement_duration_minutes,
            appointement_reason: appointement.appointement_reason,
        }
    }

    static mapAllToDto(appointements: Appointement[]): AppointementDTO[] {
        return appointements.map(appointement => {
            return  {
                appointement_date: appointement.appointement_date,
                appointement_duration_minutes: appointement.appointement_duration_minutes,
                appointement_reason: appointement.appointement_reason,
            }
        })
    }

}