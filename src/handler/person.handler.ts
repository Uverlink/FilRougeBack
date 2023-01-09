import { Request, Response } from "express";
import { PersonRepository } from "../repository/person.repository";
import { PersonService } from "../service/person.service";
const bcrypt = require("bcrypt");

const personService = new PersonService(new PersonRepository);

const getPersons = async (req: Request, res: Response) => {
    try {
        const result = await personService.findAll();
        res.status(200).json(result)

    } catch (err) {
        res.status(500).json(err)
    }

}

const getPersonById = async (req: Request, res: Response) => {
    let requestedId: number = parseInt(req.params.id)
    try {
        const result = await personService.findById(requestedId);
        if (result === null) return res.status(404).json({ message: "Requested user_id does not exist." })
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: 'ERROR 500', err });
    }
};

function test(req: Request, res: Response) {
    res.status(200).json('TEST')
}

export const personHandler = { getPersons, getPersonById, test }
