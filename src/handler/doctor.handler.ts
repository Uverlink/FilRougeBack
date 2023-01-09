import { Request, Response } from "express";
import { sequelize } from "../database/sequelize";
import { IService } from "../core/service.interface";
import { DoctorDTO } from "../dto/doctor.dto";
const bcrypt = require("bcrypt");

export class DoctorHandler {

    private doctorService: IService<DoctorDTO>

    constructor(service: IService<DoctorDTO>) {
        this.doctorService = service
    }

    getDoctors = async (req: Request, res: Response) => {
        try {
            const result = await this.doctorService.findAll();
            res.status(200).json(result)

        } catch (err) {
            res.status(500).json(err)
        }

    }

    getDoctorById = async (req: Request, res: Response) => {
        let requestedId: number = parseInt(req.params.id)
        try {
            const result = await this.doctorService.findById(requestedId);
            if (result === null) return res.status(404).json({ message: "Requested doctor_id does not exist." })
            res.status(200).json(result)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'ERROR 500', err });
        }
    };

    createDoctor = async (req: Request, res: Response) => {
        if (!req.body.password) return res.status(400).json({
            message: "Password required.",
        });
        // const result = await this.doctorService.create(5)
    }

}

// export const doctorHandler = { getDoctors, getDoctorById, createDoctor }
