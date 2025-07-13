import express from "express";
import moodDiaryRouter from "./mood-diary.js";
import calendarRouter from "./calendar.js";

const apiRouter = express.Router();

apiRouter.use('/mood-diary', moodDiaryRouter)
apiRouter.use('/mood-calendar', calendarRouter)

export default apiRouter;