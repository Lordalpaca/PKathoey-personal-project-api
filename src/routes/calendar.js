import express from "express";
import { getMoodCalendar } from "../controllers/calendarController.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const calendarRouter = express.Router();

//See mood diaries in calendar
//ENDPOINT http://localhost:8888/api/mood-calendar?year=YYYY&month=M
calendarRouter.get("/", authCheck, getMoodCalendar);

export default calendarRouter;
