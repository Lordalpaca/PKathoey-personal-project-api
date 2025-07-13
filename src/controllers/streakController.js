import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

// --- Internal Helper Function (DOES NOT send HTTP responses) ---
// This function calculates and updates the streak in the database.
// It's designed to be called internally by other controllers (like createMoodDiary)
// or by the POST /api/streak endpoint.
// IMPORTANT: It handles its own errors by throwing, which the caller must catch.
export const updateUserStreakInternal = async (userId) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today at midnight
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1); // Yesterday at midnight

    let streak = await prisma.streak.findUnique({ where: { userId } });

    // If no streak record exists, initialize a new one.
    if (!streak) {
      streak = await prisma.streak.create({
        data: {
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastLoggedDate: today, // Set lastLoggedDate to today
        },
      });
      return streak; // <-- JUST RETURN THE OBJECT, NO res.json()
    }

    // Streak Calculation Logic (if streak record already exists)
    const lastLoggedDate = new Date(streak.lastLoggedDate); // Ensure it's a Date object
    lastLoggedDate.setHours(0, 0, 0, 0); // Normalize lastLoggedDate to midnight

    // Case 1: User has already logged a mood today (no change to streak)
    if (lastLoggedDate.getTime() === today.getTime()) {
      return streak; // <-- JUST RETURN THE OBJECT, NO res.json()
    }
    // Case 2: User logged yesterday (streak continues)
    else if (lastLoggedDate.getTime() === yesterday.getTime()) {
      streak.currentStreak += 1; //
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
      streak.lastLoggedDate = today;
    }
    // Case 3: Streak Broken (last log was before yesterday)
    else {
      streak.currentStreak = 1;
      streak.lastLoggedDate = today;
    }

    // Update Streak in the database
    const updatedStreak = await prisma.streak.update({
      where: { userId },
      data: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastLoggedDate: streak.lastLoggedDate,
      },
    });

    return updatedStreak; // <-- JUST RETURN THE OBJECT, NO res.json()
  } catch (error) {
    // Crucial: Throw an error for the caller to catch and handle the HTTP response.
    console.error("Error in updateUserStreakInternal:", error);
    throw createError(500, "Failed to calculate/update streak internally.");
  }
};
//----------------------------------------------------------------------------------------------------------------
export const getStreak = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const streak = await prisma.streak.findUnique({
      where: { userId }
    });

    if (!streak) {
      return res.status(200).json({ currentStreak: 0, longestStreak: 0, lastLoggedDate: null });
    }

    res.status(200).json({ streak });
  } catch (error) {
    console.error("Error in getStreak:", error);
    next(createError(500, "Failed to retrieve streak."));
  }
};
//----------------------------------------------------------------------------------------------------------------
export const postStreakUpdate = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // Call the internal helper function
        const updatedStreak = await updateUserStreakInternal(userId);

        res.status(200).json({
            message: "Streak updated successfully!",
            streak: updatedStreak
        });
    } catch (error) {
        console.error("Error in postStreakUpdate:", error);
        // This 'next(createError)' catches errors thrown by updateUserStreakInternal as well
        next(createError(500, "Failed to update streak via POST."));
    }
};