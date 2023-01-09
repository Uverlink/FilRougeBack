import { DoctorHandler } from "../handler/doctor.handler";
import { DoctorRepository } from "../repository/doctor.repository";
import { DoctorService } from "../service/doctor.service";

export const doctorHandler = new DoctorHandler(new DoctorService(new DoctorRepository));