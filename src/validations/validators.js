import * as Yup from "yup";

// --- Authentication Schema ---
export const registerSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username cannot exceed 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// --- Mood Diary Schemas ---
export const createMoodDiarySchema = Yup.object().shape({
  moodColor: Yup.string()
    .oneOf(
      [
        "ANGRY",
        "ANXIOUS",
        "CALM",
        "EXCITED",
        "GRATEFUL",
        "HOPEFUL",
        "LOVED",
        "RELAXED",
        "SAD",
        "STRESSED",
        "TIRED",
      ],
      "Invalid mood color"
    )
    .required("Mood color is required"),
  moodTriggers: Yup.array()
    .of(
      Yup.string().oneOf(
        [
          "FAMILY",
          "NEWS",
          "HEALTH",
          "WORK",
          "FRIENDS",
          "PARTICIPATION",
          "SELF",
          "RELATIONSHIPS",
          "ACTIVITIES",
          "INDEPENDENCE",
        ],
        "Invalid trigger type"
      )
    ),
  title: Yup.string().max(255, "Title cannot exceed 255 characters").nullable(),
  note: Yup.string().nullable(),
  day: Yup.date()
    .required("Day is required")
    .max(new DataTransfer(), "Mood diary entry cannot be for a future date"),
  challengingThought: Yup.string().nullble(),
  alternativeThought: Yup.string().nullable(),
  copingstrategyUsed: Yup.string().nullable(),
  lessonLearned: Yup.string().nullable(),
});

export const updateMoodDiarySchema = Yup.object().shape({
  moodColor: Yup.string()
    .oneOf(
      ["ANGRY", "ANXIOUS", "CALM", "EXCITED", "GRATEFUL", "HOPEFUL", "LOVED", "RELAXED", "SAD", "STRESSED", "TIRED"],
      "Invalid mood color"
    )
    .optional(),
  moodTriggers: Yup.array()
    .of(
      Yup.string().oneOf(
        ["FAMILY", "NEWS", "HEALTH", "WORK", "FRIENDS", "PARTICIPATION", "SELF", "RELATIONSHIPS", "ACTIVITIES", "INDEPENDENCE"],
        "Invalid trigger type"
      )
    ),
  title: Yup.string().max(255, "Title cannot exceed 255 characters").nullable(),
  note: Yup.string().nullable(),
  day: Yup.date()
    .max(new Date(), "Mood diary entry cannot be for a future date")
    .optional(),

  challengingThought: Yup.string().nullable().optional(),
  alternativeThought: Yup.string().nullable().optional(),
  copingStrategyUsed: Yup.string().nullable().optional(),
  lessonLearned: Yup.string().nullable().optional(),
});


// --- Validate Middleware ---
export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item);
    const errTxt = errMsg.join(",");
    console.log(errTxt);
    const mergeErr = new Error(errTxt);
    next(mergeErr);
  }
};
