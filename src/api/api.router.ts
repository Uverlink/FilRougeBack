import { Router } from "express";
import { router } from "./router";

export const apiRouter = Router()

apiRouter.use('/api', router)