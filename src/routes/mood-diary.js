import express from "express";
import { authCheck } from "../middlewares/auth.middleware.js";
import { validate, createMoodDiarySchema } from "../validations/validators.js"; 
import { createMoodDiary, getMoodDiaries } from "../controllers/moodDiaryController.js"

const moodDiaryRouter = express.Router();

//Create Mood Diary
//ENDPOINT http://localhost:8000/api/mood-diary
moodDiaryRouter.post("/", authCheck, validate(createMoodDiarySchema), createMoodDiary)

//Get Mood Diaries
//ENDPOINT http://localhost:8000/api/mood-diary
moodDiaryRouter.get("/", authCheck, getMoodDiaries)

export default moodDiaryRouter