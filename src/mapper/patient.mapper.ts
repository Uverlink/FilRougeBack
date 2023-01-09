import { PatientDTO } from "../dto/patient.dto"
import { Patient } from "../model/patient.model";

export class PatientMapper {
    static mapToDto(patient: Patient | null): PatientDTO | null {
        if (patient === null) return null;
        return {
            patient_id: patient.patient_id,
        }
    }

    static mapAllToDto(patients: Patient[]): PatientDTO[] {
        return patients.map(patient => {
            return  {
                patient_id: patient.patient_id,
            }
        })
    }

}