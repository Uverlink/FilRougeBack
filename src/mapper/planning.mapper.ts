import { PlanningDTO } from "../dto/planning.dto"
import { Planning } from "../model/planning.model";

export class PlanningMapper {
    static mapToDto(planning: Planning | null): PlanningDTO | null {
        if (planning === null) return null;
        return {
            planning_name: planning.planning_name,
            planning_start: planning.planning_start,
            planning_end: planning.planning_end,
        }
    }

    static mapAllToDto(plannings: Planning[]): PlanningDTO[] {
        return plannings.map(planning => {
            return  {
                planning_name: planning.planning_name,
                planning_start: planning.planning_start,
                planning_end: planning.planning_end,
            }
        })
    }

}