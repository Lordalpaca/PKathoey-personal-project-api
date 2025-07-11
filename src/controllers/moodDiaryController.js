import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

//----------------------------------------------------------------------------------------------------------------
//Create
export const createMoodDiary = async (req, res, next) => {
  try {
    const {
      moodColor,
      moodTriggers,
      title,
      note,
      challengingThought,
      alternativeThought,
      copingStrategyUsed,
      lessonLearned,
      imageUrl,
    } = req.body;
    const userId = req.user.userId;

    // Transaction: Ensures MoodDiary and MoodTriggers are created consistently ("all or nothing").
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the MoodDiary entry FIRST
      const moodDiaryEntry = await tx.moodDiary.create({
        data: {
          moodColor,
          title,
          note,
          challengingThought,
          alternativeThought,
          copingStrategyUsed,
          lessonLearned,
          imageUrl,
          userId,
        },
      });

      // 2. Conditionally Create MoodTriggers, using the ID from the created MoodDiary
      let createdTriggers = [];

      if (moodTriggers && moodTriggers.length > 0) {
        createdTriggers = await tx.moodTrigger.createMany({
          data: moodTriggers.map((triggerName) => ({
            name: triggerName,
            moodDiaryId: moodDiaryEntry.id,
          })),
        });
      }

      // Return the results of the operations you need from the transaction
      // This will be captured by 'result' outside the transaction
      return { moodDiaryEntry, createdTriggers };
    });

    // Extract the results from the transaction's returned object
    const { moodDiaryEntry, createdTriggers } = result;

    // Send success response
    res.status(201).json({
      message: "Mood diary entry created successfully!",
      moodDiary: moodDiaryEntry, // Send back the full created mood diary entry
    });
  } catch (error) {
    console.error("Error in createMoodDiary:", error);
    next(createError(500, "Failed to create mood diary entry."));
  }
};

//----------------------------------------------------------------------------------------------------------------
//Read
export const getMoodDiaries = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const moodDiaries = await prisma.moodDiary.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { moodTriggers: true },
    });
    res
      .status(200)
      .json({
        message: "Retrieve Mood Diaries Successful",
        moodDiaries: moodDiaries,
      });
  } catch (error) {
    console.error("Error in getMoodDiaries:", error);
    next(createError(500, "Failed to fetch mood diary entries."));
  }
};
//----------------------------------------------------------------------------------------------------------------
//Update
