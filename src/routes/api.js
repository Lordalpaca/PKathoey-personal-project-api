import express from "express";
import moodDiaryRouter from "./mood-diary";

const apiRouter = express.Router();

apiRouter.use('/mood-diary', moodDiaryRouter)

export default apiRouter;