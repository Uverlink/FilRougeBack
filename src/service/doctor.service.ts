import { DoctorDTO } from "../dto/doctor.dto";
import { IRepository } from "../core/respository.interface";
import { IService } from "../core/service.interface";

export class DoctorService implements IService<DoctorDTO> {

    private doctorRepository: IRepository<DoctorDTO>;

    constructor(_doctorRepository : IRepository<DoctorDTO>) {
        this.doctorRepository = _doctorRepository;
    }
    
    async findAll(): Promise<DoctorDTO[]> {
        return this.doctorRepository.findAll()
    }
    
    async findById(id: number): Promise<DoctorDTO | null>{
        return this.doctorRepository.findById(id).then(doctorDto => {
            if (doctorDto === null) return null;
            // doctorDto.lastname = "M. " + doctorDto.lastname;
            return doctorDto;
        });
    }
    
    async create(newDoctor : DoctorDTO): Promise<DoctorDTO> {
        //bcrypt + bordel
        return this.doctorRepository.create(newDoctor)
    }
    
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}