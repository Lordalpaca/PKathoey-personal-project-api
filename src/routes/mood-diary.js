import express from "express";
import { authCheck } from "../middlewares/auth.middleware.js";
import { validate, createMoodDiarySchema, updateMoodDiarySchema } from "../validations/validators.js"; 
import { createMoodDiary, deleteMoodDiary, getMoodDiaries, getMoodDiaryById, updateMoodDiary } from "../controllers/moodDiaryController.js"

const moodDiaryRouter = express.Router();

//Create Mood Diary
//ENDPOINT http://localhost:8888/api/mood-diary
moodDiaryRouter.post("/", authCheck, validate(createMoodDiarySchema), createMoodDiary)

//Get Mood Diaries
//ENDPOINT http://localhost:8888/api/mood-diary
moodDiaryRouter.get("/", authCheck, getMoodDiaries)

//Get Mood Diary By Id
//ENDPOINT http://localhost:8888/api/mood-diary/:id
moodDiaryRouter.get("/:id", authCheck, getMoodDiaryById)

//Update Mood Diary
//ENDPOINT http://localhost:8888/api/mood-diary/:id
moodDiaryRouter.put("/:id", authCheck, validate(updateMoodDiarySchema), updateMoodDiary)

//Update Mood Diary
//ENDPOINT http://localhost:8888/api/mood-diary/:id
moodDiaryRouter.delete("/:id", authCheck, deleteMoodDiary)

export default moodDiaryRouter