import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

export const getMoodCalendar = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { year, month } = req.query;

    if (!year || !month) {
      return next(createError(400, "Year and month query parameters are required."));
    }
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);

    if (isNaN(yearNum) || isNaN(monthNum)) {
        return next(createError(400, "Year and month must be valid numbers."));
    }
    const startDate = new Date(yearNum, monthNum - 1, 1);
    const endDate = new Date(yearNum, monthNum, 1);

    const moodDiaries = await prisma.moodDiary.findMany({
      where: { userId, day: { gte: startDate, lt: endDate } },
      orderBy: { createdAt: "asc" },
      include: { moodTriggers: true },
    });
    res.status(200).json({
      message: "Calendar data requested!",
      moodDiaries: moodDiaries,
    });
  } catch (error) {
    console.error("Error in getMoodCalendar:", error);
    next(createError(500, "Failed to retrieve mood diaries to the calendar."));
  }
};
