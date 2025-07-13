import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

//----------------------------------------------------------------------------------------------------------------
//Create
export const createMoodDiary = async (req, res, next) => {
    try {
        const {
            moodColor,
            title,
            note,
            moodTriggers,
            day,
            challengingThought,
            alternativeThought,
            copingStrategyUsed,
            lessonLearned,
            imageUrl
        } = req.body;

        const userId = req.user.id;
        console.log('userId', userId)

        const newMoodDiary = await prisma.moodDiary.create({
            data: {
                moodColor: moodColor,
                title: title,
                note: note,
                day: day, 
                challengingThought: challengingThought,
                alternativeThought: alternativeThought,
                copingStrategyUsed: copingStrategyUsed,
                lessonLearned: lessonLearned,
                imageUrl: imageUrl, 
                userId: userId, 

               
                moodTriggers: {
                    connect: moodTriggers.map(triggerName => ({ tag: triggerName }))
                }
            },
            include: {
                moodTriggers: true
            }
        });

        //If diary created, update streak using internal helper 
        // (can only send HTTP request once at a time so we cannot call updateStreak middleware function here)
        await updateUserStreakInternal(userId)

        res.status(201).json({
            message: "Mood diary entry created successfully!",
            moodDiary: newMoodDiary,
        });

    } catch (error) {
        console.error("Error in createMoodDiary:", error);
        next(createError(500, "Failed to create mood diary entry."));
    }
};

//----------------------------------------------------------------------------------------------------------------
//Read All
export const getMoodDiaries = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const moodDiaries = await prisma.moodDiary.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { moodTriggers: true },
    });
    res.status(200).json({
      message: "Retrieve Mood Diaries Successful",
      moodDiaries: moodDiaries,
    });
  } catch (error) {
    console.error("Error in getMoodDiaries:", error);
    next(createError(500, "Failed to fetch mood diary entries."));
  }
};
//----------------------------------------------------------------------------------------------------------------
//Read One by Id
export const getMoodDiaryById = async (req, res, next) => {
  try {
    const id = req.params.id
    const userId = req.user.id
    const moodDiary = await prisma.moodDiary.findUniqueOrThrow({
      where: {userId, id},
      include: {moodTriggers: true}
    });
    res.status(200).json({
      message: `Retrieve Mood Diary id=${id} Successful`,
      moodDiary: moodDiary,
    });
  } catch (error) {
    console.error("Error in getMoodDiaryById:", error);
    if (error.code === 'P2025') {
      return next(
        createError(
          404,
          "Mood diary entry not found or you don't have permission to view it."
        )
      );
    }
    next(createError(500, "Failed to fetch the mood diary"))
  }
}
//----------------------------------------------------------------------------------------------------------------
//Update
export const updateMoodDiary = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const updatedData = req.body;
    const updatedMoodDiary = await prisma.moodDiary.update({
      where: {
        id,
        userId,
      },
      data: updatedData,
    });
    res.status(200).json({
      message: "Mood diary entry updated successfully!",
      moodDiary: updatedMoodDiary,
    });
  } catch (error) {
    console.error("Error in updateMoodDiary:", error);
    if (error.code === "P2025") {
      return next(
        createError(
          404,
          "Mood diary entry not found or you don't have permission to update it."
        )
      );
    }
    next(createError(500, "Failed to update mood diary entry."));
  }
};
//----------------------------------------------------------------------------------------------------------------
//Delete
export const deleteMoodDiary = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const deleteMoodDiary = await prisma.moodDiary.delete({
      where: {
        id,
        userId,
      },
    });
    res.status(200).json({
      message: "Mood diary entry deleted successfully!",
    });
  } catch (error) {
    console.error("Error in deleteMoodDiary:", error);
    if (error.code === "P2025") {
      return next(
        createError(
          404,
          "Mood diary entry not found or you don't have permission to delete it."
        )
      );
    }
    next(createError(500, "Failed to delete mood diary entry."));
  }
};
